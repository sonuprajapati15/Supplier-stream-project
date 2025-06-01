import React, { useState, useEffect, useRef, useCallback } from "react";
import FlightSearch from "./FlightSearch";
import FlightCard from "./FlightCard";
import "../../css/flight-listing.css";
import ProgressBar from "../progess-bar/ProgressBar";

// @ts-ignore
import { decryptAndDecompress } from '../../decrypt/decryptAndDecompress';

const sortOptions = ["Smart Mix", "Price Low to High", "Price High to Low"];

const fareTabs = [
    { key: "Saver", label: "Saver", desc: "Essential Only" },
    { key: "Popular", label: "Popular", desc: "Most Popular" },
    { key: "Premium", label: "Premium", desc: "Maximum Flexible & Comfort" }
];

function flattenFareOptions(fareOptions: any[]): any[] {
    let flat: any[] = [];
    fareOptions.forEach(opt => {
        if (opt.fareOptions) {
            flat = flat.concat(flattenFareOptions(opt.fareOptions));
        } else {
            flat.push(opt);
        }
    });
    return flat;
}

function getMinFare(flight: any, category: string) {
    const fc = flight.fareCategories?.find((fc: any) => fc.fareType === category);
    if (!fc) return null;
    const fares = flattenFareOptions(fc.fareOptions);
    if (!fares.length) return null;
    return fares.reduce((min, f) => f.total_price < min.total_price ? f : min, fares[0]);
}

const sortByPriceAsc = (flights: any[]) => {
    // Sort by lowest price in "Popular" (Recommended) fare category
    return [...flights].sort((a, b) => {
        const aFare = getMinFare(a, "Recommended");
        const bFare = getMinFare(b, "Recommended");
        const aPrice = aFare ? aFare.total_price : Number.MAX_VALUE;
        const bPrice = bFare ? bFare.total_price : Number.MAX_VALUE;
        return aPrice - bPrice;
    });
};

const FlightListing: React.FC = () => {
    const [selectedFareTab, setSelectedFareTab] = useState("Popular");
    const [selectedFlight, setSelectedFlight] = useState<string | null>(null);
    const [flights, setFlights] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [filterOptions, setFilterOptions] = useState<{ key: string; values: string[] }[]>([
        { key: "Airlines", values: [] }
    ]);
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const handleScroll = () => {
        setShowScrollToTop(window.scrollY > 300);
    };
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const addFilterData = async (flights: any[]) => {
        const airlineSet = new Set(flights.map((v: any) => v.airline.name));
        setFilterOptions([
            { key: "Airlines", values: Array.from(airlineSet) },
            { key: "Stops", values: ["Nonstop", "1 Stop", "2+ Stops"] },
            { key: "Times", values: ["Morning", "Afternoon", "Evening", "Night"] },
            { key: "Price", values: ["< $200", "200-$400", ">$400"] },
            { key: "Policy", values: ["Company Policy", "Flexible", "Non-refundable"] }
        ]);
    };

    const queryParams = new URLSearchParams(location.search);
    const from = queryParams.get("from") || "DEL";
    const to = queryParams.get("to") || "BOM";
    const date = queryParams.get("date") || "2025-05-28";

    const flightsRef = useRef<any[]>([]);

    const applyFilters = useCallback(() => {
        // Add your filtering logic here if needed
        return sortByPriceAsc(flightsRef.current);
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setFlights([]); // clear UI list
        flightsRef.current = [];
        setLoading(true);
        let API_URL = `http://localhost:9000/supplier/stream/flights/search?from=${from}&to=${to}&date=${date}`;
        const source = new EventSource(API_URL);

        source.onmessage = (event) => {
            if (event.data && !event.data.startsWith("event:")) {
                try {
                    const decoded = decryptAndDecompress(event.data.substring(5));
                    const parsed = JSON.parse(decoded);
                    if (parsed.flights && Array.isArray(parsed.flights)) {
                        flightsRef.current = [...flightsRef.current, ...parsed.flights];
                        setFlights(applyFilters());
                        addFilterData(parsed.flights);

                    }
                } catch (err) {
                    console.error('Decode or parse error:', err);
                }
            }
            if (event.data && event.data.startsWith("event:completed\ndata:Flight")) {
                source.close();
                setLoading(false);
                setTimeout(() => setShowPopup(true), 200);
                setFlights(applyFilters());
            }
        };

        source.onerror = (err) => {
            console.error('SSE error:', err);
            source.close();
            setLoading(false);
        };

        return () => source.close();
        // eslint-disable-next-line
    }, [applyFilters]);

    return (
        <div className="flight-listing-outer">
            <div className="flight-search-outer">
                <FlightSearch />
            </div>
            <div className="flight-listing-toolbar">
                <div className="flight-listing-filters">
                    {filterOptions.map(opt => (
                        <div className="flight-listing-filter" key={opt.key}>
                            <select>
                                {opt.values.map(val => (
                                    <option key={val}>{val}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>
                <div className="flight-listing-sort">
                    <label htmlFor="sortby">Sort by</label>
                    <select id="sortby">
                        {sortOptions.map(opt => (
                            <option key={opt}>{opt}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flight-listing-section">
                <div className="flight-listing-section-header">
                    <div>
                        <h3>Select departing flights</h3>
                        <span className="flight-benchmark">Your company’s travel policy benchmark for this trip is <b> Rs. 8000</b></span>
                        <a href="#" className="flight-company-msg">View company messages</a>
                    </div>
                    <div className="flight-listing-fare-tabs">
                        {fareTabs.map(tab => (
                            <button
                                key={tab.key}
                                className={`flight-fare-tab${selectedFareTab === tab.label ? " active" : ""}`}
                                onClick={() => setSelectedFareTab(tab.label)}
                            >
                                <span>{tab.label}</span>
                                <div className="flight-fare-desc">{tab.desc}</div>
                            </button>
                        ))}
                    </div>
                </div>
                {loading && (
                    <div className="flight-listing-loading">
                        <ProgressBar />
                    </div>
                )}
                <div className="flight-listing-cards">
                    {flights.map((flight: any) => (
                        <FlightCard
                            key={flight.flightId}
                            flight={flight}
                            selectedFareTab={selectedFareTab}
                            selected={selectedFlight === flight.flightId}
                            onSelect={() => setSelectedFlight(selectedFlight === flight.flightId ? null : flight.flightId)}
                        />
                    ))}
                </div>
            </div>
            {showPopup && (
                <div className="flight-listing-popup">Flights loaded successfully!</div>
            )}
            {showScrollToTop && (
                <button className="scroll-to-top" onClick={scrollToTop}>
                    ⬆
                </button>
            )}
        </div>
    );
};

export default FlightListing;