import { readFile, writeFile } from 'node:fs/promises';
import type { CollectionEntry } from 'astro:content';
import { readdir } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { parseArgs } from 'node:util';
import { env } from 'node:process';

type Project = CollectionEntry<'projects'>['data'];

const { GITHUB_TOKEN } = env;
if (!GITHUB_TOKEN) throw new Error('GITHUB_TOKEN is not set');

const PROJECTS_DIR = join(import.meta.dirname, '../src/content/projects');

const IGNORED_REPOS = ['.github'];

const args = parseArgs({
	args: process.argv.slice(2),
	options: { 'update-only': { type: 'boolean', default: false } },
});

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

async function fetchRepo(owner: string, name: string) {
	const url = new URL('https://api.github.com');
	url.pathname = `/repos/${owner}/${name}`;

	const res = await fetch(url, {
		headers: {
			Authorization: `Bearer ${env.GITHUB_TOKEN}`,
			Accept: 'application/vnd.github.v3+json',
			'User-Agent': 'repo-mirror-script',
		},
	});

	const repo: Repository = await res.json();
	return repo;
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
			name: project.name,
			description: project.description,
			url: project.url,
			category: project.category || 'misc',
			path,
		});
	}

	return projects;
}

const projects = await getProjects();
const repos = await fetchRepositories();

for (const project of projects.values()) {
	if (!repos.find((repo) => repo.html_url === project.url)) {
		const [owner, name] = project.url.split('/').slice(-2);

		if (!owner || !name) {
			console.error('Invalid project URL:', project.url);
			continue;
		}

		const repo = await fetchRepo(owner, name);
		repos.push(repo);
	}
}

for (const repo of repos) {
	const existing = projects.get(repo.html_url);

	if (!existing) {
		if (args.values['update-only']) continue;

		const path = join(
			PROJECTS_DIR,
			`${repo.name.toLowerCase().replace(/\s/g, '-')}.json`,
		);

		const project: Project = {
			name: repo.name,
			url: repo.html_url,
			// missing description will fail build which makes sure it's added manually
			description: repo.description!,
			category: repo.archived ? 'archived' : 'misc',
		};

		projects.set(project.url, { ...project, path });
		await writeFile(path, JSON.stringify(project, null, 2));
		continue;
	}

	let changed = false;

	if (repo.archived && existing.category !== 'archived') {
		existing.category = 'archived';
		changed = true;
	}

	if (!repo.archived && existing.category === 'archived') {
		existing.category = 'misc';
		changed = true;
	}

	if (repo.description && existing.description !== repo.description) {
		existing.description = repo.description;
		changed = true;
	}

	if (changed) {
		const { path, ...project } = existing;
		await writeFile(path, JSON.stringify(project, null, 2));
	}
}
