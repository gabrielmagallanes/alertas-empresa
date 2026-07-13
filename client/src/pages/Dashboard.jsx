import { useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import Navbar from '../components/Navbar.jsx';
import Modal from '../components/Modal.jsx';
import { enviarAlerta } from '../services/alertaService.js';

const tiposAlerta = [
    { id: 'nsg', nombre: 'NSG', color: '#EC1C24', icon: '🛡️' },
    { id: 'municipalidad', nombre: 'Municipalidad', color: '#F97316', icon: '🏛️' },
    { id: 'calidad', nombre: 'Calidad', color: '#FFD100', textColor: '#1A1A1A', icon: '✅' },
    { id: 'fum', nombre: 'Fum', color: '#22C55E', icon: '🧴' },
    { id: 'zonal', nombre: 'Zonal', color: '#3B82F6', icon: '📍' },
    { id: 'regis', nombre: 'Regis', color: '#A855F7', icon: '📋' },
];

export default function Dashboard() {
    const [seleccionado, setSeleccionado] = useState(null);
    const [mensajeExito, setMensajeExito] = useState('');
    const [tipoMensaje, setTipoMensaje] = useState('exito');

    async function confirmarEnvio() {
        try {
            await enviarAlerta(seleccionado.id, `${seleccionado.nombre} está en tienda`);
            setTipoMensaje('exito');
            setMensajeExito('Alerta enviada correctamente');
            setTimeout(() => setMensajeExito(''), 3000);
        } catch (error) {
            setTipoMensaje('error');
            setMensajeExito('Error al enviar la alerta');
            setTimeout(() => setMensajeExito(''), 3000);
        } finally {
            setSeleccionado(null);
        }
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0B1220' }}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <Navbar titulo="Enviar Alerta" />
                <div style={{ padding: '32px' }}>
                    <p style={{ color: '#64748B', marginBottom: '24px', fontSize: '14px' }}>
                        Selecciona el tipo de alerta que deseas notificar a todo el personal activo
                    </p>

                    {mensajeExito && (
                        <div
                            style={{
                                backgroundColor: tipoMensaje === 'exito' ? 'rgba(34, 197, 94, 0.12)' : 'rgba(236, 28, 36, 0.12)',
                                border: `1px solid ${tipoMensaje === 'exito' ? 'rgba(34, 197, 94, 0.4)' : 'rgba(236, 28, 36, 0.4)'}`,
                                borderRadius: '12px',
                                padding: '14px 18px',
                                marginBottom: '20px',
                            }}
                        >
                            <p style={{ color: tipoMensaje === 'exito' ? '#4ADE80' : '#F87171', margin: 0, fontWeight: 600 }}>
                                {mensajeExito}
                            </p>
                        </div>
                    )}

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
                            gap: '18px',
                        }}
                    >
                        {tiposAlerta.map((tipo) => (
                            <button
                                key={tipo.id}
                                onClick={() => setSeleccionado(tipo)}
                                style={{
                                    backgroundColor: tipo.color,
                                    border: 'none',
                                    borderRadius: '18px',
                                    padding: '32px 20px',
                                    color: tipo.textColor || '#fff',
                                    fontSize: '18px',
                                    fontWeight: 700,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '10px',
                                    boxShadow: `0 10px 25px ${tipo.color}40`,
                                    cursor: 'pointer',
                                    transition: 'transform 0.15s ease',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
                                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                            >
                                <span style={{ fontSize: '28px' }}>{tipo.icon}</span>
                                {tipo.nombre}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {seleccionado && (
                <Modal
                    titulo="¿Enviar alerta?"
                    mensaje={`${seleccionado.nombre} está en tienda`}
                    onConfirmar={confirmarEnvio}
                    onCancelar={() => setSeleccionado(null)}
                />
            )}
        </div>
    );
}