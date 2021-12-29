import taskList from 'markdown-it-task-lists';
import Shiki from 'markdown-it-shiki';
import MarkdownIt from 'markdown-it';
import sanity from '$sanity';
import groq from 'groq';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async ({ params, query }) => {
    const { slug } = params;
    const { theme } = query;

    const sanityQuery = groq`
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

    const post = await sanity.fetch(sanityQuery, { slug });

    if (!post)
        return {
            status: '404',
        };

    const md = MarkdownIt()
        .use(Shiki, {
            theme: theme || 'material-darker',
        })
        .use(taskList);

    if (post.body && post.postType == 'text') {
        post.body = md.render(post.body);
    }

    return {
        body: post,
    };
};
