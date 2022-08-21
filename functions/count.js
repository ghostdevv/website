export async function onRequest({ request }) {
    const url = new URL(request.url);
    return fetch(`https://ghost.goatcounter.com/count${url.search}`);
}
