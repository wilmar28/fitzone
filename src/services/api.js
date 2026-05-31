// src/services/api.js

import { createClient } from '@supabase/supabase-js'
console.log(import.meta.env)
// ════════════════════════════════════════════════════════
// SUPABASE CONFIG
// ════════════════════════════════════════════════════════

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)


// ════════════════════════════════════════════════════════
// HELPERS
// ════════════════════════════════════════════════════════

const getAuthHeader = () => {
  const token = localStorage.getItem('fitzone_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export const apiCall = async (
  endpoint,
  options = {}
) => {

  const baseUrl =
    import.meta.env.VITE_API_URL ||
    'http://localhost:8000'

  const url = `${baseUrl}${endpoint}`

  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
    ...options.headers,
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({}))

    throw new Error(
      error.message ||
      `HTTP ${response.status}`
    )
  }

  return response.json()
}

const saveSession = (session, user) => {
  if (session?.access_token) {
    localStorage.setItem('fitzone_token', session.access_token)
  }

  if (user) {
    localStorage.setItem(
      'fitzone_user',
      JSON.stringify(user)
    )
  }

  window.dispatchEvent(new Event('auth-change'))
}

const clearSession = () => {
  localStorage.removeItem('fitzone_token')
  localStorage.removeItem('fitzone_user')
  window.dispatchEvent(new Event('auth-change'))
}

// ════════════════════════════════════════════════════════
// AUTH
// ════════════════════════════════════════════════════════

export const registerUser = async (
  name,
  email,
  password
) => {
  const { data, error } =
    await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    })

  if (error) {
    throw new Error(error.message)
  }

  saveSession(data.session, data.user)

  return data
}

export const loginUser = async (
  email,
  password
) => {
  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    })

  if (error) {
    throw new Error(error.message)
  }

  saveSession(data.session, data.user)

  return data
}

export const logoutUser = async () => {
  await supabase.auth.signOut()
  clearSession()
}

export const getMe = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) {
    throw new Error(error.message)
  }

  return user
}

export const isAuthenticated = () => {
  return !!localStorage.getItem('fitzone_token')
}

export const getCurrentUser = () => {
  const user = localStorage.getItem('fitzone_user')

  return user ? JSON.parse(user) : null
}

// ════════════════════════════════════════════════════════
// DASHBOARD
// ════════════════════════════════════════════════════════

export const getDashboard = async () => {
  const user = await getMe()

  return {
    user,
  }
}

// ════════════════════════════════════════════════════════
// PRODUCTOS
// Usa el backend Laravel — sin Supabase
// ════════════════════════════════════════════════════════

export const getProducts = async () => {
  return apiCall('/api/products')
}

export const getProductById = async (id) => {
  return apiCall(`/api/products/${id}`)
}

export const createProduct = async (productData) => {
  return apiCall('/api/products', {
    method: 'POST',
    body: JSON.stringify(productData),
  })
}

export const updateProduct = async (id, productData) => {
  return apiCall(`/api/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData),
  })
}

export const deleteProduct = async (id) => {
  return apiCall(`/api/products/${id}`, {
    method: 'DELETE',
  })
}

// ════════════════════════════════════════════════════════
// VENTAS
// TABLA: sales
// ════════════════════════════════════════════════════════

export const getSales = async () => {
  const { data, error } = await supabase
    .from('sales')
    .select('*')

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const getSaleById = async (id) => {
  const { data, error } = await supabase
    .from('sales')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const createSale = async (
  saleData
) => {

  const { data, error } = await supabase
    .from('ventas')
    .insert([
      {
        id_usuario: 1,

        total: saleData.items.reduce(
          (acc, item) =>
            acc + item.price * item.quantity,
          0
        ),

        estado: 'pendiente',

        canal: 'web',

        notas: 'Pago desde Wompi',

        reference: saleData.reference,

        items: saleData.items,
      }
    ])
    .select()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

// ════════════════════════════════════════════════════════
// DISPOSITIVOS
// TABLA: dispositivos
// ════════════════════════════════════════════════════════

export const getDispositivos = async () => {
  const { data, error } = await supabase
    .from('dispositivos')
    .select('*')

  if (error) {
    throw new Error(error.message)
  }

  return data
}

// ════════════════════════════════════════════════════════
// PRESTAMOS
// TABLA: prestamos
// ════════════════════════════════════════════════════════

export const getPrestamos = async () => {
  const { data, error } = await supabase
    .from('prestamos')
    .select('*')

  if (error) {
    throw new Error(error.message)
  }

  return data
}

// ════════════════════════════════════════════════════════
// TIENDA PÚBLICA
// Usa el backend Laravel — sin Supabase
// ════════════════════════════════════════════════════════

export const getTiendaProductos = async (params = {}) => {
  const query = new URLSearchParams()
  if (params.search)       query.set('search',       params.search)
  if (params.categoria_id) query.set('categoria_id', params.categoria_id)
  if (params.marca_id)     query.set('marca_id',     params.marca_id)
  if (params.orden)        query.set('orden',        params.orden)
  const qs = query.toString()
  const data = await apiCall(`/api/tienda/productos${qs ? `?${qs}` : ''}`)
  return data.productos || data
}

export const getTiendaProducto = async (id) => {
  return apiCall(`/api/tienda/productos/${id}`)
}

export const getTiendaCategorias = async () => {
  const data = await apiCall('/api/tienda/categorias')
  return data.categorias || []
}

export const getTiendaMarcas = async () => {
  const data = await apiCall('/api/tienda/marcas')
  return data.marcas || []
}

// ════════════════════════════════════════════════════════
// REPORTES
// ════════════════════════════════════════════════════════

export const downloadSalesPDF = async () => {
  console.log('Pendiente implementar')
}

export const downloadStockPDF = async () => {
  console.log('Pendiente implementar')
}

export const downloadSalesExcel = async () => {
  console.log('Pendiente implementar')
}


export const downloadStockExcel = async () => {
  console.log('Pendiente implementar')
}

// ════════════════════════════════════════════════════════
// PLANES
// ════════════════════════════════════════════════════════

export const getPlanes = async () => {
  return apiCall('/api/plans')
}

// ════════════════════════════════════════════════════════
// EJERCICIOS
// ════════════════════════════════════════════════════════

export const getEjercicios = async () => {
  return apiCall('/api/exercises')
}

// ════════════════════════════════════════════════════════
// RUTINAS
// ════════════════════════════════════════════════════════

export const getRutinas = async () => {
  const data = await apiCall('/api/rutinas')
  // El endpoint devuelve { success: true, rutinas: [...] }
  // Cada rutina tiene ejercicios como string JSON → parsear
  const rutinas = data.rutinas.map((r) => ({
    ...r,
    ejercicios: typeof r.ejercicios === 'string'
      ? JSON.parse(r.ejercicios)
      : r.ejercicios,
  }))
  return rutinas
}

// ════════════════════════════════════════════════════════
// DASHBOARD
// ════════════════════════════════════════════════════════

export const getDashboardStats = async () => {
  return apiCall('/api/dashboard')
}

// ════════════════════════════════════════════════════════
// PRODUCTOS BACKEND (aliases — apuntan a getProducts/etc.)
// ════════════════════════════════════════════════════════

export const getBackendProducts     = getProducts
export const createBackendProduct   = createProduct
export const deleteBackendProduct   = deleteProduct

// updateBackendProduct no usa apiCall porque el backend devuelve text/html
// en respuestas 200, lo que hace fallar a response.json()
export const updateBackendProduct = async (id, data) => {
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
  const res = await fetch(`${baseUrl}/api/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(`Error actualizando producto: HTTP ${res.status}`)
  return { success: true }
}

// ════════════════════════════════════════════════════════
// VENTAS BACKEND
// ════════════════════════════════════════════════════════

export const getBackendSales = async () => {
  return apiCall('/api/sales')
}

// ════════════════════════════════════════════════════════
// REPORTES
// ════════════════════════════════════════════════════════

export const downloadReportPdf = async () => {
  const res = await fetch('http://localhost:8000/api/reports/pdf')
  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'reporte-ventas.pdf'
  a.click()
  URL.revokeObjectURL(url)
}

export const downloadReportExcel = async () => {
  const res = await fetch('http://localhost:8000/api/reports/excel')
  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'reporte-ventas.xlsx'
  a.click()
  URL.revokeObjectURL(url)
}
