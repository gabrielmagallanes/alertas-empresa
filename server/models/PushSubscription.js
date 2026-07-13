const pool = require('../config/database');

class PushSubscription {
    static async guardar(usuarioId, subscription) {
        const { endpoint, keys } = subscription;

        const existe = await pool.query(
            'SELECT id FROM push_subscriptions WHERE endpoint = $1',
            [endpoint]
        );
        if (existe.rows.length > 0) return existe.rows[0].id;

        const result = await pool.query(
            `INSERT INTO push_subscriptions (usuario_id, endpoint, p256dh, auth)
       VALUES ($1, $2, $3, $4) RETURNING id`,
            [usuarioId, endpoint, keys.p256dh, keys.auth]
        );
        return result.rows[0].id;
    }

    static async listarActivas() {
        const result = await pool.query(
            `SELECT ps.endpoint, ps.p256dh, ps.auth
       FROM push_subscriptions ps
       JOIN usuarios u ON ps.usuario_id = u.id
       WHERE u.activo = TRUE`
        );
        return result.rows;
    }

    static async eliminarPorEndpoint(endpoint) {
        await pool.query('DELETE FROM push_subscriptions WHERE endpoint = $1', [endpoint]);
    }
}

module.exports = PushSubscription;