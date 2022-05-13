import preprocess from 'svelte-preprocess';
import auto from '@sveltejs/adapter-auto';
import path from 'path';

export default {
    kit: {
        adapter: auto(),

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
        },
    },

    preprocess: preprocess(),
};
