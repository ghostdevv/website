<script context="module">
    export const prerender = true;
</script>

<script>
    import { fly } from 'svelte-reduced-motion/transition';
    import { os } from '$lib/data/projects.js';
    import { cubicOut } from 'svelte/easing';

    const starred = os.filter((x) => x.star);
    const rest = os.filter((x) => !x.star);
</script>

<div class="column center g32 full">
    <h1>⭐ Starred Projects</h1>

    <div class="row wrap center g16">
        {#each starred as project, i}
            <a
                href={project.url}
                target="_blank"
                class="card center blue"
                in:fly={{
                    y: -25,
                    delay: i * 20,
                    duration: 500,
                    easing: cubicOut,
                }}>
                <h5>{project.name}</h5>
            </a>
        {/each}
    </div>
</div>

<div class="column center g32 full">
    <h1>OS Projects</h1>

    <div class="row wrap center g16">
        {#each rest as project, i}
            <a
                href={project.url}
                target="_blank"
                class="card center"
                in:fly={{ y: -40, delay: i * 30, duration: 400 }}>
                <h5>{project.name}</h5>
            </a>
        {/each}
    </div>
</div>
