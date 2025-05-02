import React, { useState } from 'react';
import FlightCard from './FlightCard';
import FlightDetailsModal from './FlightDetailsModal';

const FlightCarousel = ({ flights }) => {
    const [selectedFlight, setSelectedFlight] = useState(null);

    return (
        <>
            <div className="carousel-container">
                {flights.map((flight, index) => (
                    <FlightCard key={index} flight={flight} onClick={() => setSelectedFlight(flight)} index={index} />
                ))}
            </div>
            {selectedFlight && (
                <FlightDetailsModal flight={selectedFlight} onClose={() => setSelectedFlight(null)} />
            )}
        </>
    );
};

export default FlightCarousel;
