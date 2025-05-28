import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingDetails from "../components/BookingDetails.jsx";
import { fetchAllBookings } from "../api/bookings.js";
import "../styles/booking.css";

export default function Booking() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    fetchAllBookings().then((all) => {
      setBooking(all.find((b) => b.id === id));
    });
  }, [id]);

  return (
    <div className="eg-booking-page">
      <h2>Booking Details</h2>
      {booking ? <BookingDetails booking={booking} /> : <div>Loading...</div>}
    </div>
  );
}