import { PostType } from '$data/posts/posts';
import { mapPosts } from '$data/posts/utils';
import rss from '@astrojs/rss';

const files = import.meta.glob('./posts/**/*.md', { eager: true });
const posts = mapPosts(Object.values(files) as Record<string, any>[]);

export const get = () =>
    rss({
        title: 'GHOSTDev blog',
        description: 'Welcome to the blog of GHOST!',
        site: 'https://ghostdev.xyz',
        items: posts.map((post) => ({
            title: post.title,
            description: post.excerpt,
            pubDate: new Date(post.timestamp),
            link:
                post.type == PostType['Text']
                    ? `https://ghostdev.xyz/posts/${post.slug}`
                    : post.link!,
        })),
    });
