<script lang="ts">
    import { tags } from '$data/tags';

    export let selectedTag: keyof typeof tags | 'all';
</script>

<div class="filter">
    <a
        href="/posts"
        class="button option"
        style="--colour: var(--primary);"
        class:selected={'all' == selectedTag}>
        All
    </a>

    {#each Object.entries(tags) as [tag, colour]}
        <a
            href="/posts/tag/{tag}"
            style:--colour="rgb({colour})"
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
        gap: 16px;

        margin-bottom: 28px;
    }

    .option {
        text-transform: capitalize;
        font-weight: 600;
        padding: 12px 16px;

        background-color: transparent;
        border-color: var(--colour);

        transition: border-color 0.2s ease-in-out,
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
