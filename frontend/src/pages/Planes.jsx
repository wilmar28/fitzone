import { useState } from 'react'
import InfoModal from '../components/InfoModal'

const plans = [
  { nombre: 'Plan Basico', precio: '$29/mes', beneficios: 'Acceso a zona cardio y pesas' },
  { nombre: 'Plan Premium', precio: '$49/mes', beneficios: 'Incluye clases dirigidas y asesoria' },
  { nombre: 'Plan Elite', precio: '$79/mes', beneficios: 'Todo incluido + plan personalizado' },
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
      <div className="grid-cards">
        {plans.map((plan) => (
          <article key={plan.nombre} className="card animate-up">
            <h3>{plan.nombre}</h3>
            <p className="price">{plan.precio}</p>
            <p>{plan.beneficios}</p>
            <button type="button" className="gradient-btn big" onClick={() => handleSuscribe(plan)}>
              Suscribirme
            </button>
          </article>
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
