export default function Navbar({ titulo }) {
    return (
        <div
            style={{
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 32px',
                borderBottom: '1px solid #1E293B',
                backgroundColor: '#0B1220',
            }}
        >
            <h2 style={{ fontSize: '20px', fontWeight: 700 }}>{titulo}</h2>
        </div>
    );
}