package com.civitrack.repository

import com.civitrack.model.Conductor
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface ConductorRepository : JpaRepository<Conductor, Long> {
    fun findByDni(dni: String): Optional<Conductor>
    fun findByEmail(email: String): Optional<Conductor>
    fun findByNumeroLicencia(numeroLicencia: String): Optional<Conductor>
    fun existsByDni(dni: String): Boolean
    fun existsByEmail(email: String): Boolean
}
