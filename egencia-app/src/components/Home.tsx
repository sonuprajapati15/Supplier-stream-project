import React, {useState, useEffect} from "react";
import FlightSearch from "./flight/FlightSearch";
import "../css/theme-toggle.css";
import "../css/home-page.css";
import "../css/home-widgets.css";
import "../css/tabs.css";
import "../css/variables.css";
import "../css/index.css";

const Home: React.FC = () => {
    const [tab, setTab] = useState<"flights" | "hotels" | "trains" | "cars">("flights");
    const [upcomingTrips, setUpcomingTrips] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:9000/supplier/stream/all/booking?userId=1234")
            .then((res) => res.json())
            .then((data) => {
                console.log("upcoming trip data :" + JSON.stringify(data));
                const upcoming = data.upcoming || [];
                const bookings = upcoming.flat(2); // Flatten the nested arrays to extract all booking objects
                setUpcomingTrips(bookings.slice(0, 3)); // Pick top 3 entries
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="home-page">
            <div className="tabs">
                {[
                    {name: "flights", icon: "✈️"},
                    {name: "hotels", icon: "🏨"},
                    {name: "trains", icon: "🚆"},
                    {name: "cars", icon: "🚗"},
                ].map(({name, icon}) => (
                    <button
                        key={name}
                        className={`tab-btn${tab === name ? " active" : ""}`}
                        onClick={() => setTab(name as typeof tab)}
                    >
                        <span className="tab-icon" style={{marginRight: 6}}>{icon}</span>
                        {name.charAt(0).toUpperCase() + name.slice(1)}
                    </button>
                ))}
            </div>
            <div className="tab-content">
                {tab === "flights" ? <FlightSearch/> : <div className="not-implemented">Coming soon...</div>}
            </div>
            <div className="home-widgets">
                <section className="upcoming-trips">
                    <h2>Upcoming trips</h2>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                       <div className="trip-cards">
                            {upcomingTrips.map((trip, index) => (
                                <div className="upcoming-trip-card" key={index}>
                                    <img src={trip.cityImage || trip.bgImage} alt={trip.to} style={{marginLeft: "20px", marginTop: "12px"}}/>
                                    <div style={{marginLeft: "30px", marginTop: "12px"}}>
                                        {trip.from && trip.to ? (
                                            <>
                                                <strong>{trip.from}</strong> → <strong>{trip.to}</strong>
                                            </>
                                        ) : (
                                            <strong>{trip.place}</strong>
                                        )}
                                        <div>{new Date(trip.date).toLocaleDateString()}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
                <section className="recommended">
                    <h2>Recommended for you</h2>
                    <div className="recommendation">
                        <span className="rec-icon">🟡</span>
                        <div>
                            <strong>New Group Trips feature</strong>
                            <div>This feature helps organize travel for small groups in your organization.</div>
                            <a href="#">Check it out</a>
                        </div>
                    </div>
                    <div className="recommendation">
                        <span className="rec-icon">🟡</span>
                        <div>
                            <strong>Travel with confidence</strong>
                            <div>See the latest travel advisories, restrictions and news updates.</div>
                            <a href="#">Visit the Egencia Travel Advisor</a>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;