import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { infraccionesAPI } from '../../services/api'

export default function InfraccionesList() {
  const [infracciones, setInfracciones] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterEstado, setFilterEstado] = useState('TODOS')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadInfracciones()
  }, [])

  const loadInfracciones = async () => {
    try {
      const response = await infraccionesAPI.getAll()
      setInfracciones(response.data)
    } catch (error) {
      console.error('Error loading infracciones:', error)
      alert('Error al cargar infracciones')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Está seguro de eliminar esta infracción?')) return

    try {
      await infraccionesAPI.delete(id)
      setInfracciones(infracciones.filter(i => i.id !== id))
      alert('Infracción eliminada exitosamente')
    } catch (error) {
      console.error('Error deleting infraccion:', error)
      alert('Error al eliminar infracción')
    }
  }

  const filteredInfracciones = infracciones.filter(infraccion => {
    const matchesEstado = filterEstado === 'TODOS' || infraccion.estado === filterEstado
    const matchesSearch = 
      infraccion.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      infraccion.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (infraccion.conductor && 
        `${infraccion.conductor.nombre} ${infraccion.conductor.apellido}`.toLowerCase().includes(searchTerm.toLowerCase()))
    
    return matchesEstado && matchesSearch
  })

  const getEstadoBadgeColor = (estado) => {
    switch (estado) {
      case 'PENDIENTE':
        return 'bg-yellow-100 text-yellow-800'
      case 'PAGADA':
        return 'bg-green-100 text-green-800'
      case 'ANULADA':
        return 'bg-gray-100 text-gray-800'
      case 'VENCIDA':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-blue-100 text-blue-800'
    }
  }

  const getGravedadBadgeColor = (gravedad) => {
    switch (gravedad) {
      case 'LEVE':
        return 'bg-green-100 text-green-800'
      case 'GRAVE':
        return 'bg-orange-100 text-orange-800'
      case 'MUY_GRAVE':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return <div className="text-center py-8">Cargando...</div>
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-bold text-gray-900">Infracciones</h1>
          <p className="mt-2 text-sm text-gray-700">
            Listado de todas las infracciones registradas en el sistema
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            to="/infracciones/nueva"
            className="btn btn-primary"
          >
            Nueva Infracción
          </Link>
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Buscar por código, descripción o conductor..."
          className="input flex-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="input w-full sm:w-48"
          value={filterEstado}
          onChange={(e) => setFilterEstado(e.target.value)}
        >
          <option value="TODOS">Todos los estados</option>
          <option value="PENDIENTE">Pendiente</option>
          <option value="PAGADA">Pagada</option>
          <option value="ANULADA">Anulada</option>
          <option value="VENCIDA">Vencida</option>
        </select>
      </div>

      <div className="mt-8 card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Código
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Descripción
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Conductor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Vehículo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Gravedad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Monto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInfracciones.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                    No se encontraron infracciones
                  </td>
                </tr>
              ) : (
                filteredInfracciones.map((infraccion) => (
                  <tr key={infraccion.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {infraccion.codigo}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                      {infraccion.descripcion}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {infraccion.conductor ?
                        `${infraccion.conductor.nombre} ${infraccion.conductor.apellido}` :
                        '-'
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {infraccion.vehiculo?.patente || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getGravedadBadgeColor(infraccion.gravedad)}`}>
                        {infraccion.gravedad.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${infraccion.monto.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getEstadoBadgeColor(infraccion.estado)}`}>
                        {infraccion.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Link
                        to={`/infracciones/editar/${infraccion.id}`}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(infraccion.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
