import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'

function App() {
  const [cartItems, setCartItems] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleAddToCart = (product) => {
    setCartItems((prev) => [...prev, product])
  }

  const handleRemoveItem = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index))
  }

  const handleClearCart = () => {
    setCartItems([])
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <BrowserRouter>
      <Navbar 
        cartCount={cartItems.length} 
        isLoggedIn={isLoggedIn} 
        onLogout={handleLogout} 
      />
      <Dashboard 
        cartItems={cartItems}
        onAddToCart={handleAddToCart}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </BrowserRouter>
  )
}

export default App