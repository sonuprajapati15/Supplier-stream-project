import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { streamFlightsSearch } from "../api/flights.js";
import FlightListing from "../components/FlightListing.jsx";
import "../styles/listing.css";

export default function Listing() {
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const date = searchParams.get("date");
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let flightsArr = [];
    const es = streamFlightsSearch(
      { from, to },
      (data) => {
        flightsArr.push(data);
        setFlights([...flightsArr]);
      },
      () => setLoading(false),
      () => setLoading(false)
    );
    return () => es && es.close();
  }, [from, to, date]);

  return (
    <div className="eg-listing-page">
      <h2>Select departing flights</h2>
      {loading ? <div>Loading...</div> : <FlightListing flights={flights} />}
    </div>
  );
}