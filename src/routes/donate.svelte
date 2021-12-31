<script context="module">
    export const prerender = true;
</script>

<script>
    import { faPatreon, faPaypal } from '@fortawesome/free-brands-svg-icons';
    import { faBitcoin } from '@fortawesome/free-brands-svg-icons';
    import CryptoModal from '$lib/components/CryptoModal.svelte';
    import People from '$lib/components/donators/People.svelte';
    import { supporters, donators } from '$lib/data/donators';
    import { faBolt } from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa';
</script>

<main>
    <section class="title">
        <h1>🥳 Donate & Support my workASD</h1>

        <p>
            Thanks for taking an interest in my work! I currently work part time
            to support myself and the rest on open source. With your help soon I
            will be able to work on open source full time! Below you can view my
            current supporters and donators and how to become one!
        </p>
    </section>

    <div class="buttons">
        <a
            href="https://www.patreon.com/onlyspaceghost"
            target="_blank"
            role="button">
            <Fa icon={faPatreon} /> Patreon
        </a>

        <a
            href="https://paypal.me/ghostdevpayment"
            target="_blank"
            role="button">
            <Fa icon={faPaypal} /> PayPal
        </a>

        <CryptoModal>
            <button slot="activator">
                <Fa icon={faBitcoin} /> Bitcoin
            </button>
        </CryptoModal>

        <a
            href="https://tippin.me/@onlyspaceghost"
            target="_blank"
            role="button">
            <Fa icon={faBolt} /> BTC Lightning
        </a>
    </div>

    <hr />

    <section class="supporters">
        <h1>🎉 Supporters</h1>

        <p>
            Below you can view a list of my present and past supporters! To get
            on this list checkout my

            <a href="https://www.patreon.com/onlyspaceghost" target="_blank">
                Patreon
            </a>
        </p>

        <section style="gap: 22px;">
            <h3>Current Supporters</h3>

            <People people={supporters.current} monthly />

            <h4>Past Supporters</h4>

            <People people={supporters.past} slim monthly />
        </section>
    </section>

    <hr />

    <section class="donators" style="gap: 22px;">
        <h1>❤️ Donators</h1>

        <p>
            Below you can view a list of everyone who has donated to me! To get
            on this list checkout my

            <a href="https://paypal.me/ghostdevpayment" target="_blank">
                PayPal
            </a>
            ,

            <CryptoModal>
                <a href="#" slot="activator"> Bitcoin </a>
            </CryptoModal>

            , or

            <a href="https://tippin.me/@onlyspaceghost" target="_blank">
                BTC Lightning
            </a>
        </p>

        <People people={donators} />
    </section>
</main>

<style lang="scss">
    main {
        width: 100%;

        display: flex;
        flex-direction: column;

        gap: 32px;

        align-items: center;
        text-align: center;

        .title {
            max-width: 800px;
        }

        .buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;

            justify-content: center;
            align-items: center;
        }

        section {
            display: flex;
            flex-direction: column;
            gap: 16px;

            align-items: center;
            text-align: center;
        }
    }
</style>
