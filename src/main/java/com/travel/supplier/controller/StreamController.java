package com.travel.supplier.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.travel.supplier.config.WebClientConfig;
import com.travel.supplier.executor.StreamExecutor;
import com.travel.supplier.vendor.AmadeusCaller;
import com.travel.supplier.vendor.SabreCaller;
import com.travel.supplier.vendor.VendorCaller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.*;

@RestController
@CrossOrigin(origins = "*")
public class StreamController {

    private final StreamExecutor streamExecutor;
    private final AmadeusCaller amadeusCaller;

    public StreamController(@Autowired WebClientConfig webClientConfig,
                            @Value("${external.api.endpoint.vendor1}") String vendor1Endpoint,
                            @Value("${external.api.endpoint.vendor2}") String vendor2Endpoint,
                            @Value("${external.api.booking.endpoint.vendor1}") String flightBookingEndpoint,
                            @Value("${external.api.booking.save.endpoint.vendor1}") String saveBookingEndpoint,
                            @Value("${external.api.flight.search.endpoint.vendor1}") String vendor1FlightSearchEndpoint,
                            @Value("${external.api.flight.search.endpoint.vendor2}") String vendor2FlightSearchEndpoint,
                            @Value("${external.api.city.search.endpoint.vendor1}") String vendor1CitySearchEndpoint) {

        amadeusCaller = new AmadeusCaller(webClientConfig.createWebClient(), vendor1Endpoint,
                flightBookingEndpoint, vendor1FlightSearchEndpoint, vendor1CitySearchEndpoint, saveBookingEndpoint);
        List<VendorCaller> callers = List.of(amadeusCaller,
                new SabreCaller(webClientConfig.createWebClient(), vendor2Endpoint, vendor2FlightSearchEndpoint)
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

    @GetMapping(value = "/stream/flights/search", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> streamSearchFlights(@RequestParam("from") String from,
                                            @RequestParam("to") String to) {
        Flux<String> start = Flux.just("event:start\ndata:Flight stream started\n\n");
        Flux<String> stream = streamExecutor.streamSearchFlights(from, to);
        Flux<String> end = Flux.just("event:completed\ndata:Flight stream completed\n\n");

        return Flux.concat(start, stream, end);
    }

   @GetMapping(value = "/stream/all/booking", produces = MediaType.APPLICATION_JSON_VALUE)
   public ResponseEntity<String> streamAllBookings(@RequestParam(required = false, defaultValue = "1234") String userId) {
       return new ResponseEntity<>(amadeusCaller.fetchAllBookings(userId), HttpStatus.OK);
   }

   @GetMapping(value = "/stream/all/cities", produces = MediaType.APPLICATION_JSON_VALUE)
   public Mono<JsonNode> streamAllCities(@RequestParam(value = "from", required = false) String from,
                                       @RequestParam(value = "keyword", required = true) String keyword) {
       return amadeusCaller.streamAllCities(keyword, from);
   }

   @GetMapping(value = "makeBooking", produces = MediaType.APPLICATION_JSON_VALUE)
   public Mono<JsonNode> streamAllCities(@RequestBody String booking) {
       return amadeusCaller.saveBooking(booking);
   }
}
