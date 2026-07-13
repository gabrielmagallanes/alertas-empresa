import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Login from '../pages/Login.jsx';
import Registro from '../pages/Registro.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import Historial from '../pages/Historial.jsx';
import Usuarios from '../pages/Usuarios.jsx';
import Perfil from '../pages/Perfil.jsx';

function RutaPrivada({ children }) {
    const { usuario, cargando } = useAuth();
    if (cargando) return null;
    return usuario ? children : <Navigate to="/login" />;
}

function RutaAdmin({ children }) {
    const { isAdmin, cargando } = useAuth();
    if (cargando) return null;
    return isAdmin ? children : <Navigate to="/dashboard" />;
}

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route
                path="/dashboard"
                element={
                    <RutaPrivada>
                        <Dashboard />
                    </RutaPrivada>
                }
            />
            <Route
                path="/historial"
                element={
                    <RutaPrivada>
                        <Historial />
                    </RutaPrivada>
                }
            />
            <Route
                path="/usuarios"
                element={
                    <RutaPrivada>
                        <RutaAdmin>
                            <Usuarios />
                        </RutaAdmin>
                    </RutaPrivada>
                }
            />
            <Route
                path="/perfil"
                element={
                    <RutaPrivada>
                        <Perfil />
                    </RutaPrivada>
                }
            />
            <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
    );
}