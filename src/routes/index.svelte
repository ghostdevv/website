<script>
    import { fly } from 'svelte/transition';
    import { links } from '@/home.config';
</script>

<div>
    <div class="letter-row">
        {#each 'GHOST' as c, i}
            <h1 in:fly={{ y: -40, delay: 150 * i }}>{c}</h1>
        {/each}
    </div>

    <div class="row center g16">
        {#each links as [href, text], i}
            <a {href} role="button" in:fly={{ y: -40, delay: 150 * (i + 1) }}>
                {text}
            </a>
        {/each}
    </div>
</div>

<style lang="scss">
    .letter-row {
        display: flex;
        align-items: center;
        justify-content: center;

        line-height: 0.6;
    }

    div {
        text-align: center;
        padding: 24px 0px;
        width: 100%;
    }
</style>
