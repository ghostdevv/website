import { build, files, timestamp } from '$service-worker';
import { precacheAndRoute } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';

clientsClaim();

self.skipWaiting();

precacheAndRoute([
    ...build.map((url) => ({ url, revision: null })),
    ...files.map((url) => ({ url, revision: timestamp.toString() })),
]);
