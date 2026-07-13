export default function Logo({ size = 'grande' }) {
    const tamaños = {
        pequeño: { fontSize: '20px', padding: '6px 14px' },
        mediano: { fontSize: '28px', padding: '8px 18px' },
        grande: { fontSize: '38px', padding: '10px 24px' },
    };

    const estilo = tamaños[size] || tamaños.grande;

    return (
        <div
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2px',
                backgroundColor: '#1A1A1A',
                borderRadius: '10px',
                padding: estilo.padding,
            }}
        >
      <span
          style={{
              fontFamily: "'Segoe UI', sans-serif",
              fontWeight: 900,
              fontStyle: 'italic',
              fontSize: estilo.fontSize,
              color: '#EC1C24',
              letterSpacing: '-1px',
          }}
      >
        PLAZA
      </span>
            <span
                style={{
                    fontFamily: "'Segoe UI', sans-serif",
                    fontWeight: 900,
                    fontStyle: 'italic',
                    fontSize: estilo.fontSize,
                    color: '#FFD100',
                    letterSpacing: '-1px',
                }}
            >
        VEA
      </span>
        </div>
    );
}