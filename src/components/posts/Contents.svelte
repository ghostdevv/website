<script lang="ts">
    import type { MarkdownHeading } from 'astro';
    import { onMount } from 'svelte';

    export let headings: MarkdownHeading[];

    let activeHeading: string | null = null;

    onMount(() => {
        const root = document.querySelector('#post-body')!;
        const headings = root.querySelectorAll('h1, h2, h3, h4, h5, h6');

        function callback(entries: IntersectionObserverEntry[]) {
            for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                activeHeading = entry.target.id;
            }
        }

        const observer = new IntersectionObserver(callback, {
            threshold: 1,
            rootMargin: '50px 0px -80% 0px',
        });

        for (const heading of headings) {
            observer.observe(heading);
        }

        return () => observer.disconnect();
    });
</script>

{#each headings as heading}
    <a
        class="link depth-{Math.min(heading.depth, 3)}"
        class:active={activeHeading == heading.slug}
        href="#{heading.slug}">
        {heading.text}
    </a>
{/each}

<style lang="scss">
    .link {
        color: rgba(var(--text-rgb), 0.6);

        &:hover,
        &:active,
        &:focus {
            color: var(--text);
            background-color: transparent;
            text-decoration: none;
        }

        &.active {
            color: var(--primary);
        }

        &.depth-1 {
            margin-top: 12px;
        }

        &.depth-2,
        &.depth-3 {
            font-size: 0.9rem;
            margin-top: 4px;
        }

        &.depth-2 {
            padding-left: 12px;
        }

        &.depth-3 {
            padding-left: 24px;
        }
    }
</style>
