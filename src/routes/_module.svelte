<script>
    import Nav from '@/components/Nav.svelte';
</script>

<Nav />

<div class="wrapper column g16">
    <div class="column g32 main">
        <slot />
    </div>
</div>

<style lang="scss">
    .wrapper {
        max-width: 1400px;
        margin: 0px auto;

        padding: 0px 32px;

        .main {
            padding-top: 156px;
        }
    }
</style>
