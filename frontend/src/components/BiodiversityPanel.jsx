import React from "react";

export default function BiodiversityPanel({ biodiversity }) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: 16, marginTop: 32,
    }}>
      {biodiversity.map((b) => (
        <div key={b.species} style={{
          background: "var(--panel)", border: "1px solid var(--line)", borderRadius: 10, padding: 20,
        }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, margin: "0 0 12px", fontStyle: "italic" }}>
            {b.species}
          </h3>
          <p style={{ fontSize: 28, fontFamily: "var(--font-mono)", color: "var(--cyan)", margin: 0 }}>
            {b.totalRegionalCount.toLocaleString()}
          </p>
          <p style={{ fontSize: 12, color: "var(--slate)", marginTop: 4 }}>
            recorded occurrences · {b.points.length} plotted on map
          </p>
        </div>
      ))}
    </div>
  );
}
