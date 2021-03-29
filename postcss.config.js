module.exports = {
    plugins: [
        require('autoprefixer')({ overrideBrowserslist: ['last 12 versions'] }),
        require('postcss-import')(),
    ],
};
