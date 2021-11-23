<script>
    import Loader from '@/components/Loader.svelte';
    import { params } from '@roxi/routify';
    import { getTextPost } from '$sanity';

    const { slug } = $params;

    const post = getTextPost(slug);
</script>

{#await post}
    <Loader />
{:then post}
    {#if post}
        <slot props={post} />
    {:else}
        Post doesn't exist
    {/if}
{:catch}
    ERROR
{/await}
