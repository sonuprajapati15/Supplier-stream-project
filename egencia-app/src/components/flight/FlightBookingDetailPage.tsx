import React, { useEffect, useState } from "react";
import "../../css/flight-booking-detail.css";

// Utility to format date/time nicely
function formatDateTime(dateStr: string, time?: string) {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short", year: "numeric" }) +
        (time ? ` ${time}` : "");
}

const FlightBookingDetailPage: React.FC<{ ticketNo?: string }> = ({ ticketNo }) => {
    const [flight, setFlight] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // If no ticketNo prop, try to get from URL
    const ticket = new URLSearchParams(window.location.search).get("ticketNo");
    console.log("ticket no" + ticket);
    useEffect(() => {
        if (!ticket) return;
        setLoading(true);
        fetch(`http://localhost:9000/supplier/stream/bookings/byTicketNo?ticketNo=${ticket}`)
            .then(res => res.json())
            .then(setFlight)
            .finally(() => setLoading(false));
    }, [ticket]);

    if (loading) return <div className="flight-booking-loading">Loading booking...</div>;
    if (!flight) return <div className="flight-booking-error">Booking not found.</div>;

    return (
        <div className="flight-booking-detail-bg">
            <div className="flight-booking-detail-main">
                <a href="/trips" className="flight-booking-back">&lt; Back to trips</a>
                <div className="flight-booking-ref">Reference #{flight.ticketNo || flight.flightId}</div>
                <div className="flight-booking-title-row">
                    <span className="flight-booking-title">{flight.to}</span>
                    <span className={`flight-booking-status flight-status-${flight.status?.toLowerCase()}`}>{flight.status}</span>
                    <span className="flight-booking-edit" title="Edit">✎</span>
                </div>
                <div className="flight-booking-date">{formatDateTime(flight.date)}</div>
                <div className="flight-booking-trip-type">{flight.lobName || "Flight"}</div>
                <div className="flight-booking-img">
                    <img src={flight.cityImage || flight.bgImage} alt={flight.to} />
                </div>

                {/* Segment details */}
                <div className="flight-booking-segments">
                    <div className="flight-booking-segment">
                        <div className="flight-booking-segment-icon">✈️</div>
                        <div className="flight-booking-segment-main">
                            <div className="flight-booking-segment-row">
                                <b>{flight.cabinClass}</b> • Duration {flight.duration}
                            </div>
                            <div className="flight-booking-segment-row">
                                <img src={flight.airline?.logo} alt={flight.airline?.name} className="flight-booking-airline-logo" />
                                <b>{flight.airline?.name}</b> {flight.flightNumber}
                                <span className="flight-booking-segment-time">
                  {flight.departureTime} <span className="flight-booking-segment-dot">•</span> {flight.from}
                                    <span className="flight-booking-segment-arrow">→</span>
                                    {flight.to} <span className="flight-booking-segment-dot">•</span> {flight.arrivalTime}
                </span>
                            </div>
                            <div className="flight-booking-segment-row">
                                Terminal {flight.terminal} &nbsp;|&nbsp; Gate {flight.gate} &nbsp;|&nbsp; Boarding {flight.boardingTime}
                            </div>
                            <div className="flight-booking-segment-row flight-booking-segment-features">
                                <span>Seat: {flight.seatType}, {flight.seatPitch} pitch, {flight.seatWidth} width</span>
                                <span>Meal: {flight.meal}</span>
                                <span>Baggage: {flight.baggage}</span>
                                <span>WiFi: {flight.wifi}</span>
                                <span>Power: {flight.powerOutlet}, USB: {flight.usbPort}</span>
                                <span>Entertainment: {flight.entertainment}</span>
                                <span>Lounge Access: {flight.loungeAccess}</span>
                                <span>Priority Boarding: {flight.priorityBoarding}</span>
                            </div>
                            <div className="flight-booking-segment-row flight-booking-segment-policies">
                                <span>Cancellation: {flight.cancellationPolicy}</span>
                                <span>Change: {flight.changePolicy}</span>
                                <span>Eco Friendly: {flight.ecoFriendly}</span>
                                <span>On-Time: {flight.onTimePerformance}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions and Price */}
                <div className="flight-booking-actions-row">
                    <div className="flight-booking-actions">
                        <button className="flight-booking-action-primary">+ Add to trip</button>
                        <button className="flight-booking-action">Receipt</button>
                        <button className="flight-booking-action">Download as PDF</button>
                        <button className="flight-booking-action">Share trip</button>
                        <button className="flight-booking-action">More actions</button>
                    </div>
                    <div className="flight-booking-trip-center">
                        <button className="flight-booking-trip-msgs">Trip messages</button>
                    </div>
                    <div className="flight-booking-price-breakdown">
                        <div className="flight-booking-price-title">Price breakdown</div>
                        <div className="flight-booking-price-row">
                            <span>Base fare</span>
                            <span>₹{flight.price?.toLocaleString()}</span>
                        </div>
                        <div className="flight-booking-price-row">
                            <span>Total</span>
                            <b>₹{flight.price?.toLocaleString()}</b>
                        </div>
                        <button className="flight-booking-price-link">Transaction history</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlightBookingDetailPage;