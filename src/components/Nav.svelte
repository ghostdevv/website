<script>
    import { isActive /*, isChangingPage */ } from '@roxi/routify';
    import Hamburger from 'svelte-hamburgers';
    import { slide } from 'svelte/transition';

    let width;
    let scrollY;

    let open = false;

    $: mobile = width < 900;
    $: scroll = scrollY > 0;

    $: if (!mobile /* || $isChangingPage */) open = false;
</script>

<svelte:window bind:innerWidth={width} bind:scrollY />

<nav class:mobile class:open class:scroll>
    <div class="nav-fh">
        <a href="/">
            <img class="logo" src="/logo.png" alt="GHOSTs Logo" />
        </a>

        {#if mobile}
            <div>
                <Hamburger --color="var(--text)" type="squeeze" bind:open />
            </div>
        {/if}
    </div>

    <!-- Should be !$isChangingPage && (open || !mobile)-->
    {#if open || !mobile}
        <div class="nav-sh" transition:slide|local>
            <div class="links">
                <a href="/" class:active={$isActive('/')}> Home </a>

                {#each ['projects', 'work', 'contact'] as link, i (i)}
                    <a href="/{link}" class:active={$isActive(`/${link}`)}>
                        {link}
                    </a>
                {/each}
            </div>

            <a href="/" role="button" class="donate-button">Donate</a>
        </div>
    {/if}
</nav>

<style lang="scss">
    nav {
        width: 100%;
        max-width: 1600px;

        padding: 32px 24px;

        position: fixed;
        z-index: 10000;
        top: 0;
        left: 50%;
        transform: translateX(-50%);

        display: flex;
        align-items: center;
        justify-content: space-between;

        .nav-sh {
            display: contents;
        }

        background-color: var(--background-primary);
        border-bottom: 4px solid var(--background-primary);

        transition: border-color 0.2s ease-in-out;

        &.scroll,
        &.open.mobile {
            box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2),
                0 4px 20px 0 rgba(0, 0, 0, 0.19);

            border-color: var(--primary);
        }

        &.mobile {
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
        max-width: 75px;
    }
</style>
