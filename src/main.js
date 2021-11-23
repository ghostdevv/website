import 'svelte-hamburgers/dist/css/types/squeeze.css';
import 'svelte-hamburgers/dist/css/base.css';
import 'ghostsui/css/ghostsui.css';

import { registerSW } from 'virtual:pwa-register';
import App from './App.svelte';

// Update/register service worker
registerSW()();

const app = new App({ target: document.body });

export default app;
