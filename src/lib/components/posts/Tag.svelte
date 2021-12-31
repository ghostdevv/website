<script>
    export let name;
    export let rgb;

    export let large = false;
</script>

<span class="tag" style="--tag-colour: {rgb.r}, {rgb.g}, {rgb.b}" class:large>
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

        &.large {
            font-size: 0.85rem;
            padding: 6px 22px;
        }
    }
</style>
