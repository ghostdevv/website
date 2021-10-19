<script>
    import PostCard from './PostCard.svelte';

    export let posts;
</script>

<div class="blog-posts">
    {#each posts as post, i}
        <PostCard {...post} delay={200 * i} />
    {/each}
</div>

<style lang="scss">
    .blog-posts {
        display: flex;
        flex-wrap: wrap;

        align-items: center;
        justify-content: center;

        gap: 22px;
        width: 100%;
    }
</style>
