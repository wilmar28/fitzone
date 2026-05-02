import { useEffect, useState } from 'react'
import DeviceTable from '../components/DeviceTable'
import { getDispositivos } from '../services/api'

function Dispositivos() {
  const [devices, setDevices] = useState([])

  useEffect(() => {
    getDispositivos().then(setDevices)
  }, [])

  return (
    <section>
      <h2 className="section-title">Equipos del Gimnasio</h2>
      <p className="section-subtitle">
        Administra el estado de caminadoras, bicicletas y maquinas de fuerza.
      </p>
      <DeviceTable devices={devices} />
    </section>
  )
}

export default Dispositivos
