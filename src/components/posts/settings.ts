import { writable } from 'svelte-local-storage-store';

export const fontSize = writable('post-font-size', 16);
export const lineHeight = writable('post-line-height', 1.5);
