import React, { useState } from "react";
import FareCategoryModal from "./FareCategoryModal.jsx";
import "../styles/flightlisting.css";

export default function FlightListing({ flights }) {
  const [selectedFlight, setSelectedFlight] = useState(null);

  return (
    <div className="eg-listing-table">
      <div className="eg-listing-header">
        <div>Flight</div>
        <div>Departure</div>
        <div>Arrival</div>
        <div>Airline</div>
        <div>Categories</div>
        <div>Details</div>
      </div>
      {flights.map((flight, idx) => (
        <div key={idx} className="eg-listing-row">
          <div>{flight.code || "XX123"}</div>
          <div>{flight.departure}</div>
          <div>{flight.arrival}</div>
          <div>{flight.airline}</div>
          <div>
            {flight.fareCategories?.map((cat, i) =>
              <button key={i}
                className="eg-listing-cat-btn"
                onClick={() => setSelectedFlight({ ...flight, selectedCategory: cat })}
              >
                {cat.name}: ${cat.price}
              </button>
            )}
          </div>
          <div>
            <button className="eg-secondary-btn" onClick={() => setSelectedFlight(flight)}>Details</button>
          </div>
        </div>
      ))}
      {selectedFlight && (
        <FareCategoryModal
          flight={selectedFlight}
          onClose={() => setSelectedFlight(null)}
        />
      )}
    </div>
  );
}