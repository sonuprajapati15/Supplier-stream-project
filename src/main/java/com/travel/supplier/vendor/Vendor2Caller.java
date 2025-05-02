package com.travel.supplier.vendor;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

public class Vendor2Caller implements VendorCaller {

    private final WebClient webClient;
    private final String endpoint;

    public Vendor2Caller(WebClient webClient, String endpoint) {
        this.webClient = webClient;
        this.endpoint = endpoint;
    }

    @Override
    public String getVendorName() {
        return "Vendor2";
    }

    @Override
    public String getLogo() {
        return "Vendor2";
    }

    @Override
    public Mono<JsonNode> fetchFlights(int page) {
        return webClient.get()
                .uri(endpoint + "?page=" + page)
                .retrieve()
                .bodyToMono(String.class)
                .map(response -> {
                    try {
                        return new ObjectMapper().readTree(response);
                    } catch (Exception e) {
                        throw new RuntimeException("Failed to parse JSON", e);
                    }
                });
    }
}

