<script lang="ts">
	import { projects } from '$data/projects';
	import shuffle from 'just-shuffle';
</script>

<section class="row wrap center g16">
	{#each shuffle(projects) as project}
		<a
			href={project.url}
			target="_blank"
			rel="noreferrer"
			class="project card center"
			class:star={project.star}>
			<h5>{project.name}</h5>
		</a>
	{/each}
</section>

<style lang="scss">
	.project {
		border-color: var(--background-tertiary);
		transition: border-color 0.2s ease-in-out;

		&.star,
		&:focus,
		&:hover {
			border-color: var(--primary);
		}
	}
</style>
