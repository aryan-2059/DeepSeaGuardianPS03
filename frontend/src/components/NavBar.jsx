import React, { useEffect, useState } from "react";

const LINKS = [
  { href: "#reefs", label: "Bleaching Watch" },
  { href: "#species", label: "Species" },
  { href: "#vessels", label: "Fishing Pressure" },
];

export const NAV_HEIGHT = 64;

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: NAV_HEIGHT,
        background: scrolled ? "rgba(10,22,34,0.86)" : "rgba(10,22,34,0.35)",
        backdropFilter: "blur(10px)",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
        transition: "background 0.2s ease, border-color 0.2s ease",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <a
          href="#top"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 15,
            letterSpacing: "-0.01em",
            color: "var(--bone)",
            textDecoration: "none",
          }}
        >
          DeepSea<span style={{ color: "var(--cyan)" }}>Guardian</span>
        </a>

        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                fontWeight: 500,
                color: "var(--slate)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--bone)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--slate)")}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
