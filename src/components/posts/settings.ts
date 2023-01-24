import { persisted } from 'svelte-local-storage-store';

export const fontSize = persisted('post-font-size', 18);
export const lineHeight = persisted('post-line-height', 1.8);
