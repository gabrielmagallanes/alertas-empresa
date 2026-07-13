import api from './api';

export async function enviarAlerta(tipo, mensaje) {
    const { data } = await api.post('/alertas', { tipo, mensaje });
    return data;
}

export async function obtenerAlertas() {
    const { data } = await api.get('/alertas');
    return data;
}