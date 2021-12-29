import { writable } from 'svelte-local-storage-store';

export const fontSize = writable('post-font-size', 18);
export const codeTheme = writable('post-code-theme', 'material-darker');
