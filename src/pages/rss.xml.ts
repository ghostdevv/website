import { getPosts } from '$lib/posts';
import rss from '@astrojs/rss';

export const get = async () => {
    const posts = await getPosts();

    return rss({
        title: 'GHOSTDev blog',
        description: 'Welcome to the blog of GHOST!',
        site: 'https://ghostdev.xyz',
        items: posts.map((post) => {
            const link =
                post.type == 'BLOG'
                    ? `https://ghostdev.xyz/posts/${post.slug}`
                    : post.link;

            return {
                title: post.title,
                description: post.excerpt,
                pubDate: new Date(post.timestamp),
                draft: false,
                link,
            };
        }),
    });
};
