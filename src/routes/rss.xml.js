import { sanity } from '$lib/sanity';
import groq from 'groq';

const query = groq`
    *[_type == 'post']{
        title,
        excerpt,
        postType,
        link,
        timestamp,
        
        "slug": slug.current,
        "image": image.asset -> url,
        "tag": tag -> name
    } | order(timestamp desc)
`;

const CONFIG = {
    title: 'GHOSTDev blog',
    description: 'Welcome to the blog of GHOST!',
    site_url: 'https://ghostdev.xyz',
    feed_url: 'https://ghostdev.xyz/rss.xml',
    copyright: 'Willow (GHOST) Smith',
    image_url: 'https://ghostdev.xyz/favicon.png',
};

const create_feed = (
    items,
) => `<?xml version="1.0" encoding="UTF-8"?><rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
    <channel>
        <title><![CDATA[${CONFIG.title}]]></title>
        <description><![CDATA[${CONFIG.description}]]></description>
        <link>${CONFIG.site_url}</link>
        <image>
            <url>${CONFIG.image_url}</url>
            <title>${CONFIG.title}</title>
            <link>${CONFIG.site_url}</link>
        </image>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <atom:link href="${
            CONFIG.feed_url
        }" rel="self" type="application/rss+xml"/>
        <copyright><![CDATA[${CONFIG.copyright}]]></copyright>
        <language>en</language>
        ${items.join('\n').trimEnd()}
    </channel>
</rss>
`;

/**
 * @typedef Item
 * @property {string} title
 * @property {string} description
 * @property {string} link
 * @property {string} category
 * @property {Date} date
 * @property {string} image
 *
 * @param {Item} data
 * @returns
 */
const create_item = (data) => `
        <item>
            <title><![CDATA[${data.title}]]></title>
            <description><![CDATA[${data.description}]]></description>
            <link>${data.link}</link>
            <guid isPermaLink="true">${data.link}</guid>
            <category><![CDATA[${data.category}]]></category>
            <pubDate>${data.date.toUTCString()}</pubDate>
            <enclosure url="${data.image}" length="0" type="image/png"/>
        </item>
`;

export async function GET() {
    const posts = await sanity.fetch(query);
    const items = [];

    for (const post of posts)
        items.push(
            create_item({
                link:
                    post.postType == 'link'
                        ? post.link
                        : `https://ghostdev.xyz/posts/${post.slug}`,

                title: post.title,
                description: post.excerpt,
                date: new Date(post.timestamp),

                category: post.tag,

                image: post.image,
            }),
        );

    return {
        body: create_feed(items),
        headers: {
            'Cache-Control': `max-age=0, s-max-age=${600}`, // Credit swyx
            'Content-Type': 'application/rss+xml',
        },
    };
}
