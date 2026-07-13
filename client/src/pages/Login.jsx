import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Logo from '../components/Logo.jsx';

export default function Login() {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [focusCorreo, setFocusCorreo] = useState(false);
    const [focusPassword, setFocusPassword] = useState(false);
    const { iniciarSesion } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await iniciarSesion(correo, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.mensaje || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    }

    const inputStyle = (enfocado) => ({
        padding: '15px 16px',
        borderRadius: '12px',
        border: `1.5px solid ${enfocado ? '#EC1C24' : '#243044'}`,
        backgroundColor: '#111A2B',
        color: '#fff',
        fontSize: '15px',
        outline: 'none',
        transition: 'border-color 0.2s ease',
        width: '100%',
    });

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
                    width: '380px',
                    backgroundColor: '#0F172A',
                    border: '1px solid #1E293B',
                    borderRadius: '20px',
                    padding: '40px 32px',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '18px' }}>
                    <Logo size="grande" />
                </div>

                <p
                    style={{
                        textAlign: 'center',
                        color: '#64748B',
                        marginBottom: '32px',
                        fontSize: '13px',
                        letterSpacing: '1.5px',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                    }}
                >
                    Sistema de Alertas
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <label
                            style={{
                                display: 'block',
                                fontSize: '12px',
                                color: '#94A3B8',
                                marginBottom: '6px',
                                fontWeight: 600,
                            }}
                        >
                            CORREO
                        </label>
                        <input
                            type="email"
                            placeholder="tucorreo@empresa.com"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            onFocus={() => setFocusCorreo(true)}
                            onBlur={() => setFocusCorreo(false)}
                            required
                            style={inputStyle(focusCorreo)}
                        />
                    </div>

                    <div>
                        <label
                            style={{
                                display: 'block',
                                fontSize: '12px',
                                color: '#94A3B8',
                                marginBottom: '6px',
                                fontWeight: 600,
                            }}
                        >
                            CONTRASEÑA
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => setFocusPassword(true)}
                            onBlur={() => setFocusPassword(false)}
                            required
                            style={inputStyle(focusPassword)}
                        />
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

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            marginTop: '8px',
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
                            transition: 'transform 0.15s ease',
                        }}
                        onMouseDown={(e) => !loading && (e.currentTarget.style.transform = 'scale(0.98)')}
                        onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                        {loading ? 'Ingresando...' : 'Ingresar'}
                    </button>

                    <p style={{ textAlign: 'center', fontSize: '14px', color: '#64748B', marginTop: '4px' }}>
                        ¿No tienes cuenta?{' '}
                        <Link to="/registro" style={{ color: '#FFD100', fontWeight: 600 }}>
                            Regístrate
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}