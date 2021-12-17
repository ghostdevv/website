<script>
    import Nav from '@/components/Nav.svelte';
    import { fade } from 'svelte/transition';

    let online;
    let ignoreOfflineWarning = false;

    $: if (!online) ignoreOfflineWarning = false;
</script>

<svelte:window bind:online />

<Nav />

<div class="wrapper column g16">
    <div class="column g32 main">
        <slot />
    </div>
</div>

{#if !online && !ignoreOfflineWarning}
    <banner class="offline red" in:fade>
        <p>You are offline</p>

        <!-- Ideally should be a button or have role=button but can't since it adds styling - will make a exception class in ghostsui -->
        <div
            class="close"
            style="cursor: pointer"
            on:click={() => (ignoreOfflineWarning = true)}>
            <i class="fas fa-times" />
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
