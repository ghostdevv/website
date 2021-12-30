import taskList from 'markdown-it-task-lists';
import { getHighlighter } from 'shiki';
import MarkdownIt from 'markdown-it';
import { format } from 'date-fns';
import sanity from '$sanity';
import groq from 'groq';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async ({ params, query }) => {
    const theme = query.get('theme') || 'material-darker';
    const { slug } = params;

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

    const shiki = await getHighlighter({ theme });

    const md = MarkdownIt({
        highlight: (code, lang) => shiki.codeToHtml(code, { lang }),
    });

    md.use(taskList);

    if (post.body && post.postType == 'text') {
        post.body = md.render(post.body);
    }

    return {
        body: {
            ...post,
            timestamp: format(new Date(post.timestamp), 'do LLLL yyyy'),
        },
    };
};
