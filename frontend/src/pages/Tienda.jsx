import { useState } from 'react'
import InfoModal from '../components/InfoModal'
import UniversalCard from '../components/UniversalCard'

const products = [
  { nombre: 'Proteina Whey 2kg', tipo: 'Suplemento', precio: '$45', oldPrice: '$55', rating: 5, image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=800&q=80', badge: '-15%', badgeColor: 'danger' },
  { nombre: 'Creatina 500g', tipo: 'Suplemento', precio: '$28', rating: 4, image: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?auto=format&fit=crop&w=800&q=80' },
  { nombre: 'Guantes de entreno', tipo: 'Accesorio', precio: '$15', rating: 4, image: 'https://images.unsplash.com/photo-1584735175315-9d582314836b?auto=format&fit=crop&w=800&q=80' },
  { nombre: 'Cuerda para saltar', tipo: 'Accesorio', precio: '$10', rating: 5, image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80', badge: 'Nuevo', badgeColor: 'success' },
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
      
      <div className="grid-cards two-cols" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        {products.map((product) => (
          <UniversalCard
            key={product.nombre}
            image={product.image}
            title={product.nombre}
            subtitle={`Categoria: ${product.tipo}`}
            price={product.precio}
            oldPrice={product.oldPrice}
            rating={product.rating}
            badge={product.badge}
            badgeColor={product.badgeColor}
            buttonText="Agregar al Carrito"
            onButtonClick={() => handleAddProduct(product)}
          />
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
