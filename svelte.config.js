import preprocess from 'svelte-preprocess';
import vercel from '@sveltejs/adapter-vercel';

export default {
    kit: {
        adapter: vercel(),

        // hydrate the <div id="svelte"> element in src/app.html
        target: '#svelte',
    },

    preprocess: preprocess(),
};
