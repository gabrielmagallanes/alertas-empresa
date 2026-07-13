const coloresPorTipo = {
    nsg: '#EC1C24',
    municipalidad: '#F97316',
    calidad: '#FFD100',
    fum: '#22C55E',
    zonal: '#3B82F6',
    regis: '#A855F7',
};

export default function AlertCard({ alerta }) {
    const color = coloresPorTipo[alerta.tipo] || '#3B82F6';
    const fecha = new Date(alerta.creado_en).toLocaleString('es-PE');
    const iniciales = alerta.enviado_por_nombre
        ?.split(' ')
        .map((p) => p[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

    return (
        <div
            style={{
                backgroundColor: '#0F172A',
                border: '1px solid #1E293B',
                borderRadius: '14px',
                padding: '16px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '12px',
            }}
        >
            <div
                style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    backgroundColor: color,
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '14px',
                    color: '#fff',
                }}
            >
                {iniciales}
            </div>
            <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 700, fontSize: '15px' }}>{alerta.mensaje}</p>
                <p style={{ fontSize: '13px', color: '#64748B', marginTop: '2px' }}>
                    Por {alerta.enviado_por_nombre} · {fecha}
                </p>
            </div>
            <div
                style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: color,
                }}
            />
        </div>
    );
}