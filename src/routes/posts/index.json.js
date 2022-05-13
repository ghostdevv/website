import { sanity } from '$lib/sanity';
import groq from 'groq';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async ({ url }) => {
    const filter = url.searchParams.get('filter') || null;
    const filterConditional = filter ? '&& references($filter)' : '';

    const $ = groq`
        *[_type == 'post' ${filterConditional}][0..15]{
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

    const posts = await sanity.fetch($, { filter });

    return {
        body: posts,
    };
};
