package com.civitrack.dto

import java.time.LocalDate

data class ConductorDTO(
    val id: Long? = null,
    val dni: String,
    val nombre: String,
    val apellido: String,
    val email: String,
    val telefono: String? = null,
    val direccion: String? = null,
    val fechaNacimiento: LocalDate,
    val numeroLicencia: String? = null,
    val fechaVencimientoLicencia: LocalDate? = null,
    val puntosLicencia: Int = 20,
    val licenciaHabilitada: Boolean = true
)

data class VehiculoDTO(
    val id: Long? = null,
    val patente: String,
    val marca: String,
    val modelo: String,
    val anio: Int,
    val color: String? = null,
    val tipo: String = "AUTOMOVIL",
    val conductorId: Long? = null
)

data class InfraccionDTO(
    val id: Long? = null,
    val codigo: String,
    val descripcion: String,
    val gravedad: String = "LEVE",
    val puntosDescontados: Int,
    val monto: Double,
    val ubicacion: String? = null,
    val latitud: Double? = null,
    val longitud: Double? = null,
    val conductorId: Long,
    val vehiculoId: Long,
    val estado: String = "PENDIENTE",
    val observaciones: String? = null
)

data class ErrorResponse(
    val mensaje: String,
    val timestamp: String = java.time.LocalDateTime.now().toString()
)
