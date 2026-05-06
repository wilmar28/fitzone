import { Link, useNavigate } from "react-router-dom"
import { getCurrentUser, logout } from "../services/authMock"
import { useEffect, useState } from "react"

function Navbar() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

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
      
      <h2 className="brand">FitZone</h2>

      <div className="nav-links">
        <Link className="nav-link" to="/">Inicio</Link>
        <Link className="nav-link" to="/planes">Planes</Link>
        <Link className="nav-link" to="/ejercicios">Ejercicios</Link>
        <Link className="nav-link" to="/tienda">Tienda</Link>
        <Link className="nav-link" to="/galeria">Galeria</Link>
      </div>

      <div className="nav-actions">
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