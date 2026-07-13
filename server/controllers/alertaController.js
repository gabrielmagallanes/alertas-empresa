const Alerta = require('../models/Alerta');
const PushSubscription = require('../models/PushSubscription');
const { enviarNotificacionATodos } = require('../services/webPushService');

async function crearAlerta(req, res) {
    try {
        const { tipo, mensaje } = req.body;

        if (!tipo || !mensaje) {
            return res.status(400).json({ mensaje: 'Tipo y mensaje son obligatorios' });
        }

        const id = await Alerta.crear({
            tipo,
            mensaje,
            enviadoPor: req.usuario.id,
        });

        const suscripciones = await PushSubscription.listarActivas();
        if (suscripciones.length > 0) {
            enviarNotificacionATodos(suscripciones, {
                title: 'Alerta Empresa',
                body: mensaje,
            }).catch((err) => console.error('Error enviando push:', err));
        }

        res.status(201).json({ mensaje: 'Alerta enviada', id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al enviar alerta' });
    }
}

async function listarAlertas(req, res) {
    try {
        const alertas = await Alerta.listar();
        res.json(alertas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener historial' });
    }
}

module.exports = { crearAlerta, listarAlertas };