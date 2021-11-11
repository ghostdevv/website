<script>
    import PostGroup from '@/components/posts/PostGroup.svelte';
    import Loader from '@/components/Loader.svelte';
    import { quintOut } from 'svelte/easing';
    import { featured } from '@/data/links';
    import { fly } from 'svelte/transition';
    import { onMount } from 'svelte';

    import { getPosts } from '$sanity';

    const postsPromise = getPosts();
    postsPromise.catch(console.error);

    let mounted;
    onMount(() => (mounted = true));
</script>

<section class="column g32 center">
    <div class="letter-row">
        {#if mounted}
            {#each 'GHOST' as c, i}
                <h1
                    in:fly={{
                        x: (i - 2) * 18,
                        duration: 1500,
                        easing: quintOut,
                        delay: 250,
                    }}>
                    {c}
                </h1>
            {/each}
        {/if}
    </div>

    <div class="row center g16">
        {#if mounted}
            {#each featured as [text, href], i}
                <a
                    {href}
                    role="button"
                    in:fly={{
                        y: -20,
                        delay: 150 * (i + 1),
                    }}>
                    {text}
                </a>
            {/each}
        {/if}
    </div>
</section>

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

    .letter-row {
        display: flex;
        align-items: center;
        justify-content: center;

        line-height: 0.6;
    }

    section {
        text-align: center;
        padding: 22px 0px;
        width: 100%;
    }
</style>
