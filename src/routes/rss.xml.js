import sanity from '$sanity';
import groq from 'groq';
import RSS from 'rss';

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

export async function get() {
    const feed = new RSS({
        title: 'GHOSTDev blog',
        description: 'Welcome to the blog of GHOST!',
        site_url: 'https://ghostdev.xyz',
        feed_url: 'https://ghostdev.xyz/rss.xml',
        copyright: 'Willow (GHOST) Smith',
        language: 'English',
        image_url: 'https://ghostdev.xyz/favicon.png',
    });

    const posts = await sanity.fetch(query);

    for (const post of posts)
        feed.item({
            url:
                post.postType == 'link'
                    ? post.link
                    : `https://ghostdev.xyz/posts/${post.slug}`,

            title: post.title,
            description: post.excerpt,
            date: post.timestamp,

            categories: [post.tag],

            enclosure: {
                url: post.image,
            },
        });

    return {
        body: feed.xml({ indent: true }),
        headers: {
            'Cache-Control': `max-age=0, s-max-age=${600}`, // Credit swyx
            'Content-Type': 'application/rss+xml',
        },
    };
}
