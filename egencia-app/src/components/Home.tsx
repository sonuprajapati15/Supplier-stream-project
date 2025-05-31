import React, {useState} from "react";
import FlightSearch from "./FlightSearch";
import "../css/theme-toggle.css";
import "../css/home-page.css";
import "../css/home-widgets.css";
import "../css/tabs.css";
import "../css/variables.css";
import "../css/index.css";

const Home: React.FC = () => {
    const [tab, setTab] = useState<"flights" | "hotels" | "trains" | "cars">("flights");

    return (
        <div className="home-page">
            <div className="tabs">
                {[
                    {name: "flights", icon: "✈️"},
                    {name: "hotels", icon: "🏨"},
                    {name: "trains", icon: "🚆"},
                    {name: "cars", icon: "🚗"}
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
                    <div className="trip-cards">
                        <div className="trip-card">
                            <img src="/trip1.jpg" alt="Portland"/>
                            <div>
                                <strong>Portland</strong>
                                <div>Fri, May 30, 2025</div>
                                <button>Add to trip</button>
                            </div>
                        </div>
                        <div className="trip-card">
                            <img src="/trip2.jpg" alt="Mexico City"/>
                            <div>
                                <strong>Mexico City</strong>
                                <div>Wed, Sep 10, 2025</div>
                                <button>Add to trip</button>
                            </div>
                        </div>
                    </div>
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