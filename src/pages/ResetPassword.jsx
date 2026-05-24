import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../services/api'

function ResetPassword() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess(false)

    if (!password || !confirmPassword) {
      setError('Por favor completa todos los campos')
      return
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      })

      if (error) {
        throw new Error(error.message)
      }

      setSuccess(true)
      setPassword('')
      setConfirmPassword('')

      setTimeout(() => {
        navigate('/login?reset=success')
      }, 2000)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
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
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>

        {/* Título */}
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.2rem', textAlign: 'center' }}>
          Restablecer contraseña
        </h1>

        {/* Subtítulo */}
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', textAlign: 'center', margin: '0 0 1.5rem' }}>
          Ingresa tu nueva contraseña
        </p>

        {/* Éxito */}
        {success && (
          <div style={{
            background: 'rgba(34,197,94,0.1)',
            border: '1px solid rgba(34,197,94,0.3)',
            borderRadius: '8px',
            padding: '0.7rem 1rem',
            color: '#86efac',
            fontSize: '0.82rem',
            marginBottom: '1rem'
          }}>
            Contraseña actualizada correctamente. Redirigiendo al login...
          </div>
        )}

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

        {/* Nueva Contraseña */}
        <label style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 500, marginBottom: '0.3rem', display: 'block' }}>
          Nueva contraseña
        </label>
        <input
          type="password"
          placeholder="Ingresa una contraseña segura"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading || success}
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '10px',
            padding: '0.8rem 1rem',
            color: 'white',
            fontSize: '0.88rem',
            marginBottom: '1rem',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
            opacity: loading || success ? 0.6 : 1,
            cursor: loading || success ? 'not-allowed' : 'text'
          }}
          onFocus={(e) => {
            if (!loading && !success) {
              e.target.style.borderColor = '#ff4b63'
              e.target.style.boxShadow = '0 0 0 3px rgba(255,75,99,0.15)'
            }
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(255,255,255,0.1)'
            e.target.style.boxShadow = 'none'
          }}
        />

        {/* Confirmar Contraseña */}
        <label style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 500, marginBottom: '0.3rem', display: 'block' }}>
          Confirmar contraseña
        </label>
        <input
          type="password"
          placeholder="Confirma tu contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={loading || success}
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '10px',
            padding: '0.8rem 1rem',
            color: 'white',
            fontSize: '0.88rem',
            marginBottom: '1.5rem',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
            opacity: loading || success ? 0.6 : 1,
            cursor: loading || success ? 'not-allowed' : 'text'
          }}
          onFocus={(e) => {
            if (!loading && !success) {
              e.target.style.borderColor = '#ff4b63'
              e.target.style.boxShadow = '0 0 0 3px rgba(255,75,99,0.15)'
            }
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(255,255,255,0.1)'
            e.target.style.boxShadow = 'none'
          }}
        />

        {/* Botón */}
        <button
          type="submit"
          disabled={loading || success}
          className="gradient-btn"
          style={{
            width: '100%',
            height: '48px',
            borderRadius: '10px',
            border: 'none',
            fontWeight: 700,
            cursor: loading || success ? 'not-allowed' : 'pointer',
            opacity: loading || success ? 0.7 : 1
          }}
        >
          {loading ? 'Actualizando...' : success ? 'Listo!' : 'Actualizar contraseña'}
        </button>

        {/* Requisitos */}
        <p style={{ fontSize: '0.75rem', color: '#64748b', textAlign: 'center', margin: '1.5rem 0 0' }}>
          La contraseña debe tener al menos 6 caracteres
        </p>
      </form>
    </section>
  )
}

export default ResetPassword
