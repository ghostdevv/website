<script>
    // const links = [
    //     ['Discord', 'https://discord.gg/2Vd4wAjJnm'],
    //     ['Github', 'https://github.com/ghostdevv'],
    //     ['Twitter', 'https://twitter.com/onlyspaceghost'],
    // ];

    const displayName = (str) =>
        str
            .split('-')
            .map((x) => x[0].toUpperCase() + x.slice(1))
            .join(' ');

    const links = {
        'the-dev-lounge': {
            href: 'https://discord.gg/2Vd4wAjJnm',
        },
        github: {
            href: 'https://github.com/ghostdevv',
        },
        twitter: {
            href: 'https://twitter.com/onlyspaceghost',
        },
    };
</script>

<main class="column center g32 full">
    <h1>Contact Links</h1>

    <div class="row wrap center g16">
        <card class="center"> Discord: GHOST#7524 </card>

        <a href="mailto:ghostdevbusiness@gmail.com" class="card center">
            Email
        </a>

        <a href="https://twitter.com/onlyspaceghost" class="card center">
            Twitter
        </a>
    </div>

    <!-- <div class="row wrap center g16">
        {#each Object.entries(links) as [link, { href, value }]}
            <a {href} class="card center">
                {link}
            </a>
        {/each}
    </div> -->
</main>
