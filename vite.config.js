import { svelte } from '@sveltejs/vite-plugin-svelte';
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
                    replacement: path.resolve(__dirname, './src'),
                },
            ],
        },

        plugins: [
            svelte({
                preprocess: [
                    autoPreprocess({
                        postcss: require('./postcss.config.js'),
                        defaults: { style: 'postcss' },
                    }),
                ],
                emitCss: true,
                hot: !mode == 'production',
            }),
        ],
    });
