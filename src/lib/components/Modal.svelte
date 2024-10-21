<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		activator?: Snippet;
			children: Snippet<[open: () => void, close: () => void]>;
	}

	const { activator, children }: Props = $props();
	let dialog = $state<HTMLDialogElement>();

	function close() {
		dialog?.close();
	}

	function open() {
		dialog?.showModal();
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="activator" onclose={close} onclick={open}>
	{@render activator?.()}
</div>

<dialog bind:this={dialog}>
	{@render children(open, close)}
</dialog>

<style lang="scss">
	@use 'src/lib/media' as *;

	.activator {
		display: contents;
	}
</style>
