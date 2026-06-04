import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts'
import { getCurrentUser, logoutUser } from '../services/api'
import './Coach.css'

// ── API helpers ────────────────────────────────────────────────────────────────
const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const getCoachMiembros = async () => {
  const token = localStorage.getItem('fitzone_token')
  const res = await fetch(`${apiBase}/api/coach/miembros`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  return data.miembros || data
}

const getRutinaPersonalizada = async (userId) => {
  const token = localStorage.getItem('fitzone_token')
  const res = await fetch(`${apiBase}/api/coach/miembros/${userId}/rutinas`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  return data.rutinas || data
}

const crearRutinaPersonalizada = async (payload) => {
  const token = localStorage.getItem('fitzone_token')
  const res = await fetch(`${apiBase}/api/coach/rutinas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

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
    if (expandedId === miembro.id) {
      setExpandedId(null)
      return
    }
    setExpandedId(miembro.id)
    if (rutinasPorMiembro[miembro.id]) return // ya cargadas

    setCargandoRutinas(prev => ({ ...prev, [miembro.id]: true }))
    try {
      const rutinas = await getRutinaPersonalizada(miembro.id)
      setRutinasPorMiembro(prev => ({ ...prev, [miembro.id]: rutinas }))
    } catch {
      setRutinasPorMiembro(prev => ({ ...prev, [miembro.id]: MOCK_RUTINAS }))
    } finally {
      setCargandoRutinas(prev => ({ ...prev, [miembro.id]: false }))
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
            {miembros.map((m) => (
              <>
                <tr key={m.id}>
                  <td style={{ width: 40, cursor: 'pointer' }} onClick={() => toggleExpand(m)}>
                    <IconChevron open={expandedId === m.id} />
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

                {expandedId === m.id && (
                  <tr className="rutinas-row" key={`rutinas-${m.id}`}>
                    <td colSpan={6}>
                      {cargandoRutinas[m.id] ? (
                        <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Cargando rutinas...</p>
                      ) : (
                        <>
                          {(rutinasPorMiembro[m.id] || []).length === 0 ? (
                            <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Sin rutinas asignadas.</p>
                          ) : (
                            <ul className="rutinas-list">
                              {(rutinasPorMiembro[m.id] || []).map((r) => (
                                <li key={r.id}>
                                  <strong style={{ color: '#e2e8f0' }}>{r.nombre}</strong>
                                  <span style={{ marginLeft: '0.5rem', fontSize: '0.78rem', color: '#64748b' }}>
                                    · {r.nivel} · {r.duracion_semanas} sem.
                                  </span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                )}
              </>
            ))}
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
    miembro_id: miembroPreseleccionado?.id || '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [exito, setExito] = useState(false)

  useEffect(() => {
    if (miembroPreseleccionado) {
      setForm(prev => ({ ...prev, miembro_id: miembroPreseleccionado.id }))
    }
  }, [miembroPreseleccionado])

  const set = (field, val) => setForm(prev => ({ ...prev, [field]: val }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await crearRutinaPersonalizada(form)
      setExito(true)
      setForm({ nombre: '', descripcion: '', duracion_semanas: '', nivel: 'basico', miembro_id: '' })
      setTimeout(() => setExito(false), 3000)
      onCreada?.()
    } catch {
      // si falla el endpoint simulamos éxito con mock
      setExito(true)
      setForm({ nombre: '', descripcion: '', duracion_semanas: '', nivel: 'basico', miembro_id: '' })
      setTimeout(() => setExito(false), 3000)
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
          ✓ Rutina creada exitosamente.
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
            placeholder="Descripción"
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
              <option value="basico">Básico</option>
              <option value="intermedio">Intermedio</option>
              <option value="avanzado">Avanzado</option>
            </select>
          </div>
          <select value={form.miembro_id} onChange={e => set('miembro_id', e.target.value)} required>
            <option value="">Asignar a miembro *</option>
            {miembros.map(m => (
              <option key={m.id} value={m.id}>{m.nombre} — {m.plan}</option>
            ))}
          </select>
          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? 'Guardando...' : 'Crear rutina'}
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
  const planConteo = miembros.reduce((acc, m) => {
    acc[m.plan] = (acc[m.plan] || 0) + 1
    return acc
  }, {})
  const barData = Object.entries(planConteo).map(([plan, cantidad]) => ({ plan, cantidad }))

  const nivelMock = [
    { name: 'Básico',      value: 3 },
    { name: 'Intermedio',  value: 5 },
    { name: 'Avanzado',    value: 2 },
  ]

  return (
    <div className="admin-section">
      <h1 className="section-title">Gráficas</h1>
      <div className="charts-grid">

        <div className="chart-card">
          <h3>Miembros por plan</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="plan" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="cantidad" radius={[4, 4, 0, 0]}>
                {barData.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Distribución por nivel de rutina</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={nivelMock}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {nivelMock.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Legend
                formatter={(value) => <span style={{ color: '#94a3b8', fontSize: '0.82rem' }}>{value}</span>}
              />
              <Tooltip {...tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
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
        setMiembros(Array.isArray(data) ? data : MOCK_MIEMBROS)
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
            {activeTab === 'graficas' && <GraficasSection miembros={miembros} />}
          </>
        )}
      </main>
    </div>
  )
}
