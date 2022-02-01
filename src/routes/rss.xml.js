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
        site_url: 'https://ghostdev.xyz',
        feed_url: 'https://ghostdev.xyz/rss.xml',
    });

    const posts = await sanity.fetch(query);

    for (const post of posts)
        feed.item({
            url:
                post.type == 'link'
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
