import { readFile, appendFile, rm } from 'node:fs/promises';
import { join } from 'desm';

const DIST = join(import.meta.url, '../dist');

const embed = JSON.parse(await readFile(`${DIST}/embed.json`, 'utf-8')) as {
	image: string;
	link: string;
};

await appendFile(
	`${DIST}/_redirects`,
	`/embed/latest/image ${embed.image}\n/embed/latest/link ${embed.link}\n`,
	'utf-8',
);

await rm(`${DIST}/embed.json`);
