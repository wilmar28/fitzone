function InfoModal({
  isOpen,
  title,
  description,
  details,
  confirmLabel,
  onConfirm,
  onClose,
  plan, // objeto plan opcional: { precio, periodo, badge }
}) {
  if (!isOpen) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        animation: 'backdropIn 0.2s ease',
      }}
    >
      <style>{`
        @keyframes backdropIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        .im-close:hover { background: rgba(255,255,255,0.14) !important; }
        .im-cancel:hover { border-color: rgba(255,255,255,0.3) !important; color: #f8fafc !important; }
        .im-buy:hover { opacity: 0.88; transform: translateY(-1px); box-shadow: 0 8px 28px rgba(255,75,99,0.45) !important; }
        .im-detail-row:hover { background: rgba(255,255,255,0.04) !important; }
      `}</style>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(480px, 100%)',
          background: '#0e0e0e',
          border: '1px solid rgba(255,75,99,0.2)',
          borderRadius: '20px',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)',
          animation: 'modalIn 0.28s cubic-bezier(0.34,1.3,0.64,1)',
        }}
      >
        {/* Barra de acento superior */}
        <div style={{
          height: '3px',
          background: 'linear-gradient(90deg, #ff4b63, #ff8a00)',
        }} />

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="im-close"
          style={{
            position: 'absolute',
            top: '1.1rem',
            right: '1.1rem',
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#94a3b8',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s',
            zIndex: 2,
          }}
        >
          ✕
        </button>

        {/* Header */}
        <div style={{ padding: '1.6rem 1.8rem 1.2rem' }}>
          {/* Badge plan */}
          {plan?.badge && (
            <span style={{
              display: 'inline-block',
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '0.22rem 0.75rem',
              borderRadius: '999px',
              background: 'rgba(255,138,0,0.15)',
              border: '1px solid rgba(255,138,0,0.3)',
              color: '#fdba74',
              marginBottom: '0.65rem',
            }}>
              {plan.badge}
            </span>
          )}

          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: '1.25rem',
            fontWeight: 800,
            color: '#f8fafc',
            margin: '0 0 0.35rem',
            paddingRight: '2.2rem',
            lineHeight: 1.2,
          }}>
            {title}
          </h2>

          <p style={{
            color: '#64748b',
            fontSize: '0.82rem',
            margin: 0,
            lineHeight: 1.6,
          }}>
            {description}
          </p>
        </div>

        {/* Precio destacado */}
        {plan?.precio && (
          <div style={{
            margin: '0 1.8rem',
            padding: '1rem 1.2rem',
            borderRadius: '12px',
            background: 'rgba(255,75,99,0.06)',
            border: '1px solid rgba(255,75,99,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.2rem',
          }}>
            <div>
              <div style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.2rem' }}>
                Precio del plan
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                <span style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '2rem',
                  fontWeight: 800,
                  background: 'linear-gradient(120deg,#ff4b63,#ff8a00)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  lineHeight: 1,
                }}>
                  {plan.precio}
                </span>
                <span style={{ color: '#475569', fontSize: '0.78rem' }}>
                  {plan.periodo || '/mes'}
                </span>
              </div>
            </div>
            {/* Icono escudo */}
            <div style={{
              width: '44px', height: '44px', borderRadius: '50%',
              background: 'rgba(255,75,99,0.1)',
              border: '1px solid rgba(255,75,99,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                   stroke="rgba(255,75,99,0.8)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
          </div>
        )}

        {/* Separador */}
        <div style={{ margin: '0 1.8rem 1rem', height: '1px', background: 'rgba(255,255,255,0.06)' }} />

        {/* Lista de detalles */}
        <div style={{ padding: '0 1.8rem', marginBottom: '1.6rem' }}>
          <div style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.7rem' }}>
            Incluye
          </div>
          {details?.map((item, i) => (
            <div
              key={i}
              className="im-detail-row"
              style={{
                display: 'flex',
                gap: '0.75rem',
                padding: '0.6rem 0.65rem',
                borderRadius: '8px',
                alignItems: 'flex-start',
                transition: 'background 0.15s',
                marginBottom: '0.2rem',
              }}
            >
              {/* Check icon */}
              <div style={{
                width: '18px', height: '18px', borderRadius: '50%',
                background: 'rgba(34,197,94,0.12)',
                border: '1px solid rgba(34,197,94,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, marginTop: '1px',
              }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none"
                     stroke="rgb(34,197,94)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <span style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          padding: '1.2rem 1.8rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(255,255,255,0.02)',
          display: 'flex',
          gap: '0.7rem',
          alignItems: 'center',
        }}>
          <button
            onClick={onClose}
            className="im-cancel"
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#64748b',
              borderRadius: '10px',
              padding: '0.7rem 1.1rem',
              cursor: 'pointer',
              fontSize: '0.82rem',
              fontWeight: 600,
              transition: 'border-color 0.2s, color 0.2s',
              whiteSpace: 'nowrap',
            }}
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm || onClose}
            className="im-buy"
            style={{
              flex: 1,
              background: 'linear-gradient(120deg, #ff4b63, #ff8a00)',
              border: 'none',
              color: 'white',
              borderRadius: '10px',
              padding: '0.75rem 1.2rem',
              cursor: 'pointer',
              fontSize: '0.88rem',
              fontWeight: 700,
              transition: 'opacity 0.2s, transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 4px 18px rgba(255,75,99,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
            {confirmLabel || 'Comprar ahora'}
          </button>
        </div>

      </div>
    </div>
  )
}

export default InfoModal
