import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'


import Planes from './Planes'
import Ejercicios from './Ejercicios'
import Tienda from './Tienda'
import Galeria from './Galeria'
import Login from './Login'
import Registro from './Registro'
import Carrito from './Carrito'

function AnimatedCounter({ end, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      // easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <>{count}{suffix}</>;
}

function Dashboard({ cartItems, onAddToCart, onRemoveItem, onClearCart }) {
  return (
    <Routes>
      <Route path="/" element={<HomeContent />} />
      <Route path="/planes" element={<Planes />} />
      <Route path="/ejercicios" element={<Ejercicios />} />
      <Route path="/tienda" element={<Tienda onAddToCart={onAddToCart} />} />
      <Route path="/galeria" element={<Galeria />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/carrito" element={<Carrito cartItems={cartItems} onRemoveItem={onRemoveItem} onClearCart={onClearCart} />} />
    </Routes>
  )
}

function HomeContent() {
  return (
    <div className="home-wrapper">
      <section className="hero-section">
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="tagline animate-up delay-1">Elite Fitness Experience</p>
          <h1 className="animate-up delay-2">Entrena fuerte. Vive mejor. Siente el cambio cada semana.</h1>
          <p className="animate-up delay-3" style={{ animationDelay: '0.4s' }}>
            En FitZone combinamos entrenamiento inteligente, coaches expertos y comunidad real para
            ayudarte a cumplir tus objetivos.
          </p>
          <div className="home-hero-actions animate-up delay-4" style={{ animationDelay: '0.6s' }}>
            <button type="button" className="gradient-btn big">
              Comenzar ahora
            </button>
            <button type="button" className="pill-btn big">
              Conocer mas
            </button>
          </div>
        </div>
      </section>

      <section className="fz-services">
        <div className="fz-wrap">
          <div className="fz-services-head">
            <div>
              <p className="fz-kicker">¿Que ofrecemos?</p>
              <h2 className="fz-big-title">
                Todo lo que necesitas<br />
                <span className="fz-grad-text">en un solo gym</span>
              </h2>
            </div>
            <p className="fz-copy fz-services-copy">
              Cada modulo esta diseñado para mejorar tu experiencia de entrenamiento y mantener
              tus resultados en crecimiento constante.
            </p>
          </div>
          <div className="fz-svc-grid">
            {[
              { n: '🏋️', t: 'Rutinas guiadas', d: 'Programas por objetivo: fuerza, cardio, hipertrofia y recomposicion.' },
              { n: '⭐', t: 'Planes flexibles', d: 'Membresias adaptadas exactamente a tu ritmo de vida y entrenamiento.' },
              { n: '🔥', t: 'Clases y comunidad', d: 'HIIT, funcional y sesiones grupales con entrenadores certificados.' },
              { n: '🛍️', t: 'Tienda fitness', d: 'Suplementos y accesorios de alta calidad para potenciar tus metas.' },
            ].map((s, i) => (
              <div className="fz-svc animate-up" style={{ animationDelay: `${i * 0.1}s` }} key={s.t}>
                <div className="fz-svc-bar" />
                <div className="fz-svc-icon" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{s.n}</div>
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
              { n: 500, suffix: '+', l: 'Socios activos' },
              { n: 12, suffix: '', l: 'Coaches expertos' },
              { n: 200, suffix: '+', l: 'Rutinas disponibles' },
              { n: 8, suffix: ' años', l: 'De trayectoria' },
            ].map((s) => (
              <div className="fz-stat" key={s.l}>
                <div className="fz-stat-num fz-grad-text">
                  <AnimatedCounter end={s.n} suffix={s.suffix} />
                </div>
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
    </div>
  )
}

export default Dashboard