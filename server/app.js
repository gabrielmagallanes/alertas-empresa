const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const alertaRoutes = require('./routes/alertaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/alertas', alertaRoutes);
app.use('/api/usuarios', usuarioRoutes);

app.get('/api/health', (req, res) => {
    res.json({ estado: 'ok' });
});

module.exports = app;