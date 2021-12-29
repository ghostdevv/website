import taskList from 'markdown-it-task-lists';
import Shiki from 'markdown-it-shiki';
import MarkdownIt from 'markdown-it';
import sanity from '$sanity';
import groq from 'groq';

const md = MarkdownIt()
    .use(Shiki, {
        theme: 'material-darker',
    })
    .use(taskList);

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

    if (post.body && post.postType == 'text') {
        post.body = md.render(post.body);
    }

    return {
        body: post,
    };
};
