<script>
    import { metatags } from '@roxi/routify';
    metatags.title = 'GHOST - Contact';

    function copy(e, value) {
        navigator.clipboard.writeText(value);

        const target = e.path.find((p) => p.localName == 'card');

        target.style.borderColor = '#67c157';
        setTimeout(() => (target.style.borderColor = '#2b2d30'), 700);
    }
</script>

<main>
    <h3>Contact Me</h3>
    <p>Click a card to copy the contact info</p>

    <div class="row contact">
        <card on:click={(e) => copy(e, 'GHOST#7524')}>
            <h6>Discord</h6>
            <p>GHOST#7524</p>
        </card>
        <card on:click={(e) => copy(e, 'ghostdevbusiness@gmail.com')}>
            <h6>Email</h6>
            <a href="mailto:ghostdevbusiness@gmail.com"
                >ghostdevbusiness@gmail.com</a>
        </card>
        <card on:click={(e) => copy(e, 'https://discord.gg/2Vd4wAjJnm')}>
            <h6>The Dev Lounge</h6>
            <a href="https://discord.gg/2Vd4wAjJnm"
                >https://discord.gg/2Vd4wAjJnm</a>
        </card>
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
            width: 80%;
            padding: 8px 0px;

            @include media('<1300px') {
                width: 100%;
            }
        }
    }

    a,
    p {
        font-size: 1.7rem;
    }

    .contact {
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
