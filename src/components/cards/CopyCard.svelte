<script>
    export let value;

    function copy(e) {
        navigator.clipboard.writeText(value);

        const target = e.path.find((p) => p.localName == 'card');

        target.style.borderColor = 'var(--green)';
        setTimeout(() => (target.style.borderColor = ''), 700);
    }
</script>

<card on:click={copy}>
    <slot />
</card>

<style lang="scss">
    @import 'style/ui/card';
</style>
