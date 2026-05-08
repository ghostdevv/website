import { FetchState, astro } from 'astro/fetch';

const notice = (path: string) => `<!DOCTYPE html>
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
	fetch(request: Request) {
		const state = new FetchState(request);

		if (
			state.url.hostname === 'ghostdev.xyz' &&
			state.url.pathname !== '/rss.xml'
		) {
			return new Response(notice(state.url.pathname), {
				headers: { 'Content-Type': 'text/html' },
			});
		}

		return astro(state);
	},
};
