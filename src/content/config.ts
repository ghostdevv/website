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
                link: z.string().url().trim().min(1),
                timestamp: z.number(),
            }),
    }),
};
