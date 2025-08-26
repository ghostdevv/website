import { defineCollection, z } from 'astro:content';
import { tags } from '../lib/components/posts/tags';
import { glob } from 'astro/loaders';
import { basename, join } from 'node:path';

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
				archived: z.boolean().optional().default(false),
			}),
	}),

	events: defineCollection({
		type: 'data',
		schema: ({ image }) =>
			z.object({
				name: z.string().trim().min(1),
				place: z.union([
					z.literal('online'),
					z.literal('in-person'),
					z.literal('hybrid'),
				]),
				type: z.union([
					z.literal('conference'),
					z.literal('meetup'),
					z.literal('stream'),
				]),
				url: z.string().url(),
				thumbnail: image(),
				start: z.coerce.date(),
				end: z.coerce.date(),
			}),
	}),

	postCardsYouTube: defineCollection({
		loader: glob({
			base: join(import.meta.dirname, './post-cards/youtube'),
			pattern: '**/*.json',
			generateId({ entry }) {
				return basename(entry, '.json');
			},
		}),
		schema: ({ image }) =>
			z.object({
				title: z.string(),
				description: z.string(),
				thumbnail: image(),
			}),
	}),
};
