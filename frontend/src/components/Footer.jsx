import React from "react";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--line)", padding: "28px 0" }}>
      <div className="container" style={{
        display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8,
        fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--slate)",
      }}>
        <span>DeepSea Guardian · built for HackOcean PS03</span>
        <span>Data: NOAA Coral Reef Watch · OBIS-style occurrence records · GFW vessel search (identity only)</span>
      </div>
    </footer>
  );
}
