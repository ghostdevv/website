<script>
    import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';
    import PostGroup from '$lib/components/posts/cards/PostGroup.svelte';
    import { faTwitter } from '@fortawesome/free-brands-svg-icons';
    import Loader from '$lib/components/Loader.svelte';
    import Fa from 'svelte-fa';

    const postsPromise = fetch('/posts.json').then((res) => res.json());
</script>

<section class="column g32">
    <div class="column">
        <h1>👋 Hey, I'm Willow <span class="aka">(aka GHOST)</span></h1>
        <p>I am a self-taught fullstack web developer from the UK.</p>
    </div>

    <div class="row">
        <Fa size="lg" icon={faDiscord} />
        <Fa size="lg" icon={faGithub} />
        <Fa size="lg" icon={faTwitter} />
    </div>
</section>

{#await postsPromise}
    <Loader />
{:then posts}
    <h2>Latest Posts</h2>

    <PostGroup delay={500} {posts} />
{:catch}
    <p class="tcenter">
        There was an error loading posts! Contact <mark>GHOST#7524</mark> on discord
    </p>
{/await}

<style>
    .aka {
        opacity: 0.6;
        font-size: 0.8rem;
    }
</style>
