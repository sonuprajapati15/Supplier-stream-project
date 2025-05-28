import React from "react";
export default function Logo() {
  // Simple blue/yellow Egencia-style placeholder SVG
  return (
    <svg viewBox="0 0 120 32" width="120" height="32" style={{ verticalAlign: "middle" }}>
      <text x="0" y="44" fontFamily="Verdana" fontSize="22" fontWeight="bold" fill="#103d7c">Egencia</text>
      <circle cx="102" cy="10" r="4" fill="#ffc600" />
      <text x="0" y="5" fontFamily="Verdana" fontSize="7" fill="#103d7c" fontWeight="bold">POWERED BY</text>
    </svg>
  );
}