const VAPID_PUBLIC_KEY = 'BKlGfza89d_JR1q4sV2tH9VyI42XTkNJbai1NPMwnRWsjesovjX3J5aNWJ9F4m3wzHCzzbW5hibxXu4FAUgp6GE';function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

export async function suscribirseANotificaciones(api) {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        console.warn('Este navegador no soporta notificaciones push');
        return;
    }

    try {
        const registration = await navigator.serviceWorker.register('/service-worker.js');

        const permiso = await Notification.requestPermission();
        if (permiso !== 'granted') {
            console.warn('Permiso de notificaciones denegado');
            return;
        }

        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
        });

        await api.post('/usuarios/push-subscribe', subscription);
        console.log('Suscripción push guardada');
    } catch (error) {
        console.error('Error al suscribirse a notificaciones:', error);
    }
}