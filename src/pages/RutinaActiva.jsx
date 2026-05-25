import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { getRutinas } from '../services/api'

const DESCANSO_SEGUNDOS = 60

// ─── Pantalla de felicitaciones ───────────────────────────────────────────────
function Felicitaciones({ rutina, onVolver }) {
  return (
    <div style={styles.fullScreen}>
      <div style={styles.congratsCard}>
        {/* Icono trofeo */}
        <div style={styles.trophyWrap}>
          <span style={{ fontSize: '3.5rem' }}>🏆</span>
        </div>

        <p style={styles.congratsKicker}>¡Rutina completada!</p>
        <h1 style={styles.congratsTitle}>{rutina.nombre}</h1>
        <p style={styles.congratsCopy}>
          Completaste todos los ejercicios. ¡Excelente trabajo, sigue así!
        </p>

        <div style={styles.congratsStats}>
          <div style={styles.statBox}>
            <span style={styles.statNum}>{rutina.ejercicios?.length ?? 0}</span>
            <span style={styles.statLabel}>Ejercicios</span>
          </div>
          <div style={styles.statBox}>
            <span style={styles.statNum}>{rutina.duracion}</span>
            <span style={styles.statLabel}>Duración</span>
          </div>
          <div style={styles.statBox}>
            <span style={styles.statNum}>{rutina.nivel}</span>
            <span style={styles.statLabel}>Nivel</span>
          </div>
        </div>

        <button style={styles.btnPrimary} onClick={onVolver}>
          Volver a rutinas
        </button>
      </div>
    </div>
  )
}

// ─── Componente principal ─────────────────────────────────────────────────────
function RutinaActiva() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const [rutina, setRutina] = useState(location.state?.rutina ?? null)
  const [cargando, setCargando] = useState(!location.state?.rutina)
  const [error, setError] = useState(null)

  // Estado del entrenamiento
  const [ejercicioIdx, setEjercicioIdx] = useState(0)
  const [seriesCompletadas, setSeriesCompletadas] = useState(0)
  const [descansando, setDescansando] = useState(false)
  const [timerSeg, setTimerSeg] = useState(DESCANSO_SEGUNDOS)
  const [terminado, setTerminado] = useState(false)

  const timerRef = useRef(null)

  // Cargar rutina desde el backend si no viene en el state
  useEffect(() => {
    if (rutina) return
    const cargar = async () => {
      try {
        const lista = await getRutinas()
        const encontrada = lista.find((r) => String(r.id) === String(id))
        if (!encontrada) throw new Error('Rutina no encontrada')
        setRutina(encontrada)
      } catch (e) {
        setError(e.message)
      } finally {
        setCargando(false)
      }
    }
    cargar()
  }, [id, rutina])

  // Temporizador de descanso
  const detenerTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const iniciarTimer = useCallback(() => {
    detenerTimer()
    setTimerSeg(DESCANSO_SEGUNDOS)
    timerRef.current = setInterval(() => {
      setTimerSeg((prev) => {
        if (prev <= 1) {
          detenerTimer()
          setDescansando(false)
          return DESCANSO_SEGUNDOS
        }
        return prev - 1
      })
    }, 1000)
  }, [detenerTimer])

  useEffect(() => {
    return () => detenerTimer()
  }, [detenerTimer])

  if (cargando) {
    return (
      <div style={styles.fullScreen}>
        <p style={{ color: '#94a3b8' }}>Cargando rutina...</p>
      </div>
    )
  }

  if (error || !rutina) {
    return (
      <div style={styles.fullScreen}>
        <p style={{ color: '#f87171' }}>{error ?? 'Rutina no encontrada'}</p>
        <button style={styles.btnSecondary} onClick={() => navigate('/ejercicios')}>
          Volver
        </button>
      </div>
    )
  }

  const ejercicios = rutina.ejercicios ?? []
  const total = ejercicios.length

  if (terminado) {
    return <Felicitaciones rutina={rutina} onVolver={() => navigate('/ejercicios')} />
  }

  const ejercicioActual = ejercicios[ejercicioIdx]
  const progresoPct = total > 0 ? ((ejercicioIdx) / total) * 100 : 0

  // ── Acciones ──────────────────────────────────────────────────────────────
  const handleSerieCompletada = () => {
    setSeriesCompletadas((s) => s + 1)
    setDescansando(true)
    iniciarTimer()
  }

  const handleSiguienteEjercicio = () => {
    detenerTimer()
    setDescansando(false)
    setSeriesCompletadas(0)
    if (ejercicioIdx + 1 >= total) {
      setTerminado(true)
    } else {
      setEjercicioIdx((i) => i + 1)
    }
  }

  const handleSaltarDescanso = () => {
    detenerTimer()
    setDescansando(false)
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={styles.fullScreen}>
      {/* Header */}
      <header style={styles.header}>
        <button style={styles.backBtn} onClick={() => navigate('/ejercicios')} aria-label="Volver">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>

        <div style={styles.headerCenter}>
          <span style={styles.rutinaName}>{rutina.nombre}</span>
          <span style={styles.progresoCopy}>
            Ejercicio {ejercicioIdx + 1} de {total}
          </span>
        </div>

        <div style={styles.nivelBadge}>{rutina.nivel}</div>
      </header>

      {/* Barra de progreso */}
      <div style={styles.progressTrack} role="progressbar"
        aria-valuenow={ejercicioIdx + 1} aria-valuemin={1} aria-valuemax={total}>
        <div style={{ ...styles.progressFill, width: `${progresoPct}%` }} />
      </div>

      {/* Contenido principal */}
      <main style={styles.main}>

        {/* Ejercicio actual */}
        <div style={styles.ejercicioCard}>
          <p style={styles.ejercicioKicker}>Ejercicio actual</p>
          <h2 style={styles.ejercicioNombre}>{ejercicioActual}</h2>

          {seriesCompletadas > 0 && (
            <div style={styles.seriesBadge}>
              {seriesCompletadas} {seriesCompletadas === 1 ? 'serie completada' : 'series completadas'}
            </div>
          )}
        </div>

        {/* Temporizador de descanso */}
        {descansando && (
          <div style={styles.timerCard}>
            <p style={styles.timerLabel}>Descanso</p>
            <div style={styles.timerCircle}>
              {/* SVG circular */}
              <svg width="120" height="120" style={{ position: 'absolute', top: 0, left: 0 }}>
                <circle cx="60" cy="60" r="52" fill="none"
                  stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                <circle cx="60" cy="60" r="52" fill="none"
                  stroke="url(#grad)" strokeWidth="6"
                  strokeDasharray={`${2 * Math.PI * 52}`}
                  strokeDashoffset={`${2 * Math.PI * 52 * (1 - timerSeg / DESCANSO_SEGUNDOS)}`}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                  style={{ transition: 'stroke-dashoffset 1s linear' }}
                />
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ff4b63" />
                    <stop offset="100%" stopColor="#ff8a00" />
                  </linearGradient>
                </defs>
              </svg>
              <span style={styles.timerNum}>{timerSeg}</span>
            </div>
            <p style={styles.timerSub}>segundos de descanso</p>
            <button style={styles.btnSecondary} onClick={handleSaltarDescanso}>
              Saltar descanso
            </button>
          </div>
        )}

        {/* Lista de ejercicios restantes */}
        {!descansando && (
          <div style={styles.listaCard}>
            <p style={styles.listaTitle}>Próximos ejercicios</p>
            {ejercicios.slice(ejercicioIdx + 1).length === 0 ? (
              <p style={styles.listaEmpty}>Este es el último ejercicio 💪</p>
            ) : (
              ejercicios.slice(ejercicioIdx + 1).map((ej, i) => (
                <div key={i} style={styles.listaItem}>
                  <span style={styles.listaNum}>{ejercicioIdx + 2 + i}</span>
                  <span style={styles.listaEj}>{ej}</span>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      {/* Botones de acción */}
      {!descansando && (
        <footer style={styles.footer}>
          <button style={styles.btnSecondary} onClick={handleSerieCompletada}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Serie completada
          </button>

          <button style={styles.btnPrimary} onClick={handleSiguienteEjercicio}>
            {ejercicioIdx + 1 >= total ? 'Finalizar rutina' : 'Siguiente ejercicio'}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </footer>
      )}
    </div>
  )
}

// ─── Estilos inline ───────────────────────────────────────────────────────────
const styles = {
  fullScreen: {
    minHeight: '100vh',
    background: '#080808',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    color: '#f8fafc',
    fontFamily: "'DM Sans', Inter, system-ui, sans-serif",
  },
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.9rem 1.5rem',
    background: 'rgba(8,8,8,0.92)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
    zIndex: 10,
  },
  backBtn: {
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#94a3b8',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  headerCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.1rem',
  },
  rutinaName: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: '1rem',
    color: '#f8fafc',
  },
  progresoCopy: {
    fontSize: '0.72rem',
    color: '#64748b',
  },
  nivelBadge: {
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    padding: '0.25rem 0.75rem',
    borderRadius: '999px',
    background: 'rgba(255,75,99,0.12)',
    border: '1px solid rgba(255,75,99,0.25)',
    color: '#fca5a5',
  },
  progressTrack: {
    position: 'fixed',
    top: '61px',
    left: 0,
    right: 0,
    height: '3px',
    background: 'rgba(255,255,255,0.06)',
    zIndex: 10,
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #ff4b63, #ff8a00)',
    transition: 'width 0.4s ease',
    borderRadius: '0 999px 999px 0',
  },
  main: {
    width: '100%',
    maxWidth: '560px',
    marginTop: '80px',
    marginBottom: '100px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '0 0.5rem',
  },
  ejercicioCard: {
    background: '#111',
    border: '1px solid rgba(255,75,99,0.2)',
    borderRadius: '1rem',
    padding: '2rem 1.8rem',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  ejercicioKicker: {
    fontSize: '0.62rem',
    fontWeight: 700,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#7dd3fc',
    marginBottom: '0.75rem',
  },
  ejercicioNombre: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 'clamp(1.3rem, 4vw, 2rem)',
    fontWeight: 800,
    color: '#f8fafc',
    margin: '0 0 1rem',
    lineHeight: 1.2,
  },
  seriesBadge: {
    display: 'inline-block',
    fontSize: '0.72rem',
    fontWeight: 600,
    padding: '0.3rem 0.9rem',
    borderRadius: '999px',
    background: 'rgba(34,197,94,0.12)',
    border: '1px solid rgba(34,197,94,0.25)',
    color: '#86efac',
  },
  timerCard: {
    background: '#111',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '1rem',
    padding: '2rem 1.8rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.75rem',
  },
  timerLabel: {
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#64748b',
    margin: 0,
  },
  timerCircle: {
    position: 'relative',
    width: '120px',
    height: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerNum: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '2.2rem',
    fontWeight: 800,
    background: 'linear-gradient(120deg, #ff4b63, #ff8a00)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    position: 'relative',
    zIndex: 1,
  },
  timerSub: {
    fontSize: '0.75rem',
    color: '#64748b',
    margin: 0,
  },
  listaCard: {
    background: '#111',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '1rem',
    padding: '1.4rem 1.6rem',
  },
  listaTitle: {
    fontSize: '0.62rem',
    fontWeight: 700,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: '#64748b',
    marginBottom: '0.8rem',
  },
  listaEmpty: {
    fontSize: '0.85rem',
    color: '#94a3b8',
    margin: 0,
  },
  listaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.55rem 0',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  listaNum: {
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.65rem',
    color: '#64748b',
    flexShrink: 0,
  },
  listaEj: {
    fontSize: '0.82rem',
    color: '#94a3b8',
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    gap: '0.75rem',
    padding: '1rem 1.5rem',
    background: 'rgba(8,8,8,0.95)',
    backdropFilter: 'blur(12px)',
    borderTop: '1px solid rgba(255,255,255,0.07)',
    zIndex: 10,
  },
  btnPrimary: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.8rem 1.2rem',
    borderRadius: '999px',
    border: 'none',
    background: 'linear-gradient(120deg, #ff4b63, #ff8a00)',
    color: 'white',
    fontWeight: 700,
    fontSize: '0.88rem',
    cursor: 'pointer',
    boxShadow: '0 4px 18px rgba(255,75,99,0.3)',
    transition: 'opacity 0.2s, transform 0.2s',
    fontFamily: 'inherit',
  },
  btnSecondary: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.8rem 1.2rem',
    borderRadius: '999px',
    border: '1px solid rgba(255,255,255,0.15)',
    background: 'rgba(255,255,255,0.06)',
    color: '#cbd5e1',
    fontWeight: 600,
    fontSize: '0.85rem',
    cursor: 'pointer',
    transition: 'background 0.2s',
    fontFamily: 'inherit',
  },
  // Felicitaciones
  congratsCard: {
    width: 'min(480px, 100%)',
    background: '#111',
    border: '1px solid rgba(255,75,99,0.2)',
    borderRadius: '1.2rem',
    padding: '2.5rem 2rem',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
  },
  trophyWrap: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'rgba(255,138,0,0.1)',
    border: '1px solid rgba(255,138,0,0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  congratsKicker: {
    fontSize: '0.62rem',
    fontWeight: 700,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#7dd3fc',
    margin: 0,
  },
  congratsTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 'clamp(1.4rem, 4vw, 2rem)',
    fontWeight: 800,
    color: '#f8fafc',
    margin: 0,
    lineHeight: 1.15,
  },
  congratsCopy: {
    color: '#94a3b8',
    fontSize: '0.88rem',
    lineHeight: 1.65,
    margin: 0,
    maxWidth: '340px',
  },
  congratsStats: {
    display: 'flex',
    gap: '1rem',
    width: '100%',
    justifyContent: 'center',
  },
  statBox: {
    flex: 1,
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '0.75rem',
    padding: '0.9rem 0.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.2rem',
  },
  statNum: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '1.1rem',
    fontWeight: 800,
    background: 'linear-gradient(120deg, #ff4b63, #ff8a00)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  },
  statLabel: {
    fontSize: '0.62rem',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
}

export default RutinaActiva
