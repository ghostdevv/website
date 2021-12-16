<script>
    import { cubicOut } from 'svelte/easing';

    import { fly } from 'svelte/transition';
    export let title;

    export let href = null;
    export let value;
    export let i;

    const copyColourChange = (node) => {
        let timeout;

        const click = () => {
            node.style.borderColor = 'var(--green)';

            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => (node.style.borderColor = ''), 750);
        };

        node.addEventListener('click', click, true);

        return {
            destroy: () => {
                node.removeEventListener('click', click);
                clearTimeout(timeout);
            },
        };
    };
</script>

{#if href}
    <a
        {href}
        target="_blank"
        class="card center g4"
        in:fly={{ y: -5, delay: 100 * i, easing: cubicOut, duration: 500 }}>
        <h3>{title}</h3>
        <p>{value}</p>
    </a>
{:else}
    <card
        class="center copy g4"
        use:copyColourChange
        in:fly={{ y: -5, delay: 100 * i, easing: cubicOut, duration: 500 }}>
        <h3>{title}</h3>
        <p>{value}</p>
    </card>
{/if}

<style>
    .copy {
        cursor: pointer;
    }
</style>
