import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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

import { isAuthenticated, getCurrentUser, getMe } from './services/api'

// 🔐 Ruta protegida
function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" />
}

// 👑 Ruta admin
function AdminRoute({ children }) {
  const session = getCurrentUser()

  if (!session || session.role !== "admin") {
    return <Navigate to="/" />
  }

  return children
}

function App() {
  useEffect(() => {
    const checkToken = async () => {
      if (isAuthenticated()) {
        try { await getMe() } catch (e) { }
      }
    }
    checkToken()
  }, [])

  return (
    <BrowserRouter>
      <Navbar />

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
      </Routes>
    </BrowserRouter>
  )
}

export default App