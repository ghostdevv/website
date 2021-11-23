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
    <img class="image-banner" src={image} alt="Post Banner" />

    <div class="meta">
        <Tag {...tag} large />
        <p>{format(new Date(timestamp), 'do LLLL yyyy')}</p>
    </div>

    <h1 class="title">{title}</h1>

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

            aspect-ratio: auto;

            padding: 6px 0px;
            border-radius: 22px;

            object-fit: cover;
        }

        .meta {
            display: flex;
            align-items: center;
            gap: 12px;
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
