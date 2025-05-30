import {createElement as h} from "react";
import {useState, useEffect, useRef, useCallback} from "react";
import {FlightSearch} from "./FlightSearch";
import {decryptAndDecompress} from "../decrypt/decryptAndDecompress";

const API_URL = "http://localhost:9000/supplier/stream/flights/search?from=delhi&to=jaipur";

export function Listing() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const flightsRef = useRef([]);

    // Filtering and sorting logic
    const applyFilters = useCallback(() => {
        const sorted = [...flightsRef.current].sort((a, b) => a.price - b.price);
        return sorted;
    }, []);

    useEffect(() => {
        setResults([]); // Clear UI list
        flightsRef.current = [];
        setLoading(true);

        const source = new EventSource(API_URL);

        source.onmessage = (event) => {
            if (event.data && event.data.startsWith("data:")) {
                try {
                    console.log('Raw event data:', event);
                    const decoded = decryptAndDecompress(event.data.substring(5));
                    console.log('Decoded data:', decoded);
                    const parsed = JSON.parse(decoded);
                    console.log(parsed);
                    if (parsed.flights && Array.isArray(parsed.flights)) {
                        flightsRef.current = [...flightsRef.current, ...parsed.flights];
                    }
                } catch (err) {
                    console.error("Error parsing flight data:", err);
                }
            }
            if (event.data && event.data.startsWith("event:completed data:Flight")) {
                setResults(applyFilters());
                source.close();
                setLoading(false);
            }
        };

        source.onerror = (err) => {
            // EventSource error can occur due to network issues, CORS, server down, or invalid response format
            setResults(applyFilters());
            if (err && err.eventPhase === EventSource.CLOSED) {
                console.warn("EventSource connection was closed by the server.");
            } else {
                console.error("Error with EventSource:", err);
            }
            setLoading(false);
            source.close();
        };

        return () => source.close();
    }, [applyFilters]);

    return h('div', {className: "listing-page"}, [
        h('div', {className: "home-page"}, [
            h('h1', {}, "Welcome to Flight Search"),
            h(FlightSearch)
        ]),
        h('div', {className: "fetching-bar"}, [
            loading && h('div', {className: "loading-animation"}, "Fetching results...")
        ]),
        h('div', {className: "flight-results"},
            results.map(flight =>
                h('div', {key: flight._id, className: "flight-card"}, [
                    h('div', {className: "flight-header"}, [
                        h('img', {src: flight.airline.logo, alt: flight.airline.name, className: "airline-logo"}),
                        h('span', {className: "airline-name"}, flight.airline.name),
                        h('span', {className: "flight-number"}, `Flight: ${flight.flightNumber}`)
                    ]),
                    h('div', {className: "flight-details"}, [
                        h('div', {className: "flight-route"}, [
                            h('span', {}, `From: ${flight.from}`),
                            h('span', {}, `To: ${flight.to}`)
                        ]),
                        h('div', {className: "flight-times"}, [
                            h('span', {}, `Departure: ${flight.departureTime}`),
                            h('span', {}, `Arrival: ${flight.arrivalTime}`)
                        ]),
                        h('div', {className: "flight-duration"}, `Duration: ${flight.duration}`),
                        h('div', {className: "flight-price"}, `Price: ₹${flight.price}`)
                    ]),
                    h('div', {className: "flight-extras"}, [
                        h('span', {}, `Cabin Class: ${flight.cabinClass}`),
                        h('span', {}, `Baggage: ${flight.baggage}`),
                        h('span', {}, `Meal: ${flight.meal}`),
                        h('span', {}, `Stops: ${flight.totalStops}`)
                    ])
                ])
            )
        )
    ]);
}