import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Conductores API
export const conductoresAPI = {
  getAll: () => api.get('/conductores'),
  getById: (id) => api.get(`/conductores/${id}`),
  create: (data) => api.post('/conductores', data),
  update: (id, data) => api.put(`/conductores/${id}`, data),
  delete: (id) => api.delete(`/conductores/${id}`),
  getVehiculos: (id) => api.get(`/conductores/${id}/vehiculos`),
  getInfracciones: (id) => api.get(`/conductores/${id}/infracciones`),
};

// Vehículos API
export const vehiculosAPI = {
  getAll: () => api.get('/vehiculos'),
  getById: (id) => api.get(`/vehiculos/${id}`),
  create: (data) => api.post('/vehiculos', data),
  update: (id, data) => api.put(`/vehiculos/${id}`, data),
  delete: (id) => api.delete(`/vehiculos/${id}`),
  getByPatente: (patente) => api.get(`/vehiculos/patente/${patente}`),
};

// Infracciones API
export const infraccionesAPI = {
  getAll: () => api.get('/infracciones'),
  getById: (id) => api.get(`/infracciones/${id}`),
  create: (data) => api.post('/infracciones', data),
  update: (id, data) => api.put(`/infracciones/${id}`, data),
  delete: (id) => api.delete(`/infracciones/${id}`),
  getByEstado: (estado) => api.get(`/infracciones/estado/${estado}`),
  getByConductor: (conductorId) => api.get(`/infracciones/conductor/${conductorId}`),
};

export default api;
