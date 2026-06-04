import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser, supabase } from '../services/api'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showResetForm, setShowResetForm] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetMessage, setResetMessage] = useState('')
  const [resetLoading, setResetLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Por favor completa todos los campos')
      return
    }

    try {
      await loginUser(email, password)
      const intended = localStorage.getItem('intended_purchase')
      const ADMIN_EMAILS = ['wrondonbarrero@gmail.com']
      if (ADMIN_EMAILS.includes(email)) {
        navigate('/admin')
      } else if (intended) {
        const parsed = JSON.parse(intended)
        localStorage.removeItem('intended_purchase')
        if (parsed.type === 'plan') {
          const parsedPrice = (priceStr) => {
            if (typeof priceStr === "number") return priceStr;
            let clean = priceStr.replace(/[^0-9kK]/g, "");
            if (clean.toLowerCase().includes("k")) {
              return parseInt(clean) * 1000;
            }
            return parseInt(clean) || 0;
          };
          navigate('/checkout', {
            state: {
              items: [
                {
                  id: `plan_${parsed.plan.nombre.toLowerCase().replace(/\s+/g, "_")}`,
                  nombre: parsed.plan.nombre,
                  qty: 1,
                  precio: parsedPrice(parsed.plan.precio),
                  isPlan: true
                }
              ],
              totalPrice: parsedPrice(parsed.plan.precio)
            }
          })
        } else if (parsed.type === 'cart') {
          navigate('/checkout', {
            state: {
              items: parsed.items,
              totalPrice: parsed.totalPrice
            }
          })
        } else {
          navigate('/')
        }
      } else {
        navigate('/')
      }
    } catch (err) {
      setError(err.message)
    }
  }

  const handleResetPassword = async (event) => {
    event.preventDefault()
    setResetMessage('')
    setError('')

    if (!resetEmail) {
      setError('Por favor ingresa tu email')
      return
    }

    setResetLoading(true)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail)
      if (error) {
        throw new Error(error.message)
      }
      setResetMessage('Revisa tu correo, te enviamos un enlace para restablecer tu contraseña.')
      setResetEmail('')
      setTimeout(() => {
        setShowResetForm(false)
        setResetMessage('')
      }, 4000)
    } catch (err) {
      setError(err.message)
    } finally {
      setResetLoading(false)
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
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
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

        {/* Link recuperar contraseña */}
        <p style={{ textAlign: 'center', fontSize: '0.82rem', margin: '0 0 1.2rem' }}>
          <button
            type="button"
            onClick={() => setShowResetForm(true)}
            style={{
              background: 'none',
              border: 'none',
              color: '#ff4b63',
              textDecoration: 'none',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.82rem'
            }}
          >
            ¿Olvidaste tu contraseña?
          </button>
        </p>

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

      {/* Modal de recuperación de contraseña */}
      {showResetForm && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.75)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 40,
          padding: '1rem'
        }}>
          <form onSubmit={handleResetPassword} style={{
            width: '100%',
            maxWidth: 420,
            background: 'rgba(15,23,50,0.9)',
            border: '1px solid rgba(255,75,99,0.2)',
            borderRadius: '16px',
            padding: '2.5rem',
            boxShadow: '0 25px 60px rgba(0,0,0,0.5)'
          }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, margin: '0 0 0.5rem', textAlign: 'center' }}>
              Recuperar contraseña
            </h2>

            <p style={{ color: '#94a3b8', fontSize: '0.85rem', textAlign: 'center', margin: '0 0 1.5rem' }}>
              Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña
            </p>

            {resetMessage && (
              <div style={{
                background: 'rgba(34,197,94,0.1)',
                border: '1px solid rgba(34,197,94,0.3)',
                borderRadius: '8px',
                padding: '0.7rem 1rem',
                color: '#86efac',
                fontSize: '0.82rem',
                marginBottom: '1rem'
              }}>
                {resetMessage}
              </div>
            )}

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

            <label style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 500, marginBottom: '0.3rem', display: 'block' }}>
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="tu@email.com"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
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

            <button
              type="submit"
              disabled={resetLoading}
              style={{
                width: '100%',
                height: '48px',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(120deg, #ff4b63, #ff8a00)',
                color: 'white',
                fontWeight: 700,
                cursor: resetLoading ? 'not-allowed' : 'pointer',
                opacity: resetLoading ? 0.7 : 1,
                marginBottom: '0.8rem',
                fontSize: '0.95rem'
              }}
            >
              {resetLoading ? 'Enviando...' : 'Enviar enlace de recuperación'}
            </button>

            <button
              type="button"
              onClick={() => {
                setShowResetForm(false)
                setError('')
                setResetEmail('')
              }}
              style={{
                width: '100%',
                height: '48px',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'transparent',
                color: '#94a3b8',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.95rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = 'rgba(255,255,255,0.2)'
                e.target.style.color = '#ffffff'
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = 'rgba(255,255,255,0.1)'
                e.target.style.color = '#94a3b8'
              }}
            >
              Volver
            </button>
          </form>
        </div>
      )}
    </section>
  )
}

export default Login