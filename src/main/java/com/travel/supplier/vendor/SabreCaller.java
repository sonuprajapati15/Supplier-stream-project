package com.travel.supplier.vendor;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.travel.supplier.BookingBo;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

public class SabreCaller implements VendorCaller {

    private final WebClient webClient;
    private final String endpoint;
    private final String vendor2FlightSearchEndpoint;
    private final String saveBookingEndpoint;


    public SabreCaller(WebClient webClient, String endpoint, String vendor2FlightSearchEndpoint, String saveBookingEndpoint2) {
        this.webClient = webClient;
        this.endpoint = endpoint;
        this.vendor2FlightSearchEndpoint = vendor2FlightSearchEndpoint;
        this.saveBookingEndpoint = saveBookingEndpoint2;
    }


    @Override
    public String getVendorName() {
        return "Sabre";
    }

    @Override
    public String getLogo() {
        return "Sabre";
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
    public Mono<JsonNode> makeBooking(BookingBo booking) {
        return webClient.post()
                .uri(saveBookingEndpoint)
                .contentType(org.springframework.http.MediaType.APPLICATION_JSON)
                .bodyValue(valueToJons(booking))
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

    public Mono<JsonNode> searchFlightById(String flightId, Integer fareId, String fareType) {
        return webClient.get()
                .uri(vendor2FlightSearchEndpoint + "/byId?flightId=" + flightId + "&fareType=" + fareType + "&fareId=" + fareId)
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

