<script>
    import { os } from '@/projects.config.js';

    const starred = os.filter((x) => x.star);
    const rest = os.filter((x) => !x.star);
</script>

<div class="column center g32">
    <h3>⭐ Starred Projects</h3>

    <div class="row wrap center g16">
        {#each starred as project}
            <a href={project.url} target="_blank" class="card blue">
                <h5>{project.name}</h5>
            </a>
        {/each}
    </div>
</div>

<div class="column center g32">
    <h3>OS Projects</h3>

    <div class="row wrap center g16">
        {#each rest as project}
            <a href={project.url} target="_blank" class="card">
                <h5>{project.name}</h5>
            </a>
        {/each}
    </div>
</div>
