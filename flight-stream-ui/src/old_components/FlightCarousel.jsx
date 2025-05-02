import React, { useState } from 'react';
import FlightCard from './FlightCard';
import FlightDetailsModal from './FlightDetailsModal';

const FlightCarousel = ({ flights }) => {
    const [selectedFlight, setSelectedFlight] = useState(null);

    return (
        <div className="carousel">
            {flights.map((flight, index) => (
                <FlightCard key={index} flight={flight} onClick={() => setSelectedFlight(flight)} />
            ))}
            {selectedFlight && (
                <FlightDetailsModal flight={selectedFlight} onClose={() => setSelectedFlight(null)} />
            )}
        </div>
    );
};

export default FlightCarousel;
