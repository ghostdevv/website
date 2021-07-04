<script>
    import Main from '@/components/flow/Main.svelte';
    import Row from '@/components/flow/Row.svelte';
    import LinkCard from '@/components/cards/LinkCard.svelte';
</script>

<Main>
    <h1>Links</h1>
    <p>All relevant and interesting links</p>

    <Row>
        <LinkCard url="/contact" external={false}>
            <h4>Contact</h4>
        </LinkCard>

        <LinkCard url="/donate" external={false}>
            <h4>Donate</h4>
        </LinkCard>

        <LinkCard url="https://github.com/ghostdevv" external={false}>
            <h4>Github</h4>
        </LinkCard>

        <LinkCard url="/projects" external={false}>
            <h4>Projects</h4>
        </LinkCard>
    </Row>
</Main>
