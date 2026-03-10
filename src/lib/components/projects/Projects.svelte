<script lang="ts">
	import type { CollectionEntry } from 'astro:content';

	interface Props {
		projects: CollectionEntry<'projects'>['data'][];
	}

	const { projects }: Props = $props();
</script>

{#each projects as project}
	<a
		href={project.url}
		target="_blank"
		rel="noreferrer"
		class={['project card center', { star: project.star }]}
	>
		<h4>{project.name}</h4>
		<p>{project.description}</p>
	</a>
{/each}

<style>
	.project {
		border-color: var(--background-tertiary);
		text-align: left;
		flex-shrink: 1;
		padding: 22px;

		h4 {
			margin-top: 0px;
			margin-bottom: 8px;
		}

		p {
			margin: 0px;
			max-width: 400px;
		}

		&.star {
			border-color: var(--primary);
		}
	}
</style>
