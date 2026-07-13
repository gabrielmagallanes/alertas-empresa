const express = require('express');
const router = express.Router();
const { registrar, login, perfil } = require('../controllers/authController');
const { verificarToken } = require('../middleware/auth');

router.post('/registrar', registrar);
router.post('/login', login);
router.get('/perfil', verificarToken, perfil);

module.exports = router;