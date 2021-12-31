<script context="module">
    export const load = async ({ fetch }) => {
        const tags = await fetch('/posts/tags.json');
        const posts = await fetch('/posts.json');

        return {
            props: {
                tags: await tags.json(),
                posts: await posts.json(),
            },
        };
    };
</script>

<script>
    import PostGroup from '$lib/components/posts/cards/PostGroup.svelte';
    import Loader from '$lib/components/Loader.svelte';
    import { fade } from 'svelte/transition';
    import { mounted } from 'svelte-mount';

    export let posts;
    export let tags;

    let filter = null;

    const getPosts = async (filter) => {
        const res = await fetch(`/posts.json?filter=${filter}`);
        return await res.json();
    };

    $: postsPromise = filter ? getPosts(filter) : Promise.resolve(posts);
</script>

{#if mounted}
    <div class="filter" in:fade>
        <label for="filter">Filter Posts</label>

        <select id="filter" bind:value={filter}>
            <option selected value={null}>No Filter</option>

            {#each tags as { name, id }}
                <option value={id}>
                    {name}
                </option>
            {/each}
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
