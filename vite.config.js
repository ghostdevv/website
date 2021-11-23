import { svelte } from '@sveltejs/vite-plugin-svelte';
import routify from '@roxi/routify/vite-plugin';
import autoPreprocess from 'svelte-preprocess';
import { defineConfig } from 'vite';
import path from 'path';

export default ({ mode }) =>
    defineConfig({
        server: {
            port: 5000,
        },

        resolve: {
            alias: [
                {
                    find: '@',
                    replacement: path.resolve('./src'),
                },
                {
                    find: '$sanity',
                    replacement: path.resolve('./src/sanity.js'),
                },
            ],
        },

        plugins: [
            routify(),
            svelte({
                preprocess: [autoPreprocess()],
                emitCss: true,
            }),
        ],
    });
