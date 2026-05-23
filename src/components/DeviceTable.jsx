import React from 'react'

function DeviceTable({ devices }) {
  const getStatusBadge = (status) => {
    let color = '34,197,94' // green
    let label = 'Operativo'

    if (status === 'en mantencion') {
      color = '217,119,6' // orange
      label = 'En Mantenimiento'
    } else if (status === 'fuera de servicio') {
      color = '220,38,38' // red
      label = 'Fuera de Servicio'
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

  if (!devices || devices.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
        No hay dispositivos registrados.
      </div>
    )
  }

  return (
    <div className="card" style={{ padding: 0, overflowX: 'auto', border: '1px solid rgba(255,255,255,0.06)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <th style={{ padding: '1.1rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8' }}>ID</th>
            <th style={{ padding: '1.1rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8' }}>Nombre Equipo</th>
            <th style={{ padding: '1.1rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8' }}>Tipo</th>
            <th style={{ padding: '1.1rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8' }}>Estado</th>
            <th style={{ padding: '1.1rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8' }}>Última Revisión</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device, idx) => (
            <tr 
              key={device.id} 
              style={{ 
                borderBottom: idx === devices.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.04)',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <td style={{ padding: '1rem 1.5rem', color: '#64748b', fontSize: '0.85rem' }}>#{device.id}</td>
              <td style={{ padding: '1rem 1.5rem', color: 'white', fontWeight: 600, fontSize: '0.9rem' }}>{device.nombre}</td>
              <td style={{ padding: '1rem 1.5rem', color: '#cbd5e1', fontSize: '0.85rem' }}>
                <span style={{ background: 'rgba(255,255,255,0.06)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.78rem' }}>
                  {device.tipo}
                </span>
              </td>
              <td style={{ padding: '1rem 1.5rem' }}>{getStatusBadge(device.estado)}</td>
              <td style={{ padding: '1rem 1.5rem', color: '#94a3b8', fontSize: '0.82rem' }}>{device.ultima_mantencion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DeviceTable
