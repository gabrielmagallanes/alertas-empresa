export default function Modal({ titulo, mensaje, onConfirmar, onCancelar }) {
    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 100,
            }}
        >
            <div
                style={{
                    backgroundColor: '#1E293B',
                    padding: '24px',
                    borderRadius: '16px',
                    width: '320px',
                }}
            >
                <h3 style={{ marginBottom: '8px' }}>{titulo}</h3>
                <p style={{ color: '#94A3B8', marginBottom: '20px' }}>{mensaje}</p>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                        onClick={onCancelar}
                        style={{
                            flex: 1,
                            padding: '10px',
                            backgroundColor: 'transparent',
                            border: '1px solid #334155',
                            borderRadius: '8px',
                            color: '#fff',
                        }}
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirmar}
                        style={{
                            flex: 1,
                            padding: '10px',
                            backgroundColor: '#3B82F6',
                            border: 'none',
                            borderRadius: '8px',
                            color: '#fff',
                        }}
                    >
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    );
}