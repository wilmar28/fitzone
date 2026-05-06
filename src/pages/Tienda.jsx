import { useEffect, useState } from 'react'
import {
  getTiendaProductos,
  getTiendaCategorias,
  getTiendaMarcas
} from '../services/api'

export default function Tienda() {
  const [productos,  setProductos]  = useState([])
  const [categorias, setCategorias] = useState([])
  const [marcas,     setMarcas]     = useState([])
  const [cargando,   setCargando]   = useState(true)
  const [error,      setError]      = useState(null)
  const [filtros,    setFiltros]    = useState({
    categoria: '',
    marca:     '',
    buscar:    '',
    orden:     'nombre',
  })

  // Cargar categorías y marcas una vez
  useEffect(() => {
    Promise.all([getTiendaCategorias(), getTiendaMarcas()])
      .then(([catData, marcData]) => {
        setCategorias(catData.categorias)
        setMarcas(marcData.marcas)
      })
      .catch(err => setError(err.message))
  }, [])

  // Recargar productos cuando cambien filtros
  useEffect(() => {
    setCargando(true)
    getTiendaProductos(filtros)
      .then(data => setProductos(data.productos))
      .catch(err => setError(err.message))
      .finally(() => setCargando(false))
  }, [filtros])

  const setFiltro = (campo, valor) =>
    setFiltros(prev => ({ ...prev, [campo]: valor }))

  // ── Estilos inline reutilizables ──────────────────────
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
    if (estado === 'agotado')    return '220,38,38'
    if (estado === 'stock bajo') return '217,119,6'
    return '34,197,94'
  }

  if (error) return (
    <div className="main-shell">
      <div style={{ padding: '1rem', background: 'rgba(220,38,38,0.15)',
                    border: '1px solid rgba(220,38,38,0.3)', borderRadius: '0.7rem',
                    color: '#fca5a5' }}>
        Error al cargar productos: {error}
      </div>
    </div>
  )

  return (
    <div className="main-shell">

      {/* ── Hero de la tienda ── */}
      <div style={{ marginBottom: '1.5rem' }}>
        <span className="fz-kicker">Catálogo</span>
        <h1 className="fz-big-title" style={{ marginBottom: '0.3rem' }}>
          Tienda FitZone
        </h1>
        <p className="fz-copy">
          {cargando ? 'Cargando...' : `${productos.length} productos disponibles`}
        </p>
      </div>

      {/* ── Barra de filtros ── */}
      <div style={{ display: 'flex', gap: '0.7rem', marginBottom: '1.5rem',
                    flexWrap: 'wrap', alignItems: 'center' }}>

        {/* Buscador */}
        <input
          type="text"
          placeholder="Buscar suplemento..."
          value={filtros.buscar}
          onChange={e => setFiltro('buscar', e.target.value)}
          style={{ ...selectStyle, minWidth: '200px', flex: 1 }}
        />

        {/* Categoría */}
        <select value={filtros.categoria}
                onChange={e => setFiltro('categoria', e.target.value)}
                style={selectStyle}>
          <option value="">Todas las categorías</option>
          {categorias.map(c => (
            <option key={c.id_categoria} value={c.id_categoria}>
              {c.nombre}
            </option>
          ))}
        </select>

        {/* Marca */}
        <select value={filtros.marca}
                onChange={e => setFiltro('marca', e.target.value)}
                style={selectStyle}>
          <option value="">Todas las marcas</option>
          {marcas.map(m => (
            <option key={m.id_marca} value={m.id_marca}>
              {m.nombre}
            </option>
          ))}
        </select>

        {/* Ordenar */}
        <select value={filtros.orden}
                onChange={e => setFiltro('orden', e.target.value)}
                style={selectStyle}>
          <option value="nombre">Nombre A–Z</option>
          <option value="precio_asc">Precio: menor a mayor</option>
          <option value="precio_desc">Precio: mayor a menor</option>
          <option value="nuevo">Más nuevos</option>
        </select>

        {/* Botón limpiar filtros */}
        {(filtros.buscar || filtros.categoria || filtros.marca) && (
          <button
            onClick={() => setFiltros({ categoria:'', marca:'', buscar:'', orden:'nombre' })}
            style={{ ...selectStyle, background: 'rgba(255,75,99,0.12)',
                     border: '1px solid rgba(255,75,99,0.3)', color: '#fca5a5',
                     cursor: 'pointer' }}>
            Limpiar filtros ×
          </button>
        )}
      </div>

      {/* ── Grid de productos ── */}
      {cargando ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem' }}>
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="card" style={{ height: '320px',
                 background: 'rgba(255,255,255,0.04)', animation: 'pulse 1.5s infinite' }} />
          ))}
        </div>
      ) : productos.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
          <p style={{ fontSize: '1.1rem' }}>No se encontraron productos</p>
          <button onClick={() => setFiltros({ categoria:'', marca:'', buscar:'', orden:'nombre' })}
                  className="gradient-btn" style={{ marginTop: '1rem' }}>
            Ver todos los productos
          </button>
        </div>
      ) : (
        <div className="grid-cards">
          {productos.map(p => (
            <div key={p.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>

              {/* Imagen */}
              {p.imagen ? (
                <img src={p.imagen} alt={p.nombre}
                     style={{ width: '100%', height: '185px', objectFit: 'cover',
                              borderRadius: '0.6rem', marginBottom: '0.8rem' }} />
              ) : (
                <div style={{ width: '100%', height: '185px', borderRadius: '0.6rem',
                              background: 'linear-gradient(135deg,rgba(255,75,99,0.08),rgba(255,138,0,0.08))',
                              display: 'flex', flexDirection: 'column',
                              alignItems: 'center', justifyContent: 'center',
                              marginBottom: '0.8rem', gap: '0.4rem' }}>
                  <span style={{ fontSize: '2rem', opacity: 0.3 }}>🏋️</span>
                  <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Sin imagen</span>
                </div>
              )}

              {/* Badges categoría + marca */}
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                {p.categoria && (
                  <span style={badgeStyle('255,75,99')}>{p.categoria}</span>
                )}
                {p.marca && (
                  <span style={badgeStyle('56,189,248')}>{p.marca}</span>
                )}
              </div>

              {/* Nombre */}
              <h3 style={{ margin: '0 0 0.35rem', fontSize: '0.92rem',
                           fontWeight: 600, lineHeight: 1.3 }}>
                {p.nombre}
              </h3>

              {/* SKU */}
              <p style={{ margin: '0 0 0.4rem', fontSize: '0.7rem', color: '#64748b' }}>
                SKU: {p.sku}
              </p>

              {/* Descripción */}
              {p.descripcion && (
                <p style={{ margin: '0 0 0.6rem', fontSize: '0.78rem', color: '#94a3b8',
                            lineHeight: 1.5, display: '-webkit-box',
                            WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {p.descripcion}
                </p>
              )}

              {/* Espaciador */}
              <div style={{ flex: 1 }} />

              {/* Precio + stock */}
              <div style={{ display: 'flex', justifyContent: 'space-between',
                            alignItems: 'center', marginTop: '0.6rem', marginBottom: '0.7rem' }}>
                <span className="price">
                  ${p.precio.toLocaleString('es-CO')}
                </span>
                <span style={badgeStyle(stockColor(p.estado_stock))}>
                  {p.estado_stock === 'agotado'    ? 'Agotado'
                   : p.estado_stock === 'stock bajo' ? `Últimas ${p.stock} uds`
                   : `${p.stock} en stock`}
                </span>
              </div>

              {/* Margen (solo visible si quieres mostrarlo — puedes quitarlo) */}
              <p style={{ margin: '0 0 0.7rem', fontSize: '0.7rem', color: '#64748b' }}>
                Margen: {p.margen}%
              </p>

              {/* Botón */}
              <button
                disabled={p.estado_stock === 'agotado'}
                style={{
                  width: '100%', padding: '0.65rem', borderRadius: '999px',
                  border: 'none', fontWeight: 700, fontSize: '0.8rem',
                  cursor: p.estado_stock === 'agotado' ? 'not-allowed' : 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  background: p.estado_stock === 'agotado'
                    ? 'rgba(148,163,184,0.12)'
                    : 'linear-gradient(120deg,#ff4b63,#ff8a00)',
                  color: p.estado_stock === 'agotado' ? '#475569' : 'white',
                  boxShadow: p.estado_stock === 'agotado'
                    ? 'none' : '0 4px 15px rgba(255,75,99,0.25)',
                }}>
                {p.estado_stock === 'agotado' ? 'Sin stock' : 'Agregar al carrito'}
              </button>

            </div>
          ))}
        </div>
      )}

    </div>
  )
}