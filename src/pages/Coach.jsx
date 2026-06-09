import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getCurrentUser,
  logoutUser,
  getCoachMiembros,
  getRutinaPersonalizada,
  crearRutinaPersonalizada,
  getCoachEmailLogs
} from '../services/api'
import '../pages/Coach.css'

// ── Mock data ─────────────────────────────────────────────────────────────────
const MOCK_MIEMBROS = [
  { id: 1, nombre: 'Carlos Ramírez', email: 'carlos@example.com', plan: 'SMART', activo: true },
  { id: 2, nombre: 'Laura Gómez',    email: 'laura@example.com',  plan: 'BLACK', activo: true },
  { id: 3, nombre: 'Pedro Torres',   email: 'pedro@example.com',  plan: 'FIT',   activo: false },
  { id: 4, nombre: 'Ana Martínez',   email: 'ana@example.com',    plan: 'BLACK', activo: true },
  { id: 5, nombre: 'Juan López',     email: 'juan@example.com',   plan: 'SMART', activo: true },
]

const MOCK_RUTINAS = [
  { id: 1, nombre: 'Rutina fuerza upper', nivel: 'Intermedio', duracion_semanas: 4 },
  { id: 2, nombre: 'Cardio HIIT 3x',     nivel: 'Avanzado',   duracion_semanas: 2 },
]

const CHART_COLORS = ['#ff4b63', '#ff8a00', '#38bdf8', '#86efac', '#c084fc']

// ── SVG Icons ─────────────────────────────────────────────────────────────────
const IconHome    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
const IconMembers = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
const IconPlus    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
const IconChart   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
const IconChevron = ({ open }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    style={{ width: 16, height: 16, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
)

const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

// ── Inicio section ────────────────────────────────────────────────────────────
function InicioSection({ miembros }) {
  const total    = miembros.length
  const activos  = miembros.filter(m => m.activo).length
  const rutinas  = miembros.length * 2 // estimación mock

  return (
    <div className="admin-section">
      <h1 className="section-title">Inicio</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <p className="stat-label">Total miembros</p>
            <p className="stat-value">{total}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <p className="stat-label">Rutinas creadas</p>
            <p className="stat-value">{rutinas}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🟢</div>
          <div className="stat-content">
            <p className="stat-label">Miembros activos</p>
            <p className="stat-value">{activos}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Mis Miembros section ──────────────────────────────────────────────────────
function MiembrosSection({ miembros, onNuevaRutina }) {
  const [expandedId, setExpandedId] = useState(null)
  const [rutinasPorMiembro, setRutinasPorMiembro] = useState({})
  const [cargandoRutinas, setCargandoRutinas] = useState({})

  const toggleExpand = async (miembro) => {
    const mId = miembro.id_usuario ?? miembro.id
    if (expandedId === mId) {
      setExpandedId(null)
      return
    }
    setExpandedId(mId)
    if (rutinasPorMiembro[mId]) return // ya cargadas

    setCargandoRutinas(prev => ({ ...prev, [mId]: true }))
    try {
      const res = await getRutinaPersonalizada(mId)
      // En backend real res es { success: true, data: [...] }
      const rutinas = Array.isArray(res) ? res : res.data || res.rutinas || []
      setRutinasPorMiembro(prev => ({ ...prev, [mId]: rutinas }))
    } catch {
      setRutinasPorMiembro(prev => ({ ...prev, [mId]: MOCK_RUTINAS }))
    } finally {
      setCargandoRutinas(prev => ({ ...prev, [mId]: false }))
    }
  }

  return (
    <div className="admin-section">
      <div className="section-header">
        <h1 className="section-title">Mis Miembros</h1>
      </div>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th></th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Plan</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {miembros.map((m) => {
              const mId = m.id_usuario ?? m.id
              const isExpanded = expandedId === mId
              return (
                <tr key={mId}>
                  <td style={{ width: 40, cursor: 'pointer' }} onClick={() => toggleExpand(m)}>
                    <IconChevron open={isExpanded} />
                  </td>
                  <td>{m.nombre}</td>
                  <td style={{ color: '#94a3b8', fontSize: '0.88rem' }}>{m.email}</td>
                  <td>
                    <span className="status-badge" style={{
                      background: m.plan === 'BLACK' ? 'rgba(192,132,252,0.15)' : m.plan === 'SMART' ? 'rgba(255,138,0,0.15)' : 'rgba(56,189,248,0.15)',
                      color:      m.plan === 'BLACK' ? '#c084fc'                : m.plan === 'SMART' ? '#ff8a00'              : '#38bdf8',
                      border:     m.plan === 'BLACK' ? '1px solid rgba(192,132,252,0.3)' : m.plan === 'SMART' ? '1px solid rgba(255,138,0,0.3)' : '1px solid rgba(56,189,248,0.3)',
                    }}>
                      {m.plan}
                    </span>
                  </td>
                  <td>
                    <span className="status-badge" style={m.activo ? {} : {
                      background: 'rgba(100,116,139,0.15)', color: '#94a3b8', border: '1px solid rgba(100,116,139,0.3)',
                    }}>
                      {m.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn-secondary btn-sm" onClick={() => toggleExpand(m)}>
                        Ver rutinas
                      </button>
                      <button className="btn-primary btn-sm" onClick={() => onNuevaRutina(m)}>
                        <IconPlus /> Nueva rutina
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
            {expandedId !== null && (
              <tr className="rutinas-row">
                <td colSpan={6}>
                  {cargandoRutinas[expandedId] ? (
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Cargando rutinas...</p>
                  ) : (
                    <>
                      {(rutinasPorMiembro[expandedId] || []).length === 0 ? (
                        <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Sin rutinas asignadas.</p>
                      ) : (
                        <ul className="rutinas-list" style={{ listStyle: 'none', padding: 0 }}>
                          {(rutinasPorMiembro[expandedId] || []).map((r) => (
                            <li key={r.id || r.id_rutina} style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                              <strong style={{ color: '#e2e8f0' }}>{r.nombre}</strong>
                              <span style={{ marginLeft: '0.5rem', fontSize: '0.78rem', color: '#94a3b8' }}>
                                · {r.nivel} · {r.duracion || r.duracion_semanas} {typeof (r.duracion || r.duracion_semanas) === 'number' || !isNaN(r.duracion || r.duracion_semanas) ? 'sem.' : ''}
                              </span>
                              {r.sent_at && (
                                <span style={{ marginLeft: '0.5rem', fontSize: '0.72rem', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '0.15rem 0.4rem', borderRadius: '0.25rem' }}>
                                  Enviada por correo: {new Date(r.sent_at).toLocaleDateString('es-CO')}
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── Crear Rutina section ──────────────────────────────────────────────────────
function CrearRutinaSection({ miembros, miembroPreseleccionado, onCreada }) {
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    duracion_semanas: '',
    nivel: 'basico',
    miembro_id: miembroPreseleccionado ? (miembroPreseleccionado.id_usuario ?? miembroPreseleccionado.id) : '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [exito, setExito] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (miembroPreseleccionado) {
      setForm(prev => ({ ...prev, miembro_id: miembroPreseleccionado.id_usuario ?? miembroPreseleccionado.id }))
    }
  }, [miembroPreseleccionado])

  const set = (field, val) => setForm(prev => ({ ...prev, [field]: val }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setErrorMsg('')
    try {
      await crearRutinaPersonalizada(form.miembro_id, {
        nombre: form.nombre,
        duracion: form.duracion_semanas + ' semanas',
        nivel: form.nivel,
        ejercicios: [] // se puede ampliar
      })
      setExito(true)
      setForm({ nombre: '', descripcion: '', duracion_semanas: '', nivel: 'basico', miembro_id: '' })
      setTimeout(() => setExito(false), 3500)
      onCreada?.()
    } catch (err) {
      setErrorMsg(err.message || 'Error al crear rutina.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="admin-section">
      <h1 className="section-title">Crear Rutina</h1>

      {exito && (
        <div style={{
          marginBottom: '1.5rem', padding: '0.85rem 1.2rem', borderRadius: '0.625rem',
          background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', color: '#86efac',
          fontSize: '0.9rem',
        }}>
          ✓ Rutina creada y asignada exitosamente. Se ha enviado una notificación de simulación por correo al miembro.
        </div>
      )}

      {errorMsg && (
        <div style={{
          marginBottom: '1.5rem', padding: '0.85rem 1.2rem', borderRadius: '0.625rem',
          background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171',
          fontSize: '0.9rem',
        }}>
          ✕ Error: {errorMsg}
        </div>
      )}

      <div style={{
        background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,75,99,0.1)',
        borderRadius: '0.875rem', padding: '2rem', maxWidth: 580,
      }}>
        <form className="product-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre de la rutina *"
            value={form.nombre}
            onChange={e => set('nombre', e.target.value)}
            required
          />
          <textarea
            placeholder="Descripción (ej: ejercicios, series, repeticiones)"
            value={form.descripcion}
            onChange={e => set('descripcion', e.target.value)}
            rows={3}
            style={{ resize: 'vertical' }}
          />
          <div className="form-row">
            <input
              type="number"
              placeholder="Duración (semanas) *"
              value={form.duracion_semanas}
              onChange={e => set('duracion_semanas', e.target.value)}
              min={1}
              required
            />
            <select value={form.nivel} onChange={e => set('nivel', e.target.value)}>
              <option value="Principiante">Principiante</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzado">Avanzado</option>
            </select>
          </div>
          <select value={form.miembro_id} onChange={e => set('miembro_id', e.target.value)} required>
            <option value="">Asignar a miembro *</option>
            {miembros.map(m => {
              const mId = m.id_usuario ?? m.id
              return (
                <option key={mId} value={mId}>{m.nombre} — {m.plan}</option>
              )
            })}
          </select>
          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? 'Guardando...' : 'Crear y Asignar Rutina'}
            </button>
            <button type="button" className="btn-secondary"
              onClick={() => setForm({ nombre: '', descripcion: '', duracion_semanas: '', nivel: 'basico', miembro_id: '' })}>
              Limpiar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── Gráficas section ──────────────────────────────────────────────────────────
const tooltipStyle = {
  contentStyle: { background: '#0d0d0d', border: '1px solid rgba(255,75,99,0.2)', borderRadius: '0.5rem', color: '#f8fafc' },
  labelStyle: { color: '#94a3b8' },
  itemStyle: { color: '#ff4b63' },
}

function GraficasSection({ miembros }) {
  const planes = miembros.reduce((acc, m) => {
    acc[m.plan] = (acc[m.plan] || 0) + 1
    return acc
  }, {})

  return (
    <div className="admin-section">
      <h1 className="section-title">Estadísticas</h1>

      <div className="stats-grid">
        {Object.entries(planes).map(([plan, cantidad]) => (
          <div key={plan} className="stat-card">
            <div className="stat-content">
              <p className="stat-label">{plan}</p>
              <p className="stat-value">{cantidad}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Email Logs section ────────────────────────────────────────────────────────
function EmailLogsSection() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedLog, setSelectedLog] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchLogs()
  }, [])

  const fetchLogs = async () => {
    setLoading(true)
    try {
      const res = await getCoachEmailLogs()
      if (res && res.success) {
        setLogs(res.data || [])
      }
    } catch (err) {
      console.error('Error fetching email logs:', err)
    } finally {
      setLoading(false)
    }
  }

  const filteredLogs = logs.filter(log => {
    const term = search.toLowerCase()
    return (
      log.email.toLowerCase().includes(term) ||
      log.asunto.toLowerCase().includes(term) ||
      (log.usuario?.nombre || '').toLowerCase().includes(term) ||
      (log.rutina?.nombre || '').toLowerCase().includes(term)
    )
  })

  return (
    <div className="admin-section">
      <div className="section-header" style={{ marginBottom: '1rem' }}>
        <h1 className="section-title">Historial de Correos Simulados</h1>
        <button className="btn-secondary" onClick={fetchLogs}>
          Actualizar
        </button>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="Buscar por correo, asunto o miembro..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '400px',
            padding: '0.6rem 0.8rem',
            borderRadius: '0.5rem',
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(0,0,0,0.2)',
            color: '#f8fafc',
            fontFamily: 'inherit',
            fontSize: '0.88rem'
          }}
        />
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Miembro</th>
              <th>Email Destino</th>
              <th>Asunto</th>
              <th>Rutina</th>
              <th>Estado</th>
              <th>Fecha de Envío</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>Cargando logs de correos...</td>
              </tr>
            ) : filteredLogs.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>No se encontraron correos enviados.</td>
              </tr>
            ) : (
              filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td style={{ fontWeight: 600 }}>{log.usuario?.nombre || 'N/A'}</td>
                  <td>{log.email}</td>
                  <td>{log.asunto}</td>
                  <td>{log.rutina?.nombre || 'N/A'}</td>
                  <td>
                    <span className="status-badge" style={{
                      background: 'rgba(34, 197, 94, 0.15)',
                      color: '#86efac',
                      border: '1px solid rgba(34, 197, 94, 0.3)'
                    }}>
                      {log.estado || 'success'}
                    </span>
                  </td>
                  <td>{new Date(log.sent_at).toLocaleString('es-CO')}</td>
                  <td>
                    <button className="btn-secondary btn-sm" onClick={() => setSelectedLog(log)}>
                      Ver Detalle
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Detalle Correo */}
      {selectedLog && (
        <div className="modal-overlay" onClick={() => setSelectedLog(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <h2 style={{ marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Detalle de Correo</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
              <p><strong>Destinatario:</strong> {selectedLog.usuario?.nombre} ({selectedLog.email})</p>
              <p><strong>Asunto:</strong> {selectedLog.asunto}</p>
              <p><strong>Fecha de envío:</strong> {new Date(selectedLog.sent_at).toLocaleString('es-CO')}</p>
              <div>
                <strong>Cuerpo del mensaje:</strong>
                <pre style={{
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,75,99,0.15)',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  marginTop: '0.5rem',
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                  color: '#e2e8f0',
                  maxHeight: '300px',
                  overflowY: 'auto'
                }}>
                  {selectedLog.cuerpo}
                </pre>
              </div>
            </div>
            <div className="form-actions" style={{ marginTop: '1.5rem' }}>
              <button className="btn-secondary" onClick={() => setSelectedLog(null)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Main Coach component ──────────────────────────────────────────────────────
export default function Coach() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('inicio')
  const [miembros, setMiembros] = useState([])
  const [loading, setLoading] = useState(true)
  const [miembroParaRutina, setMiembroParaRutina] = useState(null)

  const coachUser = getCurrentUser()

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await getCoachMiembros()
        const lista = Array.isArray(data)
          ? data
          : data?.miembros || data?.data || data?.usuarios || []
        setMiembros(lista.length > 0 ? lista : MOCK_MIEMBROS)
      } catch {
        setMiembros(MOCK_MIEMBROS)
      } finally {
        setLoading(false)
      }
    }
    cargar()
  }, [])

  const handleLogout = async () => {
    await logoutUser()
    navigate('/')
  }

  const handleNuevaRutina = (miembro) => {
    setMiembroParaRutina(miembro)
    setActiveTab('crear')
  }

  const displayName =
    coachUser?.user_metadata?.full_name ||
    coachUser?.user_metadata?.name ||
    null

  const navItems = [
    { id: 'inicio',   label: 'Inicio',        Icon: IconHome    },
    { id: 'miembros', label: 'Mis Miembros',   Icon: IconMembers },
    { id: 'crear',    label: 'Crear Rutina',   Icon: IconPlus    },
    { id: 'email-logs', label: 'Historial Correos', Icon: IconMail },
    { id: 'graficas', label: 'Gráficas',       Icon: IconChart   },
  ]

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <h2>FitZone</h2>
          <p>Panel Coach</p>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(({ id, label, Icon }) => (
            <button
              key={id}
              className={`nav-link ${activeTab === id ? 'active' : ''}`}
              onClick={() => setActiveTab(id)}
            >
              <Icon />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          {coachUser && (
            <div style={{ marginBottom: '1.25rem', padding: '0 0.5rem' }}>
              <div style={{ fontWeight: 600, color: '#f8fafc', fontSize: '0.88rem', marginBottom: '0.25rem' }}>
                {displayName || coachUser.email}
              </div>
              {displayName && (
                <div style={{ color: '#94a3b8', fontSize: '0.78rem', wordBreak: 'break-all' }}>
                  {coachUser.email}
                </div>
              )}
            </div>
          )}
          <button className="btn-logout" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="admin-main">
        {loading ? (
          <div className="loading-text">Cargando datos...</div>
        ) : (
          <>
            {activeTab === 'inicio'   && <InicioSection miembros={miembros} />}
            {activeTab === 'miembros' && <MiembrosSection miembros={miembros} onNuevaRutina={handleNuevaRutina} />}
            {activeTab === 'crear'    && (
              <CrearRutinaSection
                miembros={miembros}
                miembroPreseleccionado={miembroParaRutina}
                onCreada={() => setMiembroParaRutina(null)}
              />
            )}
            {activeTab === 'email-logs' && <EmailLogsSection />}
            {activeTab === 'graficas' && <GraficasSection miembros={miembros} />}
          </>
        )}
      </main>
    </div>
  )
}
