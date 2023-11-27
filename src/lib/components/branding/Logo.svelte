<script lang="ts">
    import { faDownload } from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa';

    interface Format {
        name: string;
        url: string;
    }

    let { name, formats } = $props<{ name: String; formats: Format[] }>();
</script>

<div class="container">
    <div class="logo">
        <slot />
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
