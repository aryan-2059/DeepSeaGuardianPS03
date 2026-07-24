import React from "react";

export default function VesselPanel({ vessel }) {
  // `vessel` is a flat array of records: {vesselId, flag, type, lat, lon, riskLevel, timestamp}
  const entries = Array.isArray(vessel) ? vessel : [];

  return (
    <div style={{
      marginTop: 24, background: "var(--panel)", border: "1px solid rgba(242,184,75,0.3)",
      borderRadius: 10, padding: 24,
    }}>
      <p style={{ fontSize: 13, color: "var(--slate)", lineHeight: 1.6, maxWidth: 640, margin: "0 0 20px" }}>
        Simulated vessel-monitoring feed. In a production deployment this panel would call a
        licensed AIS/VMS feed (e.g. a paid Global Fishing Watch tier) instead.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
        {entries.map((p) => (
          <div key={p.vesselId} style={{
            border: "1px solid var(--line)", borderRadius: 8, padding: "12px 14px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{p.type} · {p.flag}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--slate)" }}>
                {p.lat.toFixed(2)}, {p.lon.toFixed(2)}
              </div>
            </div>
            <span className="badge badge--sim" style={{ fontSize: 10 }}>{p.riskLevel}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
