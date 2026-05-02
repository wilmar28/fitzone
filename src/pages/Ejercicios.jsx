import { useState } from 'react'
import InfoModal from '../components/InfoModal'

const routines = [
  { nombre: 'Rutina de Pecho', nivel: 'Intermedio', duracion: '45 min' },
  { nombre: 'Rutina de Espalda', nivel: 'Avanzado', duracion: '50 min' },
  { nombre: 'Rutina de Piernas', nivel: 'Avanzado', duracion: '60 min' },
  { nombre: 'Cardio HIIT', nivel: 'Principiante', duracion: '30 min' },
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
      <div className="grid-cards two-cols">
        {routines.map((routine) => (
          <article key={routine.nombre} className="card animate-up">
            <h3>{routine.nombre}</h3>
            <p>Nivel: {routine.nivel}</p>
            <p>Duracion: {routine.duracion}</p>
            <button type="button" className="pill-btn" onClick={() => handleSeeRoutine(routine)}>
              Ver ejercicios
            </button>
          </article>
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
