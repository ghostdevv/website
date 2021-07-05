<nav>
    <img src="/logo.png" alt="GHOSTs Logo" />

    <div class="links">
        <a href="/" class="active">Home</a>
        <a href="/">Blog</a>
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

                transition: border 0.2s ease-in-out, color 0.2s ease-in-out;

                &.active {
                    border-bottom: 4px solid var(--text-blue);
                }

                &:hover {
                    border-color: var(--text-blue-highlight);
                }
            }
        }
    }
</style>
