import { defineCollection, z } from 'astro:content';
import { tags } from '../data/tags';

export const collections = {
    blog: defineCollection({
        schema: z.object({
            tag: z.enum(tags),
            title: z.string().trim().min(1),
            excerpt: z.string().trim().min(1),
            image: z.string().trim().min(1),
            timestamp: z.number(),
        }),
    }),
};
