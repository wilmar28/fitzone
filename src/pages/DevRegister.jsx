import { useState } from 'react'
import { supabase } from '../services/api'

// ⚠️  PÁGINA TEMPORAL — eliminar después de usarla

const EMAIL    = 'rondonbarrerow@gmail.com'
const PASSWORD = 'fitzone2024'

export default function DevRegister() {
  const [lines, setLines]     = useState([])
  const [loading, setLoading] = useState(false)

  const log = (msg, color = '#94a3b8') =>
    setLines(prev => [...prev, { msg, color }])

  const handleCheck = async () => {
    setLines([])
    setLoading(true)

    // ── Paso 1: intentar login para ver si el usuario ya existe ──────────
    log('1. Intentando signInWithPassword...')
    const { data: loginData, error: loginError } =
      await supabase.auth.signInWithPassword({ email: EMAIL, password: PASSWORD })

    console.log('signIn → data:', loginData, '| error:', loginError)

    if (!loginError && loginData?.user) {
      log(`✅ El usuario YA EXISTE y las credenciales son correctas.`, '#86efac')
      log(`   ID: ${loginData.user.id}`, '#86efac')
      log(`   Confirmado: ${loginData.user.email_confirmed_at ?? 'NO'}`, '#86efac')
      log('   → Puedes hacer login normalmente desde /login.', '#86efac')
      setLoading(false)
      return
    }

    log(`   signIn falló: ${loginError?.message}`, '#fde68a')

    // ── Paso 2: intentar signUp ──────────────────────────────────────────
    log('2. Intentando signUp...')
    const { data: signUpData, error: signUpError } =
      await supabase.auth.signUp({
        email: EMAIL,
        password: PASSWORD,
        options: { emailRedirectTo: undefined },
      })

    console.log('signUp → data:', signUpData, '| error:', signUpError)

    if (signUpError) {
      log(`❌ signUp también falló: ${signUpError.message}`, '#fca5a5')
      log('   → Crea el usuario manualmente en el dashboard de Supabase.', '#fca5a5')
      setLoading(false)
      return
    }

    const user = signUpData?.user
    const confirmed = user?.email_confirmed_at || user?.confirmed_at

    if (!user) {
      log('⚠️  signUp no devolvió usuario. Puede que el email ya esté registrado.', '#fde68a')
      log('   → Ve al dashboard de Supabase → Authentication → Users y busca el email.', '#fde68a')
    } else if (confirmed) {
      log(`✅ Usuario creado y confirmado: ${user.email}`, '#86efac')
    } else {
      log(`⚠️  Usuario creado pero SIN confirmar: ${user.email}`, '#fde68a')
      log('   → En el dashboard: Authentication → Users → busca el email → ícono ✓ para confirmar.', '#fde68a')
    }

    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: '1.25rem',
      background: '#080808', color: '#f8fafc',
      fontFamily: "-apple-system, 'Segoe UI', sans-serif", padding: '2rem',
    }}>
      <div style={{
        width: 'min(520px, 100%)', background: '#0d0d0d',
        border: '1px solid rgba(255,75,99,0.2)', borderRadius: '1rem',
        padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem',
      }}>
        <p style={{ margin: 0, fontSize: '0.72rem', color: '#f87171',
          textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
          ⚠️ Página temporal — eliminar después de usar
        </p>

        <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>
          Verificar / crear usuario coach
        </h2>

        <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
          <div><strong style={{ color: '#e2e8f0' }}>Email:</strong> {EMAIL}</div>
          <div><strong style={{ color: '#e2e8f0' }}>Password:</strong> {PASSWORD}</div>
        </div>

        <button
          onClick={handleCheck}
          disabled={loading}
          style={{
            padding: '0.75rem', borderRadius: '8px', border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 700,
            background: loading ? 'rgba(255,255,255,0.08)' : 'linear-gradient(120deg,#ff4b63,#ff8a00)',
            color: loading ? '#64748b' : 'white', fontSize: '0.88rem',
          }}
        >
          {loading ? 'Comprobando...' : 'Verificar / crear usuario'}
        </button>

        {lines.length > 0 && (
          <div style={{
            background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '0.5rem', padding: '1rem',
            display: 'flex', flexDirection: 'column', gap: '0.35rem',
          }}>
            {lines.map((l, i) => (
              <p key={i} style={{ margin: 0, fontSize: '0.8rem', color: l.color, lineHeight: 1.5 }}>
                {l.msg}
              </p>
            ))}
          </div>
        )}

        <details style={{ fontSize: '0.78rem', color: '#64748b' }}>
          <summary style={{ cursor: 'pointer', color: '#94a3b8' }}>
            Crear manualmente en Supabase dashboard (30 seg)
          </summary>
          <ol style={{ paddingLeft: '1.2rem', margin: '0.6rem 0 0', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <li>supabase.com → tu proyecto → <strong style={{ color: '#e2e8f0' }}>Authentication → Users</strong></li>
            <li>Clic en <strong style={{ color: '#e2e8f0' }}>Add user → Create new user</strong></li>
            <li>Email: <code style={{ color: '#7dd3fc' }}>{EMAIL}</code></li>
            <li>Password: <code style={{ color: '#7dd3fc' }}>{PASSWORD}</code></li>
            <li>✅ Marca <strong style={{ color: '#e2e8f0' }}>Auto Confirm User</strong></li>
            <li>Clic en <strong style={{ color: '#e2e8f0' }}>Create User</strong></li>
          </ol>
        </details>
      </div>
    </div>
  )
}
