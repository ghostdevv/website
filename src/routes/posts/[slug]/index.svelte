<script context="module">
    import { getTextPost } from '$sanity';
    import { marked } from 'marked';

    /** @type {import('@sveltejs/kit').Load}*/
    export const load = async ({ page }) => {
        const post = await getTextPost(page.params.slug);

        return {
            props: {
                ...post,
                body: marked(post.body),
            },
        };
    };
</script>

<script>
    import TextPostValidator from '$lib/components/posts/TextPostValidator.svelte';
    import SettingsModal from '$lib/components/posts/post/SettingsModal.svelte';
    import { fontSize } from '$lib/components/posts/post/settings';
    import { createTweetLink } from '$lib/helpers/twitter';
    import Tag from '$lib/components/posts/Tag.svelte';
    import { fly } from 'svelte/transition';
    import { page } from '$app/stores';
    import { format } from 'date-fns';

    export let timestamp;
    export let postType;
    export let title;
    export let image;
    export let link;
    export let body;
    export let tag;
</script>

<TextPostValidator {link} {postType}>
    <article>
        <div
            class="meta-wrapper"
            style="--image: url({image})"
            in:fly={{ y: -20, duration: 750 }}>
            <div class="meta">
                <div class="data">
                    <Tag {...tag} large />
                    <p>{format(new Date(timestamp), 'do LLLL yyyy')}</p>
                </div>

                <h1 class="title">{title}</h1>

                <div class="settings">
                    <SettingsModal />
                </div>
            </div>
        </div>

        <hr />

        <div
            class="body"
            style="--font-size: {$fontSize}px"
            in:fly={{ y: -20, duration: 750, delay: 100 }}>
            {@html body}
        </div>

        <hr />

        <footer in:fly={{ y: -20, duration: 750, delay: 200 }}>
            <a
                href={createTweetLink(
                    `Checkout this awesome post by @onlyspaceghost! https://ghostdev.xyz/posts/${$page.params.slug}`,
                )}
                role="button"
                target="_blank">
                <i class="fab fa-twitter" />
                Share on twitter
            </a>

            <SettingsModal />
        </footer>
    </article>
</TextPostValidator>

<style lang="scss">
    @import 'src/lib/helpers/media';

    article {
        width: 100%;

        display: flex;
        flex-direction: column;
        gap: 16px;

        .meta-wrapper {
            $border-radius: 22px;

            display: flex;
            flex-direction: column;
            gap: 16px;

            align-items: flex-start;
            justify-content: flex-end;

            width: 100%;
            height: 500px;
            max-height: 50vh;

            border-radius: $border-radius;

            background-image: var(--image);
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;

            .meta {
                $cp: '<900px';

                width: 100%;
                padding: 22px;

                position: relative;

                display: grid;
                grid-template-columns: 1fr max-content;
                grid-template-rows: max-content 1fr;
                gap: 16px 0px;
                grid-template-areas:
                    'data data'
                    'title settings';

                background-color: rgba(var(--background-tertiary-rgb), 0.5);
                border-radius: 0 0 $border-radius $border-radius;

                // Re-enable this when/if it's fixed
                // backdrop-filter: blur(8px);

                @include media($cp) {
                    grid-template-areas:
                        'data'
                        'title';

                    grid-template-columns: 1fr;
                    grid-template-rows: max-content max-content;

                    justify-items: center;
                    align-items: center;
                    text-align: center;

                    gap: 8px 0px;
                }

                .data {
                    display: flex;
                    align-items: center;
                    gap: 12px;

                    grid-area: data;

                    @include media($cp) {
                        flex-direction: column;
                    }
                }

                .title {
                    grid-area: title;
                }

                .settings {
                    grid-area: settings;

                    @include media($cp) {
                        position: absolute;

                        top: -56px;
                        right: 0;

                        margin: 0px 12px;
                    }
                }
            }
        }

        .body {
            max-width: 100%;

            display: flex;
            flex-direction: column;
            gap: 16px;

            font-size: var(--font-size, 16px);

            :global(pre) {
                width: 100%;
                overflow-x: auto;
            }
        }

        footer {
            width: 100%;
            padding-bottom: 16px;

            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
</style>
