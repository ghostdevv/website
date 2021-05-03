<script>
    const projects = [
        {
            name: 'Rejxcted',
            link: 'https://rejxcted.dev',
        },
        {
            name: 'Arrow Alerts',
            link: 'https://arrowalerts.co',
        },
        {
            name: 'Mesh Monitors',
            link: 'https://meshmonitors.io',
        },
        {
            name: 'Mesh QT',
            link: 'https://meshmonitors.io/quicktasks',
        },
    ];
</script>

<main>
    <h3>Projects</h3>
    <p>Here are a collection of projects that I have made</p>

    <div class="row fl">
        {#each projects as { name, link }}
            <a href={link} target="_blank">
                <card>
                    <h6>{name}</h6>
                </card>
            </a>
        {/each}
    </div>
</main>

<style lang="scss">
    @import 'style/helpers/media';

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

    a,
    p {
        font-size: 1.7rem;
        color: #eee;
    }

    .fl {
        display: flex;
        justify-content: center;
        flex-flow: row wrap;
        align-items: center;
        flex-basis: 25%;

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
