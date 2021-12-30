<script>
    import { fontSize, codeTheme } from './settings';
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

        <div class="input-group">
            <label for="code-block-theme"> Code Block Theme</label>

            <select
                style="background-color: var(--background-secondary)"
                id="code-block-theme"
                bind:value={$codeTheme}>
                <option value="dark-plus">Dark Plus</option>
                <option value="dracula-soft">Dracula Soft</option>
                <option value="dracula">Dracula</option>
                <option value="github-dark-dimmed"> Github Dark Dimmed </option>
                <option value="github-dark">Github Dark</option>
                <option value="material-darker">Material Darker</option>
                <option value="material-default">Material Default</option>
                <option value="material-ocean">Material Ocean</option>
                <option value="material-palenight"> Material Palenight </option>
                <option value="min-dark">Min Dark</option>
                <option value="monokai">Monokai</option>
                <option value="nord">Nord</option>
                <option value="one-dark-pro">One Dark Pro</option>
                <option value="poimandres">Poimandres</option>
            </select>
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
