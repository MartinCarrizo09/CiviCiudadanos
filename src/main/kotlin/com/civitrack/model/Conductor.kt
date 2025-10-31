package com.civitrack.model

import jakarta.persistence.*
import java.time.LocalDate
import java.time.LocalDateTime

@Entity
@Table(name = "conductores")
data class Conductor(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(nullable = false, unique = true)
    val dni: String,

    @Column(nullable = false)
    val nombre: String,

    @Column(nullable = false)
    val apellido: String,

    @Column(nullable = false, unique = true)
    val email: String,

    val telefono: String? = null,

    val direccion: String? = null,

    @Column(name = "fecha_nacimiento")
    val fechaNacimiento: LocalDate,

    @Column(name = "numero_licencia", unique = true)
    val numeroLicencia: String? = null,

    @Column(name = "fecha_vencimiento_licencia")
    val fechaVencimientoLicencia: LocalDate? = null,

    @Column(name = "puntos_licencia")
    val puntosLicencia: Int = 20,

    @Column(name = "licencia_habilitada")
    val licenciaHabilitada: Boolean = true,

    @OneToMany(mappedBy = "conductor", cascade = [CascadeType.ALL])
    val infracciones: List<Infraccion> = emptyList(),

    @OneToMany(mappedBy = "conductor", cascade = [CascadeType.ALL])
    val vehiculos: List<Vehiculo> = emptyList(),

    @Column(name = "fecha_creacion")
    val fechaCreacion: LocalDateTime = LocalDateTime.now(),

    @Column(name = "fecha_actualizacion")
    var fechaActualizacion: LocalDateTime = LocalDateTime.now()
)
