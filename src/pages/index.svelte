<main>
    <div class="logo row">
        <img
            src="https://resources.ghbox.io/ghost/avatar.png"
            alt="GHOSTs pfp" />
        <p>Fullstack Web Developer, Open Source enthusiast, and Code lover.</p>
    </div>
    <div class="cards row">
        <card>
            <h6>Github</h6>
            <p>
                Most of what I do is on github, including
                <a href="https://github.com/ghostdevv/website">this website</a>!
                I have both private and open source projects on there. The
                opensource projects I created can be found on
                <a href="https://github.com/ghoststools">GHOSTs Tools</a>
                and
                <a href="https://github.com/ghostdevv">my github page</a>. I
                contribute to others projects too, the main being
                <a href="https://github.com/roxiness/routify">Routify</a>.
            </p>
            <div class="grow">
                <a
                    href="https://github.com/ghostdevv"
                    target="_blank"
                    class="button">Visit my github page</a>
            </div>
        </card>
        <card>
            <h6>Discord</h6>
            <p>
                Everything I do is somehow involved with Discord 😅. My main
                public server is called
                <a href="https://discord.gg/2Vd4wAjJnm">The Dev Lounge</a>, it's
                a server for developers to talk and get help with their code. I
                also spend a lot of time in
                <a href="https://discord.gg/PGjpCxnTMs">The Routify Discord</a>
                which is a great place for people to get help and talk about Routify
                amoungst other things.
            </p>
            <div class="grow">
                <a
                    href="https://discord.gg/2Vd4wAjJnm"
                    target="_blank"
                    class="button">Join my Discord</a>
            </div>
        </card>
        <card>
            <h6>Development</h6>
            <p>
                I work as a freelance full stack web developer, and do open
                source projects part time. I mainly CMS or SaaS platforms for
                clients but also create static websites. I use <a
                    href="https://svelte.dev">Svelte</a>
                to create amazing web apps, I write all custom css, and use
                <a href="https://routify.dev">Routify</a> as a router. I also own
                a web development business that is close to public release!
            </p>
            <div class="grow">
                <a href="/contact" class="button">Hire me!</a>
            </div>
        </card>
    </div>

    <div class="cards row contact">
        <card class="fc">
            <a href="/contact" class="button">Contact Me</a>
            <a href="/donate" class="button">Donate</a>
        </card>
    </div>
</main>

<style lang="scss">
    @import 'style/helpers/media';

    .grow {
        flex-grow: 1;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
    }

    main {
        padding: 32px 0px;

        display: flex;
        flex-flow: column nowrap;
        justify-content: center;

        .row {
            width: 100%;
            padding: 8px 0px;
        }
    }

    .logo {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;

        text-align: center;

        padding: 8px 0px;

        > * {
            margin: 4px 0px;
        }

        img {
            max-width: 100px;
        }
    }

    .cards {
        display: flex;
        flex-basis: 33%;
        flex-flow: row wrap;
        align-items: center;
        justify-content: center;

        &.contact card {
            min-width: 750px;
            transition: 0.2s ease-in-out;

            @include media('<750px') {
                min-width: 600px;
            }

            @include media('<600px') {
                min-width: 500px;
            }

            @include media('<500px') {
                min-width: calc(100% - 16px);
            }
        }

        card {
            box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.1);
            background-color: #2b2d30;
            border: 2px solid #2b2d30;
            padding: 32px;
            margin: 8px;
            border-radius: 16px;
            min-width: 100px;
            max-width: 500px;

            text-align: center;

            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            justify-content: center;
            align-self: stretch;

            > * {
                margin: 8px 0px;
            }

            transition: 0.2s ease-in-out;

            &:hover {
                transform: translateY(-5px);
                border: 2px solid #3d5cf1;
            }

            &.fc {
                flex-direction: row;
                justify-content: center;
                align-items: center;

                > * {
                    margin: 0px 8px;
                }
            }
        }
    }
</style>
