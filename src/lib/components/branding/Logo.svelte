<script lang="ts">
	import { faDownload } from '@fortawesome/free-solid-svg-icons';
	import type { Snippet } from 'svelte';
	import Fa from 'svelte-fa';

	interface Format {
		name: string;
		url: string;
	}

	interface Props {
		name: String;
		formats: Format[];
		children: Snippet
	}

	let { name, formats, children }: Props = $props();
</script>

<div class="container">
	<div class="logo">
		{@render children()}
	</div>

	<h4>{name}</h4>

	{#each formats as { name, url }}
		<a href={url} target="_blank" download>
			<Fa icon={faDownload} />
			{name}
		</a>
	{/each}
</div>

<style lang="scss">
	.logo {
		width: 140px;
	}

	.container {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
</style>
