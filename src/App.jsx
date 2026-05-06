import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

// 👇 IMPORTA TUS PÁGINAS
import Planes from './pages/Planes'
import Ejercicios from './pages/Ejercicios'
import Tienda from './pages/Tienda'
import Galeria from './pages/Galeria'

import { isAuthenticated, getCurrentUser } from './services/authMock'

// 🔐 Ruta protegida
function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" />
}

// 👑 Ruta admin
function AdminRoute({ children }) {
  const session = getCurrentUser()

  if (!session || session.user.role !== "admin") {
    return <Navigate to="/" />
  }

  return children
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* HOME */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
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
              <h1 style={{ padding: "2rem" }}>Panel Admin 🔐</h1>
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App