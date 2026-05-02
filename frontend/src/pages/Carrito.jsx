function Carrito({ cartItems, onRemoveItem, onClearCart }) {
  const total = cartItems.reduce((acc, item) => acc + Number(item.precio.replace('$', '')), 0)

  return (
    <section>
      <h2 className="section-title">Carrito</h2>
      <p className="section-subtitle">Aqui puedes revisar los productos agregados.</p>

      {cartItems.length === 0 ? (
        <article className="card">
          <p>Tu carrito esta vacio. Ve a la tienda y agrega productos.</p>
        </article>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map((item, index) => (
              <article key={`${item.nombre}-${index}`} className="card cart-item">
                <div>
                  <h3>{item.nombre}</h3>
                  <p>Categoria: {item.tipo}</p>
                </div>
                <div className="cart-actions">
                  <p className="price">{item.precio}</p>
                  <button type="button" className="pill-btn" onClick={() => onRemoveItem(index)}>
                    Quitar
                  </button>
                </div>
              </article>
            ))}
          </div>
          <article className="card cart-summary">
            <h3>Total estimado</h3>
            <p className="price">${total}</p>
            <button type="button" className="gradient-btn" onClick={onClearCart}>
              Vaciar carrito
            </button>
          </article>
        </>
      )}
    </section>
  )
}

export default Carrito
