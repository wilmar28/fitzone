import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDashboardStats, isAuthenticated } from '../services/api'

const statsDefecto = [
  {
    n: '500+',
    l: 'Socios activos',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,75,99,0.6)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  },
  {
    n: '12',
    l: 'Coaches expertos',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,75,99,0.6)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
  },
  {
    n: '200+',
    l: 'Rutinas disponibles',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,75,99,0.6)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
  },
  {
    n: '8 años',
    l: 'De trayectoria',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,75,99,0.6)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  },
]

function Dashboard() {
  return <HomeContent />
}

function HomeContent() {
  const navigate = useNavigate()
  const [stats, setStats] = useState(statsDefecto)
  const [showContactModal, setShowContactModal] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [ratingSubmitted, setRatingSubmitted] = useState(false)

  const handlePlanClick = () => {
    if (!isAuthenticated()) {
      navigate('/registro')
    } else {
      setShowContactModal(true)
    }
  }

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/tienda/productos')
        if (res.ok) {
          const data = await res.json()
          if (data && typeof data.total !== 'undefined') {
            setStats(prev => prev.map((s, idx) => {
              if (idx === 2) {
                return {
                  ...s,
                  n: data.total.toString(),
                  l: 'Productos en tienda'
                }
              }
              return s
            }))
          }
        }
      } catch (err) {
        console.error('Error cargando total de productos:', err)
      }
    }

    cargarDatos()
  }, [])

  return (
    <>

      <section className="hero-section animate-up">
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="tagline animate-up delay-1">Premium Fitness Experience</p>
          <h1 className="animate-up delay-1">Entrena fuerte. Vive mejor. Siente el cambio.</h1>
          <p className="animate-up delay-2">
            En FitZone combinamos entrenamiento inteligente, coaches expertos y comunidad real para
            ayudarte a cumplir tus objetivos y transformar tu vida.
          </p>
          <div className="home-hero-actions animate-up delay-2">
            <button type="button" className="gradient-btn big" onClick={() => navigate('/registro')}>
              Comenzar ahora
            </button>
            <button type="button" className="pill-btn big" onClick={() => {
              document.querySelector('.fz-services')?.scrollIntoView({ behavior: 'smooth' })
            }}>
              Conocer más
            </button>
          </div>
        </div>
      </section>


      <section className="fz-services">
        <div className="fz-wrap">
          <div className="fz-services-head">
            <div>
              <p className="fz-kicker">¿Qué ofrecemos?</p>
              <h2 className="fz-big-title">
                Todo lo que necesitas<br />
                <span className="fz-grad-text">en un solo gym</span>
              </h2>
            </div>
            <p className="fz-copy fz-services-copy">
              Cada módulo está diseñado para mejorar tu experiencia de entrenamiento y mantener
              tus resultados en crecimiento constante.
            </p>
          </div>
          <div className="fz-svc-grid">
            {[
              {
                n: '01',
                t: 'Rutinas guiadas',
                d: 'Programas por objetivo: fuerza, cardio, hipertrofia y recomposición corporal con seguimiento semanal.',
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="url(#grad1)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <defs><linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#ff4b63"/><stop offset="100%" stopColor="#ff8a00"/></linearGradient></defs>
                    <path d="M6 4v16M18 4v16M3 8h4M17 8h4M3 16h4M17 16h4M9 12h6"/>
                  </svg>
                )
              },
              {
                n: '02',
                t: 'Planes flexibles',
                d: 'Membresías mensual, premium y elite adaptadas exactamente a tu ritmo de vida y entrenamiento.',
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="url(#grad2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <defs><linearGradient id="grad2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#ff4b63"/><stop offset="100%" stopColor="#ff8a00"/></linearGradient></defs>
                    <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
                  </svg>
                )
              },
              {
                n: '03',
                t: 'Clases y comunidad',
                d: 'HIIT, funcional y sesiones grupales con entrenadores certificados. Cada clase, una experiencia.',
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="url(#grad3)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <defs><linearGradient id="grad3" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#ff4b63"/><stop offset="100%" stopColor="#ff8a00"/></linearGradient></defs>
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                )
              },
              {
                n: '04',
                t: 'Tienda fitness',
                d: 'Suplementos y accesorios de alta calidad para complementar y potenciar tus metas diarias.',
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="url(#grad4)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <defs><linearGradient id="grad4" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#ff4b63"/><stop offset="100%" stopColor="#ff8a00"/></linearGradient></defs>
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                )
              },
            ].map((s, idx) => (
              <div className="fz-svc animate-up" style={{ animationDelay: `${idx * 0.1}s` }} key={s.n}>
                <div className="fz-svc-bar" />
                <div style={{ marginBottom: '0.8rem' }}>{s.icon}</div>
                <div className="fz-svc-num">{s.n}</div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <div className="fz-stats">
        <div className="fz-wrap">
          <div className="fz-stats-inner">
            {stats.map((s, idx) => (
              <div className="fz-stat animate-up" style={{ animationDelay: `${idx * 0.15}s` }} key={s.l}>
                <div style={{ marginBottom: '0.5rem' }}>{s.icon}</div>
                <div className="fz-stat-num fz-grad-text" style={{ fontSize: '3rem', fontWeight: 800 }}>{s.n}</div>
                <div className="fz-stat-label" style={{ color: '#bae6fd', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CALIFICACIONES ── */}
      <section className="fz-ratings">
        <div className="fz-wrap">
          <div className="fz-ratings-container">
            <div className="fz-ratings-content">
              <p className="fz-kicker">Tu opinión importa</p>
              <h2 className="fz-big-title">¿Cómo fue tu experiencia?</h2>
              <p className="fz-copy">Califica FitZone y ayuda a otros a descubrir nuestro gym</p>

              <div className="fz-rating-box">
                {ratingSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>🎉</div>
                    <h4 style={{ color: '#ff8a00', fontWeight: 700, marginBottom: '0.5rem', fontFamily: 'Syne, sans-serif' }}>¡Gracias por tu calificación!</h4>
                    <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: 0 }}>Tu opinión nos ayuda a seguir mejorando cada día.</p>
                  </div>
                ) : (
                  <>
                    <div className="fz-rating-stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          className="fz-star"
                          style={(hoverRating || rating) >= star ? { background: '#ff8a00', color: '#080808', borderColor: '#ff8a00', transform: 'scale(1.1)' } : {}}
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          type="button"
                        >
                          ★
                        </button>
                      ))}
                    </div>
                    <button 
                      className="fz-rating-btn"
                      onClick={() => {
                        if (rating > 0) {
                          setRatingSubmitted(true)
                        } else {
                          alert('Por favor selecciona una estrella antes de enviar.')
                        }
                      }}
                    >
                      Enviar calificación
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="fz-ratings-stats">
              <div className="fz-ratings-display">
                <div className="fz-rating-average">
                  <div className="fz-rating-number">4.9</div>
                  <div className="fz-rating-stars-display">
                    ★★★★★
                  </div>
                  <div className="fz-rating-count">1,243 calificaciones</div>
                </div>

                <div className="fz-rating-breakdown">
                  {[
                    { stars: 5, percentage: 85 },
                    { stars: 4, percentage: 10 },
                    { stars: 3, percentage: 3 },
                    { stars: 2, percentage: 1 },
                    { stars: 1, percentage: 1 },
                  ].map((item) => (
                    <div className="fz-rating-bar-item" key={item.stars}>
                      <span className="fz-rating-label">{item.stars}★</span>
                      <div className="fz-rating-bar">
                        <div
                          className="fz-rating-bar-fill"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="fz-rating-percent">{item.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="fz-about">
        <div className="fz-wrap">
          <div className="fz-about-grid">
            <div className="fz-about-card">
              <p className="fz-about-quote">
                "Combinamos entrenamiento presencial, seguimiento digital y asesoría profesional
                para que nunca pierdas el rumbo."
              </p>
              <div className="fz-tags">
                {['Fuerza', 'Cardio', 'Hipertrofia', 'Nutrición', 'Comunidad'].map((t) => (
                  <span className="fz-tag" key={t}>{t}</span>
                ))}
              </div>
              <div className="fz-minis">
                <div className="fz-mini">
                  <div className="fz-mini-num fz-grad-text">98%</div>
                  <div className="fz-mini-label">Satisfacción de socios</div>
                </div>
                <div className="fz-mini">
                  <div className="fz-mini-num fz-grad-text">4.9★</div>
                  <div className="fz-mini-label">Valoración promedio</div>
                </div>
              </div>
            </div>

            <div>
              <p className="fz-kicker">Nosotros</p>
              <h2 className="fz-big-title">¿Quiénes somos?</h2>
              <p className="fz-copy">
                FitZone es una plataforma fitness creada para ayudarte a entrenar con estructura,
                disciplina y resultados medibles desde el primer día.
              </p>
              <div className="fz-points">
                {[
                  { t: 'Monitoreo en tiempo real', d: 'Consulta tu avance, frecuencia y rendimiento desde cualquier dispositivo.' },
                  { t: 'Fácil de usar', d: 'Interfaz intuitiva para gestionar entrenamientos y seguir tu progreso diario.' },
                  { t: 'Seguro y confiable', d: 'Tu información y estadísticas se mantienen protegidas en todo momento.' },
                ].map((p) => (
                  <div className="fz-point" key={p.t}>
                    <div className="fz-dot" />
                    <div>
                      <h4>{p.t}</h4>
                      <p>{p.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="fz-mission">
        <div className="fz-wrap">
          <div className="fz-mission-grid">
            <div className="fz-mcard">
              <h3>Nuestro objetivo</h3>
              <p>
                Brindar una experiencia completa para que cada socio entrene de forma organizada,
                eficiente y sostenible en el tiempo, con resultados reales y medibles.
              </p>
            </div>
            <div className="fz-mcard">
              <h3>Misión</h3>
              <p>
                Optimizar el entrenamiento de cada persona con tecnología, metodología y comunidad
                para transformar hábitos y resultados de manera permanente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PLANES ── */}
      <section className="fz-plans">
        <div className="fz-wrap">
          <div className="fz-plans-head">
            <p className="fz-kicker">Membresías</p>
            <h2 className="fz-big-title">Elige tu plan</h2>
            <p className="fz-copy">Sin contratos largos. Cancela cuando quieras. Empieza hoy.</p>
          </div>
          <div className="fz-plans-grid">
            <div className="fz-plan">
              <div className="fz-plan-name">Mensual</div>
              <div className="fz-plan-price fz-grad-text">$89k</div>
              <div className="fz-plan-period">por mes</div>
              <div className="fz-plan-div" />
              <div className="fz-plan-feat">Acceso a sala de pesas</div>
              <div className="fz-plan-feat">2 clases grupales / semana</div>
              <div className="fz-plan-feat">Vestuarios y duchas</div>
              <div className="fz-plan-feat">App de seguimiento</div>
              <button type="button" className="fz-plan-btn" onClick={handlePlanClick}>Comenzar</button>
            </div>

            <div className="fz-plan fz-featured">
              <div className="fz-plan-badge">Más popular</div>
              <div className="fz-plan-name">Premium</div>
              <div className="fz-plan-price fz-grad-text">$149k</div>
              <div className="fz-plan-period">por mes</div>
              <div className="fz-plan-div" />
              <div className="fz-plan-feat">Todo lo del plan Mensual</div>
              <div className="fz-plan-feat">Clases ilimitadas</div>
              <div className="fz-plan-feat">1 sesión con coach / mes</div>
              <div className="fz-plan-feat">Descuentos en tienda</div>
              <button type="button" className="fz-plan-btn fz-plan-btn-featured" onClick={handlePlanClick}>Comenzar</button>
            </div>

            <div className="fz-plan">
              <div className="fz-plan-name">Elite</div>
              <div className="fz-plan-price fz-grad-text">$229k</div>
              <div className="fz-plan-period">por mes</div>
              <div className="fz-plan-div" />
              <div className="fz-plan-feat">Todo lo del plan Premium</div>
              <div className="fz-plan-feat">Nutrición personalizada</div>
              <div className="fz-plan-feat">Coach dedicado</div>
              <div className="fz-plan-feat">Acceso 24/7</div>
              <button type="button" className="fz-plan-btn" onClick={handlePlanClick}>Comenzar</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACTO ── */}
      <section className="fz-contact">
        <div className="fz-wrap">
          <div className="fz-contact-box">
            <p className="fz-kicker" style={{ marginBottom: '0.8rem' }}>Contacto</p>
            <h2>¿Tienes alguna pregunta?</h2>
            <p className="fz-copy">
              Estamos disponibles para ayudarte con membresías, rutinas y cualquier consulta.
              Escríbenos o visítanos cuando quieras.
            </p>
            <div className="fz-contact-items">
              <div className="fz-citem">
                <span className="fz-citem-label">Teléfono</span>
                <span className="fz-citem-val">+57 300 123 4567</span>
              </div>
              <div className="fz-citem">
                <span className="fz-citem-label">Email</span>
                <span className="fz-citem-val">contacto@fitzone.com</span>
              </div>
              <div className="fz-citem">
                <span className="fz-citem-label">Dirección</span>
                <span className="fz-citem-val">Av. Fitness 123, Centro</span>
              </div>
            </div>
            <button type="button" className="gradient-btn big" onClick={() => {
              if (isAuthenticated()) {
                navigate('/')
              } else {
                navigate('/login')
              }
            }}>
              Ingresar al sistema
            </button>
          </div>
        </div>
      </section>

      {showContactModal && (
        <div className="modal-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.85)', zIndex: 10000, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }} onClick={() => setShowContactModal(false)}>
          <div className="modal-content" style={{ background: '#111', border: '1px solid rgba(255, 75, 99, 0.25)', borderRadius: '1rem', padding: '2.5rem', maxWidth: '400px', width: '90%', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
            <button style={{ position: 'absolute', top: '1rem', right: '1.2rem', background: 'none', border: 'none', color: '#64748b', fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => setShowContactModal(false)}>×</button>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📞</div>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.5rem', color: '#f8fafc', marginBottom: '0.8rem' }}>¡Excelente Elección!</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Para activar este plan, por favor contáctanos directamente a nuestra línea de atención telefónica o WhatsApp.
            </p>
            <div style={{ background: 'rgba(255, 75, 99, 0.08)', border: '1px solid rgba(255, 75, 99, 0.2)', borderRadius: '0.8rem', padding: '1rem', marginBottom: '1.5rem' }}>
              <span style={{ display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7dd3fc', fontWeight: 700, marginBottom: '0.3rem' }}>Línea Oficial FitZone</span>
              <a href="tel:+573001234567" style={{ textDecoration: 'none', fontSize: '1.25rem', fontWeight: 800, color: '#ff8a00' }}>+57 300 123 4567</a>
            </div>
            <button className="gradient-btn" style={{ width: '100%', borderRadius: '999px', padding: '0.75rem', border: 'none', cursor: 'pointer' }} onClick={() => setShowContactModal(false)}>Entendido</button>
          </div>
        </div>
      )}
    </>
  )
}

export default Dashboard