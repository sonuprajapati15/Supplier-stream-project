import React, { useEffect, useState } from "react";
import { fetchAllBookings } from "../api/bookings.js";
import TripsList from "../components/TripsList.jsx";
import "../styles/trips.css";

export default function Trips() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    fetchAllBookings().then(setBookings);
  }, []);
  return (
    <div className="eg-trips-page">
      <h2>Trips</h2>
      <TripsList bookings={bookings} />
    </div>
  );
}