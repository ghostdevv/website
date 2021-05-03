<script>
    import Main from '@/components/flow/Main.svelte';
    import Row from '@/components/flow/Row.svelte';
    import CopyCard from '@/components/cards/CopyCard.svelte';
</script>

<Main>
    <h3>Contact Me</h3>
    <p>Click a card to copy the contact info</p>

    <Row>
        <CopyCard value="GHOST#7524">
            <h6>Discord</h6>
            <p>GHOST#7524</p>
        </CopyCard>
        <CopyCard value="ghostdevbusiness@gmail.com">
            <h6>Email</h6>
            <a href="mailto:ghostdevbusiness@gmail.com"
                >ghostdevbusiness@gmail.com</a>
        </CopyCard>
        <CopyCard value="https://discord.gg/2Vd4wAjJnm">
            <h6>The Dev Lounge</h6>
            <a href="https://discord.gg/2Vd4wAjJnm"
                >https://discord.gg/2Vd4wAjJnm</a>
        </CopyCard>
    </Row>
</Main>

<style>
    a {
        font-size: 1.7rem;
        color: #eee;
    }
</style>
