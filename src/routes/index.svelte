<script>
    import PostGroup from '@/components/posts/PostGroup.svelte';
    import Title from '@/components/pages/home/Title.svelte';
    import Loader from '@/components/Loader.svelte';

    import { getPosts } from '$sanity';

    const postsPromise = getPosts();

    postsPromise.catch(console.error);
</script>

<Title />

{#await postsPromise}
    <Loader />
{:then posts}
    <h4 class="tcenter">
        <u>Latest Posts</u>
    </h4>

    <PostGroup {posts} />
{:catch}
    <p class="tcenter">
        There was an error loading posts! Contact <mark>GHOST#7524</mark> on discord
    </p>
{/await}

<style>
    .tcenter {
        text-align: center;
    }
</style>
