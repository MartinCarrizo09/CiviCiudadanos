import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { vehiculosAPI, conductoresAPI } from '../../services/api'

export default function VehiculoForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)

  const [formData, setFormData] = useState({
    patente: '',
    marca: '',
    modelo: '',
    anio: new Date().getFullYear(),
    color: '',
    tipo: 'AUTOMOVIL',
    conductorId: ''
  })

  const [conductores, setConductores] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadConductores()
    if (isEdit) {
      loadVehiculo()
    }
  }, [id])

  const loadConductores = async () => {
    try {
      const response = await conductoresAPI.getAll()
      setConductores(response.data)
    } catch (error) {
      console.error('Error loading conductores:', error)
    }
  }

  const loadVehiculo = async () => {
    try {
      const response = await vehiculosAPI.getById(id)
      const vehiculo = response.data
      setFormData({
        ...vehiculo,
        conductorId: vehiculo.conductor?.id || ''
      })
    } catch (error) {
      console.error('Error loading vehiculo:', error)
      alert('Error al cargar vehículo')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const dataToSend = {
        ...formData,
        conductorId: formData.conductorId ? parseInt(formData.conductorId) : null
      }

      if (isEdit) {
        await vehiculosAPI.update(id, dataToSend)
        alert('Vehículo actualizado exitosamente')
      } else {
        await vehiculosAPI.create(dataToSend)
        alert('Vehículo creado exitosamente')
      }
      navigate('/vehiculos')
    } catch (error) {
      console.error('Error saving vehiculo:', error)
      alert('Error al guardar vehículo')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {isEdit ? 'Editar Vehículo' : 'Nuevo Vehículo'}
        </h1>
      </div>

      <div className="card max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="label">Patente *</label>
              <input
                type="text"
                name="patente"
                required
                className="input"
                value={formData.patente}
                onChange={handleChange}
                placeholder="ABC123"
              />
            </div>

            <div>
              <label className="label">Marca *</label>
              <input
                type="text"
                name="marca"
                required
                className="input"
                value={formData.marca}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">Modelo *</label>
              <input
                type="text"
                name="modelo"
                required
                className="input"
                value={formData.modelo}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">Año *</label>
              <input
                type="number"
                name="anio"
                required
                min="1900"
                max={new Date().getFullYear() + 1}
                className="input"
                value={formData.anio}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">Color *</label>
              <input
                type="text"
                name="color"
                required
                className="input"
                value={formData.color}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">Tipo *</label>
              <select
                name="tipo"
                required
                className="input"
                value={formData.tipo}
                onChange={handleChange}
              >
                <option value="AUTOMOVIL">Automóvil</option>
                <option value="MOTOCICLETA">Motocicleta</option>
                <option value="CAMIONETA">Camioneta</option>
                <option value="CAMION">Camión</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="label">Conductor</label>
              <select
                name="conductorId"
                className="input"
                value={formData.conductorId}
                onChange={handleChange}
              >
                <option value="">Sin conductor asignado</option>
                {conductores.map(conductor => (
                  <option key={conductor.id} value={conductor.id}>
                    {conductor.nombre} {conductor.apellido} - DNI: {conductor.dni}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => navigate('/vehiculos')}
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
