<script>
    import { fly } from 'svelte/transition';

    export let image;
    export let slug;
    export let tag;
    export let title;

    export let delay = 0;
</script>

<article in:fly={{ y: -20, delay }}>
    <img class="image" src={image} alt="Pog" />

    <div class="details">
        <span
            class="tag"
            style="--tag-colour: {tag.rgb.r}, {tag.rgb.g}, {tag.rgb.b}">
            {tag.name}
        </span>

        <h4 class="title">{title}</h4>

        <p class="description">
            {excerpt}
        </p>
    </div>
</article>

<style lang="scss">
    article {
        $borderRadius: 12px;

        display: flex;
        flex-direction: column;
        gap: 0px;

        width: 325px;
        max-width: 520px;

        background-color: var(--background-secondary);
        border-radius: $borderRadius;

        flex-grow: 1;

        .image {
            width: 100%;
            height: auto;

            border-radius: $borderRadius $borderRadius 0px 0px;
        }

        .details {
            display: flex;
            flex-direction: column;
            gap: 4px;

            .tag {
                margin-bottom: 4px;
            }

            padding: 18px;

            .tag {
                background-color: rgba(var(--tag-colour), 0.5);
                color: rgba(var(--tag-colour));

                border-radius: 16px;

                padding: 4px 16px;
                font-size: 11px;
                font-weight: 800;

                height: fit-content;
                width: fit-content;
            }

            .description {
                color: rgba(var(--text-rgb), 0.6);
            }
        }
    }
</style>
