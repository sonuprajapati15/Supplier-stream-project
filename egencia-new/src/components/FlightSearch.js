import { createElement as h, useState } from "react";
import { useNavigate } from "react-router-dom";

const tripTypes = ["One way", "Round trip", "Multi city"];
const cabinClasses = ["Economy", "Business"];

export function FlightSearch() {
  const [tripType, setTripType] = useState(tripTypes[1]);
  const [cabin, setCabin] = useState(cabinClasses[0]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const navigate = useNavigate();

  async function fetchCities(keyword, setSuggestions, fromValue) {
    // Simulate API call
    if (!keyword && keyword.length >=2 && keyword.length > 10) return setSuggestions([]);
    let fetchCityUrl = `http://localhost:9000/supplier/stream/all/cities?keyword=${encodeURIComponent(keyword)}`;
    if(fromValue){
      fetchCityUrl +=`&from=${encodeURIComponent(fromValue)}`;
    }
    let res = await fetch(fetchCityUrl);
    let data = await res.json();
    setSuggestions(data.cities);
  }

  function onSearch(e) {
    e.preventDefault();
    navigate("/listing?from=" + encodeURIComponent(from) +
      "&to=" + encodeURIComponent(to) +
      "&date=" + encodeURIComponent(date) +
      "&tripType=" + encodeURIComponent(tripType) +
      "&cabin=" + encodeURIComponent(cabin)
    );
  }

  return h('form', { className: "flight-search", onSubmit: onSearch }, [
    h('div', { className: "flight-search-filters" }, [
      h('select', {
        value: tripType,
        onChange: e => setTripType(e.target.value)
      }, tripTypes.map(t =>
        h('option', { key: t, value: t }, t)
      )),
      h('select', {
        value: cabin,
        onChange: e => setCabin(e.target.value)
      }, cabinClasses.map(c =>
        h('option', { key: c, value: c }, c)
      ))
    ]),
    h('div', { className: "flight-search-inputs" }, [
      h('div', { className: "input-autocomplete" }, [
        h('input', {
          type: "text",
          placeholder: "Leaving from",
          value: from,
          onInput: e => {
            setFrom(e.target.value);
            fetchCities(e.target.value, setFromSuggestions);
          },
          autoComplete: "off"
        }),
        !!fromSuggestions.length && h('ul', { className: "suggestions" }, 
          fromSuggestions.map(s =>
            h('li', {
              key: s,
              onClick: () => {
                setFrom(s);
                setFromSuggestions([]);
              }
            }, s)
          )
        )
      ]),
      h('div', { className: "input-autocomplete" }, [
        h('input', {
          type: "text",
          placeholder: "Going to",
          value: to,
          onInput: (e) => {
            setTo(e.target.value);
            fetchCities(e.target.value, setToSuggestions, from);
          },
          autoComplete: "off"
        }),
        !!toSuggestions.length && h('ul', { className: "suggestions" }, 
          toSuggestions.map(s =>
            h('li', {
              key: s,
              onClick: () => {
                setTo(s);
                setToSuggestions([]);
              }
            }, s)
          )
        )
      ]),
      h('input', {
        type: "date",
        placeholder: "Date",
        value: date,
        onChange: e => setDate(e.target.value)
      })
    ]),
    h('button', { type: "submit", className: "search-btn" }, "Search flights")
  ]);
}