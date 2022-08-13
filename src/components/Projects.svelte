<script lang="ts">
    import { projects } from '$data/projects';
</script>

<section class="row wrap center g16">
    {#each projects as project}
        <a
            href={project.url}
            target="_blank"
            class="card center"
            class:star={project.star}>
            <h5>{project.name}</h5>
        </a>
    {/each}
</section>

<style lang="scss">
    .star {
        border-color: var(--primary) !important;
    }
</style>
