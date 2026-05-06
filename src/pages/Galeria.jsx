import { useState } from 'react'

const photos = [
  { url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80', title: 'Zona de Pesas Libres' },
  { url: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1200&q=80', title: 'Equipamiento Cardiovascular' },
  { url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80', title: 'Entrenamiento Funcional' },
  { url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80', title: 'Zona de Máquinas' },
  { url: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1200&q=80', title: 'Salón de Clases Grupales' },
  { url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1200&q=80', title: 'Espacios de Estiramiento' },
]

function Galeria() {
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  return (
    <section className="main-shell">
      <div style={{ textAlign: 'center', padding: '2rem 0 2rem', maxWidth: 1200, margin: '0 auto', paddingLeft: '1.2rem', paddingRight: '1.2rem' }}>
        <span className="fz-kicker">Instalaciones</span>
        <h1 className="fz-big-title">Nuestra galería</h1>
        <p className="fz-copy" style={{ maxWidth: 400, margin: '0 auto' }}>
          Conoce nuestras instalaciones de última generación y la comunidad que nos mueve.
        </p>
      </div>
      <div className="gallery-grid">
        {photos.map((photo, idx) => (
          <div 
            key={idx} 
            className="gallery-item animate-up" 
            style={{ animationDelay: `${idx * 0.1}s` }}
            onClick={() => setSelectedPhoto(photo)}
          >
            <img src={photo.url} alt={photo.title} className="gallery-photo" />
            <div className="gallery-overlay">
              <span className="gallery-title">{photo.title}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div className="modal-backdrop" onClick={() => setSelectedPhoto(null)}>
          <div className="modal-box" style={{ background: 'transparent', boxShadow: 'none', padding: 0 }} onClick={e => e.stopPropagation()}>
            <img 
              src={selectedPhoto.url} 
              alt={selectedPhoto.title} 
              style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: '0.8rem' }} 
            />
            <h3 style={{ textAlign: 'center', marginTop: '1rem', color: '#f8fafc' }}>{selectedPhoto.title}</h3>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
              <button className="pill-btn" onClick={() => setSelectedPhoto(null)}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Galeria
