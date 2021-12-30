import { build, files, timestamp } from '$service-worker';
import { StaleWhileRevalidate } from 'workbox-strategies';
import { skipWaiting, clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { setDefaultHandler } from 'workbox-routing';

skipWaiting();
clientsClaim();

precacheAndRoute([
    ...build.map((url) => ({ url, revision: null })),
    ...files.map((url) => ({ url, revision: timestamp.toString() })),
]);

setDefaultHandler(new StaleWhileRevalidate());
