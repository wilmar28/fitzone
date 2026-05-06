import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Registro({ onRegister }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const onChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')

    if (!form.nombre || !form.apellido || !form.email || !form.password) {
      setError('Por favor completa todos los campos')
      return
    }

    onRegister()
    navigate('/')
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
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(120deg, #ff4b63, #ff8a00)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.2rem' }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>

        {/* Título */}
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.2rem', textAlign: 'center' }}>
          Crea tu cuenta
        </h1>

        {/* Subtítulo */}
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', textAlign: 'center', margin: '0 0 1.5rem' }}>
          Únete a la comunidad FitZone
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

        {/* Nombre */}
        <label style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 500, marginBottom: '0.3rem', display: 'block' }}>
          Nombre
        </label>
        <input
          type="text"
          placeholder="Tu nombre"
          value={form.nombre}
          onChange={(event) => onChange('nombre', event.target.value)}
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

        {/* Apellido */}
        <label style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 500, marginBottom: '0.3rem', display: 'block' }}>
          Apellido
        </label>
        <input
          type="text"
          placeholder="Tu apellido"
          value={form.apellido}
          onChange={(event) => onChange('apellido', event.target.value)}
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

        {/* Email */}
        <label style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 500, marginBottom: '0.3rem', display: 'block' }}>
          Correo electrónico
        </label>
        <input
          type="email"
          placeholder="correo@fitzone.com"
          value={form.email}
          onChange={(event) => onChange('email', event.target.value)}
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
          placeholder="••••••••"
          value={form.password}
          onChange={(event) => onChange('password', event.target.value)}
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
          Crear cuenta
        </button>

        {/* Link a login */}
        <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>
          ¿Ya tienes cuenta? <Link to="/login" style={{ color: '#ff4b63', textDecoration: 'none', fontWeight: 600 }}>Inicia sesión</Link>
        </p>
      </form>
    </section>
  )
}

export default Registro
