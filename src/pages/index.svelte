<main>
    <div class="logo row">
        <img
            src="https://resources.ghbox.io/ghost/avatar.png"
            alt="GHOSTs pfp" />
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
            <a
                href="https://github.com/ghostdevv"
                target="_blank"
                class="button mt">Visit my github page</a>
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
            <a
                href="https://discord.gg/2Vd4wAjJnm"
                target="_blank"
                class="button mt">Join my Discord</a>
        </card>
        <card>
            <h6>Lorem</h6>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                feugiat nibh quis lectus iaculis, sed viverra erat eleifend.
                Etiam in felis luctus, elementum lacus et, commodo sapien.
                Aenean varius eget justo id vehicula. Mauris condimentum, ligula
                sit amet porta feugiat, turpis neque facilisis dui, quis dictum
                urna odio sed orci.
            </p>
        </card>
    </div>
</main>

<style lang="scss">
    .mt {
        margin-top: 16px;
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
        justify-content: center;

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

        card {
            box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.1);
            background-color: #2b2d30;
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
                padding: 6px 0px;
            }

            transition: 0.2s ease-in-out;

            &:hover {
                transform: translateY(-5px);
            }
        }
    }
</style>
