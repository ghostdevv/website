<script>
    import PostGroup from '@/components/posts/cards/PostGroup.svelte';
    import Loader from '@/components/Loader.svelte';
    import { getPosts, getTags } from '$sanity';
    import { fade } from 'svelte/transition';
    import { mounted } from 'svelte-mount';

    let filter;

    $: postsPromise = getPosts(null, filter);
    const tagsPromise = getTags();
</script>

{#if mounted}
    <div class="filter" in:fade>
        <label for="filter">Filter Posts</label>

        <select id="filter" bind:value={filter}>
            {#await tagsPromise}
                <option selected value={undefined}>LOADING...</option>
            {:then tags}
                <option selected value={undefined}>No Filter</option>

                {#each tags as { name, id }}
                    <option value={id}>
                        {name}
                    </option>
                {/each}
            {/await}
        </select>
    </div>
{/if}

{#await postsPromise}
    <Loader />
{:then posts}
    {#if $mounted}
        <PostGroup {posts} />
    {/if}
{:catch}
    <p style="margin: 0 auto;">
        There was an error loading posts! Contact <mark>GHOST#7524</mark> on discord
    </p>
{/await}

<style lang="scss">
    .filter {
        max-width: 1200px;
        width: 100%;

        margin: 0 auto;

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
    }
    #filter {
        min-width: 183px;
    }
</style>
