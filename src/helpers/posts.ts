import { linkPosts, Post, PostType } from '../data/posts';
import { getCollection } from 'astro:content';

export async function getPosts() {
    const blogPosts = await getCollection('blog');

    const posts: Post[] = [
        ...linkPosts.map<Post>((post) => ({ ...post, type: PostType.Link })),

        ...blogPosts.map<Post>((post) => ({
            ...post.data,
            slug: post.slug,
            type: PostType.Text,
        })),
    ];

    return posts.sort((a, b) => b.timestamp - a.timestamp);
}
