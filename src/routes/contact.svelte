<script>
    import ContactCard from '@/components/ContactCard.svelte';

    const contactLinks = {
        Discord: {
            value: 'GHOST#7524',
        },
        Email: {
            href: 'mailto:ghostdevbusiness@gmail.com',
            value: 'ghostdevbusiness@gmail.com',
        },
        Twitter: {
            href: 'https://twitter.com/onlyspaceghost',
            value: 'onlyspaceghost',
        },
    };

    const socialLinks = {
        Github: {
            href: 'https://github.com/ghostdevv',
            value: 'ghostdevv',
        },
        Twitter: {
            href: 'https://twitter.com/onlyspaceghost',
            value: 'onlyspaceghost',
        },
        Discord: {
            value: 'GHOST#7524',
        },
        'The Dev Lounge': {
            href: 'https://discord.gg/2Vd4wAjJnm',
            value: 'https://discord.gg/2Vd4wAjJnm',
        },
    };
</script>

<main class="column center g32 full">
    <div>
        <h1>Contact Links</h1>
        <p>Click to visit or copy the contact info!</p>
    </div>

    <div class="row wrap center g16">
        {#each Object.entries(contactLinks) as [title, data]}
            <ContactCard {title} {...data} />
        {/each}
    </div>

    <div>
        <h1>Social Links</h1>
        <p>Click to visit or copy the contact info!</p>
    </div>

    <div class="row wrap center g16">
        {#each Object.entries(socialLinks) as [title, data]}
            <ContactCard {title} {...data} />
        {/each}
    </div>
</main>
