import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { conductoresAPI } from '../../services/api'

export default function ConductorForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)

  const [formData, setFormData] = useState({
    dni: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: '',
    fechaNacimiento: '',
    numeroLicencia: '',
    fechaVencimientoLicencia: '',
    puntosLicencia: 20,
    licenciaHabilitada: true
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isEdit) {
      loadConductor()
    }
  }, [id])

  const loadConductor = async () => {
    try {
      const response = await conductoresAPI.getById(id)
      setFormData(response.data)
    } catch (error) {
      console.error('Error loading conductor:', error)
      alert('Error al cargar conductor')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isEdit) {
        await conductoresAPI.update(id, formData)
        alert('Conductor actualizado exitosamente')
      } else {
        await conductoresAPI.create(formData)
        alert('Conductor creado exitosamente')
      }
      navigate('/conductores')
    } catch (error) {
      console.error('Error saving conductor:', error)
      alert('Error al guardar conductor')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {isEdit ? 'Editar Conductor' : 'Nuevo Conductor'}
        </h1>
      </div>

      <div className="card max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="label">DNI *</label>
              <input
                type="text"
                name="dni"
                required
                className="input"
                value={formData.dni}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">Nombre *</label>
              <input
                type="text"
                name="nombre"
                required
                className="input"
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">Apellido *</label>
              <input
                type="text"
                name="apellido"
                required
                className="input"
                value={formData.apellido}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">Email *</label>
              <input
                type="email"
                name="email"
                required
                className="input"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">Teléfono</label>
              <input
                type="tel"
                name="telefono"
                className="input"
                value={formData.telefono}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">Fecha de Nacimiento *</label>
              <input
                type="date"
                name="fechaNacimiento"
                required
                className="input"
                value={formData.fechaNacimiento}
                onChange={handleChange}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="label">Dirección</label>
              <input
                type="text"
                name="direccion"
                className="input"
                value={formData.direccion}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">Número de Licencia *</label>
              <input
                type="text"
                name="numeroLicencia"
                required
                className="input"
                value={formData.numeroLicencia}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">Vencimiento Licencia *</label>
              <input
                type="date"
                name="fechaVencimientoLicencia"
                required
                className="input"
                value={formData.fechaVencimientoLicencia}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">Puntos de Licencia</label>
              <input
                type="number"
                name="puntosLicencia"
                min="0"
                max="20"
                className="input"
                value={formData.puntosLicencia}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="licenciaHabilitada"
                id="licenciaHabilitada"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                checked={formData.licenciaHabilitada}
                onChange={handleChange}
              />
              <label htmlFor="licenciaHabilitada" className="ml-2 block text-sm text-gray-900">
                Licencia Habilitada
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => navigate('/conductores')}
              className="btn btn-secondary"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? 'Guardando...' : (isEdit ? 'Actualizar' : 'Crear')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
