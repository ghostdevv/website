<script>
    import Main from '@/components/flow/Main.svelte';
    import Row from '@/components/flow/Row.svelte';
    import Spacer from '@/components/flow/Spacer.svelte';

    import LinkCard from '@/components/cards/LinkCard.svelte';
    import Card from '@/components/cards/Card.svelte';

    const patrons = [];
</script>

<Main>
    <h1>Donate</h1>
    <p>
        Here are all the places you can donate, thank you so much for helping
        out 💕
    </p>

    <Row>
        <LinkCard url="https://patreon.com/onlyspaceghost">
            <h4>Patreon</h4>
            <p>Click to go to my patreon</p>
        </LinkCard>

        <Card>
            <h4>PayPal</h4>
            <p><a href="/contact">Contact me</a> to donate this way</p>
        </Card>
    </Row>

    <Spacer />

    <h1>Patrons</h1>

    <div class="row patrons">
        <ul>
            {#each patrons as { name, image }}
                <li>
                    <img src="/images/patrons/{image}" alt="{name}'s pfp" />
                    {name}
                </li>
            {/each}
        </ul>
    </div>
</Main>

<style lang="scss">
    @import 'style/helpers/media';

    .patrons {
        ul {
            display: flex;
            flex-flow: column nowrap;
        }

        li {
            font-size: 1.6rem;

            display: flex;
            align-items: center;
            padding: 6px 0px;

            img {
                width: 50px;
                border-radius: 100%;

                margin-right: 12px;
            }

            &::before {
                display: inline-block;
                content: '';

                border-radius: 100%;
                height: 6px;
                width: 6px;
                margin-right: 12px;
                background-color: var(--text);
            }
        }
    }

    p {
        font-size: 1.2rem;
        color: var(--text);
    }
</style>
