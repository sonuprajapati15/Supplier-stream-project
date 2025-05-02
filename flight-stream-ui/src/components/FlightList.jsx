import React from 'react';

const FlightList = ({ flights, onSelect }) => (
    <div className="w-3/5 p-4 flex flex-col gap-3">
        {flights.map(flight => (
            <div
                key={flight.flightId}
                onClick={() => onSelect(flight)}
                className="p-4 border rounded-lg shadow-md hover:bg-blue-100 cursor-pointer"
            >
                <h3 className="text-xl text-red-600 font-bold">{flight.airline.name}</h3>
                <p>{flight.from} → {flight.to}</p>
                <p>{flight.departureTime} - {flight.arrivalTime}</p>
                <p>₹{flight.price}</p>
            </div>
        ))}
    </div>
);

export default FlightList;
