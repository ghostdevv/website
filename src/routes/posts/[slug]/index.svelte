<script context="module">
    /** @type {import('@sveltejs/kit').Load}*/
    export const load = async ({ params, fetch }) => {
        const post = await fetch(`/posts/${params.slug}.json`);

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

<svelte:head>
    {#if post.postType == 'text'}
        <title>{post.title} - GHOST</title>
        <meta property="og:title" content="{post.title} - GHOST" />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
    {/if}
</svelte:head>

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
