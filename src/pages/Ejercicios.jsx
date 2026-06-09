import { useState, useEffect } from 'react'
import { getEjercicios } from '../services/api'
import InfoModal from '../components/InfoModal'
import Card from '../components/Card'

const ejerciciosDefecto = [
  {
    id: 1,
    nombre: 'Press de Banca Plano',
    grupo_muscular: 'Pecho',
    dificultad: 'Intermedio',
    equipamiento: 'Barra',
    descripcion: 'Acuéstate en un banco plano, baja la barra al pecho de forma controlada y empuja hacia arriba extendiendo los brazos.',
    imagen_url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    nombre: 'Sentadillas Traseras',
    grupo_muscular: 'Piernas',
    dificultad: 'Avanzado',
    equipamiento: 'Barra',
    descripcion: 'Coloca la barra en tus trapecios, desciende flexionando las rodillas y caderas manteniendo la espalda recta, y vuelve a la posición inicial.',
    imagen_url: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    nombre: 'Dominadas Pronas',
    grupo_muscular: 'Espalda',
    dificultad: 'Avanzado',
    equipamiento: 'Peso Corporal',
    descripcion: 'Cuélgate de una barra con agarre prono y levanta tu cuerpo hasta que tu barbilla pase la barra, usando la fuerza de tu espalda.',
    imagen_url: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    nombre: 'Vuelos Laterales',
    grupo_muscular: 'Hombros',
    dificultad: 'Intermedio',
    equipamiento: 'Mancuernas',
    descripcion: 'De pie, eleva lateralmente las mancuernas hasta la altura de los hombros con los codos ligeramente flexionados.',
    imagen_url: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    nombre: 'Curl de Bíceps',
    grupo_muscular: 'Brazos',
    dificultad: 'Principiante',
    equipamiento: 'Mancuernas',
    descripcion: 'Flexiona los codos para llevar las mancuernas hacia los hombros sin mover el torso.',
    imagen_url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    nombre: 'Plancha Abdominal',
    grupo_muscular: 'Core',
    dificultad: 'Principiante',
    equipamiento: 'Peso Corporal',
    descripcion: 'Mantén el cuerpo alineado apoyándote en antebrazos y puntas de los pies, contrayendo el abdomen.',
    imagen_url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80'
  }
]

export default function Ejercicios() {
  const [ejercicios, setEjercicios] = useState([])
  const [selectedExercise, setSelectedExercise] = useState(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedMuscle, setSelectedMuscle] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('')

  useEffect(() => {
    fetchExercises()
  }, [])

  const fetchExercises = async () => {
    setLoading(true)
    try {
      const res = await getEjercicios()
      const list = res.data || res
      setEjercicios(Array.isArray(list) && list.length > 0 ? list : ejerciciosDefecto)
    } catch {
      setEjercicios(ejerciciosDefecto)
    } finally {
      setLoading(false)
    }
  }

  const muscles = ['Pecho', 'Espalda', 'Piernas', 'Hombros', 'Brazos', 'Core']
  const difficulties = ['Principiante', 'Intermedio', 'Avanzado']

  const filteredExercises = ejercicios.filter(e => {
    const matchSearch = e.nombre.toLowerCase().includes(search.toLowerCase()) || 
                        (e.descripcion || '').toLowerCase().includes(search.toLowerCase())
    const matchMuscle = selectedMuscle ? e.grupo_muscular === selectedMuscle : true
    const matchDiff = selectedDifficulty ? e.dificultad === selectedDifficulty : true
    return matchSearch && matchMuscle && matchDiff
  })

  const getDifficultyColor = (diff) => {
    switch (diff.toLowerCase()) {
      case 'principiante': return 'rgba(34, 197, 94, 0.15)'
      case 'intermedio': return 'rgba(239, 68, 68, 0.15)'
      case 'avanzado': return 'rgba(255, 75, 99, 0.15)'
      default: return 'rgba(255, 255, 255, 0.1)'
    }
  }

  const getDifficultyTextColor = (diff) => {
    switch (diff.toLowerCase()) {
      case 'principiante': return '#86efac'
      case 'intermedio': return '#ff8a00'
      case 'avanzado': return '#ff4b63'
      default: return '#cbd5e1'
    }
  }

  return (
    <section className="main-shell" style={{ animation: 'fadeIn 0.3s ease' }}>
      <div style={{ marginBottom: '2rem' }}>
        <p className="fz-kicker">Guía Técnica</p>
        <h2 className="fz-big-title">Biblioteca de Ejercicios</h2>
        <p className="fz-copy">Domina la técnica correcta, evita lesiones y optimiza tus entrenamientos con descripciones detalladas.</p>
      </div>

      {/* Buscador y Filtros */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,75,99,0.1)',
        borderRadius: '0.875rem',
        padding: '1.5rem',
        marginBottom: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem'
      }}>
        {/* Barra de Búsqueda */}
        <input
          type="text"
          placeholder="Buscar ejercicio..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(0,0,0,0.3)',
            color: '#f8fafc',
            fontSize: '0.95rem',
            fontFamily: 'inherit'
          }}
        />

        {/* Botones de Grupo Muscular */}
        <div>
          <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.5rem', fontWeight: 600, textTransform: 'uppercase' }}>Grupo Muscular</p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setSelectedMuscle('')}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: '0.5rem',
                border: '1px solid ' + (selectedMuscle === '' ? '#ff4b63' : 'rgba(255,255,255,0.1)'),
                background: selectedMuscle === '' ? 'rgba(255,75,99,0.15)' : 'transparent',
                color: selectedMuscle === '' ? '#ff4b63' : '#cbd5e1',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Todos
            </button>
            {muscles.map(m => (
              <button
                key={m}
                onClick={() => setSelectedMuscle(m)}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid ' + (selectedMuscle === m ? '#ff4b63' : 'rgba(255,255,255,0.1)'),
                  background: selectedMuscle === m ? 'rgba(255,75,99,0.15)' : 'transparent',
                  color: selectedMuscle === m ? '#ff4b63' : '#cbd5e1',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Botones de Dificultad */}
        <div>
          <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.5rem', fontWeight: 600, textTransform: 'uppercase' }}>Dificultad</p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setSelectedDifficulty('')}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: '0.5rem',
                border: '1px solid ' + (selectedDifficulty === '' ? '#ff8a00' : 'rgba(255,255,255,0.1)'),
                background: selectedDifficulty === '' ? 'rgba(255,138,0,0.15)' : 'transparent',
                color: selectedDifficulty === '' ? '#ff8a00' : '#cbd5e1',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Cualquiera
            </button>
            {difficulties.map(d => (
              <button
                key={d}
                onClick={() => setSelectedDifficulty(d)}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid ' + (selectedDifficulty === d ? getDifficultyTextColor(d) : 'rgba(255,255,255,0.1)'),
                  background: selectedDifficulty === d ? getDifficultyColor(d) : 'transparent',
                  color: selectedDifficulty === d ? getDifficultyTextColor(d) : '#cbd5e1',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', color: '#94a3b8', padding: '3rem' }}>Cargando biblioteca...</div>
      ) : filteredExercises.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#64748b', padding: '3rem' }}>No se encontraron ejercicios con los filtros actuales.</div>
      ) : (
        <div className="grid-cards three-cols">
          {filteredExercises.map(e => (
            <div key={e.id} className="animate-up" style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,75,99,0.08)',
              borderRadius: '0.75rem',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.3s'
            }}>
              {e.imagen_url && (
                <img
                  src={e.imagen_url}
                  alt={e.nombre}
                  style={{ width: '100%', height: '180px', objectFit: 'cover', borderBottom: '1px solid rgba(255,75,99,0.08)' }}
                />
              )}
              <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '0.375rem', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                      {e.grupo_muscular}
                    </span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '0.375rem', background: getDifficultyColor(e.dificultad), color: getDifficultyTextColor(e.dificultad), border: '1px solid ' + getDifficultyTextColor(e.dificultad) + '40' }}>
                      {e.dificultad}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.15rem', color: '#f8fafc', fontWeight: 700, marginBottom: '0.5rem' }}>{e.nombre}</h3>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.4, marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {e.descripcion || 'Sin descripción.'}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '1rem' }}><strong>Equipamiento:</strong> {e.equipamiento}</p>
                  <button
                    className="btn-primary"
                    onClick={() => setSelectedExercise(e)}
                    style={{ width: '100%', justifyContent: 'center', padding: '0.55rem' }}
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedExercise && (
        <div className="modal-overlay" onClick={() => setSelectedExercise(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <h2 style={{ fontSize: '1.35rem', color: '#f8fafc', marginBottom: '1rem', borderBottom: '1px solid rgba(255,75,99,0.15)', paddingBottom: '0.5rem' }}>
              {selectedExercise.nombre}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
              {selectedExercise.imagen_url && (
                <img
                  src={selectedExercise.imagen_url}
                  alt={selectedExercise.nombre}
                  style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '0.5rem', marginBottom: '0.5rem' }}
                />
              )}
              <p><strong>Grupo Muscular:</strong> {selectedExercise.grupo_muscular}</p>
              <p><strong>Dificultad:</strong> {selectedExercise.dificultad}</p>
              <p><strong>Equipamiento:</strong> {selectedExercise.equipamiento}</p>
              <div style={{ marginTop: '0.5rem' }}>
                <strong>Instrucciones y Guía Técnica:</strong>
                <p style={{
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,75,99,0.15)',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  marginTop: '0.5rem',
                  fontSize: '0.88rem',
                  lineHeight: 1.5,
                  color: '#cbd5e1'
                }}>
                  {selectedExercise.descripcion}
                </p>
              </div>
            </div>
            <div className="form-actions" style={{ marginTop: '1.5rem' }}>
              <button className="btn-secondary" onClick={() => setSelectedExercise(null)} style={{ width: '100%' }}>
                Cerrar Guía
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
