import { readFile, writeFile } from 'node:fs/promises';
import { readdir } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { env } from 'node:process';

const { GITHUB_TOKEN } = env;
if (!GITHUB_TOKEN) throw new Error('GITHUB_TOKEN is not set');

const PROJECTS_DIR = join(import.meta.dirname, '../src/content/projects');

const IGNORED_REPOS = ['.github'];

interface Repository {
	id: number;
	name: string;
	description: string | null;
	private: boolean;
	fork: boolean;
	html_url: string;
	owner: { login: string };
	archived: boolean;
}

export async function fetchRepositories(): Promise<Repository[]> {
	const repos: Repository[] = [];
	let page = 1;

	while (true) {
		console.info(`Fetching GitHub repositories (page ${page})...`);

		const url = new URL('https://api.github.com');
		url.pathname = '/user/repos';
		url.searchParams.set('page', page.toString());
		url.searchParams.set('per_page', '100');
		url.searchParams.set('sort', 'updated');
		url.searchParams.set('direction', 'desc');

		const res = await fetch(url, {
			headers: {
				Authorization: `Bearer ${env.GITHUB_TOKEN}`,
				Accept: 'application/vnd.github.v3+json',
				'User-Agent': 'repo-mirror-script',
			},
		});

		const pageRepos: Repository[] = await res.json();

		if (pageRepos.length === 0) break;

		for (const repo of pageRepos) {
			if (repo.owner.login === 'ghostdevv') {
				if (
					!repo.fork &&
					!repo.private &&
					!IGNORED_REPOS.includes(repo.name)
				) {
					repos.push(repo);
				}
			}
		}

		page++;
	}

	return repos;
}

interface Project {
	name: string;
	url: string;
	archived?: boolean;
}

async function getProjects() {
	const projects = new Map<string, Project & { path: string }>();

	for (const file of await readdir(PROJECTS_DIR, { withFileTypes: true })) {
		if (file.isDirectory() || extname(file.name) !== '.json') continue;

		const path = join(PROJECTS_DIR, file.name);
		const project: Project = JSON.parse(await readFile(path, 'utf8'));

		if (projects.has(project.url)) {
			console.warn('duplicated project', project.url);
		}

		projects.set(project.url, {
			...project,
			path,
		});
	}

	return projects;
}

const projects = await getProjects();
const repos = await fetchRepositories();

for (const repo of repos) {
	const existing = projects.get(repo.html_url);

	if (!existing) {
		const path = join(
			PROJECTS_DIR,
			`${repo.name.toLowerCase().replace(/\s/g, '-')}.json`,
		);

		const project: Project = {
			name: repo.name,
			url: repo.html_url,
			archived: repo.archived,
		};

		projects.set(project.url, { ...project, path });
		await writeFile(path, JSON.stringify(project, null, 2));
		continue;
	}

	if (existing.archived !== repo.archived) {
		existing.archived = repo.archived;
		const { path, ...project } = existing;
		await writeFile(path, JSON.stringify(project, null, 2));
	}
}
