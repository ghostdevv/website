<script>
    import { work } from '@/projects.config.js';
</script>

<div class="column center g32">
    <div>
        <h3>Work</h3>
        <p>Essentially a mini portfolio</p>
    </div>

    <div class="row wrap center g16">
        {#each work as project}
            <a href={project.url} target="_blank" class="card">
                <h5>{project.name}</h5>
            </a>
        {/each}
    </div>
</div>
