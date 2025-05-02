package com.travel.supplier.vendor;

import com.fasterxml.jackson.databind.JsonNode;
import reactor.core.publisher.Mono;

public interface VendorCaller {
    String getVendorName();
    String getLogo();
    Mono<JsonNode> fetchFlights(int page);
}

