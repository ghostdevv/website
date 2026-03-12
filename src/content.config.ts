import { defineCollection } from 'astro:content';
import { tags } from './lib/components/posts/tags';
import { basename, join } from 'node:path';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const collections = {
	blog: defineCollection({
		loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
		schema: ({ image }) =>
			z.object({
				tag: z.enum(tags),
				title: z.string().trim().min(1),
				excerpt: z.string().trim().min(1),
				image: image(),
				postedAt: z.number(),
				lastEdited: z.number().optional(),
				attribution: z.string().optional(),
				atUri: z.string().startsWith('at://'),
			}),
	}),

	links: defineCollection({
		loader: glob({ pattern: '**/*.json', base: './src/content/links' }),
		schema: ({ image }) =>
			z.object({
				tag: z.enum(tags),
				title: z.string().trim().min(1),
				excerpt: z.string().trim().min(1),
				image: image(),
				link: z.url().trim().min(1),
				postedAt: z.number(),
			}),
	}),

	supporters: defineCollection({
		loader: glob({
			pattern: '**/*.json',
			base: './src/content/supporters',
		}),
		schema: ({ image }) =>
			z.object({
				name: z.string().trim().min(1),
				active: z.boolean().optional().default(false),
				pfp: image(),
			}),
	}),

	projects: defineCollection({
		loader: glob({ pattern: '**/*.json', base: './src/content/projects' }),
		schema: () =>
			z.object({
				name: z.string().trim().min(1),
				url: z.url().trim().min(1),
				description: z.string().trim().min(1),
				category: z.union([
					z.literal('featured'),
					z.literal('library'),
					z.literal('worker'),
					z.literal('extension'),
					z.literal('tooling'),
					z.literal('misc'),
					z.literal('wip'),
					z.literal('archived'),
				]),
			}),
	}),

	events: defineCollection({
		loader: glob({ pattern: '**/*.json', base: './src/content/events' }),
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
				url: z.url(),
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
