import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InfoModal from '../components/InfoModal'
import Card from '../components/Card'
import { isAuthenticated } from '../services/api'

const plans = [
  {
    nombre: 'Plan Básico',
    precio: '$29k',
    periodo: '/mes',
    descripcion: 'Perfecto para comenzar tu journey fitness.',
    beneficios: [
      'Acceso a zona cardio y pesas',
      'Vestuarios y duchas',
      'App de seguimiento',
      '2 clases grupales / semana',
    ],
    color: 'default'
  },
  {
    nombre: 'Plan Premium',
    precio: '$49k',
    periodo: '/mes',
    descripcion: 'El más elegido por nuestros socios.',
    beneficios: [
      'Todo lo del plan Básico',
      'Clases ilimitadas',
      '1 sesión con coach / mes',
      'Descuentos en tienda',
      'Soporte WhatsApp',
    ],
    color: 'featured',
    badge: 'Más popular'
  },
  {
    nombre: 'Plan Elite',
    precio: '$79k',
    periodo: '/mes',
    descripcion: 'Experiencia completa sin límites.',
    beneficios: [
      'Todo lo del plan Premium',
      'Nutrición personalizada',
      'Coach dedicado',
      'Acceso 24/7',
      'Plan de entrenamiento exclusivo',
    ],
    color: 'default'
  },
]

function Planes() {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const navigate = useNavigate()

  const handleSuscribe = (plan) => {
    if (!isAuthenticated()) {
      navigate('/login')
      return
    }
    setSelectedPlan(plan)
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
        description="Para adquirir este plan contáctanos al +57 300 123 4567."
        details={[
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
          // aquí va la lógica de pago
          setSelectedPlan(null)
        }}
        onClose={() => setSelectedPlan(null)}
      />
    </section>
  )
}

export default Planes
