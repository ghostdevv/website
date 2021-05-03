<script>
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

    <div class="row fl">
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
    @import 'style/ui/page';
</style>
