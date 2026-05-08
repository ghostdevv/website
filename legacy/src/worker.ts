import template from './index.html' with { type: 'text' };

export default {
	async fetch(request: Request) {
		const url = new URL(request.url);

		if (url.pathname === '/rss.xml') {
			return await fetch('https://willow.sh/rss.xml');
		}

		const destination = new URL(url.pathname, 'https://willow.sh');
		const accept = request.headers.get('accept');

		if (accept?.includes('text/html')) {
			const html = template.replaceAll(
				'__DESTINATION__',
				destination.toString(),
			);

			return new Response(html, {
				headers: { 'Content-Type': 'text/html' },
			});
		}

		return Response.redirect(destination, 301);
	},
};
