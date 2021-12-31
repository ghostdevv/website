<script>
    import SettingsModal from '$lib/components/posts/post/SettingsModal.svelte';
    import { faTwitter } from '@fortawesome/free-brands-svg-icons';
    import { createTweetLink } from '$lib/helpers/twitter';
    import TextPostMeta from './TextPostMeta.svelte';
    import TextPostBody from './TextPostBody.svelte';
    import { fly } from 'svelte/transition';
    import { page } from '$app/stores';
    import Fa from 'svelte-fa';

    export let timestamp;
    export let title;
    export let image;
    export let body;
    export let tag;
</script>

<article>
    <TextPostMeta {timestamp} {title} {image} {tag} />

    <hr />

    <TextPostBody {body} />

    <hr />

    <footer in:fly={{ y: -20, duration: 750, delay: 200 }}>
        <a
            href={createTweetLink(
                `Checkout this awesome post by @onlyspaceghost! https://ghostdev.xyz/posts/${$page.params.slug}`,
            )}
            role="button"
            target="_blank">
            <Fa icon={faTwitter} />
            Share on twitter
        </a>

        <SettingsModal />
    </footer>
</article>

<style lang="scss">
    article {
        width: 100%;

        display: flex;
        flex-direction: column;
        gap: 16px;

        footer {
            width: 100%;
            padding-bottom: 16px;

            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
</style>
