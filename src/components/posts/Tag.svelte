<script>
    export let name;
    export let rgb;
</script>

<span class="tag" style="--tag-colour: {rgb.r}, {rgb.g}, {rgb.b}">
    {name}
</span>

<style>
    .tag {
        background-color: rgba(var(--tag-colour), 0.5);
        color: rgba(var(--tag-colour));

        border-radius: 16px;

        padding: 4px 16px;
        font-size: 11px;
        font-weight: 800;

        height: fit-content;
        width: fit-content;

        margin-bottom: 4px;
    }
</style>
