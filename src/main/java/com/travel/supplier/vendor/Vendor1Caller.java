package com.travel.supplier.vendor;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.util.ObjectUtils;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

public class Vendor1Caller implements VendorCaller {

    private final WebClient webClient;
    private final String endpoint;
    private final String bookingEndpoint;
    private final String vendor1FlightSearchEndpoint;
    private final String vendor1CitySearchEndpoint;
    private final String saveBookingEndpoint;
    private final RestTemplate restTemplate ;



    public Vendor1Caller(WebClient webClient, String endpoint, String flightBookingEndpoint,
                         String vendor1FlightSearchEndpoint, String vendor1CitySearchEndpoint, String saveBookingEndpoint) {
        this.webClient = webClient;
        this.endpoint = endpoint;
        this.bookingEndpoint = flightBookingEndpoint;
        this.vendor1FlightSearchEndpoint = vendor1FlightSearchEndpoint;
        this.vendor1CitySearchEndpoint = vendor1CitySearchEndpoint;
        this.saveBookingEndpoint = saveBookingEndpoint;
        this.restTemplate = new RestTemplate();
    }

    @Override
    public String getVendorName() {
        return "Vendor1";
    }

    @Override
    public String getLogo() {
        return "Vendor1";
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
    public String fetchAllBookings(String userId) {
        return restTemplate.getForObject(bookingEndpoint + "?userId=" + userId, String.class);
    }

    @Override
    public Mono<JsonNode> fetchSearchFlights(String from, String to, Integer page) {
        return webClient.get()
                .uri(vendor1FlightSearchEndpoint + "?from=" + from + "&to=" + to + "&page=" + page)
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
        String url = null;
        if (!ObjectUtils.isEmpty(from)) {
            url = vendor1CitySearchEndpoint + "?keyword=" + keyword + "&from=" + from;
        } else {
            url = vendor1CitySearchEndpoint + "?keyword=" + keyword;
        }
        return webClient.get()
                .uri(url)
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

    public Mono<JsonNode> saveBooking(String booking) {
        return webClient.post()
                .uri(saveBookingEndpoint + "?userId=1234")
                .bodyValue(booking)
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

