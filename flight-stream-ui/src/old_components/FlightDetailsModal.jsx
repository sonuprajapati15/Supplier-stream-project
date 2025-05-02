import React from 'react';
import Modal from 'react-modal';

const FlightDetailsModal = ({ flight, onClose }) => (
    <Modal isOpen={!!flight} onRequestClose={onClose}>
        <h2>{flight.airline.name} - {flight.flightNumber}</h2>
        <p><strong>Route:</strong> {flight.from} → {flight.to}</p>
        <p><strong>Departure:</strong> {flight.departureTime}</p>
        <p><strong>Arrival:</strong> {flight.arrivalTime}</p>
        <p><strong>Seat:</strong> {flight.seatType} - {flight.seatPitch}, ₹{flight.price}</p>
        <p><strong>Layovers:</strong> {flight.layovers.join(', ')}</p>
        <button onClick={onClose}>Close</button>
    </Modal>
);

export default FlightDetailsModal;
