const Usuario = require('../models/Usuario');
const PushSubscription = require('../models/PushSubscription');

async function listarUsuarios(req, res) {
    try {
        const usuarios = await Usuario.listarTodos();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener usuarios' });
    }
}

async function cambiarEstado(req, res) {
    try {
        const { id } = req.params;
        const { activo } = req.body;
        await Usuario.actualizarEstado(id, activo);
        res.json({ mensaje: 'Estado actualizado' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar estado' });
    }
}

async function suscribirPush(req, res) {
    try {
        const subscription = req.body;
        await PushSubscription.guardar(req.usuario.id, subscription);
        res.status(201).json({ mensaje: 'Suscripción guardada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al guardar suscripción' });
    }
}

module.exports = { listarUsuarios, cambiarEstado, suscribirPush };