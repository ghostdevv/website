import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import image from '@astrojs/image';

// https://astro.build/config
export default defineConfig({
    integrations: [svelte({}), image()],

    vite: {
        ssr: {
            noExternal: ['@fortawesome/*'],
        },
    },
});
