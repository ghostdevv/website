<script lang="ts">
    import { tags } from '$data/tags';

    export let name: keyof typeof tags;
    export let large = false;
</script>

<span class="tag" style="--tag-colour: {tags[name]}" class:large>
    {name}
</span>

<style lang="scss">
    .tag {
        background-color: rgba(var(--tag-colour), 0.5);
        color: rgba(var(--tag-colour));

        border-radius: 16px;

        padding: 4px 16px;
        font-size: 11px;
        font-weight: 800;

        height: fit-content;
        width: fit-content;

        text-transform: uppercase;

        &.large {
            font-size: 0.85rem;
            padding: 6px 22px;
        }
    }
</style>
