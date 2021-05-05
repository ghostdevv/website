<script>
    import Main from '@/components/flow/Main.svelte';
    import Row from '@/components/flow/Row.svelte';
    import Col from '@/components/flow/Col.svelte';
    import Spacer from '@/components/flow/Spacer.svelte';
    import LinkCard from '@/components/cards/LinkCard.svelte';

    const projects = [
        {
            name: 'Websites',
            items: [
                {
                    name: 'Rejxcted',
                    link: 'https://rejxcted-site.vercel.app/',
                },
                {
                    name: 'Arrow Alerts',
                    link: 'https://arrowalerts.co',
                },
                {
                    name: 'Mesh Monitors',
                    link: 'https://meshmonitors.io',
                },
                {
                    name: 'Mesh QT',
                    link: 'https://meshmonitors.io/quicktasks',
                },
                {
                    name: 'Robotic Node',
                    link: 'https://archive.ghostdev.xyz/roboticnode/',
                },
            ],
        },
        {
            name: 'Open Source',
            items: [
                {
                    name: 'Routify',
                    link: 'https://routify.dev/',
                },
                {
                    name: 'Svelte Hamburgers',
                    link: 'https://github.com/ghostdevv/svelte-hamburgers'
                },
                {
                    name: 'DashArgs',
                    link: 'https://github.com/ghoststools/dashargs',
                },
                {
                    name: 'SourceBin',
                    link: 'https://github.com/ghoststools/sourcebin',
                },
                {
                    name: 'MyKV',
                    link: 'https://github.com/ghostdevv/mykv'
                },
                {
                    name: 'djs-ticketsystem',
                    link: 'https://github.com/ghoststools/djs-ticketsystem',
                },
                {
                    name: 'Github 1s Button',
                    link: 'https://github.com/ghostdevv/github1s-button',
                },
                {
                    name: 'rollup-obfuscator',
                    link: 'https://github.com/ghoststools/rollup-obfuscator',
                },
                {
                    name: 'linode-object-upload',
                    link: 'https://github.com/ghostdevv/linode-object-upload',
                },
            ],
        },
    ];
</script>

<Main>
    <h3>Projects</h3>
    <p>Here are a collection of projects that I have made or worked on</p>

    <Spacer gap="8" />

    {#each projects as { name, items }}
        <Col>
            <h6>{name}</h6>

            <Row>
                {#each items as { name, link }}
                    <LinkCard url={link}>
                        <h6>{name}</h6>
                    </LinkCard>
                {/each}
            </Row>
        </Col>
    {/each}
</Main>
