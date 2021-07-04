<script>
    import Card from './Card.svelte';
    export let url;
    export let external = true;
</script>

<a href={url} target={external ? '_blank' : ''}>
    <Card>
        <slot />
    </Card>
</a>

<style lang="scss">
    a {
        font-size: 1.2rem;
        color: var(--text);
    }
</style>
