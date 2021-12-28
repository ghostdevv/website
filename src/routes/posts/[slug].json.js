import sanity from '$sanity';
import { marked } from 'marked';
import groq from 'groq';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async ({ params }) => {
    const { slug } = params;

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

    const post = await sanity.fetch(query, { slug });

    if (!post)
        return {
            status: '404',
        };

    if (post.body && post.postType == 'text') post.body = marked(post.body);

    return {
        body: post,
    };
};
