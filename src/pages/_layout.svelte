<script>
    import Particles from 'svelte-particles';
    import { config } from '@/particles.config.js';
    import { fly, fade } from 'svelte/transition';
    import { animationShown } from '@/stores.js';

    import NavButton from '@/components/NavButton.svelte';

    const time = 1800;
    const loading = new Promise((resolve) =>
        $animationShown
            ? resolve()
            : setTimeout(() => {
                  $animationShown = true;
                  resolve();
              }, time),
    );
</script>

<Particles id="particles" options={config} />

{#await loading}
    <div class="animation loader" out:fade>
        {#each 'GHOST' as char, i (i)}
            <h1 in:fly={{ y: -200, duration: time - 500, delay: i * 50 }}>
                {char}
            </h1>
        {/each}
    </div>
{:then}
    <div class="content-wrapper" transition:fade>
        <slot />
    </div>

    <NavButton />
{/await}

<style lang="scss">
    .loader {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        display: flex;
        align-items: center;
        text-align: center;

        z-index: 100;
    }

    .content-wrapper {
        width: 100%;
        height: 100%;
    }
</style>
