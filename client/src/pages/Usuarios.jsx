import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import Navbar from '../components/Navbar.jsx';
import api from '../services/api.js';

export default function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        cargarUsuarios();
    }, []);

    async function cargarUsuarios() {
        setCargando(true);
        const { data } = await api.get('/usuarios');
        setUsuarios(data);
        setCargando(false);
    }

    async function cambiarEstado(id, activo) {
        await api.patch(`/usuarios/${id}/estado`, { activo: !activo });
        cargarUsuarios();
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0B1220' }}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <Navbar titulo="Usuarios" />
                <div style={{ padding: '32px', maxWidth: '720px' }}>
                    <p style={{ color: '#64748B', marginBottom: '24px', fontSize: '14px' }}>
                        Gestiona el acceso del personal al sistema
                    </p>

                    {cargando && (
                        <p style={{ color: '#64748B', textAlign: 'center', padding: '40px 0' }}>
                            Cargando...
                        </p>
                    )}

                    {!cargando &&
                        usuarios.map((u) => {
                            const iniciales = u.nombre
                                ?.split(' ')
                                .map((p) => p[0])
                                .slice(0, 2)
                                .join('')
                                .toUpperCase();

                            return (
                                <div
                                    key={u.id}
                                    style={{
                                        backgroundColor: '#0F172A',
                                        border: '1px solid #1E293B',
                                        borderRadius: '14px',
                                        padding: '16px 18px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: '12px',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                        <div
                                            style={{
                                                width: '44px',
                                                height: '44px',
                                                borderRadius: '12px',
                                                backgroundColor: u.rol === 'administrador' ? '#EC1C24' : '#243044',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 700,
                                                fontSize: '14px',
                                                color: '#fff',
                                                flexShrink: 0,
                                            }}
                                        >
                                            {iniciales}
                                        </div>
                                        <div>
                                            <p style={{ fontWeight: 700, fontSize: '15px' }}>{u.nombre}</p>
                                            <p style={{ fontSize: '13px', color: '#64748B', textTransform: 'capitalize' }}>
                                                {u.cargo || 'Sin cargo'} · {u.rol}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => cambiarEstado(u.id, u.activo)}
                                        style={{
                                            padding: '8px 18px',
                                            borderRadius: '20px',
                                            border: 'none',
                                            backgroundColor: u.activo ? 'rgba(34, 197, 94, 0.15)' : 'rgba(236, 28, 36, 0.15)',
                                            color: u.activo ? '#4ADE80' : '#F87171',
                                            fontWeight: 700,
                                            fontSize: '13px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {u.activo ? '● Activo' : '● Inactivo'}
                                    </button>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}