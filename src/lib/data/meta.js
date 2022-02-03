import { writable } from 'svelte/store';

const initial = {
    title: 'GHOST - Developer',
    image: 'https://ghostdev.xyz/banner.png',
    description:
        'Hi I am GHOST! Welcome to my site, here you can look at my posts, find out more about what I do, follow me on socials, and donate!',
};

function createMetaDataStore() {
    const { subscribe, set, update } = writable(initial);

    return {
        subscribe,
        set,
        update,

        reset() {
            set(initial);
        },
    };
}

export const metaData = createMetaDataStore();
