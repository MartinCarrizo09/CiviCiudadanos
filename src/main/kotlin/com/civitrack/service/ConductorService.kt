package com.civitrack.service

import com.civitrack.model.Conductor
import com.civitrack.repository.ConductorRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime

@Service
@Transactional
class ConductorService(private val conductorRepository: ConductorRepository) {

    fun crearConductor(conductor: Conductor): Conductor {
        if (conductorRepository.existsByDni(conductor.dni)) {
            throw IllegalArgumentException("Ya existe un conductor con DNI: ${conductor.dni}")
        }
        if (conductorRepository.existsByEmail(conductor.email)) {
            throw IllegalArgumentException("Ya existe un conductor con email: ${conductor.email}")
        }
        return conductorRepository.save(conductor)
    }

    fun obtenerConductor(id: Long): Conductor {
        return conductorRepository.findById(id)
            .orElseThrow { NoSuchElementException("Conductor no encontrado con ID: $id") }
    }

    fun obtenerConductorPorDni(dni: String): Conductor {
        return conductorRepository.findByDni(dni)
            .orElseThrow { NoSuchElementException("Conductor no encontrado con DNI: $dni") }
    }

    fun listarConductores(): List<Conductor> {
        return conductorRepository.findAll()
    }

    fun actualizarConductor(id: Long, conductorActualizado: Conductor): Conductor {
        val conductorExistente = obtenerConductor(id)
        val conductor = conductorExistente.copy(
            nombre = conductorActualizado.nombre,
            apellido = conductorActualizado.apellido,
            email = conductorActualizado.email,
            telefono = conductorActualizado.telefono,
            direccion = conductorActualizado.direccion,
            fechaActualizacion = LocalDateTime.now()
        )
        return conductorRepository.save(conductor)
    }

    fun eliminarConductor(id: Long) {
        if (!conductorRepository.existsById(id)) {
            throw NoSuchElementException("Conductor no encontrado con ID: $id")
        }
        conductorRepository.deleteById(id)
    }

    fun descontarPuntos(id: Long, puntos: Int): Conductor {
        val conductor = obtenerConductor(id)
        val nuevosPuntos = (conductor.puntosLicencia - puntos).coerceAtLeast(0)
        val licenciaHabilitada = nuevosPuntos > 0
        
        val conductorActualizado = conductor.copy(
            puntosLicencia = nuevosPuntos,
            licenciaHabilitada = licenciaHabilitada,
            fechaActualizacion = LocalDateTime.now()
        )
        return conductorRepository.save(conductorActualizado)
    }

    fun verificarLicenciaHabilitada(id: Long): Boolean {
        val conductor = obtenerConductor(id)
        return conductor.licenciaHabilitada && conductor.puntosLicencia > 0
    }
}
