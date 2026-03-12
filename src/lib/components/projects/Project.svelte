<script lang="ts" module>
	export type Project = CollectionEntry<'projects'>['data'];
</script>

<script lang="ts" generics="T extends Project['category']">
	import type { CollectionEntry } from 'astro:content';
	import shuffle from 'just-shuffle';

	interface Props {
		category: T;
		projects: Extract<Project, { category: T }>[];
	}

	const { category, projects }: Props = $props();
</script>

<section>
	<details open={category !== 'archived'}>
		<summary class="name">
			<h3>{category}</h3>
		</summary>

		<div class="projects">
			{#each shuffle(projects) as project}
				<a
					href={project.url}
					target="_blank"
					rel="noreferrer"
					class="project card center {project.category}"
				>
					<h4>{project.name}</h4>
					<p>{project.description}</p>
				</a>
			{/each}
		</div>
	</details>
</section>

<style>
	details {
		.name {
			text-transform: capitalize;
		}

		&[open] {
			.projects {
				margin-top: 8px;
			}
		}

		.projects {
			display: flex;
			flex-wrap: wrap;
			gap: 12px;
			align-items: stretch;

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
		}
	}
</style>
