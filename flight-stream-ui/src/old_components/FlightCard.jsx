import React from 'react';

const FlightCard = ({ flight, onClick }) => (
    <div className="card" onClick={onClick}>
        <h2>{flight.airline.name}</h2>
        <p>{flight.from} → {flight.to}</p>
        <p>{flight.departureTime} - {flight.arrivalTime}</p>
        <p>Seat: {flight.seatType}, ₹{flight.price}</p>
    </div>
);

export default FlightCard;
