import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { infraccionesAPI, conductoresAPI, vehiculosAPI } from '../../services/api'

export default function InfraccionForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)

  const [formData, setFormData] = useState({
    codigo: '',
    descripcion: '',
    gravedad: 'LEVE',
    puntosDescontados: 0,
    monto: 0,
    ubicacion: '',
    latitud: null,
    longitud: null,
    conductorId: '',
    vehiculoId: '',
    estado: 'PENDIENTE',
    fechaInfraccion: new Date().toISOString().split('T')[0],
    fechaVencimientoPago: '',
    observaciones: ''
  })

  const [conductores, setConductores] = useState([])
  const [vehiculos, setVehiculos] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadConductores()
    loadVehiculos()
    if (isEdit) {
      loadInfraccion()
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

  const loadVehiculos = async () => {
    try {
      const response = await vehiculosAPI.getAll()
      setVehiculos(response.data)
    } catch (error) {
      console.error('Error loading vehiculos:', error)
    }
  }

  const loadInfraccion = async () => {
    try {
      const response = await infraccionesAPI.getById(id)
      const infraccion = response.data
      setFormData({
        ...infraccion,
        conductorId: infraccion.conductor?.id || '',
        vehiculoId: infraccion.vehiculo?.id || '',
        fechaInfraccion: infraccion.fechaInfraccion?.split('T')[0] || '',
        fechaVencimientoPago: infraccion.fechaVencimientoPago?.split('T')[0] || ''
      })
    } catch (error) {
      console.error('Error loading infraccion:', error)
      alert('Error al cargar infracción')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const dataToSend = {
        ...formData,
        conductorId: formData.conductorId ? parseInt(formData.conductorId) : null,
        vehiculoId: formData.vehiculoId ? parseInt(formData.vehiculoId) : null,
        latitud: formData.latitud ? parseFloat(formData.latitud) : null,
        longitud: formData.longitud ? parseFloat(formData.longitud) : null,
        monto: parseFloat(formData.monto),
        puntosDescontados: parseInt(formData.puntosDescontados)
      }

      if (isEdit) {
        await infraccionesAPI.update(id, dataToSend)
        alert('Infracción actualizada exitosamente')
      } else {
        await infraccionesAPI.create(dataToSend)
        alert('Infracción creada exitosamente')
      }
      navigate('/infracciones')
    } catch (error) {
      console.error('Error saving infraccion:', error)
      alert('Error al guardar infracción')
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
          {isEdit ? 'Editar Infracción' : 'Nueva Infracción'}
        </h1>
      </div>

      <div className="card max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="label">Código *</label>
              <input
                type="text"
                name="codigo"
                required
                className="input"
                value={formData.codigo}
                onChange={handleChange}
                placeholder="INF001"
              />
            </div>

            <div>
              <label className="label">Gravedad *</label>
              <select
                name="gravedad"
                required
                className="input"
                value={formData.gravedad}
                onChange={handleChange}
              >
                <option value="LEVE">Leve</option>
                <option value="GRAVE">Grave</option>
                <option value="MUY_GRAVE">Muy Grave</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="label">Descripción *</label>
              <textarea
                name="descripcion"
                required
                rows="3"
                className="input"
                value={formData.descripcion}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">Puntos a Descontar *</label>
              <input
                type="number"
                name="puntosDescontados"
                required
                min="0"
                max="20"
                className="input"
                value={formData.puntosDescontados}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">Monto ($) *</label>
              <input
                type="number"
                name="monto"
                required
                min="0"
                step="0.01"
                className="input"
                value={formData.monto}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">Conductor *</label>
              <select
                name="conductorId"
                required
                className="input"
                value={formData.conductorId}
                onChange={handleChange}
              >
                <option value="">Seleccione un conductor</option>
                {conductores.map(conductor => (
                  <option key={conductor.id} value={conductor.id}>
                    {conductor.nombre} {conductor.apellido} - DNI: {conductor.dni}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Vehículo</label>
              <select
                name="vehiculoId"
                className="input"
                value={formData.vehiculoId}
                onChange={handleChange}
              >
                <option value="">Sin vehículo asignado</option>
                {vehiculos.map(vehiculo => (
                  <option key={vehiculo.id} value={vehiculo.id}>
                    {vehiculo.patente} - {vehiculo.marca} {vehiculo.modelo}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="label">Ubicación</label>
              <input
                type="text"
                name="ubicacion"
                className="input"
                value={formData.ubicacion}
                onChange={handleChange}
                placeholder="Av. 9 de Julio y Corrientes"
              />
            </div>

            <div>
              <label className="label">Latitud</label>
              <input
                type="number"
                name="latitud"
                step="0.0001"
                className="input"
                value={formData.latitud || ''}
                onChange={handleChange}
                placeholder="-34.6037"
              />
            </div>

            <div>
              <label className="label">Longitud</label>
              <input
                type="number"
                name="longitud"
                step="0.0001"
                className="input"
                value={formData.longitud || ''}
                onChange={handleChange}
                placeholder="-58.3816"
              />
            </div>

            <div>
              <label className="label">Fecha Infracción *</label>
              <input
                type="date"
                name="fechaInfraccion"
                required
                className="input"
                value={formData.fechaInfraccion}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">Fecha Vencimiento Pago *</label>
              <input
                type="date"
                name="fechaVencimientoPago"
                required
                className="input"
                value={formData.fechaVencimientoPago}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">Estado *</label>
              <select
                name="estado"
                required
                className="input"
                value={formData.estado}
                onChange={handleChange}
              >
                <option value="PENDIENTE">Pendiente</option>
                <option value="PAGADA">Pagada</option>
                <option value="ANULADA">Anulada</option>
                <option value="VENCIDA">Vencida</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="label">Observaciones</label>
              <textarea
                name="observaciones"
                rows="3"
                className="input"
                value={formData.observaciones}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => navigate('/infracciones')}
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
