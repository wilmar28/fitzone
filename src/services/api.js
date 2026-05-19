// src/services/api.js

const BASE_URL = 'http://localhost:8000/api';  // ← descomentada

// ── Helper con token ──────────────────────────────────
const getToken = () => localStorage.getItem('fitzone_token');

const authFetch = async (endpoint, options = {}) => {
  const token = getToken();
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  });
  if (response.status === 401) {
    localStorage.removeItem('fitzone_token');
    localStorage.removeItem('fitzone_user');
    window.location.href = '/login';
    throw new Error('Sesión expirada');
  }
  const data = await response.json();
  if (!response.ok) {
    const err = new Error(data.message || `Error ${response.status}`);
    err.errors = data.errors;
    throw err;
  }
  return data;
};

// ── Helper sin token (rutas públicas) ────────────────
const publicFetch = async (endpoint) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Error');
  return data;
};

// ════════════════════════════════════════════════════════
//  DISPOSITIVOS Y PRÉSTAMOS
//  (ahora desde el backend, no desde JSON local)
// ════════════════════════════════════════════════════════
export const getDispositivos = () => authFetch('/dispositivos');
export const getPrestamos = () => authFetch('/prestamos');

// ════════════════════════════════════════════════════════
//  AUTH
// ════════════════════════════════════════════════════════
export const registerUser = async (name, email, password) => {
  const data = await authFetch('/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, password_confirmation: password }),
  });
  localStorage.setItem('fitzone_token', data.token);
  localStorage.setItem('fitzone_user', JSON.stringify(data.user));
  return data;
};

export const loginUser = async (email, password) => {
  const data = await authFetch('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  localStorage.setItem('fitzone_token', data.token);
  localStorage.setItem('fitzone_user', JSON.stringify(data.user));
  return data;
};

export const logoutUser = async () => {
  await authFetch('/logout', { method: 'POST' }).catch(() => { });
  localStorage.removeItem('fitzone_token');
  localStorage.removeItem('fitzone_user');
};

export const getMe = () => authFetch('/me');
export const isAuthenticated = () => !!getToken();
export const getCurrentUser = () => {
  const u = localStorage.getItem('fitzone_user');
  return u ? JSON.parse(u) : null;
};

// ════════════════════════════════════════════════════════
//  DASHBOARD
// ════════════════════════════════════════════════════════
export const getDashboard = () => authFetch('/dashboard');

// ════════════════════════════════════════════════════════
//  PRODUCTOS (panel admin)
// ════════════════════════════════════════════════════════
export const getProducts = (p = {}) => authFetch(`/products?${new URLSearchParams(p)}`);
export const getProductById = (id) => authFetch(`/products/${id}`);
export const getStockSummary = () => authFetch('/products/stock/summary');
export const createProduct = (d) => authFetch('/products', { method: 'POST', body: JSON.stringify(d) });
export const updateProduct = (id, d) => authFetch(`/products/${id}`, { method: 'PUT', body: JSON.stringify(d) });
export const deleteProduct = (id) => authFetch(`/products/${id}`, { method: 'DELETE' });

// ════════════════════════════════════════════════════════
//  VENTAS (panel admin)
// ════════════════════════════════════════════════════════
export const getSales = (p = {}) => authFetch(`/sales?${new URLSearchParams(p)}`);
export const getSaleById = (id) => authFetch(`/sales/${id}`);
export const createSale = (d) => authFetch('/sales', { method: 'POST', body: JSON.stringify(d) });

// ════════════════════════════════════════════════════════
//  TIENDA PÚBLICA — no requieren token
// ════════════════════════════════════════════════════════
export const getTiendaProductos = (params = {}) => {
  const query = new URLSearchParams(
    Object.fromEntries(Object.entries(params).filter(([, v]) => v !== ''))
  ).toString();
  return publicFetch(`/tienda/productos${query ? '?' + query : ''}`);
};

export const getTiendaProducto = (id) => publicFetch(`/tienda/productos/${id}`);
export const getTiendaCategorias = () => publicFetch('/tienda/categorias');
export const getTiendaMarcas = () => publicFetch('/tienda/marcas');

// ════════════════════════════════════════════════════════
//  REPORTES
// ════════════════════════════════════════════════════════
const downloadFile = async (endpoint, filename) => {
  const token = getToken();
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: '*/*' },
  });
  if (!res.ok) throw new Error('Error al generar reporte');
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement('a'), { href: url, download: filename });
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

export const downloadSalesPDF = () => downloadFile('/reports/pdf?type=sales', 'fitzone-ventas.pdf');
export const downloadStockPDF = () => downloadFile('/reports/pdf?type=stock', 'fitzone-inventario.pdf');
export const downloadSalesExcel = () => downloadFile('/reports/excel?type=sales', 'fitzone-ventas.xlsx');
export const downloadStockExcel = () => downloadFile('/reports/excel?type=stock', 'fitzone-inventario.xlsx');