import { useState } from 'react'
import InfoModal from '../components/InfoModal'

const products = [
  { nombre: 'Proteina Whey 2kg', tipo: 'Suplemento', precio: '$45' },
  { nombre: 'Creatina 500g', tipo: 'Suplemento', precio: '$28' },
  { nombre: 'Guantes de entreno', tipo: 'Accesorio', precio: '$15' },
  { nombre: 'Cuerda para saltar', tipo: 'Accesorio', precio: '$10' },
]

function Tienda({ onAddToCart }) {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cartMessage, setCartMessage] = useState('')

  const handleAddProduct = (product) => {
    setCartMessage('')
    setSelectedProduct(product)
  }

  const handleConfirmCart = () => {
    if (selectedProduct) {
      onAddToCart(selectedProduct)
    }
    setCartMessage(`${selectedProduct?.nombre} fue enviado al carrito correctamente.`)
    setSelectedProduct(null)
  }

  return (
    <section>
      <h2 className="section-title">Tienda FitZone</h2>
      <p className="section-subtitle">Todo lo que necesitas para entrenar al maximo.</p>
      {cartMessage ? <p className="cart-message">{cartMessage}</p> : null}
      <div className="grid-cards two-cols">
        {products.map((product) => (
          <article key={product.nombre} className="card animate-up">
            <h3>{product.nombre}</h3>
            <p>Categoria: {product.tipo}</p>
            <p className="price">{product.precio}</p>
            <button
              type="button"
              className="gradient-btn"
              onClick={() => handleAddProduct(product)}
            >
              Agregar
            </button>
          </article>
        ))}
      </div>
      <InfoModal
        isOpen={Boolean(selectedProduct)}
        title={selectedProduct ? `Confirmar compra: ${selectedProduct.nombre}` : ''}
        description="Revisa los detalles y confirma para enviarlo al carrito de compras."
        details={[
          `Precio actual: ${selectedProduct?.precio ?? ''}`,
          'Entrega estimada en 24 a 48 horas.',
          'Pago seguro con tarjeta o transferencia.',
        ]}
        confirmLabel="Confirmar"
        onConfirm={handleConfirmCart}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  )
}

export default Tienda
