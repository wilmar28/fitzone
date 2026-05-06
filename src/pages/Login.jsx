import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../services/authMock'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Por favor completa todos los campos')
      return
    }

    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.2rem' }}>
      <form onSubmit={handleSubmit} style={{
        width: 420,
        background: 'rgba(15,23,50,0.9)',
        border: '1px solid rgba(255,75,99,0.2)',
        borderRadius: '16px',
        padding: '2.5rem',
        boxShadow: '0 25px 60px rgba(0,0,0,0.5)'
      }}>
        {/* Ícono decorativo */}
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(120deg, #ff4b63, #ff8a00)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>

        {/* Título */}
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.2rem', textAlign: 'center' }}>
          Bienvenido de nuevo
        </h1>

        {/* Subtítulo */}
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', textAlign: 'center', margin: '0 0 1.5rem' }}>
          Inicia sesión en FitZone
        </p>

        {/* Error */}
        {error && (
          <div style={{
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '8px',
            padding: '0.7rem 1rem',
            color: '#fca5a5',
            fontSize: '0.82rem',
            marginBottom: '1rem'
          }}>
            {error}
          </div>
        )}

        {/* Email */}
        <label style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 500, marginBottom: '0.3rem', display: 'block' }}>
          Correo electrónico
        </label>
        <input
          type="email"
          placeholder="admin@test.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '10px',
            padding: '0.8rem 1rem',
            color: 'white',
            fontSize: '0.88rem',
            marginBottom: '1rem',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#ff4b63'
            e.target.style.boxShadow = '0 0 0 3px rgba(255,75,99,0.15)'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(255,255,255,0.1)'
            e.target.style.boxShadow = 'none'
          }}
        />

        {/* Password */}
        <label style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 500, marginBottom: '0.3rem', display: 'block' }}>
          Contraseña
        </label>
        <input
          type="password"
          placeholder="123456"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '10px',
            padding: '0.8rem 1rem',
            color: 'white',
            fontSize: '0.88rem',
            marginBottom: '1.5rem',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#ff4b63'
            e.target.style.boxShadow = '0 0 0 3px rgba(255,75,99,0.15)'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(255,255,255,0.1)'
            e.target.style.boxShadow = 'none'
          }}
        />

        {/* Botón */}
        <button type="submit" className="gradient-btn" style={{
          width: '100%',
          height: '48px',
          borderRadius: '10px',
          border: 'none',
          fontWeight: 700,
          marginBottom: '1.2rem',
          cursor: 'pointer'
        }}>
          Entrar
        </button>

        {/* Separador */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', margin: '1.2rem 0', opacity: 0.5 }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>o continúa con</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
        </div>

        {/* Link a registro */}
        <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>
          ¿No tienes cuenta? <Link to="/registro" style={{ color: '#ff4b63', textDecoration: 'none', fontWeight: 600 }}>Regístrate</Link>
        </p>
      </form>
    </section>
  )
}

export default Login