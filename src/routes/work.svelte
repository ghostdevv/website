<script>
    import { fade, fly } from 'svelte/transition';
    import { work } from '@/data/projects.js';
</script>

<div class="column center g32 full" in:fade|local>
    <div>
        <h1>Work</h1>
        <p>Essentially a mini portfolio of public sites I have worked on.</p>
    </div>

    <div class="row wrap center g16">
        {#each work as project, i}
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
