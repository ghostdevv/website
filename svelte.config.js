import preprocess from 'svelte-preprocess';
import auto from '@sveltejs/adapter-auto';
import path from 'path';

export default {
    kit: {
        adapter: auto(),
    },

    preprocess: preprocess(),
};
