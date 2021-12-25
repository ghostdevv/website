import { visualizer } from 'rollup-plugin-visualizer';
import vercel from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';
import path from 'path';

export default {
    kit: {
        adapter: vercel(),

        // hydrate the <div id="svelte"> element in src/app.html
        target: '#svelte',

        vite: {
            server: {
                port: 5000,
            },

            resolve: {
                alias: [
                    {
                        find: '$sanity',
                        replacement: path.resolve('./src/sanity.js'),
                    },
                ],
            },

            plugins: [visualizer()],
        },
    },

    preprocess: preprocess(),
};
