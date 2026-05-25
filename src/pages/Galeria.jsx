import { useState } from 'react'

const photos = [
  { id: 1,  url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80', title: 'Sala de pesas' },
  { id: 2,  url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80', title: 'Entrenamiento funcional' },
  { id: 3,  url: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=800&q=80', title: 'Cardio' },
  { id: 4,  url: 'https://images.unsplash.com/photo-1652363722833-509b3aac287b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'Press de banca' },
  { id: 5,  url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80', title: 'Zona de pesas' },
  { id: 6,  url: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?auto=format&fit=crop&w=800&q=80', title: 'HIIT' },
  { id: 7,  url: 'https://images.unsplash.com/photo-1647438174616-7bc61ca38455?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'Saltar cuerda' },
  { id: 8,  url: 'https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?auto=format&fit=crop&w=800&q=80', title: 'Spinning' },
  { id: 9,  url: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?auto=format&fit=crop&w=800&q=80', title: 'Yoga' },
  { id: 10, url: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=800&q=80', title: 'Running' },
  { id: 11, url: 'https://images.unsplash.com/photo-1622599511051-16f55a1234d0?q=80&w=436&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'Boxeo' },
  { id: 12, url: 'https://images.unsplash.com/photo-1632077804406-188472f1a810?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'Kettlebell' },
  { id: 13, url: 'https://plus.unsplash.com/premium_photo-1663134059475-5976ce4cc2d8?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'Dominadas' },
  { id: 14, url: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=800&q=80', title: 'Suplementos' },
  { id: 15, url: 'https://images.unsplash.com/photo-1585475686930-8fcb2728eb6b?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'Accesorios fitness' },
  { id: 16, url: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80', title: 'Sentadillas' },
  { id: 17, url: 'https://plus.unsplash.com/premium_photo-1664298367434-0408974ab0bb?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'Peso muerto' },
  { id: 18, url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80', title: 'Entrenamiento en grupo' },
  { id: 19, url: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=800&q=80', title: 'Motivación' },
  { id: 20, url: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80', title: 'Estiramiento' },
  { id: 21, url: 'https://images.unsplash.com/photo-1571019613576-2b22c76fd955?auto=format&fit=crop&w=800&q=80', title: 'Abdominales' },
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
        {photos.map((photo) => (
          <div 
            key={photo.id} 
            className="gallery-item animate-up" 
            style={{ animationDelay: `${photo.id * 0.05}s` }}
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
