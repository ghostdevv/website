import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
// import image from '@astrojs/image';

// https://astro.build/config
export default defineConfig({
    integrations: [svelte(), /* image(), */ sitemap()],

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
