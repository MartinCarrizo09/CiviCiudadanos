package com.civitrack.model

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "infracciones")
data class Infraccion(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(nullable = false)
    val codigo: String,

    @Column(nullable = false)
    val descripcion: String,

    @Enumerated(EnumType.STRING)
    val gravedad: Gravedad = Gravedad.LEVE,

    @Column(name = "puntos_descontados")
    val puntosDescontados: Int,

    @Column(nullable = false)
    val monto: Double,

    val ubicacion: String? = null,

    val latitud: Double? = null,

    val longitud: Double? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "conductor_id")
    val conductor: Conductor,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vehiculo_id")
    val vehiculo: Vehiculo,

    @Enumerated(EnumType.STRING)
    val estado: EstadoInfraccion = EstadoInfraccion.PENDIENTE,

    @Column(name = "fecha_infraccion")
    val fechaInfraccion: LocalDateTime = LocalDateTime.now(),

    @Column(name = "fecha_vencimiento_pago")
    val fechaVencimientoPago: LocalDateTime? = null,

    val observaciones: String? = null,

    @Column(name = "fecha_creacion")
    val fechaCreacion: LocalDateTime = LocalDateTime.now(),

    @Column(name = "fecha_actualizacion")
    var fechaActualizacion: LocalDateTime = LocalDateTime.now()
)

enum class Gravedad {
    LEVE,
    GRAVE,
    MUY_GRAVE
}

enum class EstadoInfraccion {
    PENDIENTE,
    PAGADA,
    ANULADA,
    EN_JUICIO
}
