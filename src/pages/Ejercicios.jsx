import { useState } from 'react'
import InfoModal from '../components/InfoModal'
import Card from '../components/Card'

const routines = [
  {
    nombre: 'Rutina de Pecho',
    nivel: 'Intermedio',
    duracion: '45 min',
    icon: '💪',
    ejercicios: ['Press banca plano 4x10', 'Press inclinado 3x10', 'Aperturas con mancuernas 3x12', 'Fondos en paralelas 3x15'],
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
    type: 'warning'
  },
  {
    nombre: 'Rutina de Espalda',
    nivel: 'Avanzado',
    duracion: '50 min',
    icon: '🏋️',
    ejercicios: ['Dominadas 4x8', 'Remo con barra 4x10', 'Jalón al pecho 3x12', 'Remo en máquina 3x12'],
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80',
    type: 'danger'
  },
  {
    nombre: 'Rutina de Piernas',
    nivel: 'Avanzado',
    duracion: '60 min',
    icon: '🦵',
    ejercicios: ['Sentadilla libre 4x8', 'Prensa de piernas 4x10', 'Extensiones 3x15', 'Curl femoral 3x12'],
    image: 'https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=800&q=80',
    type: 'danger'
  },
  {
    nombre: 'Cardio HIIT',
    nivel: 'Principiante',
    duracion: '30 min',
    icon: '🔥',
    ejercicios: ['Jumping jacks 3x30s', 'Burpees 3x10', 'Mountain climbers 3x20', 'Saltos al cajón 3x10'],
    image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=800&q=80',
    type: 'success'
  },
]

function Ejercicios() {
  const [selectedRoutine, setSelectedRoutine] = useState(null)

  const handleSeeRoutine = (routine) => {
    setSelectedRoutine(routine)
  }

  return (
    <section className="main-shell">
      <div style={{ marginBottom: '2rem' }}>
        <p className="fz-kicker">Programas</p>
        <h2 className="fz-big-title">Rutinas de Entrenamiento</h2>
        <p className="fz-copy">Programas diseñados por expertos para cada nivel.</p>
      </div>
      <div className="grid-cards two-cols">
        {routines.map((routine) => (
          <div key={routine.nombre} className="animate-up">
            <Card
              image={routine.image}
              title={routine.nombre}
              subtitle={`Duración: ${routine.duracion}`}
              badges={[{ text: routine.nivel, type: routine.type }]}
              buttonText="Ver ejercicios"
              onButtonClick={() => handleSeeRoutine(routine)}
              isPremium={false}
            />
          </div>
        ))}
      </div>
      <InfoModal
        isOpen={Boolean(selectedRoutine)}
        title={selectedRoutine ? `Detalle: ${selectedRoutine.nombre}` : ''}
        description="Este bloque te muestra la estructura recomendada para completar la rutina."
        details={selectedRoutine?.ejercicios || []}
        onClose={() => setSelectedRoutine(null)}
      />
    </section>
  )
}

export default Ejercicios
