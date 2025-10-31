package com.civitrack.service

import com.civitrack.model.Vehiculo
import com.civitrack.repository.VehiculoRepository
import com.civitrack.repository.ConductorRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime

@Service
@Transactional
class VehiculoService(
    private val vehiculoRepository: VehiculoRepository,
    private val conductorRepository: ConductorRepository
) {

    fun crearVehiculo(vehiculo: Vehiculo): Vehiculo {
        if (vehiculoRepository.existsByPatente(vehiculo.patente)) {
            throw IllegalArgumentException("Ya existe un vehículo con patente: ${vehiculo.patente}")
        }
        return vehiculoRepository.save(vehiculo)
    }

    fun obtenerVehiculo(id: Long): Vehiculo {
        return vehiculoRepository.findById(id)
            .orElseThrow { NoSuchElementException("Vehículo no encontrado con ID: $id") }
    }

    fun obtenerVehiculoPorPatente(patente: String): Vehiculo {
        return vehiculoRepository.findByPatente(patente)
            .orElseThrow { NoSuchElementException("Vehículo no encontrado con patente: $patente") }
    }

    fun listarVehiculos(): List<Vehiculo> {
        return vehiculoRepository.findAll()
    }

    fun listarVehiculosPorConductor(conductorId: Long): List<Vehiculo> {
        return vehiculoRepository.findByConductorId(conductorId)
    }

    fun actualizarVehiculo(id: Long, vehiculoActualizado: Vehiculo): Vehiculo {
        val vehiculoExistente = obtenerVehiculo(id)
        val vehiculo = vehiculoExistente.copy(
            marca = vehiculoActualizado.marca,
            modelo = vehiculoActualizado.modelo,
            anio = vehiculoActualizado.anio,
            color = vehiculoActualizado.color,
            tipo = vehiculoActualizado.tipo,
            conductor = vehiculoActualizado.conductor,
            fechaActualizacion = LocalDateTime.now()
        )
        return vehiculoRepository.save(vehiculo)
    }

    fun eliminarVehiculo(id: Long) {
        if (!vehiculoRepository.existsById(id)) {
            throw NoSuchElementException("Vehículo no encontrado con ID: $id")
        }
        vehiculoRepository.deleteById(id)
    }
}
