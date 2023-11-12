import { getImage } from 'astro:assets';
import { getPosts } from '$lib/posts';

const latestPost = (await getPosts())[0]!;

const link =
    latestPost.type == 'LINK' ? latestPost.link : `/posts/${latestPost.slug}`;

const img = await getImage({
    src: latestPost.image,
    width: 800,
    format: 'webp',
});

export const GET = () => {
    return Response.json({
        image: img.src,
        link,
    });
};
