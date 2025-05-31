import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Listing from "./components/Listing";
// import Trips from "./components/Trips"; // add when you migrate Trips

const App: React.FC = () => (
  <Router>
    <div className="app-outer">
      <Header />
      <main style={{ flex: 1, overflow: "auto", marginBottom: "60px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listing" element={<Listing />} />
          {/* <Route path="/trips" element={<Trips />} /> */}
          {/* Add more routes as you migrate more components */}
        </Routes>
      </main>
      <Footer />
    </div>
  </Router>
);

export default App;