import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login({ onLogin }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!email || !password) return
    onLogin()
    navigate('/')
  }

  return (
    <section className="login-wrapper">
      <form className="login-card glass-effect" onSubmit={handleSubmit}>
        <h2>FitZone</h2>
        <h3>Inicia sesion</h3>
        <p>Bienvenido de nuevo a tu zona fitness</p>
        <label htmlFor="email">Correo electronico</label>
        <input
          id="email"
          type="email"
          placeholder="correo@fitzone.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor="password">Contrasena</label>
        <input
          id="password"
          type="password"
          placeholder="********"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit" className="gradient-btn full">
          Entrar
        </button>
        <small>
          No tienes cuenta? <Link to="/registro">Registrate</Link>
        </small>
      </form>
    </section>
  )
}

export default Login
