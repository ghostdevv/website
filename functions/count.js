export async function onRequest() {
    return fetch('https://ghost.goatcounter.com/count');
}
