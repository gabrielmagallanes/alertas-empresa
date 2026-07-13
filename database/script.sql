CREATE TYPE rol_usuario AS ENUM ('administrador', 'trabajador');

CREATE TABLE usuarios (
                          id SERIAL PRIMARY KEY,
                          nombre VARCHAR(100) NOT NULL,
                          correo VARCHAR(150) NOT NULL UNIQUE,
                          password VARCHAR(255) NOT NULL,
                          cargo VARCHAR(100),
                          telefono VARCHAR(20),
                          rol rol_usuario NOT NULL DEFAULT 'trabajador',
                          activo BOOLEAN NOT NULL DEFAULT TRUE,
                          creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE alertas (
                         id SERIAL PRIMARY KEY,
                         tipo VARCHAR(50) NOT NULL,
                         mensaje VARCHAR(255) NOT NULL,
                         enviado_por INT NOT NULL REFERENCES usuarios(id),
                         creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE push_subscriptions (
                                    id SERIAL PRIMARY KEY,
                                    usuario_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
                                    endpoint TEXT NOT NULL,
                                    p256dh VARCHAR(255) NOT NULL,
                                    auth VARCHAR(255) NOT NULL,
                                    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_alertas_fecha ON alertas(creado_en DESC);
CREATE INDEX idx_usuarios_correo ON usuarios(correo);
CREATE INDEX idx_push_usuario ON push_subscriptions(usuario_id);