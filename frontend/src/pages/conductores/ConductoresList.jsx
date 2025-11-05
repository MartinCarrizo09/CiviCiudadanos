import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { conductoresAPI } from '../../services/api'

export default function ConductoresList() {
  const [conductores, setConductores] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadConductores()
  }, [])

  const loadConductores = async () => {
    try {
      const response = await conductoresAPI.getAll()
      setConductores(response.data)
    } catch (error) {
      console.error('Error loading conductores:', error)
      alert('Error al cargar conductores')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Está seguro de eliminar este conductor?')) return

    try {
      await conductoresAPI.delete(id)
      setConductores(conductores.filter(c => c.id !== id))
      alert('Conductor eliminado exitosamente')
    } catch (error) {
      console.error('Error deleting conductor:', error)
      alert('Error al eliminar conductor')
    }
  }

  const filteredConductores = conductores.filter(conductor =>
    conductor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conductor.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conductor.dni.includes(searchTerm)
  )

  if (loading) {
    return <div className="text-center py-8">Cargando...</div>
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-bold text-gray-900">Conductores</h1>
          <p className="mt-2 text-sm text-gray-700">
            Listado de todos los conductores registrados en el sistema
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            to="/conductores/nuevo"
            className="btn btn-primary"
          >
            Nuevo Conductor
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mt-6">
        <input
          type="text"
          placeholder="Buscar por nombre, apellido o DNI..."
          className="input max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="mt-8 card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  DNI
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre Completo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teléfono
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Licencia
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Puntos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredConductores.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    No se encontraron conductores
                  </td>
                </tr>
              ) : (
                filteredConductores.map((conductor) => (
                  <tr key={conductor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {conductor.dni}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {conductor.nombre} {conductor.apellido}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {conductor.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {conductor.telefono}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {conductor.numeroLicencia}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        conductor.puntosLicencia >= 15
                          ? 'bg-green-100 text-green-800'
                          : conductor.puntosLicencia >= 10
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {conductor.puntosLicencia}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Link
                        to={`/conductores/editar/${conductor.id}`}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(conductor.id)}
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
