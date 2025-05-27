package com.travel.supplier.vendor;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

public class Vendor2Caller implements VendorCaller {

    private final WebClient webClient;
    private final String endpoint;
    private final String vendor2FlightSearchEndpoint;
    private final String vendor2CitySearchEndpoint;


    public Vendor2Caller(WebClient webClient, String endpoint, String vendor2FlightSearchEndpoint, String vendor2CitySearchEndpoint) {
        this.webClient = webClient;
        this.endpoint = endpoint;
        this.vendor2FlightSearchEndpoint = vendor2FlightSearchEndpoint;
        this.vendor2CitySearchEndpoint = vendor2CitySearchEndpoint;
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

    @Override
    public Mono<JsonNode> fetchAllBookings(String userId) {
        return null;
    }

    @Override
    public Mono<JsonNode> fetchSearchFlights(String from, String to, Integer page) {
        return webClient.get()
                .uri(vendor2FlightSearchEndpoint + "?from=" + from + "&to=" + to + "&page=" + page)
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

    @Override
    public Mono<JsonNode> streamAllCities(String keyword, String from) {
        return null;
    }
}

