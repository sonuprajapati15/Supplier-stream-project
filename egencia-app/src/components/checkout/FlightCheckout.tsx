import React, {useEffect, useState} from "react";
import "../../css/checkout-page.css";

// Utility to get URL params
function getUrlParam(key: string) {
    return new URLSearchParams(window.location.search).get(key);
}

// Choose API endpoint based on vendor
function getApiUrl(vendor: string, flightId: string, fareType: string, fareId: string) {
    return `http://localhost:9000/supplier/flightSearchById?flightId=${flightId}&fareType=${fareType}&fareId=${fareId}&provider=${vendor}`;
}

function getFlightData() {
    const flightId = getUrlParam("flightId") ?? "";
    const fareType = getUrlParam("fareType") ?? "";
    const fareId = getUrlParam("fareId") ?? "";
    const vendor = getUrlParam("provider") ?? "";
    return fetch(getApiUrl(vendor, flightId, fareType, fareId)).then((res) => res.json());
}

const FlightCheckoutPage: React.FC = () => {
    const [flight, setFlight] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [showPassengerModal, setShowPassengerModal] = useState(false);
    const [progress, setProgress] = useState(0);
    const [booking, setBooking] = useState(false);

    const flightId = getUrlParam("flightId") ?? "";
    const fareType = getUrlParam("fareType") ?? "";
    const fareId = getUrlParam("fareId") ?? "";
    const vendor = getUrlParam("provider") ?? "";

    useEffect(() => {
        const apiUrl = getApiUrl(vendor, flightId, fareType, fareId);
        if (!apiUrl) return;
        setLoading(true);
        getFlightData().then((data) => {
            setFlight(data);
            setLoading(false);
        });
    }, [flightId, fareType, fareId, vendor]);

    useEffect(() => {
        if (!booking) return;
        let stage = 0;
        const interval = setInterval(() => {
            setProgress((old) => {
                if (old >= 5) {
                    clearInterval(interval);
                    setTimeout(() => {
                        window.location.href = "/trips";
                    }, 900);
                    return 5;
                }
                return old + 1;
            });
        }, 600);
        return () => clearInterval(interval);
    }, [booking]);

    if (loading || !flight) {
        return <div className="checkout-loading">Loading flight data...</div>;
    }

    const chooseFare = flight.chooseFare || {};

    return (
        <div className="checkout-layout">
            <div className="checkout-left">
                <h2 className="checkout-title">Complete your booking</h2>
                <div className="checkout-date-traveler">
                            <span>
                                <span role="img"
                                      aria-label="calendar">📅</span> {new Date(flight.date).toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric",
                                weekday: "short"
                            })}
                            </span>
                    <span className="checkout-divider">|</span>
                    <span>
                                <span role="img" aria-label="person">🧑‍💼</span> 1 Traveler
                            </span>
                </div>
                <div className="checkout-card">
                    <div className="checkout-card-header">
                        <span role="img" aria-label="seat">💺</span> Seat selection
                    </div>
                    <div className="checkout-seat-img">
                        <img src={flight.image} alt="Seat selection"/>
                    </div>
                    <div className="checkout-seat-segments">
                        <div>Geneva - Mumbai | Not available</div>
                    </div>
                    <div className="checkout-seat-warning">
                        <span className="checkout-warning-icon">⚠️</span>
                        <div>
                            You can only select your seat at check-in.<br/>
                            To avoid getting a middle seat you can select a seat. Seats are available for a charge.
                            Check the seat map for more details, and contact your travel consultant after completing
                            your booking.
                        </div>
                    </div>
                    <button className="checkout-secondary-btn" disabled>View seat</button>
                </div>
                <div className="checkout-card">
                    <div className="checkout-card-header">
                        <span role="img" aria-label="baggage">🧳</span> Baggage Allowance
                    </div>
                    <div className="checkout-baggage-list">
                        <div className="checkout-baggage-item">
                            <span className="checkout-baggage-icon">👜</span>
                            <span>
                                        1 cabin bag<br/>
                                        <span className="checkout-baggage-desc">Included with your fare</span>
                                    </span>
                        </div>
                        <div className="checkout-baggage-item">
                            <span className="checkout-baggage-icon">🧳</span>
                            <span>
                                        1 checked bag<br/>
                                        <span className="checkout-baggage-desc">Included with your fare</span>
                                    </span>
                        </div>
                    </div>
                </div>
                <button className="checkout-primary-btn" onClick={() => setShowPassengerModal(true)}>
                    Continue to checkout
                </button>
            </div>
            <div className="checkout-right">
                <div className="flight-summary-card">
                    <div className="flight-summary-img">
                        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=compress&w=700"
                             alt="Paris"/>
                    </div>
                    <div className="flight-summary-content">
                        <div className="flight-summary-title">
                            Your flight summary <a className="flight-summary-change" href="/search">Change</a>
                        </div>
                        <div className="flight-summary-date">
                            Departure <b>{new Date(flight.date).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            weekday: "short"
                        })}</b> | {flight.cabinClass}
                        </div>
                        <div className="flight-summary-row">
                            <img src={flight.airline?.logo} alt={flight.airline?.name}
                                 className="flight-summary-airline"/>
                            <div>
                                <b>{flight.airline?.name}</b> • Duration: {flight.duration}
                                <div>
                                    <span>{flight.departureTime}</span>
                                    <span className="flight-summary-dot"> • </span>
                                    <span>{flight.from}</span>
                                    <span className="flight-summary-arrow"> → </span>
                                    <span>{flight.to}</span>
                                    <span className="flight-summary-dot"> • </span>
                                    <span>{flight.arrivalTime}</span>
                                </div>
                                <div
                                    className="flight-summary-fareline">{flight.flightNumber} | {flight.flightType}</div>
                            </div>
                        </div>
                        <a href="#" className="flight-summary-details-link">View details &gt;</a>
                    </div>
                </div>
                <div className="checkout-card checkout-price-summary">
                    <div className="checkout-price-title-row">
                        <span>Price summary</span>
                        <a href="#" className="checkout-price-details-link">View details</a>
                    </div>
                    <div className="checkout-card checkout-components-summary">
                        <div className="checkout-components-title-row">
                            <span>Components</span>
                        </div>
                        <div className="checkout-components-list">
                          {Object.entries(chooseFare.components as Record<string, { name: string; price: number }>).map(
                              ([key, component]) => (
                                  <div key={key} className="checkout-component-item">
                                      <span>{component.name}</span>
                                      <span>₹{component.price.toFixed(2)}</span>
                                  </div>
                              )
                          )}
                        </div>
                        <div className="checkout-total-row">
                            <span>Total (Base Price + Components)</span>
                            <span>₹{chooseFare.total_price.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="checkout-price-row">
                        <span>Total amount</span>
                        <span className="checkout-price-amount">
                                    ₹{(chooseFare.total_price ?? flight.price).toLocaleString()}
                                </span>
                    </div>
                </div>
            </div>

            {showPassengerModal && (
                <PassengerModal
                    onClose={() => setShowPassengerModal(false)}
                    onBook={() => {
                        setShowPassengerModal(false);
                        setBooking(true);
                        setProgress(1);
                    }}
                />
            )}

            {booking && <BookingProgress stages={progress}/>}
        </div>
    );
};

const PassengerModal: React.FC<{ onClose: () => void; onBook: () => void }> = ({onClose, onBook}) => {
    const [form, setForm] = useState({name: "", email: "", phone: "", age: ""});
    const [error, setError] = useState<string>("");

    function validate() {
        if (!form.name.trim()) return "Name is required.";
        if (!/^[\w .'-]+$/.test(form.name)) return "Enter a valid name.";
        if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) return "Enter a valid email.";
        if (!form.phone.trim() || !/^\d{10,15}$/.test(form.phone)) return "Enter a valid phone number.";
        if (!form.age.trim() || isNaN(Number(form.age)) || Number(form.age) < 1 || Number(form.age) > 120) return "Enter a valid age.";
        return "";
    }

    function randomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function handleBook() {
        const err = validate();
        if (err) {
            setError(err);
            return;
        }
        const flightId = getUrlParam("flightId") ?? "";
        const fareType = getUrlParam("fareType") ?? "";
        const fareId = getUrlParam("fareId") ?? "";
        const vendor = getUrlParam("provider") ?? "";

       const bookingData: any = {
           userId: "1234",
           name: form.name,
           phone: form.phone,
           email: form.email,
           age: form.age,
           ticketNo: randomInt(100000, 999999).toString(),
           pnrNo: randomInt(100000, 999999).toString(),
           flightId: flightId,
           fareType:fareType,
           fareId: fareId,
           provider: vendor
       };

        fetch("http://localhost:9000/supplier/makeBooking", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookingData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to make booking");
                }
                return response.json();
            })
            .then(() => {
                onBook();
            })
            .catch((error) => {
                console.error("Booking error:", error);
                setError("Failed to make booking. Please try again.");
            });
    }

    return (
        <div className="passenger-modal-overlay">
            <div className="passenger-modal">
                <div className="passenger-modal-header">
                    <span>Passenger details</span>
                    <button onClick={onClose}>&#10005;</button>
                </div>
                <div className="passenger-modal-body">
                    <label>
                        Name
                        <input type="text" value={form.name}
                               onChange={(e) => setForm((v) => ({...v, name: e.target.value}))}/>
                    </label>
                    <label>
                        Email
                        <input type="email" value={form.email}
                               onChange={(e) => setForm((v) => ({...v, email: e.target.value}))}/>
                    </label>
                    <label>
                        Phone Number
                        <input type="tel" value={form.phone}
                               onChange={(e) => setForm((v) => ({...v, phone: e.target.value}))}/>
                    </label>
                    <label>
                        Age
                        <input type="number" min={1} max={120} value={form.age}
                               onChange={(e) => setForm((v) => ({...v, age: e.target.value}))}/>
                    </label>
                    {error && <div className="passenger-modal-error">{error}</div>}
                    <button className="checkout-primary-btn" onClick={handleBook}>
                        Book ticket
                    </button>
                </div>
            </div>
        </div>
    );
};

const STAGES = ["Locking", "Processing", "Confirming", "Finalizing Payment", "Completed"];
const BookingProgress: React.FC<{ stages: number }> = ({stages}) => (
    <div className="booking-progress-overlay">
        <div className="booking-progress-modal">
            <div className="booking-progress-title">Booking your flight...</div>
            <div className="booking-progress-bar">
                {STAGES.map((stage, idx) => (
                    <div key={idx} className={"booking-progress-step" + (stages > idx ? " active" : "")}>
                        <div className="booking-progress-dot"/>
                        <div className="booking-progress-label">{stage}</div>
                    </div>
                ))}
            </div>
            <div className="booking-progress-animation">
                <img src="https://cdn-icons-png.flaticon.com/512/69/69524.png" alt="plane"
                     className="booking-progress-plane"/>
            </div>
        </div>
    </div>
);

export default FlightCheckoutPage;