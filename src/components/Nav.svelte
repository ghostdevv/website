<script>
    import { fade, slide } from 'svelte/transition';
    import Hamburger from 'svelte-hamburgers';
    import { isActive, isChangingPage } from '@roxi/routify';

    let width;
    let open;

    $: mobile = width < 900;
    $: if (!mobile || $isChangingPage) open = false;
</script>

<svelte:window bind:innerWidth={width} />

<nav transition:fade class:mobile class:open>
    <a href="/">
        <img src="/logo.png" alt="GHOSTs Logo" />
    </a>

    {#if mobile}
        <div class="hamburger" in:fade|local>
            <Hamburger color="var(--text)" type="squeeze" bind:open />
        </div>
    {/if}

    {#if open || !mobile}
        <div class="links" class:mobile transition:slide|local>
            <a href="/" class:active={$isActive('/index')}>Home</a>

            {#each ['projects', 'work', 'contact'] as link}
                <a href="/{link}" class:active={$isActive(`/${link}`)}>
                    {link}
                </a>
            {/each}
        </div>
    {/if}

    <a class:hide={mobile && !open} href="/" class="button">Donate</a>
</nav>

<div class="buffer" class:mobile />

<style lang="scss">
    @import 'style/helpers/media';

    nav {
        width: 100%;

        display: grid;
        grid-template-columns: min-content min-content min-content;
        grid-template-areas: 'logo links button';
        grid-template-rows: min-content;

        align-items: center;
        justify-content: space-between;

        padding: 32px 24px;

        &.open {
            z-index: 10000;
            top: 0;
            left: 0;

            height: 100vh;

            padding: 32px 24px;
            margin: 0px auto;

            background-color: var(--background);
        }

        &.mobile {
            position: fixed;
            inset: 0;

            width: 100vw;

            transition: background-color 0.5s;
            transition-delay: 0.1s;

            &.open {
                background-color: var(--background);
                transition: background-color 0.25s;
            }

            grid-template-columns: 1fr 1fr;
            grid-template-rows: min-content min-content min-content;

            gap: 32px 0px;

            grid-template-areas:
                'logo hamburger'
                'links links'
                'button button';

            .hamburger {
                justify-self: end;
            }

            .links {
                margin: 0px auto;
                flex-direction: column;
                gap: 8px;

                a {
                    font-size: 1.5rem;
                    border-width: 2px;
                }
            }

            .button {
                width: fit-content;
                margin: 0 auto;
            }
        }

        .hamburger {
            grid-area: hamburger;
        }

        img {
            grid-area: logo;
            max-width: 75px;
        }

        .links {
            grid-area: links;

            display: flex;
            align-items: center;
            gap: 24px;

            a {
                text-transform: capitalize;
                font-weight: 600;
                padding: 8px 0px;

                border-bottom: 4px solid rgba(0, 0, 0, 0);

                transition: border 0.2s ease-in-out, color 0.2s ease-in-out;

                color: var(--text);

                &.active {
                    color: var(--text-blue);
                    border-color: var(--text-blue);
                }

                &:hover {
                    color: var(--text-blue-highlight);
                    border-color: var(--text-blue-highlight);
                }
            }
        }

        > .button {
            grid-area: button;

            pointer-events: auto;
            transition: opacity 0.3s;

            &.hide {
                opacity: 0;
                pointer-events: none;
            }
        }
    }

    .buffer {
        height: 0;
        &.mobile {
            height: 175px;
        }
    }
</style>
