package com.civitrack.repository

import com.civitrack.model.Vehiculo
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface VehiculoRepository : JpaRepository<Vehiculo, Long> {
    fun findByPatente(patente: String): Optional<Vehiculo>
    fun findByConductorId(conductorId: Long): List<Vehiculo>
    fun existsByPatente(patente: String): Boolean
}
