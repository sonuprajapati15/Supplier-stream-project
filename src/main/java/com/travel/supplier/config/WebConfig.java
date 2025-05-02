package com.travel.supplier.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Allow CORS requests from all origins (you can restrict this to specific domains if needed)
        // Allow CORS requests from all origins
        registry.addMapping("/**")  // Apply to all endpoints
                .allowedOrigins("*")  // Allow any origin
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Allowed HTTP methods
                .allowedHeaders("*");
    }
}
