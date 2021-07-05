<script>
    import Nav from '@/components/Nav.svelte';
</script>

<div class="wrapper">
    <Nav />

    <slot />
</div>

<style lang="scss">
    @use 'style/flow/general';

    .wrapper {
        max-width: 1400px;
        margin: 0px auto;

        @include general.column;

        gap: 16px;
    }
</style>
