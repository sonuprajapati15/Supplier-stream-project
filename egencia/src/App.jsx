import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Listing from "./pages/Listing.jsx";
import Trips from "./pages/Trips.jsx";
import Booking from "./pages/Booking.jsx";
import "./styles/theme.css";

export default function App() {
  return (
    <div className="eg-app-bg">
      <Header />
      <main className="eg-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listing" element={<Listing />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/booking/:id" element={<Booking />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}