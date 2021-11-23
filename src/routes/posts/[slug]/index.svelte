<script>
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
    <!-- <img class="image-banner" src={image} alt="Post Banner" /> -->

    <div class="meta-wrapper" style="--image: url({image})">
        <div class="meta">
            <div class="data">
                <Tag {...tag} large />
                <p>{format(new Date(timestamp), 'do LLLL yyyy')}</p>
            </div>

            <h1 class="title">{title}</h1>
        </div>
    </div>

    <hr />

    <div class="body">
        {@html bodyHTML}
    </div>
</article>

<style lang="scss">
    article {
        width: 100%;

        display: flex;
        flex-direction: column;
        gap: 16px;

        .image-banner {
            width: 100%;
            height: 400px;
            max-height: 40vh;

            aspect-ratio: 16 / 9;

            object-fit: cover;
        }

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
                display: flex;
                flex-direction: column;
                gap: 16px;

                width: 100%;
                padding: 22px;

                background-color: rgba(var(--background-tertiary-rgb), 0.5);
                border-radius: 0 0 $border-radius $border-radius;

                backdrop-filter: blur(8px);

                .data {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
            }
        }

        .body {
            max-width: 100%;

            display: flex;
            flex-direction: column;
            gap: 16px;

            font-size: 18px;
        }
    }
</style>
