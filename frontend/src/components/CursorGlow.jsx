import React, { useEffect, useRef } from "react";

// Ambient glow that follows the pointer. Uses a ref + direct style mutation
// (not state) so it doesn't trigger a React re-render on every mousemove.
export default function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Touch devices have no persistent cursor — skip entirely.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = null;
    let target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let current = { ...target };

    const onMove = (e) => {
      target = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${current.x}px, ${current.y}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 520,
          height: 520,
          marginLeft: -260,
          marginTop: -260,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(63,212,196,0.16) 0%, rgba(63,212,196,0.06) 35%, rgba(63,212,196,0) 70%)",
          mixBlendMode: "screen",
          willChange: "transform",
        }}
      />
    </div>
  );
}
