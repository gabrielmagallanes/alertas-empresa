const express = require('express');
const router = express.Router();
const { crearAlerta, listarAlertas } = require('../controllers/alertaController');
const { verificarToken } = require('../middleware/auth');

router.post('/', verificarToken, crearAlerta);
router.get('/', verificarToken, listarAlertas);

module.exports = router;