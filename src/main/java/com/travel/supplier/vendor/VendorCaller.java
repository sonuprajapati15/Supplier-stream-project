package com.travel.supplier.vendor;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.travel.supplier.BookingBo;
import reactor.core.publisher.Mono;

public interface VendorCaller {
    String getVendorName();
    String getLogo();
    Mono<JsonNode> fetchFlights(int page);
    String fetchAllBookings(String userId);
    Mono<JsonNode> fetchSearchFlights(String from, String to, Integer page);
    Mono<JsonNode> streamAllCities(String keyword, String from);
    Mono<JsonNode> makeBooking(BookingBo booking);

    default String valueToJons(BookingBo booking) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.writeValueAsString(booking);
        } catch (Exception e) {
            throw new RuntimeException("Failed to convert BookingBo to JSON", e);
        }
    }
}

