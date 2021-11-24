<script>
    import SettingsModal from '@/components/posts/post/SettingsModal.svelte';
    import { fontSize } from '@/components/posts/post/settings';
    import Tag from '@/components/posts/Tag.svelte';
    import { format } from 'date-fns';
    import { marked } from 'marked';
    import purify from 'dompurify';

    export let timestamp;
    export let title;
    export let image;
    export let body;
    export let tag;

    const bodyHTML = purify.sanitize(marked(body));
</script>

<article>
    <div class="meta-wrapper" style="--image: url({image})">
        <div class="meta">
            <div class="data">
                <Tag {...tag} large />
                <p>{format(new Date(timestamp), 'do LLLL yyyy')}</p>
            </div>

            <h1 class="title">{title}</h1>

            <div class="settings">
                <SettingsModal />
            </div>
        </div>
    </div>

    <hr />

    <div class="body" style="--font-size: {$fontSize}px">
        {@html bodyHTML}
    </div>
</article>

<style lang="scss">
    article {
        width: 100%;

        display: flex;
        flex-direction: column;
        gap: 16px;

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
                width: 100%;
                padding: 22px;

                display: grid;
                grid-template-columns: 1fr max-content;
                grid-template-rows: max-content 1fr;
                gap: 16px 0px;
                grid-template-areas:
                    'data data'
                    'title settings';

                background-color: rgba(var(--background-tertiary-rgb), 0.5);
                border-radius: 0 0 $border-radius $border-radius;

                backdrop-filter: blur(8px);

                .data {
                    display: flex;
                    align-items: center;
                    gap: 12px;

                    grid-area: data;
                }

                .title {
                    grid-area: title;
                }

                .settings {
                    grid-area: settings;
                }
            }
        }

        .body {
            max-width: 100%;

            display: flex;
            flex-direction: column;
            gap: 16px;

            font-size: var(--font-size, 16px);
        }
    }
</style>
