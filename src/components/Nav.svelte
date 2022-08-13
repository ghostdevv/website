<script lang="ts">
    import { Hamburger } from 'svelte-hamburgers';
    import TRainbow from './TRainbow.svelte';
    import { mounted } from 'svelte-mount';

    export let url: URL;

    let width: number;
    let scrollY: number;

    let open = false;

    $: mobile = width < 900;
    $: scroll = scrollY > 0;

    $: if (!mobile) open = false;
</script>

<svelte:window bind:innerWidth={width} bind:scrollY />

<div class="wrapper" class:open class:scroll>
    <nav in:fade>
        <div class="nav-fh">
            <a href="/">
                <div class="logo">
                    <TRainbow />
                </div>
            </a>

            <div class="hamburger">
                <Hamburger --color="var(--text)" type="squeeze" bind:open />
            </div>
        </div>

        {#if $mounted && (open || !mobile)}
            <div class="nav-sh" transition:slide class:open={open || !mobile}>
                <div class="links">
                    <a href="/" class:active={url.pathname == '/'}> Home </a>

                    {#each ['posts', 'projects', 'donate', 'contact'] as link, i (i)}
                        <a
                            href="/{link}"
                            class:active={url.pathname.startsWith(`/${link}`)}>
                            {link}
                        </a>
                    {/each}
                </div>
            </div>
        {/if}
    </nav>
</div>

<style lang="scss">
    @import 'src/helpers/media';

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
        gap: 32px;

        .nav-sh {
            display: contents;
        }

        @include media($mobile) {
            flex-direction: column;
            justify-content: start;
            gap: 0px;

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

                margin-top: 16px;
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
        gap: 16px;

        a {
            text-transform: capitalize;
            font-weight: 600;
            padding: 12px 16px;

            border-radius: 8px;
            border: 2px solid transparent;

            transition: border-color 0.2s ease-in-out, opacity 0.2s ease-in-out;

            color: var(--text);
            opacity: 0.6;

            text-decoration: none;

            &.active {
                opacity: 1;
            }

            &:hover,
            &:focus {
                opacity: 1;
                background-color: inherit;
                border-color: var(--primary);
            }
        }
    }

    .logo {
        width: 75px;

        display: grid;
        place-items: center;
    }
</style>
