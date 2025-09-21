import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/header.css";
import "../css/theme-toggle.css";
import logo from './../assets/logo.png';


const Header: React.FC = () => {
  const location = useLocation();
  const navActive = (to: string) => (location.pathname === to ? "active" : "");
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo-area">
          <img src={logo} alt="E-travel" className="logo-img" />
        </Link>
        <nav className="main-nav">
          <Link to="/" className={navActive("/")}>Book</Link>
          <Link to="/trips" className={navActive("/trips")}>Trips</Link>
          <div className="nav-dropdown">
            <span>Tools ▼</span>
            <div className="dropdown-content">
              <a href="#">Add User</a>
              <a href="#">Approve User</a>
              <a href="#">Travel Policy</a>
              <a href="#">Travel Group</a>
              <a href="#">Point of Sale</a>
            </div>
          </div>
        </nav>
        <div className="header-right">
          <a href="#" className="help-link">Help</a>
          <a href="#" className="feedback-link">Feedback</a>
          <span className="user-info">
            <span>
              FlightUX Transformation
              <br />
              Sonu Prajapati
            </span>
            <span className="user-avatar">👤</span>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;