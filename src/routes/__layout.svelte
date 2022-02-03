<script>
    import { faTimes } from '@fortawesome/free-solid-svg-icons';
    import Nav from '$lib/components/Nav.svelte';
    import { metaData } from '$lib/data/meta';
    import { fade } from 'svelte/transition';
    import { browser } from '$app/env';
    import { beforeNavigate } from '$app/navigation';
    import Fa from 'svelte-fa';

    let online;
    let ignoreOfflineWarning = false;

    $: if (!online) ignoreOfflineWarning = false;

    beforeNavigate(() => {
        metaData.reset();
    });
</script>

<svelte:window bind:online />

<svelte:head>
    <title>{$metaData.title}</title>

    <meta name="title" content={$metaData.title} />
    <meta property="og:title" content={$metaData.title} />

    <meta name="description" content={$metaData.description} />
    <meta property="og:description" content={$metaData.description} />

    <meta name="image" content={$metaData.image} />
    <meta property="og:image" content={$metaData.image} />
</svelte:head>

<Nav />

<div class="wrapper column g16">
    <div class="column g32 main">
        <slot />
    </div>
</div>

{#if !online && !ignoreOfflineWarning && browser}
    <banner class="offline red" in:fade>
        <p>You are offline</p>

        <!-- Ideally should be a button or have .button but can't since it adds styling - will make a exception class in ghostsui -->
        <div
            class="close"
            style="cursor: pointer"
            on:click={() => (ignoreOfflineWarning = true)}>
            <Fa icon={faTimes} />
        </div>
    </banner>
{/if}

<style lang="scss">
    div {
        width: 100%;
    }

    .wrapper {
        max-width: 1400px;
        margin: 0px auto;

        padding: 16px 32px;
        padding-bottom: 64px;

        .main {
            padding-top: 140px;
        }
    }

    .offline {
        position: fixed;
        bottom: 0;
        left: 0;

        width: 100%;

        display: grid;

        grid-template-columns: 1fr max-content;
        grid-template-rows: 1fr;

        align-items: center;
        text-align: center;

        .close {
            padding: 4px;
        }
    }
</style>
