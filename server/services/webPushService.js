const webpush = require('web-push');
require('dotenv').config();

webpush.setVapidDetails(
    'mailto:admin@alertasempresa.com',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);

async function enviarNotificacionATodos(suscripciones, payload) {
    const resultados = await Promise.allSettled(
        suscripciones.map((sub) => {
            const subscription = {
                endpoint: sub.endpoint,
                keys: { p256dh: sub.p256dh, auth: sub.auth },
            };
            return webpush.sendNotification(subscription, JSON.stringify(payload));
        })
    );

    const exitosas = resultados.filter((r) => r.status === 'fulfilled').length;
    console.log(`Notificaciones enviadas: ${exitosas}/${suscripciones.length}`);
    return resultados;
}

module.exports = { enviarNotificacionATodos };