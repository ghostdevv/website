import { getImage } from 'astro:assets';
import { getPosts } from '$lib/posts';

const latestPost = (await getPosts())[0]!;

const img = await getImage({
    src: latestPost.image,
    width: 800,
    format: 'webp',
});

export const GET = (request: Request) => {
    const url = new URL(img.src, new URL(request.url).origin);
    return Response.redirect(url.toString(), 307);
};
