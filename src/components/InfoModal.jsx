function InfoModal({
  isOpen,
  title,
  description,
  details,
  confirmLabel,
  onConfirm,
  onClose,
}) {
  if (!isOpen) return null

  return (
    <div onClick={onClose} style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.7)',
      backdropFilter: 'blur(4px)',
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: 'min(520px, 90vw)',
        background: 'linear-gradient(160deg, #0d1832, #111d3a)',
        border: '1px solid rgba(255,75,99,0.25)',
        borderRadius: '20px',
        padding: '2rem',
        position: 'relative',
        boxShadow: '0 30px 80px rgba(0,0,0,0.6)'
      }}>
        {/* Botón cerrar */}
        <button onClick={onClose} style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'rgba(255,255,255,0.08)',
          border: 'none',
          color: 'white',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          cursor: 'pointer',
          fontSize: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s ease'
        }}
        onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.12)'}
        onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.08)'}
        >
          ✕
        </button>

        {/* Título */}
        <h2 style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          color: '#f8fafc',
          margin: '0 0 0.5rem',
          paddingRight: '2rem'
        }}>
          {title}
        </h2>

        {/* Descripción */}
        <p style={{
          color: '#94a3b8',
          fontSize: '0.88rem',
          margin: '0 0 1.5rem',
          paddingRight: '2rem'
        }}>
          {description}
        </p>

        {/* Lista de detalles */}
        <div style={{ marginBottom: '1.5rem' }}>
          {details?.map((item, index) => (
            <div key={index} style={{
              display: 'flex',
              gap: '0.6rem',
              padding: '0.5rem 0',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              alignItems: 'flex-start'
            }}>
              <span style={{ color: '#ff4b63', marginTop: '0.1rem', flexShrink: 0 }}>✓</span>
              <span style={{ color: '#e2e8f0', fontSize: '0.88rem' }}>{item}</span>
            </div>
          ))}
        </div>

        {/* Footer con botones */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '0.8rem',
          marginTop: '1.5rem'
        }}>
          <button onClick={onClose} style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.15)',
            color: '#cbd5e1',
            borderRadius: '10px',
            padding: '0.7rem 1.2rem',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 600,
            transition: 'border-color 0.2s ease, color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = 'rgba(255,255,255,0.25)'
            e.target.style.color = '#f8fafc'
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = 'rgba(255,255,255,0.15)'
            e.target.style.color = '#cbd5e1'
          }}
          >
            Cerrar
          </button>

          {confirmLabel && (
            <button onClick={onConfirm} className="gradient-btn" style={{
              borderRadius: '10px',
              padding: '0.7rem 1.5rem',
              border: 'none',
              fontWeight: 700,
              cursor: 'pointer'
            }}>
              {confirmLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default InfoModal