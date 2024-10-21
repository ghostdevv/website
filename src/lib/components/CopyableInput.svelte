<script lang="ts">
	import { faCopy } from '@fortawesome/free-solid-svg-icons';
	import { copy } from 'svelte-copy';
	import Fa from 'svelte-fa';

	interface Props {
		value: string;
		disabled?: boolean;
	}

	let { value = $bindable(), disabled = true }: Props = $props();
</script>

<div class="copyable">
	<button use:copy={value} class="icon">
		<Fa icon={faCopy} />
	</button>

	<input class="input" type="text" {disabled} bind:value />
</div>

<style lang="scss">
	.copyable {
		position: relative;
		width: 100%;
	}

	.input {
		padding-left: 38px;
	}

	.icon {
		all: unset;

		padding: 8px;
		cursor: pointer;

		display: flex;
		align-items: center;
		gap: 8px;

		transition: color 0.2s ease-in-out;

		&:disabled {
			opacity: 0.6;
			cursor: not-allowed;
		}

		&:hover:not(&:disabled),
		&:active:not(&:disabled),
		&:focus:not(&:disabled) {
			background-color: transparent;
			box-shadow: none;
			color: var(--primary);
		}
	}

	.icon {
		position: absolute;
		top: 50%;
		left: 8px;
		transform: translateY(-50%);

		z-index: 100;
	}
</style>
