import sanity from '$sanity';
import groq from 'groq';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async ({ query, path }) => {
    const limit = query.get('limit') || 15;
    const filter = query.get('filter') || null;

    const filterConditional = filter ? '&& references($filter)' : '';
    const limitConditional = query ? '[0...$limit]' : '';

    const $ = groq`
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

    const posts = await sanity.fetch($, { limit, filter });

    return {
        body: posts,
    };
};
