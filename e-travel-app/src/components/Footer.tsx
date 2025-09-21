import React from "react";
import "../css/footer.css";
import logo from './../assets/logo.png';


const Footer: React.FC = () => (
    <footer className="footer">
        <div className="footer-logos">
            <img src={logo} alt="E-Travel logo" className="footer-logo"/>
        </div>
        <div className="footer-links">
            <a href="#">E-Travel.com</a>
            <a href="#">Privacy</a>
            <a href="#">Cookie policy</a>
            <a href="#">E-travel promise</a>
            <a href="#">E-travel LLC Terms of use</a>
            <a href="#">Mobile app</a>
            <a href="#">Customer support</a>
        </div>
        <div className="footer-legal">
            © 2025 GBT Travel Services UK Limited
        </div>
    </footer>
);

export default Footer;