import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import Navbar from '../components/Navbar.jsx';
import AlertCard from '../components/AlertCard.jsx';
import { obtenerAlertas } from '../services/alertaService.js';

export default function Historial() {
    const [alertas, setAlertas] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        obtenerAlertas()
            .then(setAlertas)
            .finally(() => setCargando(false));
    }, []);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0B1220' }}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <Navbar titulo="Historial" />
                <div style={{ padding: '32px', maxWidth: '720px' }}>
                    <p style={{ color: '#64748B', marginBottom: '24px', fontSize: '14px' }}>
                        Registro completo de todas las alertas enviadas
                    </p>

                    {cargando && (
                        <p style={{ color: '#64748B', textAlign: 'center', padding: '40px 0' }}>
                            Cargando...
                        </p>
                    )}

                    {!cargando && alertas.length === 0 && (
                        <div
                            style={{
                                textAlign: 'center',
                                padding: '60px 20px',
                                backgroundColor: '#0F172A',
                                border: '1px solid #1E293B',
                                borderRadius: '14px',
                            }}
                        >
                            <p style={{ fontSize: '32px', marginBottom: '8px' }}>📭</p>
                            <p style={{ color: '#64748B' }}>Sin alertas registradas todavía</p>
                        </div>
                    )}

                    {alertas.map((alerta) => (
                        <AlertCard key={alerta.id} alerta={alerta} />
                    ))}
                </div>
            </div>
        </div>
    );
}