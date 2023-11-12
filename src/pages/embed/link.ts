import { getPosts } from '$lib/posts';

const latestPost = (await getPosts())[0]!;

const link =
    latestPost.type == 'LINK'
        ? latestPost.link
        : `https://ghostdev.xyz/posts/${latestPost.slug}`;

export const GET = () => {
    return Response.redirect(link, 307);
};
