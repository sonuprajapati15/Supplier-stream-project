import React from "react";
import "../styles/bookingdetails.css";
export default function BookingDetails({ booking }) {
  if (!booking) return null;
  return (
    <div className="eg-booking-details">
      <h3>{booking.destination}</h3>
      <div>Date: {booking.date}</div>
      <div>Status: {booking.status}</div>
      {/* More details (can add fare, airline, etc.) */}
    </div>
  );
}