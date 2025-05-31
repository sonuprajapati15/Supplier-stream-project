package com.travel.supplier.config;

import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

/**
 * WebClientConfig
 *
 * @author sonu.prajapati@amaexgbt.com
 * @date 31/05/25
 */
@Component
public class WebClientConfig {

    /**
     * Creates a WebClient with a custom buffer limit.
     * The buffer limit is set to 512 KB to handle larger responses.
     *
     * @return a configured WebClient instance
     */
    public WebClient createWebClient() {
        ExchangeStrategies strategies = ExchangeStrategies.builder()
                .codecs(configurer -> configurer.defaultCodecs()
                        .maxInMemorySize(2 * 1024 * 1024)) // Set buffer limit to 2 MB
                .build();

        return WebClient.builder().exchangeStrategies(strategies).build();
    }

}