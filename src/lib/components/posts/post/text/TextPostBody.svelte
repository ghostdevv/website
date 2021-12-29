<script>
    import { fontSize } from '$lib/components/posts/post/settings';
    import { fly } from 'svelte/transition';

    export let body;
</script>

<div
    class="body"
    style="--font-size: {$fontSize}px"
    in:fly={{ y: -20, duration: 750, delay: 100 }}>
    {@html body}
</div>

<style lang="scss">
    .body {
        max-width: 100%;

        display: flex;
        flex-direction: column;
        gap: 16px;

        font-size: var(--font-size, 16px);

        :global(pre) {
            width: 100%;
            overflow-x: auto;

            padding: 22px;
            border-radius: 16px;
        }
    }
</style>
