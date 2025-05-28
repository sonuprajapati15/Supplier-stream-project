import React, { useState } from "react";
          import { Link, useNavigate } from "react-router-dom";
          import "../styles/header.css";
          import Logo from "./Logo.jsx";

          export default function Header() {
            const [dropdownOpen, setDropdownOpen] = useState(false);
            const navigate = useNavigate();
            return (
              <header className="eg-header">
                <div className="eg-header-left" onClick={() => navigate("/")}>
                  <Logo />
                </div>
                <nav className="eg-header-nav">
                  <Link to="/" className="eg-nav-link">Book</Link>
                  <Link to="/trips" className="eg-nav-link">Trips</Link>
                  <div
                    className="eg-nav-link eg-nav-dropdown"
                    onClick={() => setDropdownOpen((open) => !open)}
                    tabIndex={0}
                    onBlur={() => setDropdownOpen(false)}
                  >
                    Tools ▼
                    {dropdownOpen && (
                      <div className="eg-dropdown-menu">
                        <Link to="/add-user" className="eg-dropdown-item">Add User</Link>
                        <Link to="/authenticate-user" className="eg-dropdown-item">Authenticate User</Link>
                        <Link to="/add-admin" className="eg-dropdown-item">Add Admin</Link>
                        <Link to="/add-policy" className="eg-dropdown-item">Add Policy</Link>
                        <Link to="/edit-policy" className="eg-dropdown-item">Edit Policy</Link>
                        <Link to="/other-tools" className="eg-dropdown-item">Other Tools</Link>
                      </div>
                    )}
                  </div>
                </nav>
                <div className="eg-header-right">
                  <span className="eg-header-link">Help</span>
                  <span className="eg-header-link">Feedback</span>
                  <span className="eg-header-profile">
                    <span className="eg-header-profile-circle">P</span>
                    <span className="eg-header-profile-label">FlightMIX Transformation<br /><small>DEMO Egencia Air Demo</small></span>
                  </span>
                </div>
              </header>
            );
          }