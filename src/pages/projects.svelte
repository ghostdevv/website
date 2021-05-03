<script>
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
                    link: 'https://archive.ghostdev.xyz/roboticnode/'
                }
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
                    name: 'DashArgs',
                    link: 'https://github.com/ghoststools/dashargs',
                },
                {
                    name: 'SourceBin',
                    link: 'https://github.com/ghoststools/sourcebin',
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

<main>
    <h3>Projects</h3>
    <p>Here are a collection of projects that I have made or worked on</p>

    <div class="spacer" />

    {#each projects as { name, items }}
        <div class="project-row">
            <h6>{name}</h6>
            <div class="row fl">
                {#each items as { name, link }}
                    <a href={link} target="_blank">
                        <card>
                            <h6>{name}</h6>
                        </card>
                    </a>
                {/each}
            </div>
        </div>
    {/each}
</main>

<style lang="scss">
    @import 'style/ui/page';

    .spacer {
        padding: 8px;
    }

    .project-row {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        text-align: center;

        padding: 12px 0px;
        gap: 8px;
    }
</style>
