<script>
    import PostCard from './PostCard.svelte';
</script>

<div class="blog-posts">
    <PostCard />
    <PostCard />
    <PostCard />
    <PostCard />
    <PostCard />
    <PostCard />
    <PostCard />
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
