export default function Button({ children, onClick, loading, color, type = 'button' }) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={loading}
            style={{
                width: '100%',
                padding: '14px 24px',
                backgroundColor: color || '#3B82F6',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: 600,
                opacity: loading ? 0.7 : 1,
            }}
        >
            {loading ? 'Cargando...' : children}
        </button>
    );
}