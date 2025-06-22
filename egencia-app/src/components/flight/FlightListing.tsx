import React, {useState, useEffect, useRef, useCallback} from "react";
import FlightSearch from "./FlightSearch";
import FlightCard from "./FlightCard";
import "../../css/flight-listing.css";
import ProgressBar from "../progess-bar/ProgressBar";

// @ts-ignore
import {decryptAndDecompress} from '../../decrypt/decryptAndDecompress';
import NewsSection from "../other/NewsSection";
import WeatherInfo from "../other/WeatherInfo";

const sortOptions = ["Smart Mix", "Price Low to High", "Price High to Low"];

const fareTabs = [
    {key: "Saver", label: "Saver", desc: "Essential Only"},
    {key: "Popular", label: "Popular", desc: "Most Popular"},
    {key: "Premium", label: "Premium", desc: "Maximum Flexible & Comfort"}
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

const sortByPriceAsc = (flights: any[], asc=true) => {
    // Sort by lowest price in "Popular" (Recommended) fare category
    return [...flights].sort((a, b) => {
        const aFare = getMinFare(a, "Recommended");
        const bFare = getMinFare(b, "Recommended");
        const aPrice = aFare ? aFare.total_price : Number.MAX_VALUE;
        const bPrice = bFare ? bFare.total_price : Number.MAX_VALUE;
        return asc ? aPrice - bPrice : bPrice - aPrice;
    });
};

const FlightListing: React.FC = () => {
    const [selectedFareTab, setSelectedFareTab] = useState("Popular");
    const [flights, setFlights] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [weather, setWeather] = useState<any>(null);
    const [filterOptions, setFilterOptions] = useState<{ key: string; values: string[] }[]>([
        {key: "Airlines", values: []}
    ]);
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const handleScroll = () => {
        setShowScrollToTop(window.scrollY > 300);
    };

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: "smooth"});
    };

     useEffect(() => {
         if (!to) return;
         fetch(`http://localhost:9000/supplier/v1/weather?place=${to}`)
             .then(res => res.json())
             .then(setWeather);
     }, []); // Empty dependency array ensures the effect runs only once

    const addFilterData = async (flights: any[]) => {
        const airlineSet = new Set(flights.map((v: any) => v.airline.name));
        const minPrice = flights.map((v: any) => v.price).sort((a, b) => a - b);
        const maxPrice = flights.map((v: any) => v.price).sort((a, b) => b - a);
        const sortedPrices = flights.map((v: any) => v.price).sort((a, b) => a - b);
        const median =
            sortedPrices.length === 0
                ? 0
                : sortedPrices.length % 2 === 1
                    ? sortedPrices[Math.floor(sortedPrices.length / 2)]
                    : (sortedPrices[sortedPrices.length / 2 - 1] + sortedPrices[sortedPrices.length / 2]) / 2;
        setFilterOptions([
            {key: "Airlines", values: Array.from(airlineSet)},
            {key: "Times", values: ["Morning", "Afternoon", "Evening", "Night"]},
            {
                key: "Price",
                values: ['greater than ' + minPrice[0], minPrice[0] + ' - ' + median, ' less than ' + maxPrice[0]]
            },
            {key: "Policy", values: ["Company Policy", "Flexible", "Non-refundable"]}
        ]);
    };

    const queryParams = new URLSearchParams(location.search);
    const from = queryParams.get("from") || "DEL";
    const to = queryParams.get("to") || "BOM";
    const date = queryParams.get("date") || "2025-05-28";
    const flightsRef = useRef<any[]>([]);
    const [selectedSortOption, setSelectedSortOption] = useState(sortOptions[0]);

    const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string }>({});
    const handleFilterChange = (key: string, value: string) => {
        setSelectedFilters((prevFilters) => {
            const updatedFilters = {
                ...prevFilters,
                [key]: value,
            };
            // Apply filters to flights
            const filteredFlights = flightsRef.current.filter((flight) => {
                return Object.entries(updatedFilters).every(([filterKey, filterValue]) => {
                    if (filterKey === "Airlines") {
                        return flight.airline.name === filterValue;
                    }
                    if (filterKey === "Stops") {
                        return flight.stops === filterValue;
                    }
                    if (filterKey === "Times") {
                        return flight.timeCategory === filterValue;
                    }
                    if (filterKey === "Price") {
                        const price = flight.price;
                        if (filterValue.includes("greater than")) {
                            return price > parseInt(filterValue.split(" ")[2], 10);
                        }
                        if (filterValue.includes("less than")) {
                            return price < parseInt(filterValue.split(" ")[2], 10);
                        }
                        const [min, max] = filterValue.split(" - ").map(Number);
                        return price >= min && price <= max;
                    }
                    if (filterKey === "Policy") {
                        return flight.policy === filterValue;
                    }
                    return true;
                });
            });

            setFlights(filteredFlights);
            return updatedFilters;
        });
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.target.value;
        setSelectedSortOption(selectedOption);
        if (selectedOption === "Price Low to High") {
            setFlights(sortByPriceAsc(flightsRef.current, true));
        } else if (selectedOption === "Price High to Low") {
            setFlights(sortByPriceAsc(flightsRef.current, false));
        } else {
            setFlights([...flightsRef.current]); // Default sorting (Smart Mix)
        }
    };

    const applyFilters = useCallback(() => {
        return sortByPriceAsc(flightsRef.current, true);
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
        <div className="flight-listing-news-outer">
            <div className="flight-listing-outer">
                <div className="flight-search-outer">
                    <FlightSearch/>
                </div>
                <div className="flight-listing-toolbar">
                    <div className="flight-listing-filters">
                        {filterOptions.map(opt => (
                            <div className="flight-listing-filter" key={opt.key}>
                                <select
                                    value={selectedFilters[opt.key] || ""}
                                    onChange={(e) => handleFilterChange(opt.key, e.target.value)}
                                >
                                    <option value="" disabled>Select {opt.key}</option>
                                    {opt.values.map((val) => (
                                        <option key={val} value={val}>{val}</option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>
                    <div className="flight-listing-sort">
                        <label htmlFor="sortby">Sort by</label>
                        <select id="sortby" value={selectedSortOption} onChange={handleSortChange}>
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
                            <ProgressBar/>
                        </div>
                    )}
                    <div className="flight-listing-cards" style={{ maxHeight: "2000px", overflowY: "auto" }}>
                        {flights.map((flight: any) => (
                            <FlightCard
                                key={flight.flightId}
                                flight={flight}
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
            <div className="flight-weather">{weather && <WeatherInfo weather={weather}/>}</div>
        </div>
    );
};

export default FlightListing;