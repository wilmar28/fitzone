import { Link, useLocation } from 'react-router-dom'

const links = [
  { label: 'Inicio', path: '/' },
  { label: 'Planes', path: '/planes' },
  { label: 'Ejercicios', path: '/ejercicios' },
  { label: 'Tienda', path: '/tienda' },
  { label: 'Galeria', path: '/galeria' },
]

function Navbar({ isLoggedIn, onLogout, cartCount }) {
  const { pathname } = useLocation()

  return (
    <header className="navbar glass-effect">
      <Link to="/" className="brand">
        FitZone
      </Link>
      <nav className="nav-links">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`nav-link ${pathname === link.path ? 'active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="nav-actions">
        <Link to="/carrito" className="cart-icon-btn" aria-label="Carrito">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2Zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2ZM7.16 14h9.45c.75 0 1.41-.41 1.75-1.03L22 6.5H6.21l-.94-2H2v2h2l3.6 7.59-1.35 2.45A1.98 1.98 0 0 0 8 19h12v-2H8l1.16-2Z" />
          </svg>
          {cartCount > 0 ? <span className="cart-badge">{cartCount}</span> : null}
        </Link>
        {isLoggedIn ? (
          <button type="button" className="pill-btn" onClick={onLogout}>
            Cerrar sesion
          </button>
        ) : (
          <>
            <Link to="/login" className="pill-btn">
              Login
            </Link>
            <Link to="/registro" className="gradient-btn">
              Registrar
            </Link>
          </>
        )}
      </div>
    </header>
  )
}

export default Navbar
