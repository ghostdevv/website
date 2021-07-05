<script>
    import Nav from '@/components/Nav.svelte';
</script>

<div class="wrapper">
    <Nav />

    <slot />
</div>

<style>
    .wrapper {
        max-width: 1400px;
        margin: 0px auto;
    }
</style>
