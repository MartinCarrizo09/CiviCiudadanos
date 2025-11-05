import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { conductoresAPI, vehiculosAPI, infraccionesAPI } from '../services/api'

export default function Dashboard() {
  const [stats, setStats] = useState({
    conductores: 0,
    vehiculos: 0,
    infracciones: 0,
    infraccionesPendientes: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const [conductoresRes, vehiculosRes, infraccionesRes] = await Promise.all([
        conductoresAPI.getAll(),
        vehiculosAPI.getAll(),
        infraccionesAPI.getAll()
      ])

      const infracciones = infraccionesRes.data
      const pendientes = infracciones.filter(i => i.estado === 'PENDIENTE').length

      setStats({
        conductores: conductoresRes.data.length,
        vehiculos: vehiculosRes.data.length,
        infracciones: infracciones.length,
        infraccionesPendientes: pendientes
      })
    } catch (error) {
      console.error('Error loading stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const StatCard = ({ title, value, icon, color, link }) => (
    <Link to={link} className="card hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center">
        <div className={`flex-shrink-0 p-3 rounded-full ${color}`}>
          <span className="text-3xl">{icon}</span>
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd className="text-3xl font-semibold text-gray-900">{value}</dd>
          </dl>
        </div>
      </div>
    </Link>
  )

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-500">Cargando...</div>
      </div>
    )
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Bienvenido al sistema de gestión de infracciones CiviTrack</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Conductores"
          value={stats.conductores}
          icon="👤"
          color="bg-blue-100"
          link="/conductores"
        />
        <StatCard
          title="Total Vehículos"
          value={stats.vehiculos}
          icon="🚗"
          color="bg-green-100"
          link="/vehiculos"
        />
        <StatCard
          title="Total Infracciones"
          value={stats.infracciones}
          icon="⚠️"
          color="bg-yellow-100"
          link="/infracciones"
        />
        <StatCard
          title="Infracciones Pendientes"
          value={stats.infraccionesPendientes}
          icon="⏰"
          color="bg-red-100"
          link="/infracciones"
        />
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Link
            to="/conductores/nuevo"
            className="card hover:shadow-lg transition-shadow duration-200 text-center"
          >
            <div className="text-4xl mb-2">➕</div>
            <h3 className="text-lg font-semibold">Nuevo Conductor</h3>
          </Link>
          <Link
            to="/vehiculos/nuevo"
            className="card hover:shadow-lg transition-shadow duration-200 text-center"
          >
            <div className="text-4xl mb-2">🚙</div>
            <h3 className="text-lg font-semibold">Nuevo Vehículo</h3>
          </Link>
          <Link
            to="/infracciones/nueva"
            className="card hover:shadow-lg transition-shadow duration-200 text-center"
          >
            <div className="text-4xl mb-2">📝</div>
            <h3 className="text-lg font-semibold">Nueva Infracción</h3>
          </Link>
        </div>
      </div>
    </div>
  )
}
