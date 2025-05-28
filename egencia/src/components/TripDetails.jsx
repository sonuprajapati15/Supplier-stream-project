import React from "react";
import "../styles/tripdetails.css";
export default function TripDetails({ trip }) {
  if (!trip) return null;
  return (
    <div className="eg-trip-details">
      <h2>Trip to {trip.destination}</h2>
      <p>Date: {trip.date}</p>
      <p>Status: {trip.status}</p>
      {/* Add more trip details as required */}
    </div>
  );
}