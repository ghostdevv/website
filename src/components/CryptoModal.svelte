<script>
    import { onDestroy } from 'svelte';
    import { Modal } from 'polykit';
    import kjua from 'kjua';

    const btc = '19htGt434Q4EyhZrbNCRtkobmSqL7j6kuX';

    let addressFieldValue = btc;

    const clickToCopy = (node) => {
        let timeout;

        node.addEventListener('click', () => {
            node.focus();
            node.setSelectionRange(0, btc + 1);

            try {
                navigator.clipboard.writeText(btc);

                if (timeout) clearTimeout(timeout);

                addressFieldValue = 'Copied!';

                timeout = setTimeout(() => {
                    addressFieldValue = btc;
                }, 1500);
            } catch {
                alert('Failed to copy, please manually copy the BTC address');
            }
        });

        onDestroy(() => clearTimeout(timeout));
    };

    const qr = (node) => {
        node.appendChild(
            kjua({
                crisp: true,
                render: 'svg',
                ecLevel: 'M',
                size: 225,
                back: 'var(--background-tertiary',
                fill: 'var(--text)',
                text: btc,
            }),
        );
    };
</script>

<Modal let:close>
    <div slot="activator">
        <slot name="activator" />
    </div>

    <card class="no-hover modal">
        <h2>Bitcoin</h2>

        <div class="qr" use:qr />

        <input
            type="text"
            class="address"
            value={addressFieldValue}
            use:clickToCopy
            readonly />

        <p>
            Thank you for sending me some BTC! If you want your name to be on
            the donations page please <a href="/contact">contact me</a> on discord
            and I will add you
        </p>

        <button on:click={close}> Close </button>
    </card>
</Modal>

<style lang="scss">
    .modal {
        display: flex;
        flex-direction: column;
        gap: 24px;

        align-items: center;
        text-align: center;

        .qr {
            border: 4px solid var(--primary);
            border-radius: 22px;
            padding: 22px;
        }

        .address {
            background-color: var(--background-secondary);
            text-align: center;
        }
    }
</style>
