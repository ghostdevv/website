<script>
    import SettingsModal from '$lib/components/posts/post/SettingsModal.svelte';
    import Tag from '$lib/components/posts/Tag.svelte';
    import { fly } from 'svelte/transition';

    export let timestamp;
    export let title;
    export let image;
    export let tag;
</script>

<div
    class="meta-wrapper"
    style="--image: url({image})"
    in:fly={{ y: -20, duration: 750 }}>
    <div class="meta">
        <div class="data">
            <Tag {...tag} large />
            <p>{timestamp}</p>
        </div>

        <h1 class="title">{title}</h1>

        <div class="settings">
            <SettingsModal />
        </div>
    </div>
</div>

<style lang="scss">
    @import 'src/lib/helpers/media';

    .meta-wrapper {
        $border-radius: 22px;

        display: flex;
        flex-direction: column;
        gap: 16px;

        align-items: flex-start;
        justify-content: flex-end;

        width: 100%;
        height: 500px;
        max-height: 50vh;

        border-radius: $border-radius;

        background-image: var(--image);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;

        .meta {
            $cp: '<900px';

            width: 100%;
            padding: 22px;

            position: relative;

            display: grid;
            grid-template-columns: 1fr max-content;
            grid-template-rows: max-content 1fr;
            gap: 16px 0px;
            grid-template-areas:
                'data data'
                'title settings';

            background-color: rgba(var(--background-tertiary-rgb), 0.5);
            border-radius: 0 0 $border-radius $border-radius;

            // Re-enable this when/if it's fixed
            // backdrop-filter: blur(8px);

            @include media($cp) {
                grid-template-areas:
                    'data'
                    'title';

                grid-template-columns: 1fr;
                grid-template-rows: max-content max-content;

                justify-items: center;
                align-items: center;
                text-align: center;

                gap: 8px 0px;
            }

            .data {
                display: flex;
                align-items: center;
                gap: 12px;

                grid-area: data;

                @include media($cp) {
                    flex-direction: column;
                }
            }

            .title {
                grid-area: title;
            }

            .settings {
                grid-area: settings;

                @include media($cp) {
                    position: absolute;

                    top: -56px;
                    right: 0;

                    margin: 0px 12px;
                }
            }
        }
    }
</style>
