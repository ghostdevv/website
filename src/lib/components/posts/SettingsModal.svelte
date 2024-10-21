<script lang="ts">
	import { faCog } from '@fortawesome/free-solid-svg-icons';
	import { fontSize, lineHeight } from './settings';
	import Modal from '$lib/components/Modal.svelte';
	import type { Snippet } from 'svelte';
	import Fa from 'svelte-fa';

	interface Props {
		activator?: Snippet;
	}

	let { activator: _activator }: Props = $props();

	$effect(() => {
		document.documentElement.style.setProperty(
			'--post-font-size',
			`${$fontSize}px`,
		);

		document.documentElement.style.setProperty(
			'--post-line-height',
			`${$lineHeight}`,
		);
	});

	function reset() {
		lineHeight.reset();
		fontSize.reset();
	}
</script>

<Modal >
	{#snippet activator()}
		{#if _activator}
			{@render _activator()}
		{:else}
			<button
				class="secondary icon"
				aria-label="Post Settings"
				title="Post Settings">
				<Fa icon={faCog} />
			</button>
		{/if}
	{/snippet}

	{#snippet children(_open, close)}
		<card class="no-hover modal">
			<h1>Post Settings</h1>

			<div class="input-group">
				<label for="fontSize">Post Font Size: {$fontSize}px</label>

				<input
					id="fontSize"
					type="range"
					min="14"
					max="28"
					bind:value={$fontSize} />
			</div>

			<div class="input-group">
				<label for="lineHeight">Post Line Height: {$lineHeight}</label>

				<input
					id="lineHeight"
					type="range"
					min="0.5"
					max="2.5"
					step="0.1"
					bind:value={$lineHeight} />
			</div>

			<div class="row">
				<button onclick={close}>Close</button>
				<button class="secondary" onclick={reset}>Reset</button>
			</div>
		</card>
	{/snippet}
</Modal>

<style lang="scss">
	@use 'src/lib/media' as *;

	.input-group {
		width: 100%;

		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 4px;
	}

	.modal {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
</style>
