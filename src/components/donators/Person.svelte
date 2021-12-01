<script>
    export let slim;
    export let monthly;

    export let name;
    export let image;
    export let amount;
</script>

<card class="person" class:slim>
    <img src={image} alt="{name}'s pfp" />

    {#if !slim}
        <hr />
    {/if}

    <h4>{name}</h4>

    {#if !slim}
        <p>£{amount}{monthly ? '/m' : ''}</p>
    {/if}
</card>

<style lang="scss">
    .person {
        display: flex;
        flex-direction: column;

        align-items: center;
        text-align: center;

        img {
            border-radius: 100%;
            max-width: 150px;
        }

        hr {
            border-color: var(--background-secondary);
        }

        &.slim {
            flex-direction: row;
            justify-content: center;

            padding: 18px;

            img {
                max-width: 50px;
            }
        }
    }
</style>
