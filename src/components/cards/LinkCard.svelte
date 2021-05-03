<script>
    import Card from './Card.svelte';
    export let url;
</script>

<a href={url} target="_blank">
    <Card>
        <slot />
    </Card>
</a>

<style lang="scss">
    a {
        font-size: 1.7rem;
        color: #eee;
    }
</style>
