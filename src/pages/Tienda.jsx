import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { getTiendaCategorias, getTiendaMarcas, getTiendaProductos, isAuthenticated } from '../services/api'

// Toast notification component
function Toast({ toasts }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.6rem',
      pointerEvents: 'none',
    }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.7rem',
          padding: '0.75rem 1.1rem',
          borderRadius: '0.9rem',
          background: 'rgba(15,23,42,0.92)',
          border: '1px solid rgba(34,197,94,0.35)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(34,197,94,0.1)',
          backdropFilter: 'blur(12px)',
          color: 'white',
          fontSize: '0.82rem',
          fontWeight: 500,
          minWidth: '230px',
          animation: 'toastIn 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          opacity: t.leaving ? 0 : 1,
          transform: t.leaving ? 'translateX(30px)' : 'translateX(0)',
          transition: 'opacity 0.25s ease, transform 0.25s ease',
        }}>
          {/* Check icon */}
          <div style={{
            width: '28px', height: '28px', borderRadius: '50%',
            background: 'rgba(34,197,94,0.15)',
            border: '1px solid rgba(34,197,94,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="rgb(34,197,94)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div>
            <div style={{
              color: 'rgb(134,239,172)', fontSize: '0.7rem', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1px'
            }}>
              Agregado al carrito
            </div>
            <div style={{ color: '#e2e8f0' }}>{t.nombre}</div>
          </div>
        </div>
      ))}
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(40px) scale(0.92); }
          to   { opacity: 1; transform: translateX(0)   scale(1);    }
        }
      `}</style>
    </div>
  )
}

export default function Tienda() {
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [marcas, setMarcas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [filtros, setFiltros] = useState({
    categoria: '',
    marca: '',
    buscar: '',
    orden: 'nombre',
  })
  const [pagina, setPagina] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)
  const [totalProductos, setTotalProductos] = useState(0)
  const [toasts, setToasts] = useState([])
  const { addItem } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchInicial = async () => {
      try {
        const catRes = await getTiendaCategorias()
        setCategorias(catRes)
      } catch {
        setCategorias([
          { id_categoria: 1, nombre: 'Proteínas' },
          { id_categoria: 2, nombre: 'Pre-entreno' },
          { id_categoria: 3, nombre: 'Vitaminas' },
          { id_categoria: 4, nombre: 'Accesorios' },
        ])
      }
      try {
        const marRes = await getTiendaMarcas()
        setMarcas(marRes)
      } catch {
        setMarcas([
          { id_marca: 1, nombre: 'Optimum Nutrition' },
          { id_marca: 2, nombre: 'MuscleTech' },
          { id_marca: 3, nombre: 'Dymatize' },
        ])
      }
    }
    fetchInicial()
  }, [])

  useEffect(() => {
    const fetchProds = async () => {
      setCargando(true)
      try {
        const params = {
          search: filtros.buscar,
          categoria_id: filtros.categoria,
          marca_id: filtros.marca,
          orden: filtros.orden,
          page: pagina,
          per_page: 9,
        }
        const res = await getTiendaProductos(params)
        setProductos(res.productos || [])
        setTotalPaginas(res.last_page || 1)
        setTotalProductos(res.total || 0)
      } catch {
        const mockProductos = [
          { id: 1, nombre: 'Whey Gold Standard (Vainilla)', sku: 'WGS-001', precio: 185000, categoria: 'Proteínas', marca: 'Optimum Nutrition', descripcion: 'Aislado de proteína de suero de leche de alta pureza. Ideal para ganar masa muscular y acelerar la recuperación.', stock: 15, estado_stock: 'disponible', margen: 35, imagen_url: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=800&q=80' },
          { id: 2, nombre: 'Pre-workout C4 Original (Rojo)', sku: 'C4-002', precio: 98000, categoria: 'Pre-entreno', marca: 'Cellucor', descripcion: 'Energía explosiva y concentración mental para potenciar tus entrenamientos más exigentes.', stock: 3, estado_stock: 'stock bajo', margen: 40, imagen_url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80' },
          { id: 3, nombre: 'Creatina Monohidrato Dymatize (300g)', sku: 'CRE-003', precio: 85000, categoria: 'Creatinas', marca: 'Dymatize', descripcion: 'Creatina monohidratada pura 100% micronizada para potenciar la fuerza muscular y la resistencia.', stock: 10, estado_stock: 'disponible', margen: 30, imagen_url: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=800&q=80' },
          { id: 4, nombre: 'Animal Pak Multivitamin (30 packs)', sku: 'MVS-004', precio: 88000, categoria: 'Vitaminas', marca: 'Universal Nutrition', descripcion: 'El complejo vitamínico líder para deportistas de alto rendimiento, cargado con más de 60 ingredientes.', stock: 20, estado_stock: 'disponible', margen: 45, imagen_url: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=800&q=80' },
          { id: 5, nombre: 'Guantes de Gym Grip Pro (Talla M)', sku: 'GUA-005', precio: 48000, categoria: 'Accesorios', marca: 'Dymatize', descripcion: 'Guantes deportivos transpirables con palma reforzada antideslizante para un agarre óptimo.', stock: 12, estado_stock: 'disponible', margen: 50, imagen_url: 'https://images.unsplash.com/photo-1605296867304-46d5465a25f1?auto=format&fit=crop&w=800&q=80' },
          { id: 6, nombre: 'Vaso Mezclador Shaker Pro (Negro)', sku: 'SHK-006', precio: 28000, categoria: 'Accesorios', marca: 'Optimum Nutrition', descripcion: 'Shaker de alta calidad con rejilla mezcladora a prueba de fugas y compartimento para polvo.', stock: 0, estado_stock: 'agotado', margen: 50, imagen_url: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=800&q=80' },
        ]
        setProductos(mockProductos)
        setTotalPaginas(1)
        setTotalProductos(mockProductos.length)
      } finally {
        setCargando(false)
      }
    }
    fetchProds()
  }, [filtros, pagina])

  const showToast = (nombre) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, nombre, leaving: false }])
    // Start leave animation after 2.5s
    setTimeout(() => {
      setToasts(prev => prev.map(t => t.id === id ? { ...t, leaving: true } : t))
    }, 2500)
    // Remove from DOM after animation completes
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 2800)
  }

  const handleAddItem = (p) => {
    if (!isAuthenticated()) {
      navigate('/login')
      return
    }
    addItem({ id: p.id, nombre: p.nombre, precio: p.precio, imagen: p.imagen_url })
    showToast(p.nombre)
  }

  const setFiltro = (campo, valor) => {
    setPagina(1)
    setFiltros(prev => ({ ...prev, [campo]: valor }))
  }

  const selectStyle = {
    padding: '0.55rem 0.8rem',
    borderRadius: '0.6rem',
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(148,163,184,0.3)',
    color: 'white',
    fontSize: '0.82rem',
    cursor: 'pointer',
  }

  const badgeStyle = (color) => ({
    fontSize: '0.68rem',
    padding: '0.2rem 0.65rem',
    borderRadius: '999px',
    fontWeight: 700,
    background: `rgba(${color},0.15)`,
    border: `1px solid rgba(${color},0.3)`,
    color: `rgb(${color})`,
  })

  const stockColor = (estado) => {
    if (estado === 'agotado') return '220,38,38'
    if (estado === 'stock bajo') return '217,119,6'
    return '34,197,94'
  }

  if (error) return (
    <div className="main-shell">
      <div style={{
        padding: '1rem', background: 'rgba(220,38,38,0.15)',
        border: '1px solid rgba(220,38,38,0.3)', borderRadius: '0.7rem',
        color: '#fca5a5'
      }}>
        Error al cargar productos: {error}
      </div>
    </div>
  )

  return (
    <div className="main-shell">
      <Toast toasts={toasts} />

      {/* Hero */}
      <div style={{ marginBottom: '1.5rem' }}>
        <span className="fz-kicker">Catálogo</span>
        <h1 className="fz-big-title" style={{ marginBottom: '0.3rem' }}>
          Tienda FitZone
        </h1>
        <p className="fz-copy">
          {cargando ? 'Cargando...' : `${totalProductos} productos encontrados`}
        </p>
      </div>

      {/* Filtros */}
      <div style={{
        display: 'flex', gap: '0.7rem', marginBottom: '1.5rem',
        flexWrap: 'wrap', alignItems: 'center'
      }}>
        <input
          type="text"
          placeholder="Buscar suplemento..."
          value={filtros.buscar}
          onChange={e => setFiltro('buscar', e.target.value)}
          style={{ ...selectStyle, minWidth: '200px', flex: 1 }}
        />
        <select value={filtros.categoria}
          onChange={e => setFiltro('categoria', e.target.value)}
          style={selectStyle}>
          <option value="">Todas las categorías</option>
          {categorias.map(c => (
            <option key={c.id_categoria} value={c.id_categoria}>{c.nombre}</option>
          ))}
        </select>
        <select value={filtros.marca}
          onChange={e => setFiltro('marca', e.target.value)}
          style={selectStyle}>
          <option value="">Todas las marcas</option>
          {marcas.map(m => (
            <option key={m.id_marca} value={m.id_marca}>{m.nombre}</option>
          ))}
        </select>
        <select value={filtros.orden}
          onChange={e => setFiltro('orden', e.target.value)}
          style={selectStyle}>
          <option value="nombre">Nombre A–Z</option>
          <option value="precio_asc">Precio: menor a mayor</option>
          <option value="precio_desc">Precio: mayor a menor</option>
          <option value="nuevo">Más nuevos</option>
        </select>
        {(filtros.buscar || filtros.categoria || filtros.marca) && (
          <button
            onClick={() => {
              setPagina(1)
              setFiltros({ categoria: '', marca: '', buscar: '', orden: 'nombre' })
            }}
            style={{
              ...selectStyle, background: 'rgba(255,75,99,0.12)',
              border: '1px solid rgba(255,75,99,0.3)', color: '#fca5a5'
            }}>
            Limpiar filtros ×
          </button>
        )}
      </div>

      {/* Grid */}
      {cargando ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem' }}>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="card" style={{
              height: '320px',
              background: 'rgba(255,255,255,0.04)', animation: 'pulse 1.5s infinite'
            }} />
          ))}
        </div>
      ) : productos.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
          <p style={{ fontSize: '1.1rem' }}>No se encontraron productos</p>
          <button onClick={() => setFiltros({ categoria: '', marca: '', buscar: '', orden: 'nombre' })}
            className="gradient-btn" style={{ marginTop: '1rem' }}>
            Ver todos los productos
          </button>
        </div>
      ) : (
        <div className="grid-cards">
          {productos.map(p => (
            <div key={p.id} className="fz-glass-card">

              {/* Imagen */}
              <div className="fz-glass-card-img-wrapper">
                <img 
                  src={p.imagen_url || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80'} 
                  alt={p.nombre}
                  className="fz-glass-card-img"
                  onError={(e) => { 
                    e.target.onerror = null; 
                    e.target.src = 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80'; 
                  }} 
                />
              </div>

              {/* Badges */}
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
                {p.categoria && <span style={badgeStyle('255,75,99')}>{p.categoria}</span>}
                {p.marca && <span style={badgeStyle('56,189,248')}>{p.marca}</span>}
              </div>

              {/* Nombre */}
              <h3 style={{ margin: '0 0 0.35rem', fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc', lineHeight: 1.3 }}>
                {p.nombre}
              </h3>

              {/* SKU */}
              <p style={{ margin: '0 0 0.6rem', fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                SKU: {p.sku}
              </p>

              {/* Descripción */}
              {p.descripcion && (
                <p style={{
                  margin: '0 0 1rem', fontSize: '0.82rem', color: '#cbd5e1',
                  lineHeight: 1.5, display: '-webkit-box',
                  WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                }}>
                  {p.descripcion}
                </p>
              )}

              <div style={{ flex: 1 }} />

              {/* Precio + stock */}
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', marginTop: '0.6rem', marginBottom: '0.8rem'
              }}>
                <span className="price" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ff4b63' }}>
                  ${p.precio ? p.precio.toLocaleString('es-CO') : '0'} COP
                </span>
                <span style={badgeStyle(stockColor(p.estado_stock))}>
                  {p.estado_stock === 'agotado' ? 'Agotado'
                    : p.estado_stock === 'stock bajo' ? `Últimas ${p.stock} uds`
                      : `${p.stock} en stock`}
                </span>
              </div>

              {/* Botón */}
              <button
                disabled={p.estado_stock === 'agotado'}
                onClick={() => handleAddItem(p)}
                style={{
                  width: '100%', padding: '0.7rem', borderRadius: '999px',
                  border: 'none', fontWeight: 700, fontSize: '0.82rem',
                  cursor: p.estado_stock === 'agotado' ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  background: p.estado_stock === 'agotado'
                    ? 'rgba(255,255,255,0.05)'
                    : 'linear-gradient(120deg,#ff4b63,#ff8a00)',
                  color: p.estado_stock === 'agotado' ? '#475569' : 'white',
                  boxShadow: p.estado_stock === 'agotado' ? 'none' : '0 4px 15px rgba(255,75,99,0.25)',
                }}>
                {p.estado_stock === 'agotado' ? 'Sin stock' : 'Comprar'}
              </button>

            </div>
          ))}
        </div>
      )}

      {/* Paginación */}
      {totalPaginas > 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.5rem',
          marginTop: '2.5rem',
          marginBottom: '1rem'
        }}>
          <button
            disabled={pagina === 1}
            onClick={() => setPagina(prev => Math.max(prev - 1, 1))}
            style={{
              padding: '0.55rem 0.9rem',
              borderRadius: '0.6rem',
              background: pagina === 1 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(148,163,184,0.15)',
              color: pagina === 1 ? '#475569' : 'white',
              cursor: pagina === 1 ? 'not-allowed' : 'pointer',
              fontSize: '0.82rem',
              fontWeight: 600,
              transition: 'background 0.2s'
            }}
          >
            ← Anterior
          </button>
          
          {Array.from({ length: totalPaginas }, (_, idx) => idx + 1).map(pNum => (
            <button
              key={pNum}
              onClick={() => setPagina(pNum)}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '0.6rem',
                background: pagina === pNum ? 'linear-gradient(120deg,#ff4b63,#ff8a00)' : 'rgba(255,255,255,0.07)',
                border: pagina === pNum ? 'none' : '1px solid rgba(148,163,184,0.15)',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.82rem',
                fontWeight: 700,
                boxShadow: pagina === pNum ? '0 4px 12px rgba(255,75,99,0.3)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              {pNum}
            </button>
          ))}

          <button
            disabled={pagina === totalPaginas}
            onClick={() => setPagina(prev => Math.min(prev + 1, totalPaginas))}
            style={{
              padding: '0.55rem 0.9rem',
              borderRadius: '0.6rem',
              background: pagina === totalPaginas ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(148,163,184,0.15)',
              color: pagina === totalPaginas ? '#475569' : 'white',
              cursor: pagina === totalPaginas ? 'not-allowed' : 'pointer',
              fontSize: '0.82rem',
              fontWeight: 600,
              transition: 'background 0.2s'
            }}
          >
            Siguiente →
          </button>
        </div>
      )}

    </div>
  )
}
