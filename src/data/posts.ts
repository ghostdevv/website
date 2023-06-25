import type { CollectionEntry } from 'astro:content';

export type LinkPost = CollectionEntry<'links'>['data'] & { type: 'LINK' };

export type BlogPost = CollectionEntry<'blog'>['data'] & {
    slug: string;
    type: 'BLOG';
};

export type Post = LinkPost | BlogPost;

