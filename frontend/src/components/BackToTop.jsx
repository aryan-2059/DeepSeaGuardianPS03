import React, { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollUp}
      aria-label="Back to top"
      style={{
        position: "fixed",
        right: 24,
        bottom: 24,
        zIndex: 40,
        width: 44,
        height: 44,
        borderRadius: "50%",
        border: "1px solid var(--line)",
        background: "rgba(15,40,54,0.9)",
        backdropFilter: "blur(6px)",
        color: "var(--cyan)",
        fontSize: 18,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.25s ease, transform 0.25s ease",
        boxShadow: "0 10px 24px -8px rgba(0,0,0,0.5)",
      }}
    >
      ↑
    </button>
  );
}
