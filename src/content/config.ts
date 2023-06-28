import { defineCollection, z } from 'astro:content';
import { tags } from '../data/tags';

export const collections = {
    blog: defineCollection({
        type: 'content',
        schema: ({ image }) =>
            z.object({
                tag: z.enum(tags),
                title: z.string().trim().min(1),
                excerpt: z.string().trim().min(1),
                image: image(),
                imagePosition: z.union([z.literal('top'), z.literal('center')]).default('center'),
                timestamp: z.number(),
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
                imagePosition: z.union([z.literal('top'), z.literal('center')]).default('center'),
                link: z.string().url().trim().min(1),
                timestamp: z.number(),
            }),
    }),
};
