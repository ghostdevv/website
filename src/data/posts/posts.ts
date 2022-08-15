import type { tags } from '$data/tags';

interface LinkPost {
    title: string;
    excerpt: string;
    image: string;
    tag: keyof typeof tags;
    link: string;
    timestamp: number;
}

export interface Post {
    title: string;
    excerpt: string;
    image: string;
    tag: keyof typeof tags;
    link?: string;
    timestamp: number;
    type: 'link' | 'text';
}

export const linkPosts: LinkPost[] = [
    {
        title: 'Exploring Routify in Svelte Kit',
        excerpt:
            'GHOST does her first talk on Svelte Sirens about how awesome Routify in Svelte Kit can be!',
        image: 'routify-sveltekit-sirens.webp',
        tag: 'twitter',
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
];
