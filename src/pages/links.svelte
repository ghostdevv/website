<script>
    import Main from '@/components/flow/Main.svelte';
    import Row from '@/components/flow/Row.svelte';
    import LinkCard from '@/components/cards/LinkCard.svelte';
</script>

<Main>
    <h3>Links</h3>
    <p>All relevant and interesting links</p>

    <Row>
        <LinkCard url="/contact" external={false}>
            <h6>Contact</h6>
        </LinkCard>

        <LinkCard url="/donate" external={false}>
            <h6>Donate</h6>
        </LinkCard>

        <LinkCard url="https://github.com/ghostdevv" external={false}>
            <h6>Github</h6>
        </LinkCard>

        <LinkCard url="/projects" external={false}>
            <h6>Projects</h6>
        </LinkCard>
    </Row>
</Main>
