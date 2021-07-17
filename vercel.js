const { tossr } = require('tossr');
const fs = require('fs');

const script = fs.readFileSync(require.resolve('./dist/main.js'), 'utf8');
const template = fs.readFileSync(require.resolve('./dist/index.html'), 'utf8');

module.exports = async (req, res) => {
    const html = await tossr(template, script, req.url, {});
    res.send(html + '\n<!--ssr rendered-->');
};
