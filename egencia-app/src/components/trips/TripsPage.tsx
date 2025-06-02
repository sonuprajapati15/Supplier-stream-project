import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import "../../css/trips-page.css";

const TABS = [
    {key: "upcoming", label: "UPCOMING", icon: "🗓️"},
    {key: "completed", label: "COMPLETED", icon: "📅"},
    {key: "cancelled", label: "CANCELLED", icon: "✖️"},
];

function formatDate(dateStr: string) {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, {weekday: "short", day: "2-digit", month: "short", year: "numeric"});
}

const TripsPage: React.FC = () => {
    const [tab, setTab] = useState("upcoming");
    const [data, setData] = useState<{ [key: string]: any[] }>({upcoming: [], completed: [], cancelled: []});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const bgClass = `trips-bg-${tab}`;

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:9000/supplier/stream/all/booking?userId=1234")
            .then((res) => res.json())
            .then((apiData) => {
                setData({
                    upcoming: apiData.upcoming || [],
                    completed: apiData.complete || [],
                    cancelled: apiData.cancelled || [],
                });
                setLoading(false);
            });
    }, []);

    return (
        <div className={`trips-page ${bgClass}`}>
            <div className="trips-tabs">
                {TABS.map(({key, label, icon}) => (
                    <button
                        key={key}
                        className={`trips-tab-btn${tab === key ? " active" : ""}`}
                        onClick={() => setTab(key)}
                    >
                        <span className="trips-tab-icon">{icon}</span>
                        {label}
                        {tab === key && <span className="trips-tab-underline"/>}
                    </button>
                ))}
            </div>
            <div className="trips-list">
                {loading && <div className="trips-card trips-loading">Loading trips...</div>}
                {!loading && data[tab]?.length === 0 && (
                    <div className="trips-card trips-empty">No {tab} trips found.</div>
                )}
                {!loading &&
                    data[tab]?.map((trip: any, i: number) => (
                        <div className="trips-card-outer" key={trip._id || trip.flightId || i}>
                            <img
                                src={trip.bgImage}
                                alt="Description"
                                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "20px" }}
                            />
                            <div className="trips-card">
                                <div className="trips-card-header">
                                    <span className="trips-card-icon">✈️</span>
                                    <span className="trips-card-title">{trip.from} → {trip.to}</span>
                                    {tab === "upcoming" && (
                                        <span className="trips-badge trips-badge-upcoming">
                                                                        {trip.travel_date
                                                                            ? `In ${Math.max(
                                                                                1,
                                                                                Math.round(
                                                                                    (new Date(trip.travel_date).getTime() - Date.now()) /
                                                                                    (1000 * 60 * 60 * 24)
                                                                                )
                                                                            )} Days`
                                                                            : ""}
                                                                    </span>
                                    )}
                                    {tab === "cancelled" && (
                                        <span className="trips-badge trips-badge-cancelled">Refund Processed</span>
                                    )}
                                    {tab === "completed" && (
                                        <span className="trips-badge trips-badge-completed">Completed</span>
                                    )}
                                </div>
                                <div className="trips-card-info">
                                    <div className="trips-card-info-row">
                                        {trip.cabinClass && <>Class: <b>{trip.cabinClass}</b></>}
                                    </div>
                                    <div className="trips-card-info-row">
                                        Booking ID: <b>{trip.ticketNo || trip.flightId}</b>
                                    </div>
                                    <div className="trips-card-dates">
                                        <div>
                                            <b>From</b><br/>
                                            {formatDate(trip.date)} {trip.departureTime}<br/>
                                            {trip.from}
                                        </div>
                                        <div>
                                            <b>To</b><br/>
                                            {formatDate(trip.date)} {trip.arrivalTime}<br/>
                                            {trip.to}
                                        </div>
                                        <div>
                                            <b>Flight</b><br/>
                                            {trip.airline?.name} ({trip.flightNumber})
                                        </div>
                                    </div>
                                    {tab === "cancelled" && (
                                        <div className="trips-card-error">Your flight booking has been cancelled.</div>
                                    )}
                                </div>
                            </div>
                            <div className="trips-card-actions">
                                {tab !== "completed" && (
                                    <button
                                        className="trips-action-btn-primary"
                                        onClick={() => navigate(`/trip-detail/booking?ticketNo=${trip.ticketNo}`)}>
                                        Manage Booking
                                    </button>
                                )}
                                {tab === "completed" && (
                                    <>
                                        <button
                                            className="trips-action-btn-primary"
                                            onClick={() => navigate(`/trip-detail/booking?ticketNo=${trip.ticketNo}`)}>
                                            View Booking
                                        </button>
                                        <button className="trips-action-btn">Download Invoice</button>
                                    </>
                                )}
                                {tab === "upcoming" && (
                                    <button className="trips-action-btn">Cancel Booking</button>
                                )}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default TripsPage;