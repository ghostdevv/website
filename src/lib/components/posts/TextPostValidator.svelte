<script>
    export let postType;
    export let link;
</script>

{#if postType && postType == 'text'}
    <slot />
{:else if postType && postType == 'link'}
    <h4>
        This post is actually a link,
        <a href={link} class="button">take me there</a>
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
