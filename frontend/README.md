# CiviTrack Frontend

Frontend de la aplicación CiviTrack - Sistema de Gestión de Infracciones de Tránsito.

## 🚀 Tecnologías

- **React 18** - Framework UI
- **React Router 6** - Navegación
- **Axios** - Peticiones HTTP
- **Tailwind CSS** - Estilos
- **Vite** - Build tool

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build
```

## 🌐 Configuración

El frontend se conecta al backend en `http://localhost:8080/api`.

La aplicación correrá en `http://localhost:3000`.

## 📁 Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/        # Componentes reutilizables
│   │   └── Layout.jsx    # Layout principal con navegación
│   ├── pages/            # Páginas de la aplicación
│   │   ├── Dashboard.jsx
│   │   ├── conductores/
│   │   │   ├── ConductoresList.jsx
│   │   │   └── ConductorForm.jsx
│   │   ├── vehiculos/
│   │   │   ├── VehiculosList.jsx
│   │   │   └── VehiculoForm.jsx
│   │   └── infracciones/
│   │       ├── InfraccionesList.jsx
│   │       └── InfraccionForm.jsx
│   ├── services/         # Servicios API
│   │   └── api.js       # Configuración Axios
│   ├── App.jsx          # Componente principal
│   ├── main.jsx         # Entry point
│   └── index.css        # Estilos globales
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## ✨ Funcionalidades

### Dashboard
- Vista general con estadísticas
- Accesos rápidos a funciones principales

### Gestión de Conductores
- Listar todos los conductores
- Crear nuevo conductor
- Editar información del conductor
- Eliminar conductor
- Búsqueda por DNI, nombre o apellido
- Visualización de puntos de licencia con colores

### Gestión de Vehículos
- Listar todos los vehículos
- Crear nuevo vehículo
- Editar información del vehículo
- Eliminar vehículo
- Asignar conductor al vehículo
- Búsqueda por patente, marca o modelo

### Gestión de Infracciones
- Listar todas las infracciones
- Crear nueva infracción
- Editar infracción
- Eliminar infracción
- Filtrado por estado (Pendiente, Pagada, Anulada, Vencida)
- Búsqueda por código, descripción o conductor
- Visualización con badges de gravedad y estado

## 🎨 Componentes Principales

### Layout
Componente que envuelve toda la aplicación con:
- Navbar con navegación
- Logo y branding
- Enlaces activos resaltados

### API Service
Configuración centralizada de Axios con:
- Base URL configurada
- Métodos para Conductores API
- Métodos para Vehículos API
- Métodos para Infracciones API

## 🔧 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Preview del build
```

## 📝 Notas

- El backend debe estar corriendo en `http://localhost:8080`
- Los formularios incluyen validación básica
- Las tablas son responsive
- Los estilos usan Tailwind CSS con clases personalizadas
