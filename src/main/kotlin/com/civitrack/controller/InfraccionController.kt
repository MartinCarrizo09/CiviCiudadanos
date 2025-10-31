package com.civitrack.controller

import com.civitrack.dto.InfraccionDTO
import com.civitrack.dto.ErrorResponse
import com.civitrack.model.Infraccion
import com.civitrack.model.Gravedad
import com.civitrack.model.EstadoInfraccion
import com.civitrack.service.InfraccionService
import com.civitrack.service.ConductorService
import com.civitrack.service.VehiculoService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/infracciones")
@Tag(name = "Infracciones", description = "Gestión de infracciones")
class InfraccionController(
    private val infraccionService: InfraccionService,
    private val conductorService: ConductorService,
    private val vehiculoService: VehiculoService
) {

    @GetMapping
    @Operation(summary = "Listar todas las infracciones")
    fun listarInfracciones(): ResponseEntity<List<InfraccionDTO>> {
        val infracciones = infraccionService.listarInfracciones()
        return ResponseEntity.ok(infracciones.map { it.toDTO() })
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener infracción por ID")
    fun obtenerInfraccion(@PathVariable id: Long): ResponseEntity<InfraccionDTO> {
        val infraccion = infraccionService.obtenerInfraccion(id)
        return ResponseEntity.ok(infraccion.toDTO())
    }

    @GetMapping("/conductor/{conductorId}")
    @Operation(summary = "Listar infracciones de un conductor")
    fun listarInfraccionesPorConductor(@PathVariable conductorId: Long): ResponseEntity<List<InfraccionDTO>> {
        val infracciones = infraccionService.listarInfraccionesPorConductor(conductorId)
        return ResponseEntity.ok(infracciones.map { it.toDTO() })
    }

    @GetMapping("/vehiculo/{vehiculoId}")
    @Operation(summary = "Listar infracciones de un vehículo")
    fun listarInfraccionesPorVehiculo(@PathVariable vehiculoId: Long): ResponseEntity<List<InfraccionDTO>> {
        val infracciones = infraccionService.listarInfraccionesPorVehiculo(vehiculoId)
        return ResponseEntity.ok(infracciones.map { it.toDTO() })
    }

    @GetMapping("/estado/{estado}")
    @Operation(summary = "Listar infracciones por estado")
    fun listarInfraccionesPorEstado(@PathVariable estado: String): ResponseEntity<List<InfraccionDTO>> {
        val estadoInfraccion = EstadoInfraccion.valueOf(estado.uppercase())
        val infracciones = infraccionService.listarInfraccionesPorEstado(estadoInfraccion)
        return ResponseEntity.ok(infracciones.map { it.toDTO() })
    }

    @PostMapping
    @Operation(summary = "Registrar nueva infracción")
    fun registrarInfraccion(@RequestBody infraccionDTO: InfraccionDTO): ResponseEntity<InfraccionDTO> {
        val infraccion = infraccionDTO.toEntity(conductorService, vehiculoService)
        val infraccionCreada = infraccionService.registrarInfraccion(infraccion)
        return ResponseEntity.status(HttpStatus.CREATED).body(infraccionCreada.toDTO())
    }

    @PutMapping("/{id}/pagar")
    @Operation(summary = "Pagar infracción")
    fun pagarInfraccion(@PathVariable id: Long): ResponseEntity<InfraccionDTO> {
        val infraccion = infraccionService.pagarInfraccion(id)
        return ResponseEntity.ok(infraccion.toDTO())
    }

    @PutMapping("/{id}/anular")
    @Operation(summary = "Anular infracción")
    fun anularInfraccion(@PathVariable id: Long): ResponseEntity<InfraccionDTO> {
        val infraccion = infraccionService.anularInfraccion(id)
        return ResponseEntity.ok(infraccion.toDTO())
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

private fun Infraccion.toDTO() = InfraccionDTO(
    id = id,
    codigo = codigo,
    descripcion = descripcion,
    gravedad = gravedad.name,
    puntosDescontados = puntosDescontados,
    monto = monto,
    ubicacion = ubicacion,
    latitud = latitud,
    longitud = longitud,
    conductorId = conductor.id!!,
    vehiculoId = vehiculo.id!!,
    estado = estado.name,
    observaciones = observaciones
)

private fun InfraccionDTO.toEntity(
    conductorService: ConductorService,
    vehiculoService: VehiculoService
) = Infraccion(
    id = id,
    codigo = codigo,
    descripcion = descripcion,
    gravedad = Gravedad.valueOf(gravedad.uppercase()),
    puntosDescontados = puntosDescontados,
    monto = monto,
    ubicacion = ubicacion,
    latitud = latitud,
    longitud = longitud,
    conductor = conductorService.obtenerConductor(conductorId),
    vehiculo = vehiculoService.obtenerVehiculo(vehiculoId),
    estado = EstadoInfraccion.valueOf(estado.uppercase()),
    observaciones = observaciones
)
