<script>
    import { fade } from 'svelte/transition';
    import { isActive } from '@roxi/routify';
</script>

<nav transition:fade>
    <a href="/">
        <img src="/logo.png" alt="GHOSTs Logo" />
    </a>

    <div class="links">
        <a href="/" class:active={$isActive('/index')}>Home</a>
        <a href="/projects" class:active={$isActive('/projects')}>Projects</a>
        <a href="/work" class:active={$isActive('/work')}>Work</a>
        <a href="/">Contact</a>
    </div>

    <a href="/" class="button">Donate</a>
</nav>

<style lang="scss">
    nav {
        width: 100%;

        display: flex;
        align-items: center;
        justify-content: space-between;

        padding: 32px 24px;

        img {
            max-width: 75px;
        }

        .links {
            display: flex;
            align-items: center;
            gap: 24px;

            a {
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
    }
</style>
