<script>
    import { fly } from 'svelte/transition';

    export let excerpt;
    export let title;
    export let image;
    export let slug;
    export let tag;

    export let delay = 0;
</script>

<a href="/posts/{slug}" class="postcard" in:fly={{ y: -20, delay }}>
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
                color: rgba(var(--text-rgb), 0.5);
            }
        }
    }
</style>
