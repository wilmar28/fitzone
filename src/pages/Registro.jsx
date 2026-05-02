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

  const onChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.nombre || !form.apellido || !form.email || !form.password) return
    onRegister()
    navigate('/')
  }

  return (
    <section className="login-wrapper">
      <form className="login-card glass-effect" onSubmit={handleSubmit}>
        <h2>FitZone</h2>
        <h3>Crear cuenta</h3>
        <p>Unete y empieza a entrenar con nosotros</p>
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          type="text"
          placeholder="Tu nombre"
          value={form.nombre}
          onChange={(event) => onChange('nombre', event.target.value)}
        />
        <label htmlFor="apellido">Apellido</label>
        <input
          id="apellido"
          type="text"
          placeholder="Tu apellido"
          value={form.apellido}
          onChange={(event) => onChange('apellido', event.target.value)}
        />
        <label htmlFor="registro-email">Correo electronico</label>
        <input
          id="registro-email"
          type="email"
          placeholder="correo@fitzone.com"
          value={form.email}
          onChange={(event) => onChange('email', event.target.value)}
        />
        <label htmlFor="registro-pass">Contrasena</label>
        <input
          id="registro-pass"
          type="password"
          placeholder="********"
          value={form.password}
          onChange={(event) => onChange('password', event.target.value)}
        />
        <button type="submit" className="gradient-btn full">
          Crear cuenta
        </button>
        <small>
          Ya tienes cuenta? <Link to="/login">Inicia sesion</Link>
        </small>
      </form>
    </section>
  )
}

export default Registro
