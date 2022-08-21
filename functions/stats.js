export async function onRequest() {
    return fetch('https://gc.zgo.at/count.js');
}
