<script>
    import PostGroup from '@/components/posts/PostGroup.svelte';
    import Title from '@/components/pages/home/Title.svelte';
    import Loader from '@/components/Loader.svelte';
    import { onMount } from 'svelte';

    import { getPosts } from '$sanity';

    const postsPromise = getPosts();
    postsPromise.catch(console.error);

    let mounted;
    onMount(() => (mounted = true));
</script>

<Title />

{#await postsPromise}
    <Loader />
{:then posts}
    <h4 class="tcenter">
        <u>Latest Posts</u>
    </h4>

    {#if mounted}
        <PostGroup {posts} />
    {/if}
{:catch}
    <p class="tcenter">
        There was an error loading posts! Contact <mark>GHOST#7524</mark> on discord
    </p>
{/await}

<style>
    .tcenter {
        margin: 0 auto;
    }
</style>
