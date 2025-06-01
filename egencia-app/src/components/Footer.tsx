import React from "react";
import "../css/footer.css";

let logo = "https://cdn.cookielaw.org/logos/60f0e903-3e4b-443a-900a-750c059d3018/346bcd31-5bcd-4695-bcf3-ea6b421f7719/65af117f-d271-4c6f-9ec7-0dbb00165997/Amex_GBT_Egencia-Chirp_RGB.png"

const Footer: React.FC = () => (
    <footer className="footer">
        <div className="footer-logos">
            <img src={logo} alt="Egencia logo" className="footer-logo"/>
        </div>
        <div className="footer-links">
            <a href="#">Egencia.com</a>
            <a href="#">Privacy</a>
            <a href="#">Cookie policy</a>
            <a href="#">Egencia promise</a>
            <a href="#">Egencia LLC Terms of use</a>
            <a href="#">Mobile app</a>
            <a href="#">Customer support</a>
        </div>
        <div className="footer-legal">
            © 2025 GBT Travel Services UK Limited
        </div>
    </footer>
);

export default Footer;