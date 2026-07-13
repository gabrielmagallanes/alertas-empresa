import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Logo from './Logo.jsx';

export default function Sidebar() {
    const { usuario, isAdmin, cerrarSesion } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    function handleLogout() {
        cerrarSesion();
        navigate('/login');
    }

    const links = [
        { to: '/dashboard', label: 'Dashboard', icon: '📢' },
        { to: '/historial', label: 'Historial', icon: '📜' },
        ...(isAdmin ? [{ to: '/usuarios', label: 'Usuarios', icon: '👥' }] : []),
        { to: '/perfil', label: 'Perfil', icon: '👤' },
    ];

    return (
        <div
            style={{
                width: '240px',
                backgroundColor: '#0B1220',
                borderRight: '1px solid #1E293B',
                height: '100vh',
                padding: '24px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                <Logo size="pequeño" />
            </div>

            <div
                style={{
                    padding: '14px',
                    backgroundColor: '#111A2B',
                    borderRadius: '12px',
                    marginBottom: '20px',
                }}
            >
                <p style={{ fontWeight: 700, fontSize: '15px' }}>{usuario?.nombre}</p>
                <p style={{ fontSize: '12px', color: '#64748B', textTransform: 'capitalize' }}>
                    {usuario?.cargo || usuario?.rol}
                </p>
            </div>

            {links.map((link) => {
                const activo = location.pathname === link.to;
                return (
                    <Link
                        key={link.to}
                        to={link.to}
                        style={{
                            padding: '12px 14px',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            fontSize: '14px',
                            fontWeight: activo ? 700 : 500,
                            backgroundColor: activo ? 'rgba(236, 28, 36, 0.15)' : 'transparent',
                            color: activo ? '#FFD100' : '#CBD5E1',
                            borderLeft: activo ? '3px solid #EC1C24' : '3px solid transparent',
                            transition: 'background-color 0.15s ease',
                        }}
                    >
                        <span>{link.icon}</span>
                        {link.label}
                    </Link>
                );
            })}

            <button
                onClick={handleLogout}
                style={{
                    marginTop: 'auto',
                    padding: '12px',
                    backgroundColor: 'transparent',
                    border: '1px solid #EC1C24',
                    borderRadius: '10px',
                    color: '#EC1C24',
                    fontWeight: 600,
                    fontSize: '14px',
                }}
            >
                Cerrar sesión
            </button>
        </div>
    );
}