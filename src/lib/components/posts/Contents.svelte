<script lang="ts">
	import type { MarkdownHeading } from 'astro';

	interface Props {
		headings: MarkdownHeading[];
	}

	let { headings }: Props = $props();

	let activeHeading = $state<string | null>(null);

	$effect(() => {
		const root = document.querySelector('#post-body')!;
		const headings = root.querySelectorAll('h1, h2, h3, h4, h5, h6');

		function callback(entries: IntersectionObserverEntry[]) {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				activeHeading = entry.target.id;
			}
		}

		const observer = new IntersectionObserver(callback, {
			threshold: 1,
			rootMargin: '25px 0px -75% 0px',
		});

		for (const heading of Array.from(headings)) {
			observer.observe(heading);
		}

		return () => observer.disconnect();
	});
</script>

<div class="contents">
	{#each headings as heading}
		<a
			class="link depth-{Math.min(heading.depth, 4)}"
			class:active={activeHeading == heading.slug}
			href="#{heading.slug}"
		>
			{heading.text}
		</a>
	{/each}
</div>

<style lang="scss">
	.contents {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.link {
		color: rgba(var(--text-rgb), 0.6);
		margin-top: 12px;

		&:hover,
		&:active,
		&:focus {
			color: var(--text);
			background-color: transparent;
			text-decoration: none;
		}

		&.active {
			color: var(--primary);
		}

		&.depth-2,
		&.depth-3,
		&.depth-4 {
			font-size: 0.9rem;
			margin-top: 4px;
		}

		&.depth-2 {
			padding-left: 12px;
		}

		&.depth-3 {
			padding-left: 24px;
		}

		&.depth-4 {
			padding-left: 36px;
		}
	}
</style>
