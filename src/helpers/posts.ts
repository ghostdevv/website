import { getCollection } from 'astro:content';
import type { Post } from '../data/posts';

export async function getPosts() {
    const linkPosts = await getCollection('links');
    const blogPosts = await getCollection('blog');

    const posts: Post[] = [
        ...linkPosts.map<Post>((post) => ({
            type: 'LINK',
            ...post.data,
        })),

        ...blogPosts.map<Post>((post) => ({
            slug: post.slug,
            type: 'BLOG',
            ...post.data,
        })),
    ];

    return posts.sort((a, b) => b.timestamp - a.timestamp);
}
