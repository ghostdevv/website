import type { tags } from '$data/tags';

interface LinkPost {
    title: string;
    excerpt: string;
    image: string;
    tag: keyof typeof tags;
    link: string;
    timestamp: number;
}

export enum PostType {
    Link,
    Text,
}

export interface Post {
    title: string;
    excerpt: string;
    image: string;
    tag: keyof typeof tags;
    link?: string;
    slug?: string;
    timestamp: number;
    type: PostType;
}

export const linkPosts: LinkPost[] = [
    {
        title: 'Exploring Routify in Svelte Kit',
        excerpt:
            'GHOST does her first talk on Svelte Sirens about how awesome Routify in Svelte Kit can be!',
        image: 'routify-sveltekit-sirens.webp',
        tag: 'youtube',
        link: 'https://www.youtube.com/watch?v=epVRgjhjI7M',
        timestamp: 1639764000000,
    },
    {
        title: 'Awesome new Svelte Features',
        excerpt:
            'Today Svelte released version 3.46.0, not only bringing the long awaited style directives but also local variables! Click to checkout how you can use these new features',
        image: 'new-svelte-features.webp',
        tag: 'twitter',
        link: 'https://twitter.com/onlyspaceghost/status/1481049176515522563',
        timestamp: 1641945180000,
    },
    {
        title: 'Fallback in each blocks',
        excerpt:
            'Did you know that you can use a {:else} in a Svelte Each block? Use this when your iterable is empty and you want to display some fallback content. Click to find out more',
        image: 'fallback-eachblocks.webp',
        tag: 'twitter',
        link: 'https://twitter.com/onlyspaceghost/status/1481610492057686016',
        timestamp: 1642078560000,
    },
    {
        title: 'Astro & Svelte',
        excerpt:
            'Astro just hit 1.0! Fred K Schott joins us to answer questions on Astro and see how you can integrate Svelte.',
        image: 'astro-svelte.png',
        tag: 'youtube',
        link: 'https://www.youtube.com/watch?v=iYKKg-50Gm4',
        timestamp: 1660676400000,
    },
    {
        title: 'Upgrading SvelteKit',
        excerpt:
            'GHOST joins Brittney and Kev to update the Svelte Sirens website and showcase upgrading your SvelteKit projects',
        image: 'upgrading-sveltekit.png',
        tag: 'stream',
        link: 'https://www.youtube.com/watch?v=vzeZskhjoeQ',
        timestamp: 1664283600000,
    },
    {
        title: 'Backblaze B2 Image Gallery',
        excerpt:
            "GHOST joins Oliver's Stream to helpout with his Backblaze B2 Image Galley with Svelte",
        image: 'oliver-b2-stream.png',
        tag: 'stream',
        link: 'https://www.twitch.tv/videos/1588401790',
        timestamp: 1662925899000,
    },
];
