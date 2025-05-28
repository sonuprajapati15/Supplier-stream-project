package com.travel.supplier.vendor;

import com.fasterxml.jackson.databind.JsonNode;
import reactor.core.publisher.Mono;

public interface VendorCaller {
    String getVendorName();
    String getLogo();
    Mono<JsonNode> fetchFlights(int page);
    String fetchAllBookings(String userId);
    Mono<JsonNode> fetchSearchFlights(String from, String to, Integer page);
    Mono<JsonNode> streamAllCities(String keyword, String from);
}

