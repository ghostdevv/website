<script lang="ts">
    let dialog: HTMLDialogElement;

    function close() {
        dialog.close();
    }

    function open() {
        dialog.showModal();
    }
</script>

<button on:close={close} on:click={open}>
    <slot name="activator" />
</button>

<dialog bind:this={dialog}>
    <slot {close} />
</dialog>

<style lang="scss">
    @import 'src/lib/media';

    button {
        display: contents;
    }

    dialog {
        background: transparent;
        border: none;

        width: min(80%, 600px);

        @include media('<600px') {
            min-width: 90%;
        }

        &::backdrop {
            // todo replace with var(--background-primary-rgb) when supported
            background: rgba(18, 18, 20, 0.8);
        }
    }
</style>
