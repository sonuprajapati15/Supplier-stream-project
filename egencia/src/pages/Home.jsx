import React, { useEffect, useState } from "react";
import FlightForm from "../components/FlightForm.jsx";
import TripsList from "../components/TripsList.jsx";
import "../styles/home.css";

export default function Home() {
  // You can fetch user's upcoming trips here if needed
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    // Optionally fetch trips for Home
  }, []);
  return (
    <div className="eg-home-page">
      <h2 className="eg-welcome-text">Hello, FlightMIX!</h2>
      <FlightForm />
      <section className="eg-section">
        <h3>Upcoming Trips</h3>
        <TripsList bookings={bookings} />
      </section>
      {/* Add Favorite Hotels, etc. */}
    </div>
  );
}