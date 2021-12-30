<script>
    import TextPost from '$lib/components/posts/post/text/TextPost.svelte';
    import { codeTheme } from '$lib/components/posts/post/settings.js';
    import Loader from '$lib/components/Loader.svelte';
    import { page } from '$app/stores';

    $: post = fetch(
        `/posts/${$page.params.slug}.json${
            $codeTheme ? `?theme=${$codeTheme}` : ''
        }`,
    ).then((res) => res.json());
</script>

{#await post}
    <Loader />
{:then post}
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
