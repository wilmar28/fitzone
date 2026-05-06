import { useState } from 'react'
import InfoModal from '../components/InfoModal'
import UniversalCard from '../components/UniversalCard'

const routines = [
  { nombre: 'Rutina de Pecho', nivel: 'Intermedio', duracion: '45 min', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80', badgeColor: 'warning' },
  { nombre: 'Rutina de Espalda', nivel: 'Avanzado', duracion: '50 min', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80', badgeColor: 'danger' },
  { nombre: 'Rutina de Piernas', nivel: 'Avanzado', duracion: '60 min', image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=800&q=80', badgeColor: 'danger' },
  { nombre: 'Cardio HIIT', nivel: 'Principiante', duracion: '30 min', image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=800&q=80', badgeColor: 'success' },
]

function Ejercicios() {
  const [selectedRoutine, setSelectedRoutine] = useState(null)

  const handleSeeRoutine = (routine) => {
    setSelectedRoutine(routine)
  }

  return (
    <section>
      <h2 className="section-title">Rutinas de Entrenamiento</h2>
      <p className="section-subtitle">Programas disenados por expertos para cada nivel.</p>
      
      <div className="grid-cards two-cols" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        {routines.map((routine) => (
          <UniversalCard
            key={routine.nombre}
            image={routine.image}
            title={routine.nombre}
            subtitle={`Duracion: ${routine.duracion}`}
            badge={routine.nivel}
            badgeColor={routine.badgeColor}
            buttonText="Ver ejercicios"
            onButtonClick={() => handleSeeRoutine(routine)}
          />
        ))}
      </div>

      <InfoModal
        isOpen={Boolean(selectedRoutine)}
        title={selectedRoutine ? `Detalle: ${selectedRoutine.nombre}` : ''}
        description="Este bloque te muestra la estructura recomendada para completar la rutina."
        details={[
          'Calentamiento inicial de 8 a 10 minutos.',
          '4 series de trabajo con descanso de 60 segundos.',
          'Enfriamiento final con estiramientos guiados.',
        ]}
        onClose={() => setSelectedRoutine(null)}
      />
    </section>
  )
}

export default Ejercicios
