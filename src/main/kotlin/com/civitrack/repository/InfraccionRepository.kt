package com.civitrack.repository

import com.civitrack.model.Infraccion
import com.civitrack.model.EstadoInfraccion
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface InfraccionRepository : JpaRepository<Infraccion, Long> {
    fun findByConductorId(conductorId: Long): List<Infraccion>
    fun findByVehiculoId(vehiculoId: Long): List<Infraccion>
    fun findByEstado(estado: EstadoInfraccion): List<Infraccion>
    fun findByConductorIdAndEstado(conductorId: Long, estado: EstadoInfraccion): List<Infraccion>
}
