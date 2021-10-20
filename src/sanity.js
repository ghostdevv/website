import client from '@sanity/client';
import groq from 'groq';

export const sanity = client({
    projectId: 'x362b5r1',
    dataset: 'blog',
    apiVersion: '2021-03-25',
});

export const getPosts = () =>
    sanity.fetch(groq`
        *[_type == 'post'][0...15]{
            title,
            excerpt,
            postType,
            link,
            timestamp,
            
            "slug": slug.current,

            "image": image.asset -> url,

            "tag": tag -> {
                name,
                "rgb": colour.rgb { r, g, b}
            }
        } | order(timestamp desc)
    `);
