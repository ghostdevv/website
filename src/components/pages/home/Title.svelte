<script>
    import { quintOut } from 'svelte/easing';
    import { featured } from '@/data/links';
    import { fly } from 'svelte/transition';
    import { onMount } from 'svelte';

    let mounted = false;
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
                        // y: -20,
                        // delay: 150 * (i + 1),
                        x: (i - 2) * 18,
                        duration: 1500,
                        delay: 250,
                        easing: quintOut,
                    }}>
                    {text}
                </a>
            {/each}
        {/if}
    </div>
</section>

<style lang="scss">
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
