<script>
    import { slide, fade, fly } from 'svelte-reduced-motion/transition';
    import { beforeNavigate } from '$app/navigation';
    import { navigating, page } from '$app/stores';
    import Hamburger from 'svelte-hamburgers';
    import TRainbow from './TRainbow.svelte';
    import { mounted } from 'svelte-mount';

    let width;
    let scrollY;

    let open = false;

    $: mobile = width < 900;
    $: scroll = scrollY > 0;

    $: if (!mobile || $navigating) open = false;

    $: isActive = (url) => $page.url.pathname.includes(url);

    beforeNavigate(() => {
        open = false;
    });
</script>

<svelte:window bind:innerWidth={width} bind:scrollY />

<div class="wrapper" class:open class:scroll>
    <nav in:fade>
        <div class="nav-fh">
            <a href="/">
                <div
                    class="logo"
                    in:fly={{ y: -20, duration: 750, delay: 100 }}>
                    <TRainbow />
                </div>
            </a>

            <div class="hamburger">
                <Hamburger --color="var(--text)" type="squeeze" bind:open />
            </div>
        </div>

        {#if $mounted && (open || !mobile)}
            <div
                class="nav-sh"
                transition:slide
                class:open={!$navigating && (open || !mobile)}>
                <div class="links">
                    <a
                        href="/"
                        class:active={$page.url.pathname == '/'}
                        in:fly={{ y: -20, duration: 750 }}>
                        Home
                    </a>

                    {#each ['posts', 'projects', 'donate', 'contact'] as link, i (i)}
                        <a
                            href="/{link}"
                            class:active={isActive(`/${link}`)}
                            in:fly={{
                                y: -20,
                                duration: 750,
                                delay: (i + 1) * 100,
                            }}>
                            {link}
                        </a>
                    {/each}
                </div>

                <a
                    href="/donate"
                    class="button donate-button"
                    in:fly={{ y: -20, duration: 750, delay: 100 }}>Donate</a>
            </div>
        {/if}
    </nav>
</div>

<style lang="scss">
    @import 'src/lib/helpers/media';

    $mobile: '<900px';
    $desktop: '>900px';

    .wrapper {
        position: fixed;
        z-index: 300;
        top: 0;
        left: 50%;
        transform: translateX(-50%);

        width: 100%;

        background-color: var(--background-primary);
        border-bottom: 4px solid rgba(0, 0, 0, 0);

        transition: border-color 0.2s ease-in-out;

        &.scroll {
            box-shadow: 0 4px 10px -2px rgba(0, 0, 0, 0.2),
                0 4px 20px 0 rgba(0, 0, 0, 0.19);

            border-color: var(--primary);
        }

        @include media($mobile) {
            &.open {
                box-shadow: 0 4px 10px -2px rgba(0, 0, 0, 0.2),
                    0 4px 20px 0 rgba(0, 0, 0, 0.19);

                border-color: var(--primary);
            }
        }
    }

    @include media($desktop) {
        .hamburger {
            display: none;
        }
    }

    nav {
        width: 100%;
        max-width: 1600px;
        margin: 0 auto;

        padding: 32px 24px;

        display: flex;
        align-items: center;
        justify-content: space-between;

        .nav-sh {
            display: contents;
        }

        @include media($mobile) {
            flex-direction: column;
            justify-content: start;

            .nav-fh {
                width: 100%;

                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .nav-sh {
                display: flex;
                flex-direction: column;
                gap: 22px;

                height: 100%;

                .links {
                    margin: 0px auto;
                    flex-direction: column;
                    gap: 8px;

                    a {
                        font-size: 1.5rem;
                        border-width: 2px;
                        border: none;
                    }
                }
            }
        }
    }

    .links {
        display: flex;
        align-items: center;
        gap: 24px;

        a {
            text-transform: capitalize;
            font-weight: 600;
            padding: 12px 8px;

            border-bottom: 4px solid rgba(0, 0, 0, 0);

            transition: border-color 0.2s ease-in-out, color 0.2s ease-in-out;

            color: var(--text);

            text-decoration: none;

            &.active {
                color: var(--secondary);
                border-color: var(--secondary);
            }

            &:hover,
            &:focus {
                color: var(--secondary-hover);
                background-color: inherit;
                border-color: var(--secondary-hover);
            }
        }
    }

    .logo {
        width: 75px;

        display: grid;
        place-items: center;
    }
</style>
