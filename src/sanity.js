import client from '@sanity/client';
import groq from 'groq';

export const sanity = client({
    projectId: 'x362b5r1',
    // dataset: import.meta.env.MODE == 'development' ? 'testing' : 'blog',
    dataset: 'testing',
    apiVersion: '2021-03-25',
    useCdn: true,
});

export const getPosts = (limit = 15, filter = null) => {
    const filterConditional = filter ? '&& references($filter)' : '';
    const limitConditional = limit ? '[0...$limit]' : '';

    const query = groq`
        *[_type == 'post' ${filterConditional}]${limitConditional}{
            title,
            excerpt,
            postType,
            link,
            timestamp,
            
            "slug": slug.current,

            "image": image.asset -> url,

            "tag": tag -> {
                name,
                "rgb": colour.rgb { r, g, b }
            }
        } | order(timestamp desc)
    `;

    return sanity.fetch(query, { limit, filter });
};

export const getTextPost = (slug) => {
    const query = groq`
        *[_type == 'post' && slug.current == $slug][0] {
            title,
            timestamp,
            body,
            postType,
            link,
            
            "image": image.asset -> url,

            "tag": tag -> {
                name,
                "rgb": colour.rgb { r, g, b }
            }
        }
    `;

    return sanity.fetch(query, { slug });
};

export const getTags = () =>
    sanity.fetch(groq`*[_type == 'tag']{ "id": _id, name }`);
