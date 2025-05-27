import React, { useState } from "react";

export default function DropdownPage() {
  const [selected, setSelected] = useState("Economy");

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", background: "#fff", borderRadius: 10, padding: 40 }}>
      <h2>Dropdown Page</h2>
      <p>This page demonstrates dropdown usage.</p>
      <select value={selected} onChange={e => setSelected(e.target.value)} style={{ padding: 10, borderRadius: 7 }}>
        <option>Economy</option>
        <option>Business</option>
        <option>First Class</option>
      </select>
    </div>
  );
}