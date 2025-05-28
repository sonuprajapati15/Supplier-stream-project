import React from "react";
import "../styles/footer.css";
export default function Footer() {
  return (
    <footer className="eg-footer">
      <div className="eg-footer-content">
        <span>© 2025 Egencia. All rights reserved.</span>
        <nav className="eg-footer-links">
          <a href="#" tabIndex={-1}>Terms</a>
          <a href="#" tabIndex={-1}>Privacy</a>
          <a href="#" tabIndex={-1}>Contact</a>
        </nav>
      </div>
    </footer>
  );
}