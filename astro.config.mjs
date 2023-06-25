import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
    integrations: [svelte(), sitemap()],

    site: 'https://ghostdev.xyz/',

    experimental: {
        assets: true,
    },

    vite: {
        ssr: {
            noExternal: ['@fortawesome/*'],
        },
    },
});
