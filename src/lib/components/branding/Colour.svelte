<script lang="ts">
    import type { Colour } from '$data/colours';
    import { copy } from 'svelte-copy';

    let { colour } = $props<{ colour: Colour }>();

    let timeout = $state<ReturnType<typeof setTimeout> | null>(null);
    let copying = $state(false);

    let [name, hex, textColour] = $derived(colour);

    function onCopy() {
        if (timeout) {
            clearTimeout(timeout);
        }

        copying = true;

        timeout = setTimeout(() => {
            copying = false;
        }, 1500);
    }
</script>

<button
    class="colour"
    data-hex={hex}
    style:--hex={hex}
    style:--text={textColour}
    on:svelte-copy={onCopy}
    use:copy={hex}>
    <h4 class="name">{copying ? 'Copied!' : name}</h4>
    <p class="hex">{hex}</p>
</button>

<style lang="scss">
    .colour {
        background-color: var(--hex);
        color: var(--text);

        padding: 22px;
        border-radius: 12px;

        cursor: pointer;

        width: 250px;
        height: 120px;

        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        gap: 4px;

        border: none;

        transition: opacity 0.2s ease-in-out;

        &:hover:not(&:disabled),
        &:focus:not(&:disabled) {
            background-color: var(--hex);
            opacity: 0.6;
        }
    }
</style>
