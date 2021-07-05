<script>
    import Nav from '@/components/Nav.svelte';
</script>

<div class="wrapper column g16">
    <Nav />

    <div class="column g32">
        <slot />
    </div>
</div>

<style lang="scss">
    .wrapper {
        max-width: 1400px;
        margin: 0px auto;

        padding: 0px 32px;
    }
</style>
