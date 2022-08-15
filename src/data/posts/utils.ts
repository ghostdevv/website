import { linkPosts, Post, PostType } from './posts';
import type { AstroGlobal } from 'astro';

export type UnmappedTextPost = (Omit<Post, 'type' | 'slug'> & {
    slug: string;
})[];

export const mapPosts = (
    textPosts: Awaited<ReturnType<AstroGlobal['glob']>>,
) => {
    const mappedTextPosts = textPosts.map((post) => ({
        ...post.frontmatter,
        slug: post.url.slice('/posts/'.length),
    }));

    const posts: Post[] = [
        ...linkPosts.map((post) => ({ ...post, type: PostType['Link'] })),
        ...mappedTextPosts.map((post) => ({ ...post, type: PostType['Text'] })),
    ];

    return posts.sort((a, b) => b.timestamp - a.timestamp);
};
