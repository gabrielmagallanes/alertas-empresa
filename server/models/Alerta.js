const pool = require('../config/database');

class Alerta {
    static async crear({ tipo, mensaje, enviadoPor }) {
        const result = await pool.query(
            `INSERT INTO alertas (tipo, mensaje, enviado_por) VALUES ($1, $2, $3) RETURNING id`,
            [tipo, mensaje, enviadoPor]
        );
        return result.rows[0].id;
    }

    static async listar(limite = 50) {
        const result = await pool.query(
            `SELECT a.id, a.tipo, a.mensaje, a.creado_en, u.nombre AS enviado_por_nombre
       FROM alertas a
       JOIN usuarios u ON a.enviado_por = u.id
       ORDER BY a.creado_en DESC
       LIMIT $1`,
            [limite]
        );
        return result.rows;
    }
}

module.exports = Alerta;