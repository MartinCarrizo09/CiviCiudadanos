import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import ConductoresList from './pages/conductores/ConductoresList'
import ConductorForm from './pages/conductores/ConductorForm'
import VehiculosList from './pages/vehiculos/VehiculosList'
import VehiculoForm from './pages/vehiculos/VehiculoForm'
import InfraccionesList from './pages/infracciones/InfraccionesList'
import InfraccionForm from './pages/infracciones/InfraccionForm'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          
          {/* Conductores */}
          <Route path="/conductores" element={<ConductoresList />} />
          <Route path="/conductores/nuevo" element={<ConductorForm />} />
          <Route path="/conductores/editar/:id" element={<ConductorForm />} />
          
          {/* Vehículos */}
          <Route path="/vehiculos" element={<VehiculosList />} />
          <Route path="/vehiculos/nuevo" element={<VehiculoForm />} />
          <Route path="/vehiculos/editar/:id" element={<VehiculoForm />} />
          
          {/* Infracciones */}
          <Route path="/infracciones" element={<InfraccionesList />} />
          <Route path="/infracciones/nueva" element={<InfraccionForm />} />
          <Route path="/infracciones/editar/:id" element={<InfraccionForm />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
