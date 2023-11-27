<script lang="ts">
    import { type Tag, tags, tagColours } from '$data/tags';

    let { selectedTag } = $props<{ selectedTag: Tag | 'all' }>();
</script>

<div class="filter">
    <a
        href="/posts"
        class="button option"
        style="--colour: var(--primary);"
        class:selected={selectedTag == 'all'}>
        All
    </a>

    {#each tags as tag}
        <a
            href="/posts/tag/{tag}"
            style:--colour="rgb({tagColours[tag]})"
            class="button option"
            class:selected={tag == selectedTag}>
            {tag}
        </a>
    {/each}
</div>

<style lang="scss">
    .filter {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 16px;

        margin-bottom: 28px;
    }

    .option {
        text-transform: capitalize;
        font-weight: 600;
        padding: 12px 16px;

        background-color: transparent;
        border-color: var(--colour);

        transition:
            border-color 0.2s ease-in-out,
            background-color 0.2s ease-in-out opacity 0.2s ease-in-out;

        opacity: 0.6;

        &:hover:not(&:disabled),
        &:focus:not(&:disabled),
        &.selected {
            opacity: 1;
            background-color: var(--colour);
            border-color: var(--colour);
        }
    }
</style>
