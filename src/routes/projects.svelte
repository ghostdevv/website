<script>
    import { fade, fly } from 'svelte/transition';
    import { os } from '@/projects.config.js';

    const starred = os.filter((x) => x.star);
    const rest = os.filter((x) => !x.star);
</script>

<div class="column center g32 full" in:fade|local>
    <h1>⭐ Starred Projects</h1>

    <div class="row wrap center g16">
        {#each starred as project, i}
            <a
                href={project.url}
                target="_blank"
                class="card center blue"
                in:fly={{ y: -40, delay: i * 80, duration: 600 }}>
                <h5>{project.name}</h5>
            </a>
        {/each}
    </div>
</div>

<div class="column center g32 full" in:fade|local>
    <h1>OS Projects</h1>

    <div class="row wrap center g16">
        {#each rest as project, i}
            <a
                href={project.url}
                target="_blank"
                class="card center"
                in:fly={{ y: -40, delay: i * 80, duration: 600 }}>
                <h5>{project.name}</h5>
            </a>
        {/each}
    </div>
</div>
