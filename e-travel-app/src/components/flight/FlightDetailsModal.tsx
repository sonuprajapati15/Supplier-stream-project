import React from "react";
import "../../css/flight-detail-model.css";

const icons = {
    wifi: <span title="WiFi">📶</span>,
    usb: <span title="USB Outlet">🔌</span>,
    seat: <span title="Seat Pitch">💺</span>,
    video: <span title="Entertainment">📺</span>,
    meal: <span title="Meal">🍽️</span>,
    eco: <span title="Eco-Friendly">🌱</span>,
    powerOutlet: <span title="Power Outlet">🔋</span>,
    priorityBoarding: <span title="Priority Boarding">🚀</span>,
    loungeAccess: <span title="Lounge Access">🛋️</span>,
    extraLegroom: <span title="Extra Legroom">🦵</span>,
    petPolicy: <span title="Pet Policy">🐾</span>,
    infantPolicy: <span title="Infant Policy">👶</span>,
    covidSafety: <span title="COVID Safety">😷</span>,
    gate: <span title="Gate">🚪</span>,
    terminal: <span title="Terminal">🏢</span>,
    boardingTime: <span title="Boarding Time">⏰</span>,
    checkInCounter: <span title="Check-In Counter">🛫</span>,
    onTimePerformance: <span title="On-Time Performance">⏳</span>,
    seatPitch: <span title="Seat Pitch">📏</span>,
    seatWidth: <span title="Seat Width">📐</span>,
    recliningAngle: <span title="Reclining Angle">🔄</span>,
    rating: <span title="Rating">⭐</span>,
};

type Props = {
    open: boolean;
    onClose: () => void;
    flight: {
        flightId: string;
        flightNumber: string;
        airline: { name: string; logo: string };
        from: string;
        to: string;
        departureTime: string;
        arrivalTime: string;
        duration: string;
        seatType: string;
        cabinClass: string;
        baggage: string;
        price: number;
        meal: string;
        wifi: string;
        entertainment: string;
        ecoFriendly: string;
        powerOutlet: string;
        usbPort: string;
        priorityBoarding: string;
        loungeAccess: string;
        extraLegroom: string;
        petPolicy: string;
        infantPolicy: string;
        covidSafety: string;
        gate: string;
        terminal: string;
        boardingTime: string;
        checkInCounter: string;
        onTimePerformance: string;
        seatPitch: string;
        seatWidth: string;
        recliningAngle: string;
        rating: number;
        reviewsCount: number;
    };
};

const FlightDetailsModal: React.FC<Props> = ({open, onClose, flight}) => {
    if (!open) return null;

    return (
        <div className="flight-details-modal-overlay">
            <div className="flight-details-modal">
                <div className="flight-details-modal-header">
                    <span>Flight Details</span>
                    <button className="flight-details-close-btn" onClick={onClose}>&#10005;</button>
                </div>
                <div className="flight-details-modal-content scrollable">
                    <div className="flight-details-summary">
                        <img src={flight.airline.logo} alt={flight.airline.name} className="flight-airline-logo"/>
                        <div>
                            <h3>{flight.airline.name}</h3>
                            <p>Flight Number: {flight.flightNumber}</p>
                        </div>
                    </div>
                    <div className="flight-details-info">
                        <div className="flight-detail-columns">
                            <div className="flight-details-features">
                                <h4>Features</h4>
                                <p>{icons.meal} <b>Meal:</b> {flight.meal}</p>
                                <p>{icons.wifi} <b>WiFi:</b> {flight.wifi}</p>
                                <p>{icons.video} <b>Entertainment:</b> {flight.entertainment}</p>
                                <p>{icons.powerOutlet} <b>Power Outlet:</b> {flight.powerOutlet}</p>
                                <p>{icons.usb} <b>USB Port:</b> {flight.usbPort}</p>
                                <p>{icons.priorityBoarding} <b>Priority Boarding:</b> {flight.priorityBoarding}</p>
                                <p>{icons.loungeAccess} <b>Lounge Access:</b> {flight.loungeAccess}</p>
                                <p>{icons.extraLegroom} <b>Extra Legroom:</b> {flight.extraLegroom}</p>
                                <p>{icons.eco} <b>Eco-Friendly:</b> {flight.ecoFriendly}</p>
                            </div>
                            <div className="flight-details-additional">
                                <h4>Additional Information</h4>
                                <p>{icons.gate} <b>Gate:</b> {flight.gate}</p>
                                <p>{icons.terminal} <b>Terminal:</b> {flight.terminal}</p>
                                <p>{icons.boardingTime} <b>Boarding Time:</b> {flight.boardingTime}</p>
                                <p>{icons.checkInCounter} <b>Check-In Counter:</b> {flight.checkInCounter}</p>
                                <p>{icons.onTimePerformance} <b>On-Time Performance:</b> {flight.onTimePerformance}</p>
                                <p>{icons.seatPitch} <b>Seat Pitch:</b> {flight.seatPitch}</p>
                                <p>{icons.seatWidth} <b>Seat Width:</b> {flight.seatWidth}</p>
                                <p>{icons.recliningAngle} <b>Reclining Angle:</b> {flight.recliningAngle}</p>
                                <p>{icons.petPolicy} <b>Pet Policy:</b> {flight.petPolicy}</p>
                                <p>{icons.infantPolicy} <b>Infant Policy:</b> {flight.infantPolicy}</p>
                                <p>{icons.covidSafety} <b>COVID Safety:</b> {flight.covidSafety}</p>
                                <p>{icons.rating} <b>Rating:</b> {flight.rating} ({flight.reviewsCount} reviews)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlightDetailsModal;