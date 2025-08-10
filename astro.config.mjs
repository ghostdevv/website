// @ts-check
import { serendipity } from './src/lib/shiki/serendipity-shiki';
import cloudflare from '@astrojs/cloudflare';
import { defineConfig } from 'astro/config';
import { readFile } from 'node:fs/promises';
import rehypeWrap from 'rehype-wrap-all';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import { join } from 'node:path';

/** @param {string} lang */
async function shikiLang(lang) {
	const path = join(
		import.meta.dirname,
		'./src/lib/shiki',
		`${lang}.tmLanguage.json`,
	);

	const data = await readFile(path, 'utf8');
	return JSON.parse(data);
}

// https://astro.build/config
export default defineConfig({
	integrations: [svelte(), sitemap()],

	site: 'https://ghostdev.xyz/',

	adapter: cloudflare(),
	output: 'static',
	trailingSlash: 'never',
	build: {
		format: 'file',
	},

	markdown: {
		gfm: true,
		syntaxHighlight: 'shiki',
		shikiConfig: {
			theme: serendipity,
			langs: [await shikiLang('caddyfile')],
		},
		rehypePlugins: [
			[
				rehypeWrap,
				{
					wrapper: 'div.table-wrapper',
					selector: 'table',
				},
			],
		],
	},

	vite: {
		ssr: {
			noExternal: ['@fortawesome/*'],
		},

		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern',
				},
			},
		},
	},
});
