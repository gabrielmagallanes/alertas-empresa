import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registrar } from '../services/authService.js';
import Logo from '../components/Logo.jsx';

export default function Registro() {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [cargo, setCargo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [rol, setRol] = useState('trabajador');
    const [error, setError] = useState('');
    const [exito, setExito] = useState('');
    const [loading, setLoading] = useState(false);
    const [enfocado, setEnfocado] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setExito('');
        setLoading(true);
        try {
            await registrar({ nombre, correo, password, cargo, telefono, rol });
            setExito('Cuenta creada correctamente. Redirigiendo al login...');
            setTimeout(() => navigate('/login'), 1500);
        } catch (err) {
            setError(err.response?.data?.mensaje || 'Error al registrar usuario');
        } finally {
            setLoading(false);
        }
    }

    const campoStyle = (nombreCampo) => ({
        padding: '14px 16px',
        borderRadius: '12px',
        border: `1.5px solid ${enfocado === nombreCampo ? '#EC1C24' : '#243044'}`,
        backgroundColor: '#111A2B',
        color: '#fff',
        fontSize: '15px',
        outline: 'none',
        transition: 'border-color 0.2s ease',
        width: '100%',
    });

    const labelStyle = {
        display: 'block',
        fontSize: '12px',
        color: '#94A3B8',
        marginBottom: '6px',
        fontWeight: 600,
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'radial-gradient(circle at top, #16213A 0%, #0B1220 65%)',
                padding: '24px',
            }}
        >
            <div
                style={{
                    width: '400px',
                    backgroundColor: '#0F172A',
                    border: '1px solid #1E293B',
                    borderRadius: '20px',
                    padding: '36px 32px',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
                    <Logo size="mediano" />
                </div>

                <p
                    style={{
                        textAlign: 'center',
                        color: '#64748B',
                        marginBottom: '28px',
                        fontSize: '13px',
                        letterSpacing: '1.5px',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                    }}
                >
                    Crear cuenta
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div>
                        <label style={labelStyle}>NOMBRE COMPLETO</label>
                        <input
                            type="text"
                            placeholder="Ej: Dayron Magallanes"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            onFocus={() => setEnfocado('nombre')}
                            onBlur={() => setEnfocado('')}
                            required
                            style={campoStyle('nombre')}
                        />
                    </div>

                    <div>
                        <label style={labelStyle}>CORREO</label>
                        <input
                            type="email"
                            placeholder="tucorreo@empresa.com"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            onFocus={() => setEnfocado('correo')}
                            onBlur={() => setEnfocado('')}
                            required
                            style={campoStyle('correo')}
                        />
                    </div>

                    <div>
                        <label style={labelStyle}>CONTRASEÑA</label>
                        <input
                            type="password"
                            placeholder="Mínimo 6 caracteres"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => setEnfocado('password')}
                            onBlur={() => setEnfocado('')}
                            required
                            minLength={6}
                            style={campoStyle('password')}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                        <div style={{ flex: 1 }}>
                            <label style={labelStyle}>CARGO</label>
                            <input
                                type="text"
                                placeholder="Supervisor"
                                value={cargo}
                                onChange={(e) => setCargo(e.target.value)}
                                onFocus={() => setEnfocado('cargo')}
                                onBlur={() => setEnfocado('')}
                                style={campoStyle('cargo')}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={labelStyle}>TELÉFONO</label>
                            <input
                                type="text"
                                placeholder="999999999"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                                onFocus={() => setEnfocado('telefono')}
                                onBlur={() => setEnfocado('')}
                                style={campoStyle('telefono')}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={labelStyle}>ROL</label>
                        <select
                            value={rol}
                            onChange={(e) => setRol(e.target.value)}
                            style={{ ...campoStyle('rol'), cursor: 'pointer' }}
                            onFocus={() => setEnfocado('rol')}
                            onBlur={() => setEnfocado('')}
                        >
                            <option value="trabajador">Trabajador</option>
                            <option value="administrador">Administrador</option>
                        </select>
                    </div>

                    {error && (
                        <div
                            style={{
                                backgroundColor: 'rgba(236, 28, 36, 0.12)',
                                border: '1px solid rgba(236, 28, 36, 0.4)',
                                borderRadius: '10px',
                                padding: '10px 14px',
                            }}
                        >
                            <p style={{ color: '#F87171', fontSize: '13px', margin: 0 }}>{error}</p>
                        </div>
                    )}

                    {exito && (
                        <div
                            style={{
                                backgroundColor: 'rgba(34, 197, 94, 0.12)',
                                border: '1px solid rgba(34, 197, 94, 0.4)',
                                borderRadius: '10px',
                                padding: '10px 14px',
                            }}
                        >
                            <p style={{ color: '#4ADE80', fontSize: '13px', margin: 0 }}>{exito}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            marginTop: '6px',
                            padding: '15px',
                            borderRadius: '12px',
                            border: 'none',
                            background: loading
                                ? '#7f1d1d'
                                : 'linear-gradient(135deg, #EC1C24 0%, #C4161D 100%)',
                            color: '#fff',
                            fontSize: '16px',
                            fontWeight: 700,
                            cursor: loading ? 'default' : 'pointer',
                            boxShadow: loading ? 'none' : '0 8px 20px rgba(236, 28, 36, 0.35)',
                        }}
                    >
                        {loading ? 'Creando cuenta...' : 'Registrarme'}
                    </button>

                    <p style={{ textAlign: 'center', fontSize: '14px', color: '#64748B', marginTop: '4px' }}>
                        ¿Ya tienes cuenta?{' '}
                        <Link to="/login" style={{ color: '#FFD100', fontWeight: 600 }}>
                            Inicia sesión
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}