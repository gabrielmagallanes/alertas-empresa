import api from './api';

export async function login(correo, password) {
    const { data } = await api.post('/auth/login', { correo, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('usuario', JSON.stringify(data.usuario));
    return data.usuario;
}

export async function registrar({ nombre, correo, password, cargo, telefono, rol }) {
    const { data } = await api.post('/auth/registrar', {
        nombre,
        correo,
        password,
        cargo,
        telefono,
        rol,
    });
    return data;
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
}

export function obtenerUsuarioActual() {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
}

export function estaAutenticado() {
    return !!localStorage.getItem('token');
}