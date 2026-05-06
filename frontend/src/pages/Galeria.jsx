import { useState } from 'react'
import { Modal } from 'react-bootstrap'

const photos = [
  { url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80', title: 'Zona de Pesas Libres' },
  { url: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1200&q=80', title: 'Entrenamiento Funcional' },
  { url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80', title: 'Maquinas de Cardio' },
  { url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80', title: 'Clases Grupales' },
  { url: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1200&q=80', title: 'Crossfit' },
  { url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1200&q=80', title: 'Zona de Estiramiento' },
]

function Galeria() {
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <section>
      <h2 className="section-title">Galeria</h2>
      <p className="section-subtitle">Instalaciones y resultados reales de nuestra comunidad.</p>
      
      <div className="gallery-grid">
        {photos.map((photo, idx) => (
          <div key={idx} className="gallery-item" onClick={() => setSelectedImage(photo)}>
            <img src={photo.url} alt={photo.title} className="gallery-photo" />
            <div className="gallery-overlay">
              <h4 className="gallery-title">{photo.title}</h4>
            </div>
          </div>
        ))}
      </div>

      <Modal show={Boolean(selectedImage)} onHide={() => setSelectedImage(null)} centered size="lg" contentClassName="bg-transparent border-0">
        {selectedImage && (
          <div className="gallery-modal-content">
             <button className="gallery-close-btn" onClick={() => setSelectedImage(null)}>✕</button>
             <img src={selectedImage.url} alt={selectedImage.title} className="gallery-modal-img" />
             <h3 className="gallery-modal-title">{selectedImage.title}</h3>
          </div>
        )}
      </Modal>
    </section>
  )
}

export default Galeria
