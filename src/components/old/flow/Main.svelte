<main>
    <slot />
</main>

<style lang="scss">
    main {
        padding: 32px 8px;

        display: flex;
        flex-flow: column nowrap;
        align-items: center;

        .row {
            width: 100%;
            padding: 8px 0px;
        }
    }
</style>
