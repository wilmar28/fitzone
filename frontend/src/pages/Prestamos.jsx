import { useEffect, useState } from 'react'
import LoanTable from '../components/LoanTable'
import { getPrestamos } from '../services/api'

function Prestamos() {
  const [loans, setLoans] = useState([])

  useEffect(() => {
    getPrestamos().then(setLoans)
  }, [])

  return (
    <section>
      <h2 className="section-title">Prestamo de Accesorios</h2>
      <p className="section-subtitle">
        Controla cinturones, bandas y guantes que se prestan a los socios.
      </p>
      <LoanTable loans={loans} />
    </section>
  )
}

export default Prestamos
