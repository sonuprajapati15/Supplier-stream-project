import React, {useEffect, useState} from "react";
import "../../css/flight-booking-detail.css";
import WeatherInfo from "../other/WeatherInfo";
import FlightAncillarySection from "../ancillery/FlightAncillarySection";

function formatDateTime(dateStr: string, time?: string) {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, {weekday: "short", day: "numeric", month: "short", year: "numeric"}) +
        (time ? ` ${time}` : "");
}

const statusToBg = {
    "CANCELLED": "fb-detail-bg-cancelled",
    "UPCOMING": "fb-detail-bg-upcoming",
    "COMPLETED": "fb-detail-bg-completed"
};

const FlightBookingDetailModern: React.FC<{ ticketNo?: string }> = ({ticketNo}) => {
    const [flight, setFlight] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [weather, setWeather] = useState<any>(null);
    const ticket = ticketNo || new URLSearchParams(window.location.search).get("ticketNo") || "";

    useEffect(() => {
        if (!ticket) return;
        setLoading(true);
        fetch(`http://localhost:9000/supplier/stream/bookings/byTicketNo?ticketNo=${ticket}`)
            .then(res => res.json())
            .then(setFlight)
            .finally(() => setLoading(false));
    }, [ticket]);

    useEffect(() => {
        if (!flight?.to) return;
        fetch(`http://localhost:9000/supplier/v1/weather?place=${flight.to}`)
            .then(res => res.json())
            .then(setWeather);
    }, [flight]);

    if (loading) return <div className="fb-detail-loading">Loading booking...</div>;
    if (!flight) return <div className="fb-detail-error">Booking not found.</div>;

    const bgClass = statusToBg[flight.status as keyof typeof statusToBg] || "fb-detail-bg-upcoming";
    const chooseFare = flight.chooseFare || {};
    const fareComponents = chooseFare.components || {};

    return (
        <div className={`fb-detail-page ${bgClass}`}>
            <div className="fb-detail-main">
                {/* LEFT PANEL */}
                <div className="fb-detail-left-pane">
                    <a href="/trips" className="fb-detail-back">&lt; Back to trips</a>
                    <div className="fb-detail-ref">Reference #{flight.ticketNo || flight.flightId}</div>
                    <div className="fb-detail-title-row">
                        <span className="fb-detail-title">{flight.from} <span
                            className="fb-detail-title-arrow">→</span> {flight.to}</span>
                        <span
                            className={`fb-detail-status fb-status-${flight.status?.toLowerCase()}`}>{flight.status}</span>
                        <span className="fb-detail-edit" title="Edit">✎</span>
                    </div>
                    <div className="fb-detail-date">{formatDateTime(flight.date)}</div>
                    <div className="fb-detail-trip-type">{flight.lobName || "Flight"}</div>
                    <div className="fb-detail-img">
                        <img src={flight.cityImage || flight.bgImage} alt={flight.to}/>
                    </div>

                    {/* FLIGHT DETAILS CARD */}
                    <div
                        className="fb-detail-segment-card-modern fb-detail-segment-card-beautified fb-detail-segment-card-rich">
                        {/* Path and meta */}
                        <div className="fb-detail-segment-pathrow">
                            <div className="fb-detail-segment-fromto">
                                <div className="fb-detail-segment-airport">
                                    <div className="fb-detail-segment-location-pin">📍</div>
                                    <div>
                                        <div className="fb-detail-segment-city">{flight.from}</div>
                                        <div className="fb-detail-segment-label-small">Departure</div>
                                    </div>
                                </div>
                                <div className="fb-detail-segment-patharrow-wrap">
                                    <div className="fb-detail-segment-time-main">{flight.departureTime}</div>
                                    <div className="fb-detail-segment-patharrow">
                                        <div className="fb-detail-segment-dot start"/>
                                        <div className="fb-detail-segment-line"/>
                                        <div className="fb-detail-segment-plane">✈️</div>
                                        <div className="fb-detail-segment-line"/>
                                        <div className="fb-detail-segment-dot end"/>
                                    </div>
                                    <div className="fb-detail-segment-duration">
                                        <span>{flight.duration}</span>
                                    </div>
                                    <div className="fb-detail-segment-time-main">{flight.arrivalTime}</div>
                                </div>
                                <div className="fb-detail-segment-airport">
                                    <div className="fb-detail-segment-location-pin">🏁</div>
                                    <div>
                                        <div className="fb-detail-segment-city">{flight.to}</div>
                                        <div className="fb-detail-segment-label-small">Arrival</div>
                                    </div>
                                </div>
                            </div>
                            <div className="fb-detail-segment-meta-top">
                                <span className="fb-detail-segment-cabin"><b>{flight.seatType}</b> • {flight.cabinClass}</span>
                                <span className="fb-detail-segment-flighttype">{flight.flightType}</span>
                                <span className="fb-detail-segment-status fb-status-chip">{flight.status}</span>
                            </div>
                        </div>

                        {/* Airline and meta */}
                        <div className="fb-detail-segment-row-modern fb-detail-segment-airline-meta">
                            <img src={flight.airline?.logo} alt={flight.airline?.name}
                                 className="fb-detail-airline-logo"/>
                            <span className="fb-detail-airline-name">{flight.airline?.name}</span>
                            <span className="fb-detail-aircraft">| {flight.aircraftType}</span>
                            <span className="fb-detail-terminal">| Terminal {flight.terminal}</span>
                            <span className="fb-detail-gate">| Gate {flight.gate}</span>
                            <span className="fb-detail-segment-pnr">| PNR {flight.pnrNo}</span>
                        </div>

                        {/* Feature grid */}
                        <div className="fb-detail-features-grid">
                            <div>
                                <div className="fb-detail-feature-label">Baggage</div>
                                <div className="fb-detail-feature-value">{flight.baggage}</div>
                            </div>
                            <div>
                                <div className="fb-detail-feature-label">Meal</div>
                                <div className="fb-detail-feature-value">{flight.meal}</div>
                            </div>
                            <div>
                                <div className="fb-detail-feature-label">Seat</div>
                                <div
                                    className="fb-detail-feature-value">{flight.seatType}, {flight.seatPitch}, {flight.seatWidth}</div>
                            </div>
                            <div>
                                <div className="fb-detail-feature-label">On-Time</div>
                                <div className="fb-detail-feature-value">{flight.onTimePerformance}</div>
                            </div>
                            <div>
                                <div className="fb-detail-feature-label">WiFi</div>
                                <div className="fb-detail-feature-value">{flight.wifi}</div>
                            </div>
                            <div>
                                <div className="fb-detail-feature-label">Power</div>
                                <div className="fb-detail-feature-value">{flight.powerOutlet},
                                    USB: {flight.usbPort}</div>
                            </div>
                            <div>
                                <div className="fb-detail-feature-label">Lounge Access</div>
                                <div className="fb-detail-feature-value">{flight.loungeAccess}</div>
                            </div>
                            <div>
                                <div className="fb-detail-feature-label">Priority Boarding</div>
                                <div className="fb-detail-feature-value">{flight.priorityBoarding}</div>
                            </div>
                            <div>
                                <div className="fb-detail-feature-label">Entertainment</div>
                                <div className="fb-detail-feature-value">{flight.entertainment}</div>
                            </div>
                            <div>
                                <div className="fb-detail-feature-label">Eco Friendly</div>
                                <div className="fb-detail-feature-value">{flight.ecoFriendly}</div>
                            </div>
                        </div>

                        {/* Choose Fare Details */}
                        <div className="fb-detail-fare-components-block">
                            <div className="fb-detail-fare-components-title">Fare Components & Policies</div>
                            <div className="fb-detail-fare-components-list">
                                {Object.entries(fareComponents).map(([key, val]: [string, any]) => (
                                    <div className="fb-detail-fare-component" key={key}>
                                        <span className="fb-detail-fare-comp-label">{val.name}</span>
                                        <span className="fb-detail-fare-comp-price">
                      {val.price > 0 ? <>+ ₹{val.price.toLocaleString()}</> : <span className="zero">Included</span>}
                    </span>
                                    </div>
                                ))}
                            </div>
                            <div className="fb-detail-fare-total-row">
                                <span className="fb-detail-fare-total-label">Total Fare</span>
                                <span
                                    className="fb-detail-fare-total-amount">₹{chooseFare.total_price?.toLocaleString() || flight.price?.toLocaleString()}</span>
                            </div>
                            <div className="fb-detail-segment-row-modern fb-detail-segment-policies">
                                <div><b>Cancellation:</b> {flight.cancellationPolicy}</div>
                                <div><b>Change:</b> {flight.changePolicy}</div>
                            </div>
                        </div>
                        <div className="fb-detail-segment-manage-modern">
                            <a href="#" className="fb-detail-segment-manage-link">Manage flight &gt;</a>
                        </div>
                    </div>

                </div>

                {/* RIGHT PANEL */}
                <div className="fb-detail-right-col">
                    <div className="fb-detail-actions-card">
                        <div className="fb-detail-actions-title">Trip actions</div>
                        <button className="fb-detail-action-btn fb-detail-action-btn-main">+ Add to trip</button>
                        <button className="fb-detail-action-btn"><span
                            className="fb-detail-action-icon">🧾</span> Receipt
                        </button>
                        <button className="fb-detail-action-btn"><span
                            className="fb-detail-action-icon">⬇️</span> Download as PDF
                        </button>
                        <button className="fb-detail-action-btn"><span className="fb-detail-action-icon">🔗</span> Share
                            trip
                        </button>
                        <button className="fb-detail-action-btn fb-detail-action-btn-more">... More actions</button>
                    </div>
                    <div className="fb-detail-tripcenter-card">
                        <div className="fb-detail-tripcenter-title">Trip center</div>
                        <button className="fb-detail-tripcenter-msg">
                            <span className="fb-detail-tripcenter-msg-icon">✉️</span>
                            Trip messages
                        </button>
                    </div>
                    {weather && <WeatherInfo weather={weather}/>}
                    <div className="fb-detail-price-card">
                        <div className="fb-detail-price-title">Price breakdown</div>
                        {/* Fare Components breakdown */}
                        {chooseFare && (
                            <>
                                {Object.entries(fareComponents).map(([key, val]: [string, any]) => (
                                    <div className="fb-detail-price-row" key={key}>
                                        <span>{val.name}</span>
                                        <span>{val.price > 0 ? `₹${val.price.toLocaleString()}` :
                                            <span className="zero">Included</span>}</span>
                                    </div>
                                ))}
                                <div className="fb-detail-price-row fb-detail-price-total">
                                    <span>Total</span>
                                    <b>₹{chooseFare.total_price?.toLocaleString() || flight.price?.toLocaleString()}</b>
                                </div>
                            </>
                        )}
                        {!chooseFare && (
                            <div className="fb-detail-price-row fb-detail-price-total">
                                <span>Total</span>
                                <b>₹{flight.price?.toLocaleString()}</b>
                            </div>
                        )}
                        <button className="fb-detail-price-link">Transaction history</button>
                    </div>
                    <FlightAncillarySection />
                </div>
            </div>
        </div>
    );
};

export default FlightBookingDetailModern;