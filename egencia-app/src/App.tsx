import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import HotelListing from "./components/hotel/HotelListing";
import FlightListing from "./components/flight/FlightListing";
import FlightCheckoutPage from "./components/checkout/FlightCheckout";
import TripsPage from "./components/trips/TripsPage";
import FlightBookingDetailPage from "./components/flight/FlightBookingDetailPage"; // add when you migrate Trips

const App: React.FC = () => (
    <Router>
        <div className="app-outer">
            <Header/>
            <main style={{flex: 1, overflow: "auto", marginBottom: "60px"}}>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/flight/listing" element={<FlightListing/>}/>
                    <Route path="/checkout/flight" element={<FlightCheckoutPage/>}/>
                    <Route path="/hotel/listing" element={<HotelListing/>}/>
                    <Route path="/trip-detail/booking" element={<FlightBookingDetailPage/>}/> <Route
                    path="/trips" element={<TripsPage/>}/>
                    {/* Add more routes as you migrate more components */}
                </Routes>
            </main>
            <Footer/>
        </div>
    </Router>
);

export default App;