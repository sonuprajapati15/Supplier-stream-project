import { createElement as h, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Simulated result data
const fakeResults = [
  {
    id: 1,
    dep: "11:00 PM",
    arr: "1:25 AM",
    from: "DEL",
    to: "BOM",
    airline: "Air India AI 9466",
    duration: "2 hr 25 min",
    price: "$197",
    stops: "Nonstop"
  },
  {
    id: 2,
    dep: "10:00 PM",
    arr: "12:15 AM",
    from: "DEL",
    to: "BOM",
    airline: "Air India AI 2999",
    duration: "2 hr 15 min",
    price: "$208",
    stops: "Nonstop"
  }
];

export function Listing() {
  const [results, setResults] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // Simulate API call, parse query params to fetch results
    setResults(fakeResults);
  }, [location.search]);

  return h('div', { className: "listing-page" }, [
    h('form', { className: "listing-search-bar" }, [
      // You can reuse the FlightSearch inputs here if you want
      h('input', { type: "text", placeholder: "Leaving from", defaultValue: "" }),
      h('input', { type: "text", placeholder: "Going to", defaultValue: "" }),
      h('input', { type: "date", placeholder: "Date" }),
      h('button', { type: "submit" }, "Search flights")
    ]),
    h('div', { className: "listing-options" }, [
      h('span', {}, "Sort by:"),
      h('select', {}, [
        h('option', {}, "Smart Mix"),
        h('option', {}, "Cheapest"),
        h('option', {}, "Fastest")
      ])
    ]),
    h('div', { className: "flight-results" }, 
      results.map(r =>
        h('div', { key: r.id, className: "flight-result" }, [
          h('div', { className: "flight-times" }, [
            h('strong', {}, r.dep), " → ", h('strong', {}, r.arr),
            h('span', { className: "flight-route" }, ` ${r.from} – ${r.to}`)
          ]),
          h('div', { className: "flight-details" }, [
            r.airline, " | ", r.duration, " | ", r.stops
          ]),
          h('div', { className: "flight-price" }, r.price),
          h('button', { className: "details-btn" }, "View details")
        ])
      )
    )
  ]);
}