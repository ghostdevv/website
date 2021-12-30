import { writable } from 'svelte-local-storage-store';

export const fontSize = writable('post-font-size', 16);
export const codeTheme = writable('post-code-theme', 'material-darker');
