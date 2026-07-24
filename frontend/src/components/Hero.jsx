import React from "react";

export default function Hero({ stationCount, generatedAt }) {
  const dateStr = generatedAt
    ? new Date(generatedAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "—";

  return (
    <header style={headerStyle}>
      <SonarRings />
      <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: 72, paddingBottom: 72 }}>
        <p style={subtitleStyle}>
          Deep Ocean Risk Monitor · survey compiled {dateStr}
        </p>

        {/* Updated Title with combined interactive hover swap */}
        <h1 className="hero-title">
          <span className="title-word deepsea">DeepSea</span>
          <br />
          <span className="title-word guardian">Guardian</span>
        </h1>

        <p style={{ maxWidth: 560, fontSize: 18, color: "var(--slate)", marginTop: 22, lineHeight: 1.6 }}>
          Tracking heat stress across {stationCount} coral sanctuaries, cross-referencing where
          endangered dugongs, turtles, and humpback dolphins are still recorded, and mapping where
          fishing pressure would need watching if a live feed were connected.
        </p>

        <div style={{ display: "flex", gap: 10, marginTop: 30, flexWrap: "wrap" }}>
          <a href="#reefs" style={pillStyle(true)}>View bleaching risk</a>
          <a href="#vessels" style={pillStyle(false)}>See demo layer</a>
        </div>
      </div>

      <style>{`
        .hero-title {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(40px, 6vw, 76px);
          line-height: 1.02;
          margin: 0;
          max-width: 900px;
          display: inline-block;
        }

        .title-word {
          transition: color 0.1s ease;
          cursor: pointer;
        }

        /* Default baseline colors */
        .deepsea {
          color: var(--bone, #ffffff);
        }
        .guardian {
          color: var(--cyan);
        }

        /* 1. When hovering over DeepSea -> swap BOTH colors */
        .deepsea:hover {
          color: var(--cyan);
        }
        .deepsea:hover ~ .guardian,
        .deepsea:hover + br + .guardian {
          color: var(--bone, #ffffff);
        }

        /* 2. When hovering over Guardian -> swap BOTH colors */
        .hero-title:has(.guardian:hover) .deepsea {
          color: var(--cyan);
        }
        .guardian:hover {
          color: var(--bone, #ffffff);
        }

        @keyframes pulse {
          0%   { transform: scale(0.7); opacity: 0; }
          15%  { opacity: 0.6; }
          100% { transform: scale(1.4); opacity: 0; }
        }
      `}</style>
    </header>
  );
}

const headerStyle = {
  position: "relative",
  minHeight: "72vh",
  display: "flex",
  alignItems: "center",
  background: "radial-gradient(ellipse 90% 60% at 50% 0%, var(--deep) 0%, var(--abyss) 70%)",
  overflow: "hidden",
  borderBottom: "1px solid var(--line)",
};

const subtitleStyle = {
  fontFamily: "var(--font-mono)",
  fontSize: 13,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--cyan)",
  marginBottom: 18,
};

function pillStyle(filled) {
  return {
    fontFamily: "var(--font-body)",
    fontWeight: 600,
    fontSize: 14,
    padding: "12px 20px",
    borderRadius: 100,
    textDecoration: "none",
    background: filled ? "var(--cyan)" : "transparent",
    color: filled ? "var(--abyss)" : "var(--bone)",
    border: filled ? "none" : "1px solid var(--line)",
  };
}

function SonarRings() {
  const rings = [1, 2, 3, 4];
  return (
    <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", width: 0, height: 0, zIndex: 1 }}>
      {rings.map((i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 120 * i,
            height: 120 * i,
            marginLeft: -(60 * i),
            marginTop: -(60 * i),
            borderRadius: "50%",
            border: "1px solid rgba(63,212,196,0.14)",
            animation: `pulse 6s ease-out ${i * 0.8}s infinite`,
          }}
        />
      ))}
    </div>
  );
}