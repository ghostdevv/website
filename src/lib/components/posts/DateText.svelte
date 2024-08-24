<script lang="ts">
	import { format } from 'date-fns';

	export let timestamp: number | undefined;
</script>

{#if timestamp}
	<span title={new Date(timestamp).toISOString()}>
		{format(timestamp, 'do LLLL yyyy')}
	</span>
{:else}
	<span>never</span>
{/if}
