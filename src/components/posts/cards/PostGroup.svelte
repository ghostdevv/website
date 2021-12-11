<script>
    import PostCard from './PostCard.svelte';

    export let posts;
</script>

<div class="blog-posts">
    {#each posts as post, i}
        <PostCard {...post} delay={100 * i} />
    {/each}
</div>

<style lang="scss">
    .blog-posts {
        display: flex;
        flex-wrap: wrap;

        align-items: stretch;
        justify-content: center;

        gap: 22px;
        width: 100%;
    }
</style>
