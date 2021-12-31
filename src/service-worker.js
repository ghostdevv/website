import { build, files, timestamp } from '$service-worker';
import { skipWaiting, clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';

skipWaiting();
clientsClaim();

precacheAndRoute([
    ...build.map((url) => ({ url, revision: null })),
    ...files.map((url) => ({ url, revision: timestamp.toString() })),
]);
