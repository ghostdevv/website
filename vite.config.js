import { svelte } from '@sveltejs/vite-plugin-svelte';
import autoPreprocess from 'svelte-preprocess';
import { defineConfig } from 'vite';
import main from 'vite-main-js';
import path from 'path';

export default ({ mode }) =>
    defineConfig({
        server: {
            port: 5000,
        },
        build: {
            cssCodeSplit: false,
            target: ['es2015'],
        },
        optimizeDeps: {
            exclude: ['@roxi/routify'],
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
            main(),
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
