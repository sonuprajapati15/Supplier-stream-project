import React from "react";
import { useNavigate } from "react-router-dom";
import { makeBooking } from "../api/bookings.js";
import "../styles/modal.css";

export default function FareCategoryModal({ flight, onClose }) {
  const navigate = useNavigate();
  const categories = flight.fareCategories || [{ name: "Economy", price: 500 }];

  const handleSelect = async (category) => {
    try {
      await makeBooking({ flightId: flight.id, category });
      onClose();
      navigate("/trips");
    } catch (e) {
      alert("Failed to book flight.");
    }
  };

  return (
    <div className="eg-modal-bg">
      <div className="eg-modal">
        <button className="eg-modal-close" onClick={onClose}>×</button>
        <h3>Select Fare Category</h3>
        {categories.map((cat, idx) => (
          <div key={idx} className="eg-modal-cat-option">
            <div><b>{cat.name}</b> - ${cat.price}</div>
            <button className="eg-primary-btn" onClick={() => handleSelect(cat)}>Select</button>
          </div>
        ))}
      </div>
    </div>
  );
}