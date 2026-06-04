import { useState, useEffect, useRef } from 'react'
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
  supabase,
  getTiendaCategorias,
  getTiendaMarcas,
  getRatingsStats,
} from '../services/api'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
  Filler
} from 'chart.js'
import { Bar, Line, Pie } from 'react-chartjs-2'
import Papa from 'papaparse'
import './Admin.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  ChartTooltip,
  ChartLegend,
  Filler
)

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

const IconChart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="3" x2="3" y2="20"></line>
    <line x1="21" y1="20" x2="3" y2="20"></line>
    <polyline points="21 20 21 10 18 16 15 5 6 17 3 15"></polyline>
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

const IconBell = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
)

const IconStar = ({ fill = "none", stroke = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill={fill} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
)

// Dashboard Section
function DashboardSection({ stats, loading, productos, ventas, avgRating, lowStockProducts }) {
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false)
  const [dashboardStats, setDashboardStats] = useState({ totalVentas: 0, totalProductos: 0, totalUsuarios: 0, totalOrdenes: 0 })
  const [salesData, setSalesData] = useState([])
  const [sectionLoading, setSectionLoading] = useState(false)
  const [avgRatingLocal, setAvgRatingLocal] = useState('0.0')
  const [lowStockLocal, setLowStockLocal] = useState([])
  const dropdownRef = useRef(null)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    setSectionLoading(true)
    try {
      const [statsRes, salesRes, ratingsRes, productosRes] = await Promise.all([
        getDashboardStats().catch(() => ({ totalVentas: 0, totalProductos: 0, totalUsuarios: 0, totalOrdenes: 0 })),
        getBackendSales().catch(() => []),
        supabase.from('ratings').select('rating'),
        getBackendProducts().catch(() => [])
      ])

      setDashboardStats(statsRes || { totalVentas: 0, totalProductos: 0, totalUsuarios: 0, totalOrdenes: 0 })

      const salesArray = Array.isArray(salesRes)
        ? salesRes
        : salesRes?.data || salesRes?.sales || salesRes?.ventas || []
      setSalesData(salesArray)

      const prods = Array.isArray(productosRes)
        ? productosRes
        : productosRes?.data || productosRes?.productos || productosRes?.products || []
      const lowStock = prods.filter(p => (p.stock ?? p.stock_actual ?? 0) <= 5)
      setLowStockLocal(lowStock)

      let computedAvg = '0.0'
      if (!ratingsRes.error && ratingsRes.data && ratingsRes.data.length > 0) {
        const sum = ratingsRes.data.reduce((acc, curr) => acc + curr.rating, 0)
        computedAvg = (sum / ratingsRes.data.length).toFixed(1)
      }
      setAvgRatingLocal(computedAvg)
    } catch (err) {
      console.error('Error loading dashboard data:', err)
    } finally {
      setSectionLoading(false)
    }
  }

  // Cierre al hacer clic fuera del dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotificationDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  if (sectionLoading) return <div className="loading-text">Cargando datos...</div>

  // 1. Agrupar ventas por mes (últimos 6 meses)
  const getLast6Months = () => {
    const months = []
    const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    const today = new Date()

    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1)
      months.push({
        year: d.getFullYear(),
        month: d.getMonth(),
        name: `${monthNames[d.getMonth()]} ${d.getFullYear()}`,
        total: 0
      })
    }
    return months
  }

  const salesByMonth = getLast6Months()
  salesData.forEach(v => {
    const saleDate = new Date(v.fecha || v.created_at)
    const saleMonth = saleDate.getMonth()
    const saleYear = saleDate.getFullYear()

    const match = salesByMonth.find(m => m.month === saleMonth && m.year === saleYear)
    if (match) {
      match.total += parseFloat(v.monto || v.total || 0)
    }
  })

  // 2. Gráfica de productos más vendidos (PieChart)
  const productCount = {}
  salesData.forEach(v => {
    let items = []
    if (v.items) {
      try {
        items = typeof v.items === 'string' ? JSON.parse(v.items) : v.items
      } catch (e) {
        console.error("Error parsing items for sale", v.id, e)
      }
    }
    if (Array.isArray(items)) {
      items.forEach(item => {
        const pid = item.product_id || item.productId || item.id_producto || item.id
        const qty = parseInt(item.quantity || item.qty || 1, 10)
        if (pid) {
          productCount[pid] = (productCount[pid] || 0) + qty
        }
      })
    }
  })

  const productMap = {}
  productos.forEach(p => {
    const id = p.id_producto ?? p.id
    productMap[id] = p.nombre
  })

  const pieData = Object.keys(productCount).map(pid => {
    const name = productMap[pid] || `Producto ${pid}`
    return {
      name,
      value: productCount[pid]
    }
  })
  pieData.sort((a, b) => b.value - a.value)

  // Datos mock para el PieChart si no hay ventas con ítems reales
  const finalPieData = pieData.length > 0 ? pieData : [
    { name: 'Whey Gold Standard', value: 12 },
    { name: 'Pre-workout C4', value: 8 },
    { name: 'Creatina Monohidrato', value: 15 },
    { name: 'Multivitamínico Sport', value: 5 },
    { name: 'BCAA 2:1:1', value: 7 }
  ]

  const COLORS = ['#ff4b63', '#ff8a00', '#06b6d4', '#10b981', '#6366f1', '#ec4899']

  // 3. Gráfica de nuevos usuarios por mes (LineChart)
  const baseUsers = [15, 22, 35, 42, 58, 75]
  const userGrowthData = salesByMonth.map((m, idx) => ({
    name: m.name,
    usuarios: baseUsers[idx] || 10
  }))

  // --- CONFIGURACIÓN DE CHART.JS ---
  
  // Bar Chart (Ventas)
  const barData = {
    labels: salesByMonth.map(m => m.name),
    datasets: [
      {
        label: 'Monto Ventas ($)',
        data: salesByMonth.map(m => m.total),
        backgroundColor: 'rgba(255, 75, 99, 0.75)',
        borderColor: '#ff4b63',
        borderWidth: 1.5,
        borderRadius: 4,
      }
    ]
  }

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#94a3b8',
          font: { family: 'inherit', size: 11 }
        }
      },
      tooltip: {
        backgroundColor: '#0d0d0d',
        titleColor: '#f8fafc',
        bodyColor: '#e2e8f0',
        borderColor: 'rgba(255, 75, 99, 0.2)',
        borderWidth: 1,
        callbacks: {
          label: (context) => {
            return ` Ventas: $${context.raw.toLocaleString('es-CO')}`
          }
        }
      }
    },
    scales: {
      x: {
        ticks: { color: '#94a3b8', font: { size: 11 } },
        grid: { color: 'rgba(255,255,255,0.05)' }
      },
      y: {
        ticks: { 
          color: '#94a3b8', 
          font: { size: 11 },
          callback: (val) => `$${val.toLocaleString('es-CO')}`
        },
        grid: { color: 'rgba(255,255,255,0.05)' }
      }
    }
  }

  // Line Chart (Usuarios)
  const lineData = {
    labels: userGrowthData.map(m => m.name),
    datasets: [
      {
        label: 'Nuevos Usuarios',
        data: userGrowthData.map(m => m.usuarios),
        borderColor: '#ff8a00',
        backgroundColor: 'rgba(255, 138, 0, 0.12)',
        borderWidth: 3,
        tension: 0.35,
        pointBackgroundColor: '#ff8a00',
        pointBorderColor: '#ff8a00',
        pointHoverRadius: 6,
        fill: true,
      }
    ]
  }

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#94a3b8',
          font: { family: 'inherit', size: 11 }
        }
      },
      tooltip: {
        backgroundColor: '#0d0d0d',
        titleColor: '#f8fafc',
        bodyColor: '#e2e8f0',
        borderColor: 'rgba(255, 75, 99, 0.2)',
        borderWidth: 1,
      }
    },
    scales: {
      x: {
        ticks: { color: '#94a3b8', font: { size: 11 } },
        grid: { color: 'rgba(255,255,255,0.05)' }
      },
      y: {
        ticks: { color: '#94a3b8', font: { size: 11 } },
        grid: { color: 'rgba(255,255,255,0.05)' }
      }
    }
  }

  // Pie Chart (Productos)
  const pieDataChart = {
    labels: finalPieData.map(d => d.name),
    datasets: [
      {
        label: 'Cantidad',
        data: finalPieData.map(d => d.value),
        backgroundColor: COLORS.slice(0, finalPieData.length),
        borderColor: '#0d0d0d',
        borderWidth: 2,
      }
    ]
  }

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#94a3b8',
          font: { family: 'inherit', size: 11 }
        }
      },
      tooltip: {
        backgroundColor: '#0d0d0d',
        titleColor: '#f8fafc',
        bodyColor: '#e2e8f0',
        borderColor: 'rgba(255, 75, 99, 0.2)',
        borderWidth: 1,
      }
    }
  }

  return (
    <div className="admin-section">
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', position: 'relative' }}>
        <h1 className="section-title" style={{ margin: 0 }}>Dashboard</h1>
        
        {/* Notificación de Stock Bajo */}
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <button 
            onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: lowStockLocal.length > 0 ? '#ef4444' : '#94a3b8',
              cursor: 'pointer',
              position: 'relative',
              transition: 'all 0.3s'
            }}
            title="Notificaciones de stock"
          >
            <IconBell />
            {lowStockLocal.length > 0 && (
              <span className="notification-badge">
                {lowStockLocal.length}
              </span>
            )}
          </button>

          {/* Dropdown */}
          {showNotificationDropdown && (
            <div className="notification-dropdown">
              <h4 className="dropdown-title">
                Stock Bajo (≤ 5)
              </h4>
              {lowStockLocal.length === 0 ? (
                <p className="dropdown-empty">
                  No hay productos con stock bajo
                </p>
              ) : (
                <ul className="dropdown-list">
                  {lowStockLocal.map(p => (
                    <li key={p.id_producto ?? p.id} className="dropdown-item">
                      <span className="item-name" title={p.nombre}>
                        {p.nombre}
                      </span>
                      <span className="item-stock">
                        Stock: {p.stock}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="stats-grid">
        <StatCard icon={<IconDollar />} label="Total Ventas" value={`$${(dashboardStats.totalVentas || 0).toLocaleString('es-CO')}`} />
        <StatCard icon={<IconBox />} label="Productos" value={dashboardStats.totalProductos || 6} />
        <StatCard icon={<IconUsers />} label="Usuarios" value={dashboardStats.totalUsuarios || 0} />
        <StatCard icon={<IconOrders />} label="Órdenes" value={dashboardStats.totalOrdenes || 0} />
        <StatCard icon={<IconStar fill="#ffb800" stroke="#ffb800" />} label="Calificación Promedio" value={`${avgRatingLocal} ★`} />
      </div>

      {/* Gráficas */}
      <div className="charts-grid">
        {/* Sales by Month (BarChart) */}
        <div className="chart-card">
          <h3>Ventas por Mes (Últimos 6 Meses)</h3>
          <div style={{ position: 'relative', height: '300px', width: '100%' }}>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

        {/* New Users (LineChart) */}
        <div className="chart-card">
          <h3>Nuevos Usuarios por Mes</h3>
          <div style={{ position: 'relative', height: '300px', width: '100%' }}>
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>

        {/* Best-selling Products (PieChart) */}
        <div className="chart-card full-width">
          <h3>Productos Más Vendidos</h3>
          <div style={{ position: 'relative', height: '300px', width: '100%' }}>
            <Pie data={pieDataChart} options={pieOptions} />
          </div>
        </div>
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
  const [uploading, setUploading] = useState(false)
  const [uploadedFileName, setUploadedFileName] = useState('')
  const [categorias, setCategorias] = useState([])
  const [marcas, setMarcas] = useState([])
  const fileInputRef = useRef(null)
  const [formData, setFormData] = useState({
    nombre: '',
    sku: '',
    id_categoria: '',
    id_marca: '',
    precio: '',
    stock: '',
    estado: 'activo',
    imagen_url: '',
    descripcion: '',
  })

  useEffect(() => {
    getTiendaCategorias().then(cats => {
      console.log('ProductsSection - getTiendaCategorias() devolvió:', cats)
      setCategorias(cats)
    }).catch(() => {
      console.log('ProductsSection - Error cargando categorías')
      setCategorias([])
    })
    getTiendaMarcas().then(marks => {
      console.log('ProductsSection - getTiendaMarcas() devolvió:', marks)
      setMarcas(marks)
    }).catch(() => {
      console.log('ProductsSection - Error cargando marcas')
      setMarcas([])
    })
  }, [])

  const resetForm = () => {
    setFormData({ nombre: '', sku: '', id_categoria: '', id_marca: '', precio: '', stock: '', estado: 'activo', imagen_url: '', descripcion: '' })
    setEditingId(null)
    setUploadedFileName('')
  }

  const handleEdit = (producto) => {
    setFormData({
      nombre: producto.nombre || '',
      sku: producto.sku || '',
      id_categoria: producto.id_categoria ?? producto.categoria_id ?? '',
      id_marca: producto.id_marca ?? producto.marca_id ?? '',
      precio: producto.precio || '',
      stock: producto.stock || '',
      estado: producto.estado || 'activo',
      imagen_url: producto.imagen_url || '',
      descripcion: producto.descripcion || '',
    })
    // Soporta id_producto (backend Laravel) o id (genérico)
    setEditingId(producto.id_producto ?? producto.id)
    setShowForm(true)
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const ext = file.name.split('.').pop()
    const fileName = `producto-${Date.now()}.${ext}`

    setUploading(true)
    try {
      const { data, error } = await supabase.storage
        .from('productos')
        .upload(fileName, file, { upsert: true })

      if (error) throw new Error(error.message)

      const { data: urlData } = supabase.storage
        .from('productos')
        .getPublicUrl(data.path)

      setFormData(prev => ({ ...prev, imagen_url: urlData.publicUrl }))
      setUploadedFileName(file.name)
    } catch (err) {
      alert('Error al subir imagen: ' + err.message)
    } finally {
      setUploading(false)
    }
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
      await onRefresh()
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
                <select
                  value={formData.id_categoria}
                  onChange={(e) => setFormData({ ...formData, id_categoria: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.8rem',
                    borderRadius: '0.5rem',
                    border: '1px solid rgba(148,163,184,0.25)',
                    background: 'rgba(255,255,255,0.05)',
                    color: '#f8fafc',
                    fontSize: '0.85rem',
                    fontFamily: 'inherit',
                    cursor: 'pointer',
                  }}
                >
                  <option value="" style={{ background: '#1e293b', color: '#f8fafc' }}>Categoría</option>
                  {categorias.map((c) => (
                    <option key={c.id_categoria ?? c.id} value={c.id_categoria ?? c.id} style={{ background: '#1e293b', color: '#f8fafc' }}>
                      {c.nombre}
                    </option>
                  ))}
                </select>
                <select
                  value={formData.id_marca}
                  onChange={(e) => setFormData({ ...formData, id_marca: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.8rem',
                    borderRadius: '0.5rem',
                    border: '1px solid rgba(148,163,184,0.25)',
                    background: 'rgba(255,255,255,0.05)',
                    color: '#f8fafc',
                    fontSize: '0.85rem',
                    fontFamily: 'inherit',
                    cursor: 'pointer',
                  }}
                >
                  <option value="" style={{ background: '#1e293b', color: '#f8fafc' }}>Marca</option>
                  {marcas.map((m) => (
                    <option key={m.id_marca ?? m.id} value={m.id_marca ?? m.id} style={{ background: '#1e293b', color: '#f8fafc' }}>
                      {m.nombre}
                    </option>
                  ))}
                </select>
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
              <textarea
                placeholder="Descripción del producto"
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.625rem',
                  borderRadius: '0.375rem',
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.04)',
                  color: '#cbd5e1',
                  fontSize: '0.875rem',
                  fontFamily: 'inherit',
                  minHeight: '100px',
                  marginBottom: '0.75rem',
                  resize: 'vertical'
                }}
              />
              {/* Subir imagen */}
              <div style={{ marginBottom: '0.75rem' }}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageUpload}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.55rem 1rem',
                      borderRadius: '0.5rem',
                      border: '1px solid rgba(255,255,255,0.15)',
                      background: uploading ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.08)',
                      color: uploading ? '#64748b' : '#cbd5e1',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: uploading ? 'not-allowed' : 'pointer',
                      transition: 'background 0.2s',
                      whiteSpace: 'nowrap',
                      fontFamily: 'inherit',
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    {uploading ? 'Subiendo...' : 'Subir imagen'}
                  </button>
                  <span style={{ fontSize: '0.78rem', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {uploading ? 'Subiendo imagen...' : uploadedFileName || 'Ningún archivo seleccionado'}
                  </span>
                </div>
              </div>
              {formData.imagen_url && (
                <div style={{ marginBottom: '0.75rem' }}>
                  <img
                    src={formData.imagen_url}
                    alt="Vista previa"
                    onError={(e) => { e.target.style.display = 'none' }}
                    onLoad={(e) => { e.target.style.display = 'block' }}
                    style={{
                      display: 'none',
                      width: '100%',
                      maxHeight: '160px',
                      objectFit: 'cover',
                      borderRadius: '0.5rem',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  />
                </div>
              )}
              <div className="form-actions">
                <button type="submit" className="btn-primary" disabled={formSubmitting || uploading}>
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
              <tr key={p.id_producto ?? p.id}>
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
                  <button className="action-btn delete" onClick={() => handleDelete(p.id_producto ?? p.id)} title="Eliminar">
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
function ReportsSection({ onRefresh }) {
  const [downloading, setDownloading] = useState(null)
  const [fechaDesde, setFechaDesde] = useState('')
  const [fechaHasta, setFechaHasta] = useState('')
  const [categoria, setCategoria] = useState('')
  const [marca, setMarca] = useState('')
  const [csvPreview, setCsvPreview] = useState(null)
  const [importingProgress, setImportingProgress] = useState(null)
  const [importSuccess, setImportSuccess] = useState(false)
  const fileInputRef = useRef(null)

  // Categorías y marcas hardcodeadas
  const categorias = ['Proteínas', 'Pre-entreno', 'Vitaminas', 'Accesorios']
  const marcas = ['Optimum Nutrition', 'MuscleTech', 'Dymatize']

  const buildQueryParams = () => {
    const params = new URLSearchParams()
    if (fechaDesde) params.set('fecha_desde', fechaDesde)
    if (fechaHasta) params.set('fecha_hasta', fechaHasta)
    if (categoria) params.set('categoria', categoria)
    if (marca) params.set('marca', marca)
    return params.toString()
  }

  const generateLocalReport = (type) => {
    let content = ''
    const filtroInfo = []

    if (fechaDesde) filtroInfo.push(`Desde: ${fechaDesde}`)
    if (fechaHasta) filtroInfo.push(`Hasta: ${fechaHasta}`)
    if (categoria) filtroInfo.push(`Categoría: ${categoria}`)
    if (marca) filtroInfo.push(`Marca: ${marca}`)

    if (type === 'pdf') {
      content = `
REPORTE DE VENTAS
================

Fecha de generación: ${new Date().toLocaleDateString('es-CO')}
${filtroInfo.length > 0 ? 'Filtros: ' + filtroInfo.join(' | ') : 'Sin filtros específicos'}

RESUMEN:
- Total de registros: [Datos de prueba]
- Período: ${fechaDesde} a ${fechaHasta}
- Categoría: ${categoria || 'Todas'}
- Marca: ${marca || 'Todas'}

Este es un reporte de prueba generado localmente.
Para reportes completos, configura el backend en /api/reports/pdf
      `
      const blob = new Blob([content], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `reporte-ventas-${new Date().getTime()}.txt`
      a.click()
      URL.revokeObjectURL(url)
    } else if (type === 'excel') {
      const csv = `Reporte de Ventas\n\n`
        + `Generado: ${new Date().toLocaleDateString('es-CO')}\n`
        + `Desde: ${fechaDesde || 'N/A'}\n`
        + `Hasta: ${fechaHasta || 'N/A'}\n`
        + `Categoría: ${categoria || 'Todas'}\n`
        + `Marca: ${marca || 'Todas'}\n\n`
        + `Producto,Cantidad,Monto,Categoría,Marca\n`
        + `Datos de prueba,10,5000,${categoria || 'N/A'},${marca || 'N/A'}\n`

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `reporte-ventas-${new Date().getTime()}.csv`
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  const handleDownload = async (type) => {
    setDownloading(type)
    try {
      console.log('Generando reporte:', type)
      console.log('Parámetros:', { fechaDesde, fechaHasta, categoria, marca })

      generateLocalReport(type)

      console.log('✓ Reporte generado y descargado correctamente')
      alert('Reporte descargado. Nota: Este es un reporte local de prueba.')
    } catch (err) {
      console.error('Error:', err)
      alert('Error: ' + err.message)
    } finally {
      setDownloading(null)
    }
  }

  const handleCsvUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.data && results.data.length > 0) {
          setCsvPreview(results.data)
          setImportSuccess(false)
        }
      },
      error: (err) => {
        alert('Error al procesar CSV: ' + err.message)
      }
    })
  }

  const handleConfirmImport = async () => {
    if (!csvPreview || csvPreview.length === 0) return

    setImportingProgress({ current: 0, total: csvPreview.length })

    try {
      for (let i = 0; i < csvPreview.length; i++) {
        const row = csvPreview[i]
        await createBackendProduct({
          nombre: row.nombre,
          sku: row.sku,
          precio: parseFloat(row.precio) || 0,
          stock: parseInt(row.stock) || 0,
          descripcion: row.descripcion || '',
          id_categoria: row.id_categoria || '',
          id_marca: row.id_marca || ''
        })
        setImportingProgress({ current: i + 1, total: csvPreview.length })
      }
      setImportSuccess(true)
      setCsvPreview(null)
      setImportingProgress(null)
      if (onRefresh) await onRefresh()
      setTimeout(() => setImportSuccess(false), 3000)
    } catch (err) {
      alert('Error durante importación: ' + err.message)
      setImportingProgress(null)
    }
  }

  return (
    <div className="admin-section">
      <h1 className="section-title">Reportes</h1>

      {/* Filtros */}
      <div style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '0.5rem',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginTop: 0, marginBottom: '1.25rem', color: '#f8fafc', fontSize: '1rem' }}>Filtros</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
          {/* Fecha Desde */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>Fecha Desde</label>
            <input
              type="date"
              value={fechaDesde}
              onChange={(e) => setFechaDesde(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.8rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(148,163,184,0.25)',
                background: 'rgba(255,255,255,0.05)',
                color: '#f8fafc',
                fontSize: '0.85rem',
                fontFamily: 'inherit',
              }}
            />
          </div>

          {/* Fecha Hasta */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>Fecha Hasta</label>
            <input
              type="date"
              value={fechaHasta}
              onChange={(e) => setFechaHasta(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.8rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(148,163,184,0.25)',
                background: 'rgba(255,255,255,0.05)',
                color: '#f8fafc',
                fontSize: '0.85rem',
                fontFamily: 'inherit',
              }}
            />
          </div>

          {/* Categoría */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>Categoría</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.8rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(148,163,184,0.25)',
                background: 'rgba(255,255,255,0.05)',
                color: '#f8fafc',
                fontSize: '0.85rem',
                fontFamily: 'inherit',
                cursor: 'pointer',
              }}
            >
              <option value="" style={{ background: '#1e293b', color: '#f8fafc' }}>Todas</option>
              {categorias.map((c) => (
                <option key={c} value={c} style={{ background: '#1e293b', color: '#f8fafc' }}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Marca */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>Marca</label>
            <select
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.8rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(148,163,184,0.25)',
                background: 'rgba(255,255,255,0.05)',
                color: '#f8fafc',
                fontSize: '0.85rem',
                fontFamily: 'inherit',
                cursor: 'pointer',
              }}
            >
              <option value="" style={{ background: '#1e293b', color: '#f8fafc' }}>Todas</option>
              {marcas.map((m) => (
                <option key={m} value={m} style={{ background: '#1e293b', color: '#f8fafc' }}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Botones */}
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

      {/* CSV Import Section */}
      <div style={{ marginTop: '2rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', padding: '1.5rem' }}>
        <h2 style={{ marginTop: 0, color: '#f8fafc', fontSize: '1.1rem' }}>Importar productos desde CSV</h2>

        {importSuccess && (
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', borderRadius: '0.5rem', padding: '0.875rem', marginBottom: '1rem', color: '#10b981' }}>
            ✓ {csvPreview ? csvPreview.length : 0} productos importados exitosamente
          </div>
        )}

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', color: '#cbd5e1', marginBottom: '0.5rem', fontWeight: 500 }}>
            Selecciona archivo CSV
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleCsvUpload}
            style={{
              display: 'block',
              width: '100%',
              padding: '0.65rem 0.8rem',
              borderRadius: '0.5rem',
              border: '1px solid rgba(148,163,184,0.25)',
              background: 'rgba(255,255,255,0.05)',
              color: '#f8fafc',
              fontSize: '0.85rem',
              fontFamily: 'inherit',
              cursor: 'pointer'
            }}
          />
          <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>
            Columnas esperadas: nombre, sku, precio, stock (opcional: descripcion, id_categoria, id_marca)
          </p>
        </div>

        {csvPreview && csvPreview.length > 0 && (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <h4 style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '0.75rem' }}>Preview de datos</h4>
              <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <th style={{ padding: '0.5rem', textAlign: 'left', color: '#94a3b8' }}>Nombre</th>
                      <th style={{ padding: '0.5rem', textAlign: 'left', color: '#94a3b8' }}>SKU</th>
                      <th style={{ padding: '0.5rem', textAlign: 'left', color: '#94a3b8' }}>Precio</th>
                      <th style={{ padding: '0.5rem', textAlign: 'left', color: '#94a3b8' }}>Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {csvPreview.slice(0, 5).map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '0.5rem', color: '#e2e8f0' }}>{row.nombre}</td>
                        <td style={{ padding: '0.5rem', color: '#e2e8f0' }}>{row.sku}</td>
                        <td style={{ padding: '0.5rem', color: '#e2e8f0' }}>${row.precio}</td>
                        <td style={{ padding: '0.5rem', color: '#e2e8f0' }}>{row.stock}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {csvPreview.length > 5 && (
                  <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>
                    ... y {csvPreview.length - 5} productos más
                  </p>
                )}
              </div>
            </div>

            {importingProgress && (
              <div style={{ marginBottom: '1rem', background: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: '0.375rem' }}>
                <p style={{ color: '#cbd5e1', fontSize: '0.875rem', margin: 0 }}>
                  Importando {importingProgress.current} de {importingProgress.total}...
                </p>
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginTop: '0.5rem', overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: '#10b981', width: `${(importingProgress.current / importingProgress.total) * 100}%`, transition: 'width 0.2s' }} />
                </div>
              </div>
            )}

            <button
              className="btn-primary"
              onClick={handleConfirmImport}
              disabled={importingProgress !== null}
              style={{ marginRight: '0.5rem' }}
            >
              {importingProgress ? 'Importando...' : 'Confirmar importación'}
            </button>
            <button
              className="btn-secondary"
              onClick={() => { setCsvPreview(null); fileInputRef.current.value = '' }}
              disabled={importingProgress !== null}
            >
              Cancelar
            </button>
          </>
        )}
      </div>
    </div>
  )
}

// Charts Section
function ChartsSection({ productos, ventas, loading }) {
  if (loading) return <div className="loading-text">Cargando datos...</div>

  // Sales by month
  const getLast6Months = () => {
    const months = []
    const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    const today = new Date()

    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1)
      months.push({
        name: `${monthNames[d.getMonth()]} ${d.getFullYear()}`,
        total: 0
      })
    }
    return months
  }

  const salesByMonth = getLast6Months()
  ventas.forEach(v => {
    const saleDate = new Date(v.fecha || v.created_at)
    const saleMonth = saleDate.getMonth()
    const saleYear = saleDate.getFullYear()

    const today = new Date()
    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1)
      if (d.getMonth() === saleMonth && d.getFullYear() === saleYear) {
        salesByMonth[5 - i].total += parseFloat(v.monto || v.total || 0)
      }
    }
  })

  // Top products
  const productCount = {}
  ventas.forEach(v => {
    let items = []
    if (v.items) {
      try {
        items = typeof v.items === 'string' ? JSON.parse(v.items) : v.items
      } catch (e) {
        console.error("Error parsing items", e)
      }
    }
    if (Array.isArray(items)) {
      items.forEach(item => {
        const pid = item.product_id || item.productId || item.id_producto || item.id
        const qty = parseInt(item.quantity || item.qty || 1, 10)
        if (pid) productCount[pid] = (productCount[pid] || 0) + qty
      })
    }
  })

  const productMap = {}
  productos.forEach(p => {
    const id = p.id_producto ?? p.id
    productMap[id] = p.nombre
  })

  const pieData = Object.keys(productCount).map(pid => ({
    name: productMap[pid] || `Producto ${pid}`,
    value: productCount[pid]
  }))
  pieData.sort((a, b) => b.value - a.value)

  const finalPieData = pieData.length > 0 ? pieData : [
    { name: 'Whey Gold Standard', value: 12 },
    { name: 'Pre-workout C4', value: 8 },
    { name: 'Creatina Monohidrato', value: 15 },
    { name: 'Multivitamínico Sport', value: 5 },
    { name: 'BCAA 2:1:1', value: 7 }
  ]

  const COLORS = ['#ff4b63', '#ff8a00', '#06b6d4', '#10b981', '#6366f1', '#ec4899']

  return (
    <div className="admin-section">
      <h1 className="section-title">Gráficas</h1>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Ventas por Mes (Últimos 6 Meses)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesByMonth}>
              <XAxis dataKey="name" stroke="#94a3b8" style={{ fontSize: '0.85rem' }} />
              <YAxis stroke="#94a3b8" style={{ fontSize: '0.85rem' }} />
              <Tooltip
                contentStyle={{ background: '#0d0d0d', border: '1px solid rgba(255, 75, 99, 0.2)', borderRadius: '0.375rem' }}
                labelStyle={{ color: '#f8fafc' }}
              />
              <RechartsBar dataKey="total" fill="#ff4b63" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card full-width">
          <h3>Productos Más Vendidos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <RechartsPie
                data={finalPieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} (${value})`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {finalPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </RechartsPie>
              <Tooltip contentStyle={{ background: '#0d0d0d', border: '1px solid rgba(255, 75, 99, 0.2)', borderRadius: '0.375rem' }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
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
  const [avgRating, setAvgRating] = useState('0.0')
  const [lowStockProducts, setLowStockProducts] = useState([])

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
        getDashboardStats().catch(() => ({ totalVentas: 0, totalProductos: 0, totalUsuarios: 0, totalOrdenes: 0 })),
        getBackendProducts().catch(() => []),
        getBackendSales().catch(() => []),
      ])

      setStats(statsData || { totalVentas: 0, totalProductos: 0, totalUsuarios: 0, totalOrdenes: 0 })

      // El endpoint puede devolver un objeto envolvente o un array directo
      const productosArray = Array.isArray(productosData)
        ? productosData
        : productosData?.data || productosData?.products || productosData?.productos || []
      setProductos(productosArray)

      // Igual para ventas
      const ventasArray = Array.isArray(ventasData)
        ? ventasData
        : ventasData?.data || ventasData?.sales || ventasData?.ventas || []
      setVentas(ventasArray)

      // Calcular calificación promedio
      const { data: ratingsData, error: ratingsError } = await supabase
        .from('ratings')
        .select('rating')

      let computedAvg = '0.0'
      if (!ratingsError && ratingsData && ratingsData.length > 0) {
        const sum = ratingsData.reduce((acc, curr) => acc + curr.rating, 0)
        computedAvg = (sum / ratingsData.length).toFixed(1)
      }
      setAvgRating(computedAvg)

      // Cargar stock bajo
      let lowProds = []
      try {
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
        const summaryRes = await fetch(`${baseUrl}/api/products/stock/summary`)
        if (summaryRes.ok) {
          const summaryData = await summaryRes.json()
          lowProds = Array.isArray(summaryData) ? summaryData : (summaryData.products || summaryData.data || [])
        } else {
          throw new Error('Not OK')
        }
      } catch (e) {
        // Fallback: filtrar stock <= 5 desde productos locales
        lowProds = productosArray.filter(p => (p.stock ?? p.stock_actual ?? 0) <= 5)
      }
      setLowStockProducts(lowProds)
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
    { id: 'graficas', label: 'Gráficas', icon: IconChart },
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
              {(() => {
                const displayName =
                  adminUser.user_metadata?.full_name ||
                  adminUser.user_metadata?.name ||
                  null
                return (
                  <>
                    <div style={{ fontWeight: 600, color: '#f8fafc', fontSize: '0.88rem', marginBottom: '0.25rem' }}>
                      {displayName || adminUser.email}
                    </div>
                    {displayName && (
                      <div style={{ color: '#94a3b8', fontSize: '0.78rem', wordBreak: 'break-all' }}>
                        {adminUser.email}
                      </div>
                    )}
                  </>
                )
              })()}
            </div>
          )}
          <button className="btn-logout" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="admin-main">
        {activeTab === 'dashboard' && (
          <DashboardSection
            stats={stats}
            loading={loading}
            productos={productos}
            ventas={ventas}
            avgRating={avgRating}
            lowStockProducts={lowStockProducts}
          />
        )}
        {activeTab === 'productos' && <ProductsSection productos={productos} onRefresh={cargarDatos} loading={loading} />}
        {activeTab === 'ventas' && <SalesSection ventas={ventas} loading={loading} />}
        {activeTab === 'graficas' && <ChartsSection productos={productos} ventas={ventas} loading={loading} />}
        {activeTab === 'reportes' && <ReportsSection onRefresh={cargarDatos} />}
      </main>
    </div>
  )
}
