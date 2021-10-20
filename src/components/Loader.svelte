<div class="loader">
    <svg xmlns="http://www.w3.org/2000/svg" width="110" height="33">
        <ellipse cx="16.805" cy="16.5" rx="12.732" ry="12.5" />

        <ellipse
            cx="55"
            cy="16.5"
            rx="12.732"
            ry="12.5"
            style="--delay: 0.2s" />

        <ellipse
            cx="93.194"
            cy="16.5"
            rx="12.732"
            ry="12.5"
            style="--delay: 0.4s" />
    </svg>
</div>

<style lang="scss">
    .loader {
        padding: 16px;

        ellipse {
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
