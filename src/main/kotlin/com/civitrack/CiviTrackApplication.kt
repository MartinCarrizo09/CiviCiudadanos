package com.civitrack

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class CiviTrackApplication

fun main(args: Array<String>) {
    runApplication<CiviTrackApplication>(*args)
}
