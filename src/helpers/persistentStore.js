import { writable } from 'svelte/store';

export const createWritable = (key, startValue) => {
    const { subscribe, set, update } = writable(startValue);

    let writingToLocal = false;
    let unsubscribe;

    return {
        subscribe,
        set,
        update,
        useLocalStorage: () => {
            if (writingToLocal === true)
                return () => (unsubscribe(), (writingToLocal = false));

            writingToLocal = true;

            const json = localStorage.getItem(key);
            if (json) {
                set(JSON.parse(json));
            }

            unsubscribe = subscribe((current) => {
                localStorage.setItem(key, JSON.stringify(current));
            });

            return () => (unsubscribe(), (writingToLocal = false));
        },
    };
