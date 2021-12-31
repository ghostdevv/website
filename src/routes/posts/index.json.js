import sanity from '$sanity';
import groq from 'groq';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async ({ url }) => {
    const limit = url.searchParams.get('limit') || 15;
    const filter = url.searchParams.get('filter') || null;

    const filterConditional = filter ? '&& references($filter)' : '';
    const limitConditional = limit ? '[0...$limit]' : '';

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
