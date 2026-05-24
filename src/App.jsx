import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

// 👇 IMPORTA TUS PÁGINAS
import Planes from './pages/Planes'
import Ejercicios from './pages/Ejercicios'
import Tienda from './pages/Tienda'
import Galeria from './pages/Galeria'
import Registro from './pages/Registro'
import Carrito from './pages/Carrito'
import Admin from './pages/Admin'
import Checkout from "./pages/Checkout";
import PagoExitoso from "./pages/PagoExitoso";

import { isAuthenticated, getCurrentUser, getMe } from './services/api'

// 🔐 Ruta protegida
function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" />
}

// 👑 Ruta admin
function AdminRoute({ children }) {
  const session = getCurrentUser()
  const ADMIN_EMAILS = ['wrondonbarrero@gmail.com']

  if (!session || !ADMIN_EMAILS.includes(session.email)) {
    return <Navigate to="/" />
  }

  return children
}

function AppContent() {
  const location = useLocation()
  const isAdminPage = location.pathname.startsWith('/admin')
  const isAuthPage = location.pathname.startsWith('/login') || location.pathname.startsWith('/registro')
  const showNavbar = !isAdminPage && !isAuthPage

  useEffect(() => {
    const checkToken = async () => {
      if (isAuthenticated()) {
        try { await getMe() } catch (e) { }
      }
    }
    checkToken()
  }, [])

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Registro */}
        <Route path="/registro" element={<Registro onRegister={() => { }} />} />

        {/* Carrito */}
        <Route path="/carrito" element={<Carrito />} />

        {/* HOME */}
        <Route
          path="/"
          element={<Dashboard />}
        />

        {/* NUEVAS RUTAS */}
        <Route path="/planes" element={<Planes />} />
        <Route path="/ejercicios" element={<Ejercicios />} />
        <Route path="/tienda" element={<Tienda />} />
        <Route path="/galeria" element={<Galeria />} />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/pago-exitoso" element={<PagoExitoso />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App