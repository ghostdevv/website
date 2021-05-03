<script>
    const projects = [
        {
            name: 'Rejxcted',
            link: 'https://rejxcted.dev',
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
    ];
</script>

<main>
    <h3>Projects</h3>
    <p>Here are a collection of projects that I have made</p>

    <div class="row fl">
        {#each projects as { name, link }}
            <a href={link} target="_blank">
                <card>
                    <h6>{name}</h6>
                </card>
            </a>
        {/each}
    </div>
</main>

<style lang="scss">
    @import 'style/ui/page';
</style>
