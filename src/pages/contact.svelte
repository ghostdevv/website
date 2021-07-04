<script>
    import Main from '@/components/flow/Main.svelte';
    import Row from '@/components/flow/Row.svelte';
    import CopyCard from '@/components/cards/CopyCard.svelte';
</script>

<Main>
    <h1>Contact Me</h1>
    <p>Click a card to copy the contact info</p>

    <Row>
        <CopyCard value="GHOST#7524">
            <h4>Discord</h4>
            <p>GHOST#7524</p>
        </CopyCard>
        <CopyCard value="ghostdevbusiness@gmail.com">
            <h4>Email</h4>
            <a href="mailto:ghostdevbusiness@gmail.com"
                >ghostdevbusiness@gmail.com</a>
        </CopyCard>
        <CopyCard value="https://discord.gg/2Vd4wAjJnm">
            <h4>The Dev Lounge</h4>
            <a href="https://discord.gg/2Vd4wAjJnm"
                >https://discord.gg/2Vd4wAjJnm</a>
        </CopyCard>
    </Row>
</Main>

<style>
    a {
        font-size: 1.2rem;
        color: #eee;
    }
</style>
