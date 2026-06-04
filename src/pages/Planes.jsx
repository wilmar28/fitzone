import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import InfoModal from '../components/InfoModal'
import Card from '../components/Card'
import { isAuthenticated, getPlanes } from '../services/api'

const planesPorDefecto = [
  {
    nombre: 'FIT',
    precio: '$69.900',
    periodo: '/mes',
    descripcion: 'Acceso básico a instalaciones.',
    beneficios: [
      'Acceso a zona cardio y pesas',
      'Vestuarios y duchas',
      'App de seguimiento',
      '2 clases grupales / semana',
    ],
    color: 'default'
  },
  {
    nombre: 'SMART',
    precio: '$99.900',
    periodo: '/mes',
    descripcion: 'Plan completo con asesoría.',
    beneficios: [
      'Todo lo del plan FIT',
      'Clases ilimitadas',
      '1 sesión con coach / mes',
      'Descuentos en tienda',
      'Soporte WhatsApp',
    ],
    color: 'featured',
    badge: 'Más popular'
  },
  {
    nombre: 'BLACK',
    precio: '$119.900',
    periodo: '/mes',
    descripcion: 'Experiencia premium con coach dedicado.',
    beneficios: [
      'Todo lo del plan SMART',
      'Coach personalizado',
      'Nutrición personalizada',
      'Acceso 24/7',
      'Plan de entrenamiento exclusivo',
    ],
    color: 'default',
    badge: 'Premium'
  },
]

function Planes() {
  const [plans, setPlans] = useState([])
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [cargando, setCargando] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const cargarPlanes = async () => {
      try {
        const data = await getPlanes()
        setPlans(data)
      } catch {
        setPlans(planesPorDefecto)
      } finally {
        setCargando(false)
      }
    }

    cargarPlanes()
  }, [])

  const handleSuscribe = (plan) => {
    if (!isAuthenticated()) {
      localStorage.setItem('intended_purchase', JSON.stringify({
        type: 'plan',
        plan: plan
      }))
      navigate('/login')
      return
    }
    setSelectedPlan(plan)
  }

  if (cargando) {
    return <section className="main-shell">Cargando planes...</section>
  }

  return (
    <section className="main-shell">
      <div style={{ textAlign: 'center', marginBottom: '3rem', padding: '2rem 0 0' }}>
        <span className="fz-kicker">Membresías</span>
        <h1 className="fz-big-title">Planes Destacados</h1>
        <p className="fz-copy" style={{ maxWidth: 480, margin: '0 auto' }}>
          Elige el plan ideal para tus metas fitness. Sin contratos largos.
        </p>
      </div>

      <div className="grid-cards">
        {plans.map((plan) => (
          <div key={plan.nombre} className="animate-up">
            <Card
              title={plan.nombre}
              price={plan.precio}
              oldPrice={plan.periodo}
              features={plan.beneficios}
              buttonText="Suscribirme"
              onButtonClick={() => handleSuscribe(plan)}
              isPremium={plan.color === 'featured'}
              badges={plan.badge ? [{ text: plan.badge, type: 'premium' }] : []}
            />
          </div>
        ))}
      </div>

      <InfoModal
        isOpen={Boolean(selectedPlan)}
        title={selectedPlan ? `Suscripción ${selectedPlan.nombre}` : ''}
        description={selectedPlan?.nombre === 'BLACK'
          ? "Este plan incluye asignación de coach personalizado. Te contactaremos en 24h para presentarte tu coach."
          : "Para adquirir este plan contáctanos al +57 300 123 4567."}
        details={selectedPlan?.nombre === 'BLACK'
          ? ['Duración de 30 días con renovación automática.', 'Coach personal dedicado a tu progreso.', 'Sesiones personalizadas de entrenamiento y nutrición.']
          : [
          'Duración de 30 días con renovación automática.',
          'Beneficios VIP en clases grupales y eventos.',
          'Soporte por WhatsApp y asesor de entrenamiento.',
        ]}
        plan={{
          precio: selectedPlan?.precio,
          periodo: selectedPlan?.periodo,
          badge: selectedPlan?.badge,
        }}
        confirmLabel="Comprar ahora"
        onConfirm={() => {
          const parsedPrice = (priceStr) => {
            if (typeof priceStr === "number") return priceStr;
            let clean = priceStr.replace(/[^0-9kK]/g, "");
            if (clean.toLowerCase().includes("k")) {
              return parseInt(clean) * 1000;
            }
            return parseInt(clean) || 0;
          };
          navigate('/checkout', {
            state: {
              items: [
                {
                  id: `plan_${selectedPlan.nombre.toLowerCase().replace(/\s+/g, "_")}`,
                  nombre: selectedPlan.nombre,
                  qty: 1,
                  precio: parsedPrice(selectedPlan.precio),
                  isPlan: true
                }
              ],
              totalPrice: parsedPrice(selectedPlan.precio)
            }
          });
          setSelectedPlan(null)
        }}
        onClose={() => setSelectedPlan(null)}
      />
    </section>
  )
}

export default Planes
