import React, { useRef, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";

const RISK_COLOR = {
  critical: "#ff6b4a",
  high: "#ff9a6b",
  watch: "#f2b84b",
  low: "#3fd4c4",
};

const MAX_TILT_DEG = 7;

export default function RiskMap({ stations, biodiversity }) {
  const frameRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [interacting, setInteracting] = useState(false);

  const onMouseMove = (e) => {
    if (interacting || !frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    setTilt({
      x: (0.5 - py) * MAX_TILT_DEG * 2, // rotateX from vertical position
      y: (px - 0.5) * MAX_TILT_DEG * 2, // rotateY from horizontal position
    });
  };

  const flatten = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      style={{ perspective: 1400 }}
      onMouseMove={onMouseMove}
      onMouseLeave={flatten}
      // While the user is actually dragging/zooming Leaflet, keep the frame flat
      // so the CSS 3D transform never fights Leaflet's own translate3d tile math.
      onMouseDown={() => setInteracting(true)}
      onMouseUp={() => setInteracting(false)}
    >
      <div
        ref={frameRef}
        style={{
          borderRadius: 10,
          overflow: "hidden",
          border: "1px solid var(--line)",
          boxShadow: "0 30px 60px -20px rgba(0,0,0,0.55)",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: interacting ? "transform 0.4s ease" : "transform 0.12s ease-out",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <MapContainer
          center={[10, 60]}
          zoom={2}
          minZoom={2}
          style={{ height: 380, width: "100%", background: "var(--panel)" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors, &copy; CARTO'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          {stations.map((s) => (
            <CircleMarker
              key={s.name}
              center={[s.lat, s.lon]}
              radius={10}
              pathOptions={{
                color: RISK_COLOR[s.riskLevel],
                fillColor: RISK_COLOR[s.riskLevel],
                fillOpacity: 0.55,
                weight: 2,
              }}
            >
              <Tooltip>
                <strong>{s.name}</strong>
                <br />DHW: {s.latest?.dhw ?? "—"} · risk: {s.riskLevel}
              </Tooltip>
            </CircleMarker>
          ))}
          {biodiversity.flatMap((b) =>
            b.points.slice(0, 60).map((p, i) => (
              <CircleMarker
                key={`${b.species}-${i}`}
                center={[p[1], p[0]]}
                radius={2.5}
                pathOptions={{ color: "#7f97a3", fillColor: "#7f97a3", fillOpacity: 0.5, weight: 0 }}
              >
                <Tooltip>{b.species}</Tooltip>
              </CircleMarker>
            ))
          )}
        </MapContainer>
      </div>
    </div>
  );
}
