<script>
    import Person from './Person.svelte';

    export let people;

    export let monthly = false;
    export let slim = false;
</script>

<div class="people">
    {#each people as person}
        <Person {...person} {slim} {monthly} />
    {/each}
</div>

<style lang="scss">
    .people {
        display: flex;
        flex-wrap: wrap;

        gap: 12px;
    }
</style>
