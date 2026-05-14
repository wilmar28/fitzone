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
          {/* Cart SVG */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Cart body */}
            <path d="M2 3h1.5l1.8 9.5a2 2 0 0 0 2 1.5h8.4a2 2 0 0 0 1.96-1.6L19 7H5.5" />
            {/* Handle / arrow from bag entrance */}
            <polyline points="5.5 7 4.5 3" />
            {/* Wheels */}
            <circle cx="9" cy="20" r="1" fill="currentColor" stroke="none" />
            <circle cx="16" cy="20" r="1" fill="currentColor" stroke="none" />
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
