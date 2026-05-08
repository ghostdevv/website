import { getPosts } from '$lib/posts';
import rss from '@astrojs/rss';

export const GET = async () => {
	const posts = await getPosts();

	return rss({
		title: "Willow (GHOST)'s Blog",
		description: 'Occasional posts about stuff I find interesting!',
		site: 'https://willow.sh',
		items: posts.map((post) => {
			const link =
				post.type == 'BLOG'
					? `https://willow.sh/posts/${post.slug}`
					: post.link;

			return {
				title: post.title,
				description: post.excerpt,
				pubDate: new Date(post.postedAt),
				draft: false,
				link,
			};
		}),
	});
};
