package com.civitrack.controller

import com.civitrack.dto.VehiculoDTO
import com.civitrack.dto.ErrorResponse
import com.civitrack.model.Vehiculo
import com.civitrack.model.TipoVehiculo
import com.civitrack.service.VehiculoService
import com.civitrack.service.ConductorService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/vehiculos")
@Tag(name = "Vehículos", description = "Gestión de vehículos")
class VehiculoController(
    private val vehiculoService: VehiculoService,
    private val conductorService: ConductorService
) {

    @GetMapping
    @Operation(summary = "Listar todos los vehículos")
    fun listarVehiculos(): ResponseEntity<List<VehiculoDTO>> {
        val vehiculos = vehiculoService.listarVehiculos()
        return ResponseEntity.ok(vehiculos.map { it.toDTO() })
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener vehículo por ID")
    fun obtenerVehiculo(@PathVariable id: Long): ResponseEntity<VehiculoDTO> {
        val vehiculo = vehiculoService.obtenerVehiculo(id)
        return ResponseEntity.ok(vehiculo.toDTO())
    }

    @GetMapping("/patente/{patente}")
    @Operation(summary = "Obtener vehículo por patente")
    fun obtenerVehiculoPorPatente(@PathVariable patente: String): ResponseEntity<VehiculoDTO> {
        val vehiculo = vehiculoService.obtenerVehiculoPorPatente(patente)
        return ResponseEntity.ok(vehiculo.toDTO())
    }

    @GetMapping("/conductor/{conductorId}")
    @Operation(summary = "Listar vehículos de un conductor")
    fun listarVehiculosPorConductor(@PathVariable conductorId: Long): ResponseEntity<List<VehiculoDTO>> {
        val vehiculos = vehiculoService.listarVehiculosPorConductor(conductorId)
        return ResponseEntity.ok(vehiculos.map { it.toDTO() })
    }

    @PostMapping
    @Operation(summary = "Crear nuevo vehículo")
    fun crearVehiculo(@RequestBody vehiculoDTO: VehiculoDTO): ResponseEntity<VehiculoDTO> {
        val vehiculo = vehiculoDTO.toEntity(conductorService)
        val vehiculoCreado = vehiculoService.crearVehiculo(vehiculo)
        return ResponseEntity.status(HttpStatus.CREATED).body(vehiculoCreado.toDTO())
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar vehículo")
    fun actualizarVehiculo(
        @PathVariable id: Long,
        @RequestBody vehiculoDTO: VehiculoDTO
    ): ResponseEntity<VehiculoDTO> {
        val vehiculo = vehiculoDTO.toEntity(conductorService)
        val vehiculoActualizado = vehiculoService.actualizarVehiculo(id, vehiculo)
        return ResponseEntity.ok(vehiculoActualizado.toDTO())
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar vehículo")
    fun eliminarVehiculo(@PathVariable id: Long): ResponseEntity<Void> {
        vehiculoService.eliminarVehiculo(id)
        return ResponseEntity.noContent().build()
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

private fun Vehiculo.toDTO() = VehiculoDTO(
    id = id,
    patente = patente,
    marca = marca,
    modelo = modelo,
    anio = anio,
    color = color,
    tipo = tipo.name,
    conductorId = conductor?.id
)

private fun VehiculoDTO.toEntity(conductorService: ConductorService) = Vehiculo(
    id = id,
    patente = patente,
    marca = marca,
    modelo = modelo,
    anio = anio,
    color = color,
    tipo = TipoVehiculo.valueOf(tipo),
    conductor = conductorId?.let { conductorService.obtenerConductor(it) }
)
