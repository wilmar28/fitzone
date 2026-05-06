import { useState } from 'react'
import InfoModal from '../components/InfoModal'
import UniversalCard from '../components/UniversalCard'

const plans = [
  { nombre: 'Plan Basico', precio: '$29', oldPrice: '', features: ['Acceso a zona cardio y pesas', 'Vestidores y duchas', 'App FitZone básica'], isFeatured: false },
  { nombre: 'Plan Premium', precio: '$49', oldPrice: '', features: ['Incluye clases dirigidas', 'Acceso ilimitado', 'Asesoría mensual con coach', 'Descuento en tienda'], isFeatured: true, badge: 'Popular', badgeColor: 'primary' },
  { nombre: 'Plan Elite', precio: '$79', oldPrice: '', features: ['Todo incluido + plan personalizado', 'Nutricionista asignado', 'Coach dedicado', 'Acceso 24/7 VIP'], isFeatured: false },
]

function Planes() {
  const [selectedPlan, setSelectedPlan] = useState(null)

  const handleSuscribe = (plan) => {
    setSelectedPlan(plan)
  }

  return (
    <section>
      <h2 className="section-title">Planes Destacados</h2>
      <p className="section-subtitle">Elige el plan ideal para tus metas fitness.</p>
      
      <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', alignItems: 'stretch' }}>
        {plans.map((plan) => (
          <UniversalCard
            key={plan.nombre}
            title={plan.nombre}
            price={`${plan.precio}/mes`}
            features={plan.features}
            isFeatured={plan.isFeatured}
            badge={plan.badge}
            badgeColor={plan.badgeColor}
            buttonText="Suscribirme"
            onButtonClick={() => handleSuscribe(plan)}
          />
        ))}
      </div>

      <InfoModal
        isOpen={Boolean(selectedPlan)}
        title={selectedPlan ? `Suscripcion ${selectedPlan.nombre}` : ''}
        description="Tu suscripcion incluye acceso a todas las sedes FitZone y seguimiento mensual."
        details={[
          'Duracion de 30 dias con renovacion automatica.',
          'Beneficios VIP en clases grupales y eventos.',
          'Soporte por WhatsApp y asesor de entrenamiento.',
        ]}
        onClose={() => setSelectedPlan(null)}
      />
    </section>
  )
}

export default Planes
