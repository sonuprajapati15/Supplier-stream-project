import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ListingPage from "./pages/ListingPage";
import DropdownPage from "./pages/DropdownPage";
import TripPage from "./pages/TripPage";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/listing" element={<ListingPage />} />
        <Route path="/dropdown" element={<DropdownPage />} />
        <Route path="/trip" element={<TripPage />} />
      </Routes>
      <Footer />
    </>
  );
}