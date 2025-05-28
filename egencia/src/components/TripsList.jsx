import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/tripslist.css";

export default function TripsList({ bookings = [] }) {
  const navigate = useNavigate();
  if (!bookings.length) return <div className="eg-trips-empty">No trips found.</div>;
  return (
    <div className="eg-trips-list">
      {bookings.map((booking, idx) => (
        <div key={idx} className="eg-trip-card" onClick={() => navigate(`/booking/${booking.id}`)}>
          <div className="eg-trip-card-title">{booking.destination}</div>
          <div className="eg-trip-card-date">{booking.date}</div>
          <div className="eg-trip-card-status">{booking.status}</div>
        </div>
      ))}
    </div>
  );
}