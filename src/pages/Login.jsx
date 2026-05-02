import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../services/authMock'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!email || !password) return

    try {
      await login(email, password)
      navigate('/')
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <section className="login-wrapper">
      <form className="login-card glass-effect" onSubmit={handleSubmit}>
        <h2>FitZone</h2>
        <h3>Inicia sesion</h3>
        <p>Bienvenido de nuevo a tu zona fitness</p>

        <label>Correo electronico</label>
        <input
          type="email"
          placeholder="admin@test.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Contrasena</label>
        <input
          type="password"
          placeholder="123456"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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