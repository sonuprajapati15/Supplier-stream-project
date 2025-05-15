package com.travel.supplier.executor;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.travel.supplier.encode.Encryptor;
import com.travel.supplier.vendor.VendorCaller;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;

public class StreamExecutor {

    private final List<VendorCaller> vendorCallers;
    private final ObjectMapper mapper = new ObjectMapper();
    private final Base64.Encoder encoder = Base64.getEncoder();

    public StreamExecutor(List<VendorCaller> vendorCallers) {
        this.vendorCallers = vendorCallers;
    }

    public Flux<String> streamFlights() {
        return Flux.range(1, 200)
                .concatMap(page ->
                        Flux.fromIterable(vendorCallers)
                                .concatMap(vendor -> vendor.fetchFlights(page)
                                        .map(json -> encodeFlightJson(json, vendor.getVendorName(), vendor.getLogo(), page))
                                        .onErrorResume(e -> Mono.just("event:error\ndata:" + e.getMessage() + "\n\n"))
                                )
                )
                .takeUntil(data -> data.startsWith("event:completed") || data.startsWith("event:error"));
    }

    private String encodeFlightJson(JsonNode root, String vendorName, String logo, int page) {
        JsonNode flights = root.path("flights");
        if (!flights.isArray() || flights.size() == 0) {
            return "event:completed\ndata:" + vendorName + " completed\n\n";
        }

        ObjectNode wrapper = mapper.createObjectNode();
        wrapper.put("vendor", vendorName);
        wrapper.put("logoUrl", logo);
        wrapper.put("page", root.path("page").asInt(page));
        wrapper.put("perPage", root.path("perPage").asInt(30));
        wrapper.put("totalFlights", root.path("totalFlights").asInt(0));
        wrapper.set("flights", flights);

        return Encryptor.encryptAndCompress(wrapper.toString());
    }
}

