<script>
    import App from '@/App.svelte';
    import { fly } from 'svelte/transition';
    import Tag from '../Tag.svelte';

    export let postType;
    export let excerpt;
    export let title;
    export let image;
    export let link;
    export let slug;
    export let tag;

    export let delay = 0;

    $: href = postType == 'text' ? `/posts/${slug}` : link;
</script>

<a
    {href}
    class="postcard"
    in:fly={{ y: -30, delay, duration: 750, opacity: 0 }}>
    <img class="image" src={image.url} alt="Pog" />

    <div class="details">
        <Tag {...tag} />

        <h4 class="title">{title}</h4>

        <p class="description">
            {excerpt}
        </p>
    </div>
</a>

<style lang="scss">
    .postcard {
        $borderRadius: 12px;

        display: flex;
        flex-direction: column;
        gap: 0px;

        width: 325px;
        max-width: 520px;

        color: var(--text);
        background-color: var(--background-secondary);
        border-radius: $borderRadius;

        flex-grow: 1;

        transition: box-shadow 0.2s ease-in-out;

        &:hover,
        &:active,
        &:focus {
            text-decoration: none;
            box-shadow: 0 0 0 transparent, 0 0 0 5px var(--primary);
        }

        .image {
            min-width: 100%;
            width: auto;
            height: 200px;

            object-fit: cover;

            border-radius: $borderRadius $borderRadius 0px 0px;
        }

        .details {
            display: flex;
            flex-direction: column;
            gap: 6px;

            padding: 18px;

            .description {
                color: rgba(var(--text-rgb), 0.5);
            }
        }
    }
</style>
