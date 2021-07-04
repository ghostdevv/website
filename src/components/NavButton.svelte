<nav>
    <a href="/">
        <span class="fas fa-home" />
    </a>
    <a href="/links">
        <span class="fas fa-bars" />
    </a>
</nav>

<style lang="scss">
    nav {
        position: fixed;
        top: 0;
        right: 0;
        padding: 12px;

        display: flex;
        gap: 8px;

        span {
            color: #61636f;
            font-size: 1rem;
            opacity: 0.8;

            transition: 0.2s ease-in-out;

            &:hover {
                opacity: 1;

                color: #3d5cf1;
            }

            &:focus {
                transition: none;
            }
        }
    }
</style>
