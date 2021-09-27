import postcssImport from 'postcss-import';
import autoprefixer from 'autoprefixer';

export default {
    plugins: [
        autoprefixer({
            overrideBrowserslist: ['defaults and last 4 versions'],
        }),
        postcssImport(),
    ],
};
