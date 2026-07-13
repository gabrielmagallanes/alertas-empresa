const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
require('dotenv').config();

async function registrar(req, res) {
    try {
        const { nombre, correo, password, cargo, telefono, rol } = req.body;

        if (!nombre || !correo || !password) {
            return res.status(400).json({ mensaje: 'Nombre, correo y contraseña son obligatorios' });
        }

        const existente = await Usuario.buscarPorCorreo(correo);
        if (existente) {
            return res.status(409).json({ mensaje: 'Ya existe un usuario con ese correo' });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const id = await Usuario.crear({
            nombre,
            correo,
            password: passwordHash,
            cargo: cargo || '',
            telefono: telefono || '',
            rol: rol === 'administrador' ? 'administrador' : 'trabajador',
        });

        res.status(201).json({ mensaje: 'Usuario creado', id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al registrar usuario' });
    }
}

async function login(req, res) {
    try {
        const { correo, password } = req.body;

        const usuario = await Usuario.buscarPorCorreo(correo);
        if (!usuario) {
            return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos' });
        }

        if (!usuario.activo) {
            return res.status(403).json({ mensaje: 'Tu cuenta está desactivada' });
        }

        const passwordValida = await bcrypt.compare(password, usuario.password);
        if (!passwordValida) {
            return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos' });
        }

        const token = jwt.sign(
            { id: usuario.id, rol: usuario.rol, nombre: usuario.nombre },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            token,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                correo: usuario.correo,
                cargo: usuario.cargo,
                rol: usuario.rol,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al iniciar sesión' });
    }
}

async function perfil(req, res) {
    try {
        const usuario = await Usuario.buscarPorId(req.usuario.id);
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener perfil' });
    }
}

module.exports = { registrar, login, perfil };