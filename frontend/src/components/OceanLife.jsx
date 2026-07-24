import React from "react";

// Minimal line-art silhouettes drifting slowly across the page, behind all
// content. Pure CSS animation (transform only), so it's cheap and respects
// prefers-reduced-motion via the stylesheet rule below.

function Fish({ flip }) {
  return (
    <svg width="46" height="24" viewBox="0 0 46 24" fill="none" style={{ transform: flip ? "scaleX(-1)" : "none" }}>
      <path
        d="M2 12c6-9 22-9 30-2 4-3.5 8-3.5 12-2-2 2-2 6 0 8-4 1.5-8 1.5-12-2-8 7-24 7-30-2z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="11" r="1" fill="currentColor" />
    </svg>
  );
}

function Jellyfish() {
  return (
    <svg width="30" height="40" viewBox="0 0 30 40" fill="none">
      <path
        d="M4 14c0-7 5.5-12 11-12s11 5 11 12c0 3-2 5-11 5S4 17 4 14z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      {[6, 11, 15, 19, 23].map((x, i) => (
        <path
          key={x}
          d={`M${x} 19c1 5-2 6 0 11s-2 6 0 10`}
          stroke="currentColor"
          strokeWidth="1"
          opacity={0.7 - i * 0.08}
        />
      ))}
    </svg>
  );
}

const CREATURES = [
  { Comp: Fish, top: "12%", size: 1.1, duration: 46, delay: 0, opacity: 0.16, flip: false },
  { Comp: Fish, top: "68%", size: 0.7, duration: 34, delay: -8, opacity: 0.12, flip: true },
  { Comp: Jellyfish, top: "30%", size: 0.9, duration: 60, delay: -20, opacity: 0.14 },
  { Comp: Fish, top: "45%", size: 0.85, duration: 52, delay: -30, opacity: 0.1, flip: false },
  { Comp: Jellyfish, top: "80%", size: 0.6, duration: 70, delay: -5, opacity: 0.1 },
];

export default function OceanLife() {
  return (
    <div
      aria-hidden="true"
      className="ocean-life-layer"
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        zIndex: -1,
        pointerEvents: "none",
        color: "var(--cyan)",
      }}
    >
      {CREATURES.map((c, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: c.top,
            left: 0,
            right: 0,
            opacity: c.opacity,
          }}
        >
          <div
            className="ocean-life-swimmer"
            style={{
              display: "inline-block",
              animationDuration: `${c.duration}s`,
              animationDelay: `${c.delay}s`,
            }}
          >
            <div style={{ display: "inline-block", transform: `scale(${c.size})` }}>
              <c.Comp flip={c.flip} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
