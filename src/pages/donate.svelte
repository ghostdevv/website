<script>
    const patrons = [
        {
            name: 'Alfie',
            image: 'alfie.png',
        },
    ];
</script>

<main>
    <h3>Donate</h3>
    <p>
        Here are all the places you can donate, thank you so much for helping
        out 💕
    </p>

    <div class="row fl">
        <a
            class="clear"
            href="https://patreon.com/onlyspaceghost"
            target="_blank">
            <card>
                <h6>Patreon</h6>
                <p>Click to go to my patreon</p>
            </card></a>

        <card>
            <h6>PayPal</h6>
            <p><a href="/contact">Contact me</a> to donate this way</p>
        </card>
    </div>

    <div class="spacer" />

    <h3>Patrons</h3>

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
</main>

<style lang="scss">
    @import 'style/helpers/media';

    .spacer {
        padding: 16px 0px;
    }

    .patrons {
        ul {
            display: flex;
            flex-flow: column nowrap;
        }

        li {
            font-size: 2.5rem;

            display: flex;
            align-items: center;

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
                background-color: #eee;
            }
        }
    }

    main {
        padding: 32px 8px;

        display: flex;
        flex-flow: column nowrap;
        align-items: center;

        .row {
            width: 100%;
            padding: 8px 0px;

            display: flex;
            justify-content: center;
            flex-flow: row wrap;
            align-items: center;
        }
    }

    a.clear,
    p {
        font-size: 1.7rem;
        color: #eee;
    }

    .fl {
        card {
            box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.1);
            background-color: #2b2d30;
            border: 2px solid #2b2d30;
            padding: 32px;
            margin: 8px;
            border-radius: 16px;
            min-width: 500px;
            max-width: 750px;

            cursor: pointer;

            transition: 0.2s ease-in-out;

            @include media('<1000px') {
                min-width: 300px;
            }

            @include media('<640px') {
                max-width: none;
                width: 100%;
            }

            > * {
                margin: 2px 0px;
            }

            text-align: center;

            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            justify-content: center;
            align-self: stretch;

            &:hover {
                transform: translateY(-5px);
                border: 2px solid #3d5cf1;
            }
        }
    }
</style>
