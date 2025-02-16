import { defineCollection, z } from 'astro:content';
import { tags } from '../lib/tags';

export const collections = {
	blog: defineCollection({
		type: 'content',
		schema: ({ image }) =>
			z.object({
				tag: z.enum(tags),
				title: z.string().trim().min(1),
				excerpt: z.string().trim().min(1),
				image: image(),
				postedAt: z.number(),
				lastEdited: z.number().optional(),
				attribution: z.string().optional(),
			}),
	}),

	links: defineCollection({
		type: 'data',
		schema: ({ image }) =>
			z.object({
				tag: z.enum(tags),
				title: z.string().trim().min(1),
				excerpt: z.string().trim().min(1),
				image: image(),
				link: z.string().url().trim().min(1),
				postedAt: z.number(),
			}),
	}),

	supporters: defineCollection({
		type: 'data',
		schema: ({ image }) =>
			z.object({
				name: z.string().trim().min(1),
				active: z.boolean().optional().default(false),
				pfp: image(),
			}),
	}),

	projects: defineCollection({
		type: 'data',
		schema: () =>
			z.object({
				name: z.string().trim().min(1),
				url: z.string().url().trim().min(1),
				star: z.boolean().optional().default(false),
			}),
	}),
};
