import React from "react";

const RISK_COLOR = {
  critical: "var(--coral)",
  high: "#ff9a6b",
  watch: "var(--amber)",
  low: "var(--cyan)",
};

const RISK_LABEL = {
  critical: "CRITICAL",
  high: "HIGH",
  watch: "WATCH",
  low: "STABLE",
};

export default function DepthGauge({ stations, selected, onSelect }) {
  // Sort worst-first so the gauge reads like a depth/severity ruler
  const order = { critical: 0, high: 1, watch: 2, low: 3 };
  const sorted = [...stations].sort((a, b) => order[a.riskLevel] - order[b.riskLevel]);

  return (
    <div style={{
      borderLeft: "2px solid var(--line)",
      paddingLeft: 20,
      display: "flex",
      flexDirection: "column",
      gap: 4,
    }}>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--slate)", margin: "0 0 12px" }}>
        RISK RULER
      </p>
      {sorted.map((s) => {
        const active = s.name === selected;
        return (
          <button
            key={s.name}
            onClick={() => onSelect(s.name)}
            style={{
              textAlign: "left",
              background: active ? "var(--panel)" : "transparent",
              border: "none",
              borderLeft: `3px solid ${active ? RISK_COLOR[s.riskLevel] : "transparent"}`,
              padding: "10px 12px",
              cursor: "pointer",
              borderRadius: 4,
              color: "var(--bone)",
              transition: "background 0.15s",
            }}
          >
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.05em",
              color: RISK_COLOR[s.riskLevel], marginBottom: 3,
            }}>
              {RISK_LABEL[s.riskLevel]} · DHW {s.latest?.dhw ?? "—"}
            </div>
            <div style={{ fontSize: 14, fontFamily: "var(--font-body)", fontWeight: 500 }}>
              {s.name}
            </div>
          </button>
        );
      })}
    </div>
  );
}
