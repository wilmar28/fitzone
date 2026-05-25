import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import InfoModal from '../components/InfoModal'
import Card from '../components/Card'
import { getRutinas, isAuthenticated } from '../services/api'

// Fallback si el backend no responde
const rutinasDefecto = [
  {
    id: 1,
    nombre: 'Rutina de Pecho',
    nivel: 'Intermedio',
    duracion: '45 min',
    imagen: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
    ejercicios: ['Press banca plano 4x10', 'Press inclinado 3x10', 'Aperturas con mancuernas 3x12', 'Fondos en paralelas 3x15'],
  },
  {
    id: 2,
    nombre: 'Rutina de Espalda',
    nivel: 'Avanzado',
    duracion: '50 min',
    imagen: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80',
    ejercicios: ['Dominadas 4x8', 'Remo con barra 4x10', 'Jalón al pecho 3x12', 'Remo en máquina 3x12'],
  },
  {
    id: 3,
    nombre: 'Rutina de Piernas',
    nivel: 'Avanzado',
    duracion: '60 min',
    imagen: 'https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=800&q=80',
    ejercicios: ['Sentadilla libre 4x8', 'Prensa de piernas 4x10', 'Extensiones 3x15', 'Curl femoral 3x12'],
  },
  {
    id: 4,
    nombre: 'Cardio HIIT',
    nivel: 'Principiante',
    duracion: '30 min',
    imagen: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=800&q=80',
    ejercicios: ['Jumping jacks 3x30s', 'Burpees 3x10', 'Mountain climbers 3x20', 'Saltos al cajón 3x10'],
  },
]

// Mapea nivel a tipo de badge
const nivelToBadgeType = (nivel = '') => {
  const n = nivel.toLowerCase()
  if (n.includes('principiante')) return 'success'
  if (n.includes('intermedio')) return 'warning'
  if (n.includes('avanzado')) return 'danger'
  return 'default'
}

function Ejercicios() {
  const navigate = useNavigate()
  const [rutinas, setRutinas] = useState([])
  const [selectedRoutine, setSelectedRoutine] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const cargarRutinas = async () => {
      try {
        const data = await getRutinas()
        setRutinas(data)
      } catch {
        setRutinas(rutinasDefecto)
      } finally {
        setCargando(false)
      }
    }

    cargarRutinas()
  }, [])

  const handleSeeRoutine = (routine) => {
    setSelectedRoutine(routine)
  }

  const handleEmpezar = () => {
    if (!selectedRoutine) return
    if (!isAuthenticated()) {
      navigate('/login')
      return
    }
    navigate(`/rutina/${selectedRoutine.id}`, { state: { rutina: selectedRoutine } })
  }

  if (cargando) {
    return <section className="main-shell">Cargando rutinas...</section>
  }

  return (
    <section className="main-shell">
      <div style={{ marginBottom: '2rem' }}>
        <p className="fz-kicker">Programas</p>
        <h2 className="fz-big-title">Rutinas de Entrenamiento</h2>
        <p className="fz-copy">Programas diseñados por expertos para cada nivel.</p>
      </div>

      <div className="grid-cards two-cols">
        {rutinas.map((routine) => (
          <div key={routine.id ?? routine.nombre} className="animate-up">
            <Card
              image={routine.imagen || routine.image}
              title={routine.nombre}
              subtitle={`Duración: ${routine.duracion}`}
              badges={[{ text: routine.nivel, type: nivelToBadgeType(routine.nivel) }]}
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
        confirmLabel="Empezar ahora"
        onConfirm={handleEmpezar}
        onClose={() => setSelectedRoutine(null)}
      />
    </section>
  )
}

export default Ejercicios
