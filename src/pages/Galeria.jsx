const photos = [
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1200&q=80',
]

function Galeria() {
  return (
    <section>
      <h2 className="section-title">Galeria</h2>
      <p className="section-subtitle">Instalaciones y resultados reales de nuestra comunidad.</p>
      <div className="gallery-grid">
        {photos.map((photo) => (
          <img key={photo} src={photo} alt="Galeria FitZone" className="gallery-photo" />
        ))}
      </div>
    </section>
  )
}

export default Galeria
