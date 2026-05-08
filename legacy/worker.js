/** @param {string} path */
const notice = (path) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>moving ->></title>
</head>
<body>
    <p>I've moved to <a href="https://willow.sh${path}">willow.sh</a>!</p>
</body>
</html>`;

export default {
	/** @param {Request} request */
	async fetch(request) {
		const url = new URL(request.url);

		if (url.pathname === '/rss.xml') {
			return await fetch('https://willow.sh/rss.xml');
		}

		return new Response(notice(url.pathname), {
			headers: { 'Content-Type': 'text/html' },
		});
	},
};
