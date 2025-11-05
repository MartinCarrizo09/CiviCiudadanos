import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { vehiculosAPI } from '../../services/api'

export default function VehiculosList() {
  const [vehiculos, setVehiculos] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadVehiculos()
  }, [])

  const loadVehiculos = async () => {
    try {
      const response = await vehiculosAPI.getAll()
      setVehiculos(response.data)
    } catch (error) {
      console.error('Error loading vehiculos:', error)
      alert('Error al cargar vehículos')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Está seguro de eliminar este vehículo?')) return

    try {
      await vehiculosAPI.delete(id)
      setVehiculos(vehiculos.filter(v => v.id !== id))
      alert('Vehículo eliminado exitosamente')
    } catch (error) {
      console.error('Error deleting vehiculo:', error)
      alert('Error al eliminar vehículo')
    }
  }

  const filteredVehiculos = vehiculos.filter(vehiculo =>
    vehiculo.patente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehiculo.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehiculo.modelo.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return <div className="text-center py-8">Cargando...</div>
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-bold text-gray-900">Vehículos</h1>
          <p className="mt-2 text-sm text-gray-700">
            Listado de todos los vehículos registrados en el sistema
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            to="/vehiculos/nuevo"
            className="btn btn-primary"
          >
            Nuevo Vehículo
          </Link>
        </div>
      </div>

      <div className="mt-6">
        <input
          type="text"
          placeholder="Buscar por patente, marca o modelo..."
          className="input max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mt-8 card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Patente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Marca
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Modelo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Año
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Color
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Conductor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVehiculos.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                    No se encontraron vehículos
                  </td>
                </tr>
              ) : (
                filteredVehiculos.map((vehiculo) => (
                  <tr key={vehiculo.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {vehiculo.patente}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {vehiculo.marca}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {vehiculo.modelo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {vehiculo.anio}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {vehiculo.color}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {vehiculo.tipo}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {vehiculo.conductor ? 
                        `${vehiculo.conductor.nombre} ${vehiculo.conductor.apellido}` :
                        '-'
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Link
                        to={`/vehiculos/editar/${vehiculo.id}`}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(vehiculo.id)}
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
