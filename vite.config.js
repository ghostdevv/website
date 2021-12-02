import { svelte } from '@sveltejs/vite-plugin-svelte';
import routify from '@roxi/routify/vite-plugin';
import autoPreprocess from 'svelte-preprocess';
import { VitePWA } from 'vite-plugin-pwa';
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
                    find: '$gql',
                    replacement: path.resolve('./src/gql.js'),
                },
            ],
        },

        plugins: [
            routify(),
            svelte({
                preprocess: [autoPreprocess()],
                emitCss: true,
            }),
            VitePWA({
                registerType: 'autoUpdate',
                manifest: {
                    name: "GHOST's Website",
                    short_name: 'GHOSTDev',
                    start_url: '/',
                    theme_color: '#2160ec',
                    background_color: '#121214',
                    display: 'standalone',
                    icons: [
                        {
                            src: 'icons/manifest-icon-192.maskable.png',
                            sizes: '192x192',
                            type: 'image/png',
                            purpose: 'any',
                        },
                        {
                            src: 'icons/manifest-icon-192.maskable.png',
                            sizes: '192x192',
                            type: 'image/png',
                            purpose: 'maskable',
                        },
                        {
                            src: 'icons/manifest-icon-512.maskable.png',
                            sizes: '512x512',
                            type: 'image/png',
                            purpose: 'any',
                        },
                        {
                            src: 'icons/manifest-icon-512.maskable.png',
                            sizes: '512x512',
                            type: 'image/png',
                            purpose: 'maskable',
                        },
                    ],
                },
            }),
        ],
    });
