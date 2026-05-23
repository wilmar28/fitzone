import React from 'react'

function LoanTable({ loans }) {
  const getStatusBadge = (status) => {
    let color = '56,189,248' // light blue (active)
    let label = 'Activo'

    if (status === 'devuelto') {
      color = '34,197,94' // green
      label = 'Devuelto'
    }

    return (
      <span style={{
        fontSize: '0.72rem',
        padding: '0.25rem 0.7rem',
        borderRadius: '999px',
        fontWeight: 700,
        background: `rgba(${color},0.12)`,
        border: `1px solid rgba(${color},0.3)`,
        color: `rgb(${color})`,
        textTransform: 'uppercase',
        letterSpacing: '0.03em'
      }}>
        {label}
      </span>
    )
  }

  if (!loans || loans.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
        No hay préstamos activos registrados.
      </div>
    )
  }

  return (
    <div className="card" style={{ padding: 0, overflowX: 'auto', border: '1px solid rgba(255,255,255,0.06)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <th style={{ padding: '1.1rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8' }}>ID</th>
            <th style={{ padding: '1.1rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8' }}>Usuario</th>
            <th style={{ padding: '1.1rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8' }}>Accesorio Prestado</th>
            <th style={{ padding: '1.1rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8' }}>Fecha Préstamo</th>
            <th style={{ padding: '1.1rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8' }}>Estado</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan, idx) => (
            <tr 
              key={loan.id} 
              style={{ 
                borderBottom: idx === loans.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.04)',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <td style={{ padding: '1rem 1.5rem', color: '#64748b', fontSize: '0.85rem' }}>#{loan.id}</td>
              <td style={{ padding: '1rem 1.5rem', color: 'white', fontWeight: 600, fontSize: '0.9rem' }}>{loan.usuario}</td>
              <td style={{ padding: '1rem 1.5rem', color: '#cbd5e1', fontSize: '0.85rem' }}>{loan.dispositivo}</td>
              <td style={{ padding: '1rem 1.5rem', color: '#94a3b8', fontSize: '0.82rem' }}>{loan.fecha_prestamo}</td>
              <td style={{ padding: '1rem 1.5rem' }}>{getStatusBadge(loan.estado)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LoanTable
