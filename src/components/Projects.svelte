<script lang="ts">
    import { projects } from '$data/projects';
</script>

<section class="row wrap center g16">
    {#each projects as project}
        <a
            href={project.url}
            target="_blank"
            class="project card center"
            class:star={project.star}>
            <h5>{project.name}</h5>
        </a>
    {/each}
</section>

<style lang="scss">
    .project {
        border-color: var(--background-tertiary) !important;
        transition: border-color 0.2s ease-in-out !important;

        &.star,
        &:focus,
        &:hover {
            border-color: var(--primary) !important;
        }
    }
</style>
