package com.civitrack.config

import io.swagger.v3.oas.models.OpenAPI
import io.swagger.v3.oas.models.info.Info
import io.swagger.v3.oas.models.info.Contact
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class OpenApiConfig {

    @Bean
    fun customOpenAPI(): OpenAPI {
        return OpenAPI()
            .info(
                Info()
                    .title("CiviTrack API")
                    .version("1.0.0")
                    .description("Sistema Integral de Control Vehicular - API REST")
                    .contact(
                        Contact()
                            .name("Martín Carrizo")
                            .email("contact@civitrack.com")
                    )
            )
    }
}
