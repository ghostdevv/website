<script>
    import PostGroup from '@/components/posts/cards/PostGroup.svelte';
    import Loader from '@/components/Loader.svelte';
    import { fly, fade } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import { featured } from '@/data/links';
    import { mounted } from 'svelte-mount';

    import { getPosts } from '$sanity';

    const postsPromise = getPosts();
    postsPromise.catch(console.error);

    const getDirection = (i) => {
        switch (i) {
            case 0:
                return -50;
            case 1:
                return 0;
            default:
                return 50;
        }
    };
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
                        x: getDirection(i),
                        delay: 200,
                        duration: 1000,
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
    {#if $mounted}
        <h4 class="tcenter" in:fade={{ duration: 750, delay: 300 }}>
            <u>Latest Posts</u>
        </h4>

        <PostGroup delay={500} {posts} />
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
