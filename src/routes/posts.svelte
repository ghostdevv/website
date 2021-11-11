<script>
    import PostGroup from '@/components/posts/PostGroup.svelte';
    import Loader from '@/components/Loader.svelte';
    import { onMount } from 'svelte';

    import { getPosts } from '$sanity';

    const postsPromise = getPosts();
    postsPromise.catch(console.error);

    let mounted;
    onMount(() => (mounted = true));
</script>

{#await postsPromise}
    <Loader />
{:then posts}
    {#if mounted}
        <PostGroup {posts} />
    {/if}
{:catch}
    <p style="margin: 0 auto;">
        There was an error loading posts! Contact <mark>GHOST#7524</mark> on discord
    </p>
{/await}
