<script>
    import { featured } from '@/data/links';
    import { fly } from 'svelte/transition';
</script>

<section class="column g32 center">
    <div class="letter-row">
        {#each 'GHOST' as c, i}
            <h1 in:fly={{ y: -40, delay: 150 * i }}>{c}</h1>
        {/each}
    </div>

    <div class="row center g16">
        {#each featured as [text, href], i}
            <a {href} role="button" in:fly={{ y: -40, delay: 150 * (i + 1) }}>
                {text}
            </a>
        {/each}
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
