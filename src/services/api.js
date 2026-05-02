import dispositivos from '../data/dispositivos.json'
import prestamos from '../data/prestamos.json'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getDispositivos() {
  await wait(200)
  return dispositivos
}

export async function getPrestamos() {
  await wait(200)
  return prestamos
}


// const BASE_URL = 'http://localhost:8000/api';