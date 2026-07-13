import { createContext, useContext, useState, useEffect } from 'react';
import * as authService from '../services/authService';
import { suscribirseANotificaciones } from '../services/notificationService';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const usuarioGuardado = authService.obtenerUsuarioActual();
        if (usuarioGuardado) {
            setUsuario(usuarioGuardado);
        }
        setCargando(false);
    }, []);

    async function iniciarSesion(correo, password) {
        const datosUsuario = await authService.login(correo, password);
        setUsuario(datosUsuario);
        suscribirseANotificaciones(api);
        return datosUsuario;
    }

    function cerrarSesion() {
        authService.logout();
        setUsuario(null);
    }

    const isAdmin = usuario?.rol === 'administrador';

    return (
        <AuthContext.Provider
            value={{ usuario, cargando, iniciarSesion, cerrarSesion, isAdmin }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}