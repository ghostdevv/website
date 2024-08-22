import { getCollection, type CollectionEntry } from 'astro:content';

export type LinkPost = CollectionEntry<'links'>['data'] & { type: 'LINK' };

export type BlogPost = CollectionEntry<'blog'>['data'] & {
	slug: string;
	type: 'BLOG';
};

export type Post = LinkPost | BlogPost;

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
