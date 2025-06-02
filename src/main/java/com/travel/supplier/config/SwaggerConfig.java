package com.travel.supplier.config;

import io.swagger.v3.oas.models.info.Info;
import org.springdoc.core.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * SwaggerConfig
 *
 * @author sonu.prajapati@amaexgbt.com
 * @date 02/06/25
 */
@Configuration
public class SwaggerConfig {

    @Bean
    public GroupedOpenApi supplierApi() {
        return GroupedOpenApi.builder()
                .group("supplier")
                .pathsToMatch("/supplier/**")
                .build();
    }

    @Bean
    public io.swagger.v3.oas.models.OpenAPI customOpenAPI() {
        return new io.swagger.v3.oas.models.OpenAPI()
                .info(new Info()
                        .title("Supplier API")
                        .version("1.0")
                        .description("API documentation for Supplier Service"));
    }
}