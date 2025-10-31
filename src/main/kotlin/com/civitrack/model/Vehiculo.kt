package com.civitrack.model

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "vehiculos")
data class Vehiculo(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(nullable = false, unique = true)
    val patente: String,

    @Column(nullable = false)
    val marca: String,

    @Column(nullable = false)
    val modelo: String,

    @Column(nullable = false)
    val anio: Int,

    val color: String? = null,

    @Enumerated(EnumType.STRING)
    val tipo: TipoVehiculo = TipoVehiculo.AUTOMOVIL,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "conductor_id")
    val conductor: Conductor? = null,

    @OneToMany(mappedBy = "vehiculo", cascade = [CascadeType.ALL])
    val infracciones: List<Infraccion> = emptyList(),

    @Column(name = "fecha_creacion")
    val fechaCreacion: LocalDateTime = LocalDateTime.now(),

    @Column(name = "fecha_actualizacion")
    var fechaActualizacion: LocalDateTime = LocalDateTime.now()
)

enum class TipoVehiculo {
    AUTOMOVIL,
    MOTOCICLETA,
    CAMIONETA,
    CAMION,
    COLECTIVO,
    OTRO
}
