<script>
    import Loader from '$lib/components/Loader.svelte';
    import { page } from '$app/stores';
    import { getTextPost } from '$sanity';

    const { slug } = $page.params;

    const post = getTextPost(slug);
</script>

{#await post}
    <Loader />
{:then post}
    {#if post && post?.postType == 'text'}
        <slot props={post} />
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
{:catch}
    <h4>
        The post failed to load, Contact <mark>GHOST#7524</mark> on discord
    </h4>
{/await}

<style>
    h4 {
        margin: 0 auto;
    }
</style>
