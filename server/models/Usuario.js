const pool = require('../config/database');

class Usuario {
    static async crear({ nombre, correo, password, cargo, telefono, rol }) {
        const result = await pool.query(
            `INSERT INTO usuarios (nombre, correo, password, cargo, telefono, rol)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
            [nombre, correo, password, cargo, telefono, rol]
        );
        return result.rows[0].id;
    }

    static async buscarPorCorreo(correo) {
        const result = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
        return result.rows[0];
    }

    static async buscarPorId(id) {
        const result = await pool.query(
            'SELECT id, nombre, correo, cargo, telefono, rol, activo FROM usuarios WHERE id = $1',
            [id]
        );
        return result.rows[0];
    }

    static async listarTodos() {
        const result = await pool.query(
            'SELECT id, nombre, correo, cargo, telefono, rol, activo, creado_en FROM usuarios ORDER BY creado_en DESC'
        );
        return result.rows;
    }

    static async listarActivos() {
        const result = await pool.query('SELECT id FROM usuarios WHERE activo = TRUE');
        return result.rows;
    }

    static async actualizarEstado(id, activo) {
        await pool.query('UPDATE usuarios SET activo = $1 WHERE id = $2', [activo, id]);
    }
}

module.exports = Usuario;