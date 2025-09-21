import React, {useState} from "react";
import "../../css/flight-listing-card.css";
import FlightDetailsModal from "./FlightDetailsModal";

// Utility to flatten nested fareOptions:
function flattenFareOptions(fareOptions: any[]): any[] {
    let flat: any[] = [];
    fareOptions.forEach((opt) => {
        if (opt.fareOptions) {
            flat = flat.concat(flattenFareOptions(opt.fareOptions));
        } else {
            flat.push(opt);
        }
    });
    return flat;
}

// Map API fare type to UI labels
const fareCategoryLabels: Record<string, string> = {
    "Recommended": "Saver",
    "Value One": "Popular",
    "Expensive": "Premium",
};

const FlightCard: React.FC<{
    flight: any;
}> = ({flight}) => {
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="flight-listing-outer-card">
            <div className="flight-listing-card">
                <div className="flight-listing-card-inner">
                    <div className="flight-labels">
                        {flight.ecoFriendly === "Yes" && <span className="flight-label-green">Greener flight</span>}
                        {flight.vendor_name === "Amadeus" && <span className="flight-label-blue">{flight.vendor_name}</span>}
                        {flight.vendor_name === "Sabre" && <span className="flight-label-orange">{flight.vendor_name}</span>}
                    </div>
                    <div className="flight-card-main">
                        <div className="flight-airline-logo-wrap">
                            <img src={flight.airline?.logo} alt={flight.airline?.name} className="flight-airline-logo"/>
                        </div>
                        <div className="flight-main-info">
                            <div className="flight-city">
                                <span>{flight.from}</span> <span className="flight-city-arrow"> ✈ </span>
                                <span>{flight.to}</span>
                            </div>
                            <div className="flight-time">
                                <span className="flight-time-depart">{flight.departureTime}</span>
                                <span className="flight-route">
                                                            <span className="flight-arrow">→</span>
                                    {flight.flightType} <span className="flight-arrow">→</span>
                                                        </span>
                                <span className="flight-time-arrive">{flight.arrivalTime}</span>
                            </div>
                            <div className="flight-duration">{flight.duration}</div>
                            <div className="flight-airline">
                                {flight.airline?.name} <span className="flight-no">{flight.flightNumber}</span>
                            </div>
                        </div>
                        <FlightDetailsModal open={showModal} onClose={() => setShowModal(false)} flight={flight}/>
                    </div>
                    <div className="flight-fare-cells">
                        {flight.fareCategories.map((fc: any) => {
                            const fares = flattenFareOptions(fc.fareOptions);
                            const minFare = fares.reduce(
                                (min, f) => (f.total_price < min.total_price ? f : min),
                                fares[0]
                            );
                            const label = fareCategoryLabels[fc.fareType] || fc.fareType;

                            return (
                                <div
                                    key={fc.fareType}
                                    className={`flight-fare-cell${expandedCategory === fc.fareType ? " selected" : ""}`}
                                    onClick={() => setExpandedCategory(expandedCategory === fc.fareType ? null : fc.fareType)}
                                >
                                    <div className="flight-fare-type">{label}</div>
                                    <div className="flight-fare-price">₹{minFare.total_price.toLocaleString()}</div>
                                    <div className="flight-fare-desc">{fc.fareType}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <button className="flight-view-details" onClick={() => setShowModal(true)}>
                    View details
                </button>
            </div>
            {expandedCategory && (
                <div className="flight-fare-details-row">
                    {flight.fareCategories
                        .filter((fc: any) => fc.fareType === expandedCategory)
                        .map((fc: any) =>
                            flattenFareOptions(fc.fareOptions).map((fare: any, i: number) => (
                                <div className="flight-fare-category-card" key={fc.fareType + i}>
                                    {fc.fareType === "Recommended" && (
                                        <div className="flight-fare-category-recommended">Recommended</div>
                                    )}
                                    <div className="flight-fare-category-header">
                                                                    <span className="flight-fare-category-price">
                                                                        ₹{fare.total_price.toLocaleString()}
                                                                    </span>
                                        <button
                                            className="flight-fare-category-select"
                                            onClick={() => window.location.href = `/checkout/flight?flightId=${flight.flightId}&fareType=${fc.fareType}&fareId=${i}&provider=${flight.vendor_name}`}>
                                            Select
                                        </button>
                                    </div>
                                    <div className="image-section">
                                        <img src={fc.image} className="centered-image"/>
                                    </div>
                                    <div className="flight-fare-category-body">
                                        <div className="flight-fare-category-title">
                                            {fare.components?.seat_types?.name ?? "Fare Option"}
                                        </div>
                                        <ul className="flight-fare-category-list">
                                            {fare.components &&
                                                Object.entries(fare.components).map(([k, v]: [string, any], idx2: number) => (
                                                    <li key={idx2}>
                                                        <b>{v.name}</b>
                                                        {v.price > 0 ? ` (+₹${v.price})` : ""}
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                </div>
                            ))
                        )}
                </div>
            )}
        </div>
    );
};

export default FlightCard;