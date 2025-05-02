package com.travel.supplier.controller;

import com.travel.supplier.executor.StreamExecutor;
import com.travel.supplier.vendor.Vendor1Caller;
import com.travel.supplier.vendor.Vendor2Caller;
import com.travel.supplier.vendor.VendorCaller;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

import java.util.*;

@RestController
@CrossOrigin(origins = "*")
public class StreamController {

    private final StreamExecutor streamExecutor;

    public StreamController(WebClient.Builder webClientBuilder,
                            @Value("${external.api.endpoint.vendor1}") String vendor1Endpoint,
                            @Value("${external.api.endpoint.vendor2}") String vendor2Endpoint) {

        List<VendorCaller> callers = List.of(
                new Vendor1Caller(webClientBuilder.build(), vendor1Endpoint),
                new Vendor2Caller(webClientBuilder.build(), vendor2Endpoint)
        );

        this.streamExecutor = new StreamExecutor(callers);
    }

    @GetMapping(value = "/stream/flights", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> streamMergedFlights() {
        Flux<String> start = Flux.just("event:start\ndata:Flight stream started\n\n");
        Flux<String> stream = streamExecutor.streamFlights();
        Flux<String> end = Flux.just("event:completed\ndata:Flight stream completed\n\n");

        return Flux.concat(start, stream, end);
    }
}
