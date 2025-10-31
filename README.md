# 🚦 CiviCiudadanos — Sistema Integral de Control Vehicular (Kotlin + Spring Boot)

## 📘 Descripción general  
**CiviCiudadanos** es una aplicación backend desarrollada en **Kotlin con Spring Boot**, orientada al registro y seguimiento de infracciones, licencias y movimientos vehiculares.  
Permite gestionar conductores, calcular puntos por infracción, consultar historial de sanciones y validar habilitaciones en tiempo real mediante una API REST moderna.

Está diseñado para integrarse con sistemas externos (como apps móviles o portales de gestión ciudadana) y puede conectarse a servicios de mapas para calcular ubicaciones de control o puntos de detección.

---

## ⚙️ Características principales  
- 🚗 Registro y gestión de conductores y vehículos  
- ⚖️ Control de infracciones con sistema de puntos  
- 📍 Consultas de ubicación y eventos con APIs de mapas  
- 🧾 Generación de reportes y notificaciones automáticas  
- 🔒 Autenticación JWT y control de roles administrativos  
- ☁️ API REST documentada con OpenAPI/Swagger  

---

## 🧰 Tecnologías utilizadas  
- Kotlin 2.x  
- Spring Boot 3.x  
- Spring Data JPA / Hibernate  
- PostgreSQL / H2 (modo desarrollo)  
- Swagger UI / OpenAPI  
- Google Maps Distance Matrix API (integración opcional)  

---

## 🧩 Arquitectura del proyecto  

```
civiCiudadanos/
├── src/main/kotlin/com/civiCiudadanos/
│   ├── controller/
│   ├── service/
│   ├── repository/
│   └── model/
└── resources/
    ├── application.yml
    └── data.sql
```

---

## 🚀 Instalación y configuración

### Requisitos previos
- JDK 17 o superior
- Maven 3.8+
- PostgreSQL (opcional, usa H2 en desarrollo)

### Pasos de instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/MartinCarrizo09/CiviCiudadanos.git
cd CiviCiudadanos
```

2. Configurar la base de datos en `application.yml`

3. Compilar y ejecutar:
```bash
mvn clean install
mvn spring-boot:run
```

4. Acceder a Swagger UI:
```
http://localhost:8080/swagger-ui.html
```

---

## 📖 Documentación de la API

La documentación completa de la API está disponible mediante Swagger UI una vez que la aplicación esté ejecutándose.

Endpoints principales:
- `/api/conductores` - Gestión de conductores
- `/api/vehiculos` - Gestión de vehículos
- `/api/infracciones` - Registro de infracciones
- `/api/licencias` - Validación de licencias

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría realizar.

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

## 👨‍💻 Autor

Desarrollado por Martín Carrizo
