import { Link, useNavigate } from "react-router-dom"
import { getCurrentUser, logout } from "../services/authMock"
import { useEffect, useState } from "react"
import { useCart } from "../context/CartContext"

function Navbar() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const { totalItems } = useCart()

  useEffect(() => {
    const session = getCurrentUser()
    if (session) setUser(session.user)
  }, [])

  const handleLogout = () => {
    logout()
    setUser(null)
    navigate("/login")
  }

  return (
    <nav className="navbar glass-effect">

      <Link to="/" className="brand-link">FitZone</Link>

      <div className="nav-links">
        <Link className="nav-link" to="/">Inicio</Link>
        <Link className="nav-link" to="/planes">Planes</Link>
        <Link className="nav-link" to="/ejercicios">Ejercicios</Link>
        <Link className="nav-link" to="/tienda">Tienda</Link>
        <Link className="nav-link" to="/galeria">Galeria</Link>
      </div>

      <div className="nav-actions">
        <Link to="/carrito" className="cart-icon-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </Link>

        {!user ? (
          <>
            <Link to="/login" className="pill-btn">Login</Link>
            <Link to="/registro" className="gradient-btn">Registrar</Link>
          </>
        ) : (
          <div className="nav-user">

            <div className="nav-user-avatar">
              {user.email.charAt(0).toUpperCase()}
            </div>

            <div className="nav-user-menu">
              <span className="nav-user-email">{user.email}</span>

              {user.role === "admin" && (
                <button
                  className="nav-user-btn"
                  onClick={() => navigate("/admin")}
                >
                  Panel Admin
                </button>
              )}

              <button
                className="nav-user-btn logout"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </div>

          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar