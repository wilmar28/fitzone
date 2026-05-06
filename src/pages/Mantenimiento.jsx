function Mantenimiento() {
  return (
    <section className="card maintenance-card">
      <h2 className="section-title">Mantenimiento de Equipos</h2>
      <p className="section-subtitle">
        Programa revisiones tecnicas y asegura que cada zona este operativa.
      </p>
      <div className="maintenance-grid">
        <div className="mini-card">
          <h4>Proxima revision</h4>
          <p>Caminadora X1 - 30 Abril</p>
        </div>
        <div className="mini-card">
          <h4>Supervisor de turno</h4>
          <p>Area tecnica FitZone</p>
        </div>
        <div className="mini-card">
          <h4>Prioridad</h4>
          <p>Alta - Zona cardio</p>
        </div>
      </div>
    </section>
  )
}

export default Mantenimiento
