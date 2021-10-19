<script>
    import PostGroup from '@/components/posts/PostGroup.svelte';
    import Title from '@/components/pages/home/Title.svelte';

    import { getPosts } from '$sanity';

    const postsPromise = getPosts();
</script>

<Title />

{#await postsPromise}
    Loading
{:then posts}
    <PostGroup {posts} />
{:catch e}
    {e}
{/await}
