import React, { useState } from "react";
import SuggestionList from "./SuggestionList.jsx";
import { useNavigate } from "react-router-dom";
import { fetchCitySuggestions } from "../api/cities.js";
import "../styles/flightform.css";

export default function FlightForm() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [travelClass, setTravelClass] = useState("Economy");
  const navigate = useNavigate();

  const handleInputChange = async (setValue, setSuggestions, value, isFrom) => {
    setValue(value);
    if (value.length > 2) {
      try {
        const suggestions = await fetchCitySuggestions({ keyword: value, from: isFrom ? undefined : from });
        setSuggestions(suggestions.cities || []);
        if (isFrom) setShowFromSuggestions(true);
        else setShowToSuggestions(true);
      } catch {
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
      if (isFrom) setShowFromSuggestions(false);
      else setShowToSuggestions(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (from && to) {
      navigate(`/listing?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}&passengers=${passengers}&class=${encodeURIComponent(travelClass)}`);
    }
  };

  return (
    <form className="eg-flight-form" onSubmit={handleSubmit}>
      <div className="eg-form-row">
        <div className="eg-form-group">
          <label>From</label>
          <input
            value={from}
            placeholder="City or airport"
            onChange={(e) => handleInputChange(setFrom, setFromSuggestions, e.target.value, true)}
            onFocus={() => fromSuggestions.length && setShowFromSuggestions(true)}
            onBlur={() => setTimeout(() => setShowFromSuggestions(false), 200)}
            autoComplete="off"
          />
          {showFromSuggestions && <SuggestionList suggestions={fromSuggestions} onSelect={(city) => { setFrom(city); setShowFromSuggestions(false); }} />}
        </div>
        <div className="eg-form-group">
          <label>To</label>
          <input
            value={to}
            placeholder="City or airport"
            onChange={(e) => handleInputChange(setTo, setToSuggestions, e.target.value, false)}
            onFocus={() => toSuggestions.length && setShowToSuggestions(true)}
            onBlur={() => setTimeout(() => setShowToSuggestions(false), 200)}
            autoComplete="off"
          />
          {showToSuggestions && <SuggestionList suggestions={toSuggestions} onSelect={(city) => { setTo(city); setShowToSuggestions(false); }} />}
        </div>
        <div className="eg-form-group">
          <label>Date</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>
        <div className="eg-form-group">
          <label>Passengers</label>
          <input type="number" min={1} max={9} value={passengers} onChange={e => setPassengers(e.target.value)} />
        </div>
        <div className="eg-form-group">
          <label>Class</label>
          <select value={travelClass} onChange={e => setTravelClass(e.target.value)}>
            <option>Economy</option>
            <option>Premium Economy</option>
            <option>Business</option>
            <option>First</option>
          </select>
        </div>
        <button className="eg-primary-btn" type="submit" style={{ marginTop: '25px' }}>Search flights</button>
      </div>
    </form>
  );
}