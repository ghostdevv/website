<div class="loader">
    <svg fill="none" width="216" height="66" viewBox="0 0 216 66">
        <circle cx="33" cy="33" r="25" />
        <circle cx="108" cy="33" r="25" style="--delay: 0.2s" />
        <circle cx="183" cy="33" r="25" style="--delay: 0.4s" />
    </svg>
</div>

<style lang="scss">
    .loader {
        padding: 16px;

        circle {
            animation: dot 1.5s infinite ease-in-out forwards;
            animation-delay: var(--delay, 0s);

            opacity: 0.8;
            transform: translateY(-4px);
            fill: var(--primary);
        }
    }

    @keyframes dot {
        50% {
            opacity: 0.4;
            transform: translateY(4px);
            fill: var(--primary-hover);
        }
    }
</style>
