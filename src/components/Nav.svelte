<script>
    import { slide, fade } from 'svelte/transition';
    import Hamburger from 'svelte-hamburgers';
    import { isActive } from '@roxi/routify';

    let width;
    let open;

    $: mobile = width < 900;
</script>

<svelte:window bind:innerWidth={width} />

<nav class:mobile class:open>
    <div class="nav-fh">
        <a href="/">
            <img class="logo" src="/logo.png" alt="GHOSTs Logo" />
        </a>

        {#if mobile}
            <div class="hamburger">
                <Hamburger color="var(--text)" type="squeeze" bind:open />
            </div>
        {/if}
    </div>

    {#if open}
        <div class="nav-sh" transition:slide>
            <div class="links">
                <a href="/" class:active={$isActive('/index')}>Home</a>

                {#each ['projects', 'work', 'contact'] as link, i (i)}
                    <a href="/{link}" class:active={$isActive(`/${link}`)}>
                        {link}
                    </a>
                {/each}
            </div>

            <a href="/" class="button donate-button">Donate</a>
        </div>
    {/if}
</nav>

<style lang="scss">
    nav {
        width: 100%;
        padding: 32px 24px;

        position: sticky;
        z-index: 10000;
        top: 0;

        display: flex;
        align-items: center;
        justify-content: space-between;

        .nav-sh {
            display: contents;
        }

        &.open {
            transition: background-color 0.2s ease-in-out;
            background-color: var(--background);
        }

        &.mobile {
            flex-direction: column;
            justify-content: start;

            height: 100vh;
            width: 100vw;
            left: 0;
            position: fixed;

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

    .logo {
        max-width: 75px;
    }
</style>
