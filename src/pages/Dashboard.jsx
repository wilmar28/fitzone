import { Routes, Route } from 'react-router-dom'




import Planes from './Planes'
import Ejercicios from './Ejercicios'
import Tienda from './Tienda'
import Galeria from './Galeria'
import Login from './Login'
import Registro from './Registro'
import Carrito from './Carrito'

function Dashboard() {
  return (
    <Routes>
      <Route path="/" element={<HomeContent />} />
      <Route path="/planes" element={<Planes />} />
      <Route path="/ejercicios" element={<Ejercicios />} />
      <Route path="/tienda" element={<Tienda />} />
      <Route path="/galeria" element={<Galeria />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/carrito" element={<Carrito />} />
    </Routes>
  )
}

function HomeContent() {
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
            <button type="button" className="gradient-btn big">
              Comenzar ahora
            </button>
            <button type="button" className="pill-btn big">
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
            {[
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
            ].map((s, idx) => (
              <div className="fz-stat animate-up" style={{ animationDelay: `${idx * 0.15}s` }} key={s.l}>
                <div style={{ marginBottom: '0.5rem' }}>{s.icon}</div>
                <div className="fz-stat-num fz-grad-text" style={{ fontSize: '3rem', fontWeight: 800 }}>{s.n}</div>
                <div className="fz-stat-label" style={{ color: '#bae6fd', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

   
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
              <button type="button" className="fz-plan-btn">Comenzar</button>
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
              <button type="button" className="fz-plan-btn fz-plan-btn-featured">Comenzar</button>
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
              <button type="button" className="fz-plan-btn">Comenzar</button>
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
            <button type="button" className="gradient-btn big">
              Ingresar al sistema
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Dashboard