import { useCart } from '../context/CartContext'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { isAuthenticated } from '../services/api'

export default function Carrito() {

  const {
    items,
    removeItem,
    updateQty,
    clearCart,
    totalPrice
  } = useCart()

  const navigate = useNavigate()



  const handleCheckout = () => {

    if (!isAuthenticated()) {
      navigate('/login')
      return
    }

    navigate('/checkout', {
      state: {
        items,
        totalPrice,
      },
    })
  }

  if (items.length === 0) return (
    <section className="main-shell" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
      <h2 style={{ color: '#f8fafc', marginBottom: '0.5rem' }}>Tu carrito está vacío</h2>
      <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Agrega productos desde la tienda</p>
      <Link to="/tienda" className="gradient-btn">Ir a la tienda</Link>
    </section>
  )

  return (
    <section className="main-shell">
      <span className="fz-kicker">Tu pedido</span>
      <h1 className="fz-big-title" style={{ marginBottom: '2rem' }}>Carrito de compras</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '1.5rem', alignItems: 'start' }}>

        {/* Lista de productos */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {items.map(item => (
            <div key={item.id} className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {item.imagen ? (
                <img src={item.imagen} alt={item.nombre} style={{ width: 70, height: 70, objectFit: 'cover', borderRadius: 8 }} />
              ) : (
                <div style={{ width: 70, height: 70, borderRadius: 8, background: 'rgba(255,75,99,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>🏋️</div>
              )}
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 600 }}>{item.nombre}</h3>
                <p style={{ margin: '0.2rem 0 0', color: '#94a3b8', fontSize: '0.8rem' }}>
                  ${(item.precio * item.qty).toLocaleString('es-CO')}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'white', cursor: 'pointer', fontSize: '1rem' }}>−</button>
                <span style={{ minWidth: 24, textAlign: 'center', fontSize: '0.88rem' }}>{item.qty}</span>
                <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'white', cursor: 'pointer', fontSize: '1rem' }}>+</button>
              </div>
              <button onClick={() => removeItem(item.id)} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5', borderRadius: 8, padding: '0.4rem 0.8rem', cursor: 'pointer', fontSize: '0.78rem' }}>Quitar</button>
            </div>
          ))}
        </div>

        {/* Resumen */}
        <div className="card" style={{ position: 'sticky', top: '5rem' }}>
          <h3 style={{ margin: '0 0 1.2rem', fontSize: '1rem', fontWeight: 700 }}>Resumen del pedido</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', fontSize: '0.85rem', color: '#94a3b8' }}>
            <span>Subtotal</span>
            <span>${totalPrice.toLocaleString('es-CO')}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem', fontSize: '0.85rem', color: '#94a3b8' }}>
            <span>Envío</span>
            <span style={{ color: '#4ade80' }}>Gratis</span>
          </div>
          <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', marginBottom: '1.2rem' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <span style={{ fontWeight: 700 }}>Total</span>
            <span className="price">${totalPrice.toLocaleString('es-CO')}</span>
          </div>
          <button
  onClick={handleCheckout}
  className="gradient-btn"
  style={{
    width: '100%',
    padding: '0.85rem',
    borderRadius: 10,
    marginBottom: '0.8rem',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 700
  }}
>
  Proceder al pago
</button>
          <button onClick={clearCart}  style={{ width: '100%', padding: '0.7rem', borderRadius: 10, background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', cursor: 'pointer', fontSize: '0.8rem' }}>
            Vaciar carrito
          </button>
        </div>
      </div>
    </section>
  )
}
