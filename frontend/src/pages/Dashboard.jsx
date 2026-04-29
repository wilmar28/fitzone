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

      <section className="hero-section">
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="tagline">Elite Fitness Experience</p>
          <h1>Entrena fuerte. Vive mejor. Siente el cambio cada semana.</h1>
          <p>
            En FitZone combinamos entrenamiento inteligente, coaches expertos y comunidad real para
            ayudarte a cumplir tus objetivos.
          </p>
          <div className="home-hero-actions">
            <button type="button" className="gradient-btn big">
              Comenzar ahora
            </button>
            <button type="button" className="pill-btn">
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
              { n: '01', t: 'Rutinas guiadas', d: 'Programas por objetivo: fuerza, cardio, hipertrofia y recomposición corporal con seguimiento semanal.' },
              { n: '02', t: 'Planes flexibles', d: 'Membresías mensual, premium y elite adaptadas exactamente a tu ritmo de vida y entrenamiento.' },
              { n: '03', t: 'Clases y comunidad', d: 'HIIT, funcional y sesiones grupales con entrenadores certificados. Cada clase, una experiencia.' },
              { n: '04', t: 'Tienda fitness', d: 'Suplementos y accesorios de alta calidad para complementar y potenciar tus metas diarias.' },
            ].map((s) => (
              <div className="fz-svc" key={s.n}>
                <div className="fz-svc-bar" />
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
              { n: '500+', l: 'Socios activos' },
              { n: '12',   l: 'Coaches expertos' },
              { n: '200+', l: 'Rutinas disponibles' },
              { n: '8 años', l: 'De trayectoria' },
            ].map((s) => (
              <div className="fz-stat" key={s.l}>
                <div className="fz-stat-num fz-grad-text">{s.n}</div>
                <div className="fz-stat-label">{s.l}</div>
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