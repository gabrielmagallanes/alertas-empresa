const express = require('express');
const router = express.Router();
const {
    listarUsuarios,
    cambiarEstado,
    suscribirPush,
} = require('../controllers/usuarioController');
const { verificarToken, soloAdministrador } = require('../middleware/auth');

router.get('/', verificarToken, soloAdministrador, listarUsuarios);
router.patch('/:id/estado', verificarToken, soloAdministrador, cambiarEstado);
router.post('/push-subscribe', verificarToken, suscribirPush);

module.exports = router;