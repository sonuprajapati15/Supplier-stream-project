import React, {useState, useRef} from "react";
import {useNavigate} from "react-router-dom";
import "../../css/flight-search.css";

const tripTypes = ["One way", "Round trip", "Multi city"];
const cabinClasses = ["Economy", "Business"];
const departTimes = ["Anytime", "Morning", "Afternoon", "Evening", "Night"];

const icons = {
    plane: (
        <svg width="24" height="24" fill="none" stroke="#1a232f" strokeWidth="2" strokeLinecap="round"
             strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M2.5 19L21 12.5M2.5 19l3-7 8-6.5m-11 13 2-2m2-2 2-2"></path>
        </svg>
    ),
    swap: (
        <svg width="24" height="24" fill="none" stroke="#1a232f" strokeWidth="2" strokeLinecap="round"
             strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M7 7h10M7 7l3-3M7 7l3 3M17 17H7m10 0l-3 3m3-3l-3-3"></path>
        </svg>
    ),
    calendar: (
        <svg width="24" height="24" fill="none" stroke="#1a232f" strokeWidth="2" strokeLinecap="round"
             strokeLinejoin="round" viewBox="0 0 24 24">
            <rect x="3" y="5" width="18" height="16" rx="2"/>
            <path d="M16 3v4M8 3v4M3 9h18"/>
        </svg>
    ),
    clock: (
        <svg width="24" height="24" fill="none" stroke="#1a232f" strokeWidth="2" strokeLinecap="round"
             strokeLinejoin="round" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9"/>
            <path d="M12 7v5l3 3"/>
        </svg>
    ),
    user: (
        <svg width="18" height="18" fill="none" stroke="#1a232f" strokeWidth="2" strokeLinecap="round"
             strokeLinejoin="round" viewBox="0 0 24 24">
            <circle cx="12" cy="7" r="4"/>
            <path d="M5.5 21c.7-3.5 12.3-3.5 13 0"/>
        </svg>
    ),
    seat: (
        <svg width="20" height="20" fill="none" stroke="#1a232f" strokeWidth="2" strokeLinecap="round"
             strokeLinejoin="round" viewBox="0 0 24 24">
            <rect x="5" y="11" width="14" height="7" rx="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
    ),
};

const FlightSearch: React.FC = () => {
    const toggleCalendar = () => {
        setIsCalendarVisible(!isCalendarVisible);
    };
    const [tripType, setTripType] = useState<string>(tripTypes[0]);
    const [cabin, setCabin] = useState<string>(cabinClasses[0]);
    const [from, setFrom] = useState<string>("");
    const [to, setTo] = useState<string>("");
    const [depart, setDepart] = useState<string>(departTimes[0]);
    const [fromSuggestions, setFromSuggestions] = useState<string[]>([]);
    const [toSuggestions, setToSuggestions] = useState<string[]>([]);
    const [fromFocused, setFromFocused] = useState(false);
    const [toFocused, setToFocused] = useState(false);
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);
    const [date, setDate] = useState<string>("");

    // Validation state
    const [validation, setValidation] = useState<{
        from?: string;
        to?: string;
        date?: string;
        alert?: string;
    }>({});

    const navigate = useNavigate();
    const fromInputRef = useRef<HTMLInputElement>(null);
    const toInputRef = useRef<HTMLInputElement>(null);

    // Simulate city suggestion API with your backend
    const fetchCities = async (
        keyword: string,
        setSuggestions: React.Dispatch<React.SetStateAction<string[]>>,
        fromCity: string = ""
    ): Promise<void> => {
        if (!keyword || keyword.length < 3 || keyword.length > 40) {
            setSuggestions([]);
            return;
        }
        let suggestionUrl = `http://localhost:9000/supplier/stream/all/cities?keyword=${encodeURIComponent(keyword)}`;
        if (fromCity && keyword !== fromCity && fromCity.length > 2) {
            suggestionUrl += `&from=${encodeURIComponent(fromCity)}`;
        }
        try {
            const res = await fetch(suggestionUrl);
            const data = await res.json();
            setSuggestions(data.cities || []);
        } catch (error) {
            setSuggestions([]);
        }
    };

    const swapCities = () => {
        setFrom(to);
        setTo(from);
        setFromSuggestions([]);
        setToSuggestions([]);
        fromInputRef.current?.focus();
    };

    const onSearch = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        let newValidation: typeof validation = {};

        // Validate fields
        if (!from || from.length < 3) {
            newValidation.from = "Required";
            newValidation.alert = "Please fill in Leaving From field.";
        }
        if (!to || to.length < 3) {
            newValidation.to = "Required";
            newValidation.alert = "Please fill in Going To field.";
        }
        if (from === to) {
            newValidation.from = "Required";
            newValidation.to = "Required";
            newValidation.alert = "Leaving From and Going To cannot be the same.";
        }
        if (!date || date.length < 10 || date.length > 10 || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            newValidation.date = "Required";
            newValidation.alert = "Please enter a valid date in the format YYYY-MM-DD.";
        } else if (new Date(date) < new Date()) {
            newValidation.date = "Required";
            newValidation.alert = "Date cannot be in the past.";
        } else if (new Date(date) > new Date(new Date().setFullYear(new Date().getFullYear() + 1))) {
            newValidation.date = "Required";
            newValidation.alert = "Date cannot be more than 1 year in the future.";
        }

        setValidation(newValidation);

        if (Object.keys(newValidation).length > 0) {
            // Don't proceed if there are validation errors
            return;
        }

        navigate(
            `/flight/listing?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}&tripType=${encodeURIComponent(tripType)}&cabin=${encodeURIComponent(cabin)}&depart=${encodeURIComponent(depart)}`
        );
        window.location.reload();
    };

    return (
        <form
            className="fs-box"
            onSubmit={onSearch}
            autoComplete="off">
            <div className="fs-row">
                <div className="fs-chip-group">
                    <select className="fs-chip" value={tripType} onChange={e => setTripType(e.target.value)}>
                        {tripTypes.map((type) => (
                            <option value={type} key={type}>{type}</option>
                        ))}
                    </select>
                    <select className="fs-chip" value={cabin} onChange={e => setCabin(e.target.value)}>
                        {cabinClasses.map((type) => (
                            <option value={type} key={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <button type="button" className="fs-chip fs-chip-link">
                    {icons.user} <span>My travel info</span>
                </button>
            </div>
            <div className="fs-row-input">
                <div className="fs-card-group">
                    <div className={`fs-card input-autocomplete${validation.from ? " fs-invalid" : ""}`}>
                        <div className="fs-card-icon">{icons.plane}</div>
                        <div className="fs-card-content">
                            <input
                                ref={fromInputRef}
                                type="text"
                                placeholder="Leaving from"
                                value={from}
                                onFocus={() => setFromFocused(true)}
                                onBlur={() => setTimeout(() => setFromFocused(false), 150)}
                                onChange={(e) => {
                                    setFrom(e.target.value);
                                    fetchCities(e.target.value, setFromSuggestions, "");
                                    if (validation.from) setValidation(v => ({
                                        ...v,
                                        from: undefined,
                                        alert: undefined
                                    }));
                                }}
                                autoComplete="off"
                            />
                            {fromSuggestions.length > 0 && fromFocused && (
                                <ul className="fs-suggestions">
                                    {fromSuggestions.map((s) => (
                                        <li
                                            key={s}
                                            onMouseDown={() => {
                                                setFrom(s);
                                                setFromSuggestions([]);
                                                toInputRef.current?.focus();
                                            }}
                                        >
                                            {s}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        {validation.from && <span className="fs-required">*</span>}
                    </div>
                    <button type="button" className="fs-swap" tabIndex={-1} aria-label="Swap cities"
                            onClick={swapCities}>
                        {icons.swap}
                    </button>
                    <div className={`fs-card input-autocomplete${validation.to ? " fs-invalid" : ""}`}>
                        <div className="fs-card-icon">{icons.plane}</div>
                        <div className="fs-card-content">
                            <input
                                ref={toInputRef}
                                type="text"
                                placeholder="Going to"
                                value={to}
                                onFocus={() => setToFocused(true)}
                                onBlur={() => setTimeout(() => setToFocused(false), 150)}
                                onChange={(e) => {
                                    setTo(e.target.value);
                                    fetchCities(e.target.value, setToSuggestions, from);
                                    if (validation.to) setValidation(v => ({...v, to: undefined, alert: undefined}));
                                }}
                                autoComplete="off"
                            />
                            {toSuggestions.length > 0 && toFocused && (
                                <ul className="fs-suggestions">
                                    {toSuggestions.map((s) => (
                                        <li
                                            key={s}
                                            onMouseDown={() => {
                                                setTo(s);
                                                setToSuggestions([]);
                                            }}
                                        >
                                            {s}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        {validation.to && <span className="fs-required">*</span>}
                    </div>
                    <div className={`fs-card-calender${validation.date ? " fs-invalid" : ""}`} onClick={toggleCalendar}>
                        <div className="fs-card-icon">{icons.calendar}</div>
                        <div className="fs-card-content-cal">
                            {isCalendarVisible ? (
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => {
                                        setDate(e.target.value);
                                        if (validation.date) setValidation(v => ({
                                            ...v,
                                            date: undefined,
                                            alert: undefined
                                        }));
                                    }}
                                    className="fs-date-input"
                                    onClick={(e) => e.stopPropagation()} // Prevent parent click event
                                />
                            ) : (
                                <span className="fs-date-value" onClick={(e) => e.stopPropagation()}>
                                    {date
                                        ? new Date(date).toLocaleDateString(undefined, {
                                            month: "short",
                                            day: "numeric",
                                        })
                                        : "Select a date"}
                                </span>
                            )}
                        </div>
                        {validation.date && <span className="fs-required">*</span>}
                    </div>
                    <div className="fs-card-other">
                        <div className="fs-card-icon">{icons.clock}</div>
                        <div className="fs-card-content">
                            <select className="fs-select" value={depart} onChange={e => setDepart(e.target.value)}>
                                {departTimes.map((d) => (
                                    <option value={d} key={d}>{d}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            {validation.alert && (
                <div className="fs-validation-alert">
                    {validation.alert}
                </div>
            )}
            <button type="submit" className="fs-search-btn">
                SEARCH
            </button>
        </form>
    );
};

export default FlightSearch;