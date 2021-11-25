<script>
    import CryptoModal from '@/components/CryptoModal.svelte';
    import People from '@/components/donators/People.svelte';
    import { supporters } from '@/data/donators';
</script>

<main>
    <section class="title">
        <h1>🥳 Donate & Support my work</h1>

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
            Patreon
        </a>

        <a
            href="https://paypal.me/ghostdevpayment"
            target="_blank"
            role="button">
            PayPal
        </a>

        <CryptoModal>
            <button slot="activator"> Bitcoin </button>
        </CryptoModal>
    </div>

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

            <People people={supporters.current} />

            <h4>Previous Supporters</h4>

            <People people={supporters.previous} slim />
        </section>
    </section>

    <section class="donators">
        <h1>❤️ Donators</h1>

        <p>
            Below you can view a list of everyone who has donated to me! To get
            on this list checkout my

            <a href="https://paypal.me/ghostdevpayment" target="_blank">
                PayPal
            </a>

            or

            <CryptoModal>
                <a href="#" slot="activator"> Bitcoin </a>
            </CryptoModal>
        </p>
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
