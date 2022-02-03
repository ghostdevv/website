<script context="module">
    import { metaData } from '$lib/data/meta.js';

    /** @type {import('@sveltejs/kit').Load}*/
    export const load = async ({ params, fetch }) => {
        const post = await fetch(`/posts/${params.slug}.json`);

        metaData.set({
            title: post.title,
            description: post.description,
            image: post.image,
        });

        return {
            props: {
                post: await post.json(),
            },
        };
    };
</script>

<script>
    import TextPost from '$lib/components/posts/post/TextPost.svelte';

    export let post;
</script>

{#if post && post?.postType == 'text'}
    <TextPost {...post} />
{:else if post?.postType == 'link'}
    <h4>
        This post is actually a link,
        <a href={post.link}>take me there</a>
    </h4>
{:else}
    <h4>
        I couldn't find that post!
        <a href="/posts">View posts</a>
    </h4>
{/if}

<style>
    h4 {
        margin: 0 auto;
    }
</style>
