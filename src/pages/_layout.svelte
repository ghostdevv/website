<script>
    import Particles from 'svelte-particles';
    import { config } from '@/particles.config.js';
    import { fly, fade } from 'svelte/transition';
    import { animationShown } from '@/stores.js';

    const time = 1500;
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
    <div class="loader" in:fly={{ y: -200, duration: time - 500 }} out:fade>
        <h1>GHOST</h1>
    </div>
{:then}
    <slot />
{/await}

<style lang="scss">
    .loader {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        z-index: 100;
    }
</style>
