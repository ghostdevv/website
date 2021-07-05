<script>
    import { fade, fly } from 'svelte/transition';
    import { work } from '@/projects.config.js';
</script>

<div class="column center g32" in:fade|local>
    <div>
        <h3>Work</h3>
        <p>Essentially a mini portfolio</p>
    </div>

    <div class="row wrap center g16">
        {#each work as project, i}
            <a
                href={project.url}
                target="_blank"
                class="card"
                in:fly={{ y: -40, delay: i * 80, duration: 800 }}>
                <h5>{project.name}</h5>
            </a>
        {/each}
    </div>
</div>
