// @ts-check
import serendipity from './src/lib/serendipity-shiki';
import cloudflare from '@astrojs/cloudflare';
import { defineConfig } from 'astro/config';
import rehypeWrap from 'rehype-wrap-all';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';

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
