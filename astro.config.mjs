// @ts-check
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections';
import { serendipity } from './src/lib/shiki/serendipity-shiki';
import { rehypeGithubAlerts } from 'rehype-github-alerts';
import expressiveCode from 'astro-expressive-code';
import cloudflare from '@astrojs/cloudflare';
import { defineConfig } from 'astro/config';
import { readFile } from 'node:fs/promises';
import rehypeWrap from 'rehype-wrap-all';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import { join } from 'node:path';
import mdx from '@astrojs/mdx';

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
	integrations: [
		svelte(),
		sitemap(),
		expressiveCode({
			plugins: [pluginCollapsibleSections()],
			defaultProps: {
				collapseStyle: 'collapsible-auto',
			},

			themes: [serendipity],
			shiki: {
				langs: [await shikiLang('caddyfile')],
			},

			useThemedScrollbars: false,
			useStyleReset: true,
			styleOverrides: {
				uiFontFamily: 'var(--font-family)',
				codeFontSize: 'var(--post-font-size)',
				codeFontFamily: "'Comic Mono', monospace",
				codeBackground: 'var(--background-secondary)',
				borderColor: 'transparent',
				borderWidth: '0px',
				frames: {
					frameBoxShadowCssValue: 'none',
					// code frame + title
					editorTabBarBackground: 'transparent',
					editorActiveTabBackground: 'var(--background-secondary)',
					editorActiveTabBorderColor: 'transparent',
					editorActiveTabIndicatorTopColor:
						'var(--background-secondary)',
					editorActiveTabIndicatorBottomColor: 'var(--primary)',
					editorActiveTabIndicatorHeight: '1px',
					// Copy Button
					tooltipSuccessBackground: 'var(--green)',
					inlineButtonBackground: 'var(--background-tertiary)',
					inlineButtonBackgroundHoverOrFocusOpacity: '1',
					inlineButtonBackgroundActiveOpacity: '1',
				},
				collapsibleSections: {
					openBackgroundColorCollapsible:
						'var(--background-tertiary)',
					closedBackgroundColor: 'var(--background-tertiary)',
				},
			},
		}),
		mdx(),
	],

	site: 'https://ghostdev.xyz/',

	adapter: cloudflare(),
	output: 'static',
	trailingSlash: 'never',
	build: {
		format: 'file',
	},

	markdown: {
		gfm: true,
		syntaxHighlight: false,
		rehypePlugins: [
			rehypeGithubAlerts,
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
