package com.civitrack.controller

import com.civitrack.dto.ConductorDTO
import com.civitrack.dto.ErrorResponse
import com.civitrack.model.Conductor
import com.civitrack.service.ConductorService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/conductores")
@Tag(name = "Conductores", description = "Gestión de conductores")
class ConductorController(private val conductorService: ConductorService) {

    @GetMapping
    @Operation(summary = "Listar todos los conductores")
    fun listarConductores(): ResponseEntity<List<ConductorDTO>> {
        val conductores = conductorService.listarConductores()
        return ResponseEntity.ok(conductores.map { it.toDTO() })
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener conductor por ID")
    fun obtenerConductor(@PathVariable id: Long): ResponseEntity<ConductorDTO> {
        val conductor = conductorService.obtenerConductor(id)
        return ResponseEntity.ok(conductor.toDTO())
    }

    @GetMapping("/dni/{dni}")
    @Operation(summary = "Obtener conductor por DNI")
    fun obtenerConductorPorDni(@PathVariable dni: String): ResponseEntity<ConductorDTO> {
        val conductor = conductorService.obtenerConductorPorDni(dni)
        return ResponseEntity.ok(conductor.toDTO())
    }

    @PostMapping
    @Operation(summary = "Crear nuevo conductor")
    fun crearConductor(@RequestBody conductorDTO: ConductorDTO): ResponseEntity<ConductorDTO> {
        val conductor = conductorDTO.toEntity()
        val conductorCreado = conductorService.crearConductor(conductor)
        return ResponseEntity.status(HttpStatus.CREATED).body(conductorCreado.toDTO())
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar conductor")
    fun actualizarConductor(
        @PathVariable id: Long,
        @RequestBody conductorDTO: ConductorDTO
    ): ResponseEntity<ConductorDTO> {
        val conductor = conductorDTO.toEntity()
        val conductorActualizado = conductorService.actualizarConductor(id, conductor)
        return ResponseEntity.ok(conductorActualizado.toDTO())
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar conductor")
    fun eliminarConductor(@PathVariable id: Long): ResponseEntity<Void> {
        conductorService.eliminarConductor(id)
        return ResponseEntity.noContent().build()
    }

    @GetMapping("/{id}/licencia/habilitada")
    @Operation(summary = "Verificar si la licencia está habilitada")
    fun verificarLicenciaHabilitada(@PathVariable id: Long): ResponseEntity<Map<String, Boolean>> {
        val habilitada = conductorService.verificarLicenciaHabilitada(id)
        return ResponseEntity.ok(mapOf("habilitada" to habilitada))
    }

    @ExceptionHandler(NoSuchElementException::class)
    fun handleNotFound(ex: NoSuchElementException): ResponseEntity<ErrorResponse> {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(ErrorResponse(ex.message ?: "Recurso no encontrado"))
    }

    @ExceptionHandler(IllegalArgumentException::class)
    fun handleBadRequest(ex: IllegalArgumentException): ResponseEntity<ErrorResponse> {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body(ErrorResponse(ex.message ?: "Solicitud inválida"))
    }
}

private fun Conductor.toDTO() = ConductorDTO(
    id = id,
    dni = dni,
    nombre = nombre,
    apellido = apellido,
    email = email,
    telefono = telefono,
    direccion = direccion,
    fechaNacimiento = fechaNacimiento,
    numeroLicencia = numeroLicencia,
    fechaVencimientoLicencia = fechaVencimientoLicencia,
    puntosLicencia = puntosLicencia,
    licenciaHabilitada = licenciaHabilitada
)

private fun ConductorDTO.toEntity() = Conductor(
    id = id,
    dni = dni,
    nombre = nombre,
    apellido = apellido,
    email = email,
    telefono = telefono,
    direccion = direccion,
    fechaNacimiento = fechaNacimiento,
    numeroLicencia = numeroLicencia,
    fechaVencimientoLicencia = fechaVencimientoLicencia,
    puntosLicencia = puntosLicencia,
    licenciaHabilitada = licenciaHabilitada
)
