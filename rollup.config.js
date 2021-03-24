import svelte from 'rollup-plugin-svelte-hot';
import Hmr from 'rollup-plugin-hot';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import { copySync, removeSync, rename } from 'fs-extra';
import { spassr } from 'spassr';
import getConfig from '@roxi/routify/lib/utils/config';
import autoPreprocess from 'svelte-preprocess';
import postcssImport from 'postcss-import';
import autoprefixer from 'autoprefixer';
import alias from '@rollup/plugin-alias';
import path from 'path';

const { distDir } = getConfig(); // use Routify's distDir for SSOT
const assetsDir = 'assets';
const buildDir = `dist/build`;
const isNollup = !!process.env.NOLLUP;
const production = !process.env.ROLLUP_WATCH;

// clear previous builds
removeSync(distDir);
removeSync(buildDir);

const serve = () => ({
    writeBundle: async () => {
        const options = {
            assetsDir: [assetsDir, distDir],
            entrypoint: `${assetsDir}/__app.html`,
            script: `${buildDir}/main.js`,
        };
        spassr({ ...options, port: 5000 });
        spassr({
            ...options,
            ssr: true,
            port: 5005,
            ssrOptions: { inlineDynamicImports: true, dev: true },
        });
    },
});
const copyToDist = () => ({
    writeBundle() {
        copySync(assetsDir, distDir);
        rename(
            path.join(distDir, '__app.html'),
            path.join(distDir, 'index.html'),
        );
    },
});

export default {
    preserveEntrySignatures: false,
    input: [`src/main.js`],
    output: {
        sourcemap: true,
        format: 'esm',
        dir: buildDir,
        // for performance, disabling filename hashing in development
        chunkFileNames: `[name]${(production && '-[hash]') || ''}.js`,
    },
    plugins: [
        alias({
            entries: [
                {
                    find: '@',
                    replacement: path.resolve(__dirname, './src'),
                },
            ],
        }),

        svelte({
            dev: !production, // run-time checks
            // Extract component CSS — better performance
            css: (css) => css.write(`bundle.css`),
            hot: isNollup && {
                noDisableCss: false,
            },
            preprocess: [
                autoPreprocess({
                    postcss: { plugins: [postcssImport(), autoprefixer()] },
                    defaults: { style: 'postcss' },
                }),
            ],
        }),

        // resolve matching modules from current working directory
        resolve({
            browser: true,
            dedupe: (importee) => !!importee.match(/svelte(\/|$)/),
        }),
        commonjs(),

        production && terser(),
        !production && !isNollup && serve(),
        !production && !isNollup && livereload(distDir), // refresh entire window when code is updated
        !production && isNollup && Hmr({ inMemory: true, public: assetsDir }), // refresh only updated code

        production && copyToDist(),
    ],
    watch: {
        clearScreen: false,
        buildDelay: 100,
    },
};
