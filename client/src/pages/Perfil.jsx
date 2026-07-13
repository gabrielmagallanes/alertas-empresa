import Sidebar from '../components/Sidebar.jsx';
import Navbar from '../components/Navbar.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Perfil() {
    const { usuario } = useAuth();

    const iniciales = usuario?.nombre
        ?.split(' ')
        .map((p) => p[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

    const campos = [
        { label: 'Nombre', valor: usuario?.nombre },
        { label: 'Correo', valor: usuario?.correo },
        { label: 'Cargo', valor: usuario?.cargo || 'No especificado' },
        { label: 'Rol', valor: usuario?.rol },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0B1220' }}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <Navbar titulo="Perfil" />
                <div style={{ padding: '32px' }}>
                    <div
                        style={{
                            backgroundColor: '#0F172A',
                            border: '1px solid #1E293B',
                            borderRadius: '18px',
                            padding: '32px',
                            maxWidth: '420px',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
                            <div
                                style={{
                                    width: '64px',
                                    height: '64px',
                                    borderRadius: '16px',
                                    background: 'linear-gradient(135deg, #EC1C24 0%, #C4161D 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 700,
                                    fontSize: '22px',
                                    color: '#fff',
                                }}
                            >
                                {iniciales}
                            </div>
                            <div>
                                <p style={{ fontWeight: 700, fontSize: '18px' }}>{usuario?.nombre}</p>
                                <p style={{ fontSize: '13px', color: '#FFD100', fontWeight: 600, textTransform: 'capitalize' }}>
                                    {usuario?.rol}
                                </p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {campos.map((campo) => (
                                <div
                                    key={campo.label}
                                    style={{
                                        paddingBottom: '14px',
                                        borderBottom: '1px solid #1E293B',
                                    }}
                                >
                                    <p style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, letterSpacing: '1px', marginBottom: '4px' }}>
                                        {campo.label.toUpperCase()}
                                    </p>
                                    <p style={{ fontSize: '15px', color: '#E2E8F0' }}>{campo.valor}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}