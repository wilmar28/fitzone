import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getDashboardStats,
  getBackendProducts,
  createBackendProduct,
  updateBackendProduct,
  deleteBackendProduct,
  getBackendSales,
  downloadReportPdf,
  downloadReportExcel,
  getCurrentUser,
  logoutUser,
} from '../services/api'
import './Admin.css'

// SVG Icons
const IconDashboard = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <path d="M3 9h18M9 3v18" />
  </svg>
)

const IconProducts = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
)

const IconSales = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 3h18v18H3z" />
    <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
  </svg>
)

const IconReports = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
    <polyline points="13 2 13 9 20 9" />
  </svg>
)

const IconDownload = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

const IconPlus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const IconEdit = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)

const IconTrash = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
)

// SVG Icons for Dashboard Stats
const IconDollar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
)

const IconBox = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="21 8 21 21 3 21 3 8"></polyline>
    <rect x="1" y="3" width="22" height="5"></rect>
    <line x1="10" y1="12" x2="14" y2="12"></line>
  </svg>
)

const IconUsers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
)

const IconOrders = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
  </svg>
)

// Dashboard Section
function DashboardSection({ stats, loading }) {
  if (loading) return <div className="loading-text">Cargando datos...</div>

  return (
    <div className="admin-section">
      <h1 className="section-title">Dashboard</h1>
      <div className="stats-grid">
        <StatCard icon={<IconDollar />} label="Total Ventas" value={`$${(stats.totalVentas || 0).toLocaleString('es-CO')}`} />
        <StatCard icon={<IconBox />} label="Productos" value={stats.totalProductos || 6} />
        <StatCard icon={<IconUsers />} label="Usuarios" value={stats.totalUsuarios || 0} />
        <StatCard icon={<IconOrders />} label="Órdenes" value={stats.totalOrdenes || 0} />
      </div>
    </div>
  )
}

function StatCard({ icon, label, value }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value}</p>
      </div>
    </div>
  )
}

// Products Section
function ProductsSection({ productos, onRefresh, loading }) {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    sku: '',
    categoria: '',
    marca: '',
    precio: '',
    stock: '',
    estado: 'activo',
  })

  const resetForm = () => {
    setFormData({ nombre: '', sku: '', categoria: '', marca: '', precio: '', stock: '', estado: 'activo' })
    setEditingId(null)
  }

  const handleEdit = (producto) => {
    setFormData({
      nombre: producto.nombre || '',
      sku: producto.sku || '',
      categoria: producto.categoria || '',
      marca: producto.marca || '',
      precio: producto.precio || '',
      stock: producto.stock || '',
      estado: producto.estado || 'activo',
    })
    setEditingId(producto.id)
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormSubmitting(true)
    try {
      if (editingId) {
        await updateBackendProduct(editingId, formData)
      } else {
        await createBackendProduct(formData)
      }
      resetForm()
      setShowForm(false)
      onRefresh()
    } catch (err) {
      alert('Error: ' + err.message)
    } finally {
      setFormSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (confirm('¿Eliminar este producto?')) {
      try {
        await deleteBackendProduct(id)
        onRefresh()
      } catch (err) {
        alert('Error: ' + err.message)
      }
    }
  }

  if (loading) return <div className="loading-text">Cargando productos...</div>

  return (
    <div className="admin-section">
      <div className="section-header">
        <h1 className="section-title">Productos</h1>
        <button className="btn-primary" onClick={() => { resetForm(); setShowForm(true) }}>
          <IconPlus /> Nuevo Producto
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{editingId ? 'Editar Producto' : 'Nuevo Producto'}</h2>
            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Nombre *"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="SKU *"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  required
                />
              </div>
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Categoría"
                  value={formData.categoria}
                  onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Marca"
                  value={formData.marca}
                  onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                />
              </div>
              <div className="form-row">
                <input
                  type="number"
                  placeholder="Precio *"
                  value={formData.precio}
                  onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                  required
                />
                <input
                  type="number"
                  placeholder="Stock *"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary" disabled={formSubmitting}>
                  {formSubmitting ? 'Guardando...' : 'Guardar'}
                </button>
                <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>SKU</th>
              <th>Categoría</th>
              <th>Marca</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>{p.sku}</td>
                <td>{p.categoria || '-'}</td>
                <td>{p.marca || '-'}</td>
                <td>${(p.precio || 0).toLocaleString('es-CO')}</td>
                <td>
                  <span className={`stock-badge ${p.stock > 5 ? 'available' : 'low'}`}>
                    {p.stock}
                  </span>
                </td>
                <td>
                  <span className="status-badge">{p.estado || 'activo'}</span>
                </td>
                <td className="td-actions">
                  <button className="action-btn edit" onClick={() => handleEdit(p)} title="Editar">
                    <IconEdit />
                  </button>
                  <button className="action-btn delete" onClick={() => handleDelete(p.id)} title="Eliminar">
                    <IconTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Sales Section
function SalesSection({ ventas, loading }) {
  if (loading) return <div className="loading-text">Cargando ventas...</div>

  return (
    <div className="admin-section">
      <h1 className="section-title">Ventas</h1>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Monto</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((v) => (
              <tr key={v.id}>
                <td>#{v.id}</td>
                <td>{new Date(v.fecha).toLocaleDateString('es-CO')}</td>
                <td>{v.usuario_id || 'Anónimo'}</td>
                <td>${(v.monto || 0).toLocaleString('es-CO')}</td>
                <td>
                  <span className="status-badge">{v.estado || 'Completada'}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Reports Section
function ReportsSection() {
  const [downloading, setDownloading] = useState(null)

  const handleDownload = async (type) => {
    setDownloading(type)
    try {
      if (type === 'pdf') {
        await downloadReportPdf()
      } else {
        await downloadReportExcel()
      }
    } catch (err) {
      alert('Error: ' + err.message)
    } finally {
      setDownloading(null)
    }
  }

  return (
    <div className="admin-section">
      <h1 className="section-title">Reportes</h1>
      <div className="reports-grid">
        <div className="report-card">
          <div className="report-header">
            <h3>Reporte de Ventas</h3>
            <p>Descarga el análisis completo de ventas</p>
          </div>
          <div className="report-buttons">
            <button
              className="btn-primary"
              onClick={() => handleDownload('pdf')}
              disabled={downloading === 'pdf'}
            >
              <IconDownload /> {downloading === 'pdf' ? 'Descargando...' : 'PDF'}
            </button>
            <button
              className="btn-secondary"
              onClick={() => handleDownload('excel')}
              disabled={downloading === 'excel'}
            >
              <IconDownload /> {downloading === 'excel' ? 'Descargando...' : 'Excel'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Admin Component
export default function Admin() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [stats, setStats] = useState({ totalVentas: 0, totalProductos: 6, totalUsuarios: 0, totalOrdenes: 0 })
  const [productos, setProductos] = useState([])
  const [ventas, setVentas] = useState([])
  const [loading, setLoading] = useState(true)

  const adminUser = getCurrentUser()

  const handleLogout = async () => {
    await logoutUser()
    navigate('/')
  }

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    setLoading(true)
    try {
      const [statsData, productosData, ventasData] = await Promise.all([
        getDashboardStats().catch(() => ({ totalVentas: 0, totalProductos: 6, totalUsuarios: 0, totalOrdenes: 0 })),
        getBackendProducts().catch(() => []),
        getBackendSales().catch(() => []),
      ])

      setStats(statsData || { totalVentas: 0, totalProductos: 6, totalUsuarios: 0, totalOrdenes: 0 })
      setProductos(productosData || [])
      setVentas(ventasData || [])
    } catch (err) {
      console.error('Error cargando datos:', err)
    } finally {
      setLoading(false)
    }
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: IconDashboard },
    { id: 'productos', label: 'Productos', icon: IconProducts },
    { id: 'ventas', label: 'Ventas', icon: IconSales },
    { id: 'reportes', label: 'Reportes', icon: IconReports },
  ]

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <h2>FitZone</h2>
          <p>Panel Admin</p>
        </div>
        <nav className="sidebar-nav">
          {navItems.map(item => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
        <div className="sidebar-footer">
          {adminUser && (
            <div className="sidebar-user-info" style={{ marginBottom: '1.25rem', padding: '0 0.5rem' }}>
              <div style={{ fontWeight: 600, color: '#f8fafc', fontSize: '0.88rem', marginBottom: '0.25rem' }}>
                {adminUser.user_metadata?.name || adminUser.user_metadata?.full_name || 'Administrador'}
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.78rem', wordBreak: 'break-all' }}>
                {adminUser.email}
              </div>
            </div>
          )}
          <button className="btn-logout" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="admin-main">
        {activeTab === 'dashboard' && <DashboardSection stats={stats} loading={loading} />}
        {activeTab === 'productos' && <ProductsSection productos={productos} onRefresh={cargarDatos} loading={loading} />}
        {activeTab === 'ventas' && <SalesSection ventas={ventas} loading={loading} />}
        {activeTab === 'reportes' && <ReportsSection />}
      </main>
    </div>
  )
}
