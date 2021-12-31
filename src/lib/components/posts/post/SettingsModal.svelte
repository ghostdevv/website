<script>
    import { fontSize } from './settings';
    import { Modal } from 'polykit';
</script>

<Modal let:close>
    <button slot="activator">
        <i class="fas fa-cog" />
    </button>

    <card class="no-hover modal">
        <h1>Post Settings</h1>

        <div class="input-group">
            <label for="fontSize">Post Font Size: {$fontSize}px</label>

            <input
                id="fontSize"
                type="range"
                min="14"
                max="28"
                bind:value={$fontSize} />
        </div>

        <button on:click={close}>Close</button>
    </card>
</Modal>

<style lang="scss">
    @import 'src/lib/helpers/media';

    .input-group {
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
    }

    .modal {
        display: flex;
        flex-direction: column;
        gap: 16px;

        @include media('<900px') {
            align-items: center;
            text-align: center;
        }
    }
</style>
