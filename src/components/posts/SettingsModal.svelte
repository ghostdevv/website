<script>
    import { faCog } from '@fortawesome/free-solid-svg-icons';
    import { fontSize, lineHeight } from './settings';
    import { mounted } from 'svelte-mount';
    import { Modal } from 'polykit';
    import Fa from 'svelte-fa';

    $: if ($mounted && ($fontSize || $lineHeight)) {
        console.log('asd');

        document.documentElement.style.setProperty(
            '--post-font-size',
            `${$fontSize}px`,
        );

        document.documentElement.style.setProperty(
            '--post-line-height',
            $lineHeight,
        );
    }
</script>

<Modal let:close>
    <button slot="activator">
        <Fa icon={faCog} />
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
            <label for="lineHeight">Post Line Height: {$lineHeight}</label>

            <input
                id="lineHeight"
                type="range"
                min="0.5"
                max="2.5"
                step="0.1"
                bind:value={$lineHeight} />
        </div>

        <button on:click={close}>Close</button>
    </card>
</Modal>

<style lang="scss">
    @import 'src/helpers/media';

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
