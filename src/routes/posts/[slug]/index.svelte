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

{#if post && post?.postType == 'text'}
    <TextPost {...post} />
{:else if post?.postType == 'link'}
    <h4>
        This post is actually a link,
        <a href={post.link} class="button">take me there</a>
    </h4>
{:else}
    <h4>
        I couldn't find that post!
        <a href="/posts" class="button">View posts</a>
    </h4>
{/if}

<style>
    h4 {
        margin: 0 auto;
    }
</style>
