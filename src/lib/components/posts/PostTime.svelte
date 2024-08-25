<script lang="ts">
	import { format, formatDistanceToNow } from 'date-fns';

	interface Props {
		lastEdited?: number;
		postedAt: number;
	}

	let { lastEdited, postedAt }: Props = $props();
</script>

{#snippet date(timestamp: number)}
	<span title={format(timestamp, 'do LLLL yyyy HH:mm')}>
		{formatDistanceToNow(timestamp, { addSuffix: true })}
	</span>
{/snippet}


<p>
	Posted {@render date(postedAt)}{lastEdited ? ',' : ''}

	{#if lastEdited}
		updated {@render date(lastEdited)}
	{/if}
</p>

<style lang="scss">
	p {
		color: rgba(var(--text-rgb), 0.8);
		line-height: 1.6;
		font-size: 14px;
		margin: 6px 0px;
	}
</style>
