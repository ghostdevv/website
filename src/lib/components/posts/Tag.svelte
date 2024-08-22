<script lang="ts">
	import { type Tag, tagColours } from '$data/tags';

	let { name, large = false } = $props<{ name: Tag; large?: boolean }>();
</script>

<span class="tag" style:--tag-colour={tagColours[name]} class:large>
	{name}
</span>

<style lang="scss">
	.tag {
		background-color: rgba(var(--tag-colour), 0.2);
		color: rgba(var(--tag-colour));

		border-radius: 16px;

		padding: 4px 16px;
		font-size: 11px;
		font-weight: 800;

		height: fit-content;
		width: fit-content;

		text-transform: uppercase;

		&.large {
			font-size: 0.85rem;
			padding: 6px 22px;
		}
	}
</style>
