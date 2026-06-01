<script lang="ts">
	import IconDownload from '~icons/lucide/download';

	interface Format {
		name: string;
		url: string;
	}

	interface Props {
		name: string;
		formats: Format[];
	}

	const { name, formats }: Props = $props();
</script>

<div class="container">
	<div class="logo">
		<img src={formats[0]?.url} alt="{name} logo" />
	</div>

	<h4>{name}</h4>

	{#each formats as { name, url }}
		<a href={url} target="_blank" download>
			<IconDownload />
			{name}
		</a>
	{/each}
</div>

<style lang="scss">
	.logo img {
		width: 140px;
		height: auto;
		aspect-ratio: 1 / 1;
	}

	.container {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
</style>
