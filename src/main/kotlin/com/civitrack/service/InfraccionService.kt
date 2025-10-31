package com.civitrack.service

import com.civitrack.model.Infraccion
import com.civitrack.model.EstadoInfraccion
import com.civitrack.repository.InfraccionRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime

@Service
@Transactional
class InfraccionService(
    private val infraccionRepository: InfraccionRepository,
    private val conductorService: ConductorService
) {

    fun registrarInfraccion(infraccion: Infraccion): Infraccion {
        // Descontar puntos al conductor
        conductorService.descontarPuntos(infraccion.conductor.id!!, infraccion.puntosDescontados)
        
        return infraccionRepository.save(infraccion)
    }

    fun obtenerInfraccion(id: Long): Infraccion {
        return infraccionRepository.findById(id)
            .orElseThrow { NoSuchElementException("Infracción no encontrada con ID: $id") }
    }

    fun listarInfracciones(): List<Infraccion> {
        return infraccionRepository.findAll()
    }

    fun listarInfraccionesPorConductor(conductorId: Long): List<Infraccion> {
        return infraccionRepository.findByConductorId(conductorId)
    }

    fun listarInfraccionesPorVehiculo(vehiculoId: Long): List<Infraccion> {
        return infraccionRepository.findByVehiculoId(vehiculoId)
    }

    fun listarInfraccionesPorEstado(estado: EstadoInfraccion): List<Infraccion> {
        return infraccionRepository.findByEstado(estado)
    }

    fun actualizarEstadoInfraccion(id: Long, nuevoEstado: EstadoInfraccion): Infraccion {
        val infraccion = obtenerInfraccion(id)
        val infraccionActualizada = infraccion.copy(
            estado = nuevoEstado,
            fechaActualizacion = LocalDateTime.now()
        )
        return infraccionRepository.save(infraccionActualizada)
    }

    fun pagarInfraccion(id: Long): Infraccion {
        return actualizarEstadoInfraccion(id, EstadoInfraccion.PAGADA)
    }

    fun anularInfraccion(id: Long): Infraccion {
        val infraccion = obtenerInfraccion(id)
        
        // Devolver puntos al conductor si se anula
        val puntosActuales = infraccion.conductor.puntosLicencia
        val nuevosPuntos = (puntosActuales + infraccion.puntosDescontados).coerceAtMost(20)
        
        conductorService.descontarPuntos(infraccion.conductor.id!!, -infraccion.puntosDescontados)
        
        return actualizarEstadoInfraccion(id, EstadoInfraccion.ANULADA)
    }
}
