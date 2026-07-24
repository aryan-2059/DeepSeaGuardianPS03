import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar.jsx";
import CursorGlow from "./components/CursorGlow.jsx";
import Hero from "./components/Hero.jsx";
import QuoteBar from "./components/QuoteBar.jsx";
import DepthGauge from "./components/DepthGauge.jsx";
import RiskMap from "./components/RiskMap.jsx";
import BleachingTrend from "./components/BleachingTrend.jsx";
import BiodiversityPanel from "./components/BiodiversityPanel.jsx";
import VesselPanel from "./components/VesselPanel.jsx";
import Footer from "./components/Footer.jsx";
import { getRiskLevel } from "./risk.js";

export default function App() {
  const [data, setData] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/oceanData.json")
      .then((r) => {
        if (!r.ok) throw new Error("Could not load oceanData.json");
        return r.json();
      })
      .then((json) => {
        const withRisk = {
          ...json,
          coralStations: (json.coralStations || []).map((s) => ({
            ...s,
            riskLevel: getRiskLevel(s.latest?.baa),
          })),
        };
        setData(withRisk);
        setSelectedStation(withRisk.coralStations?.[0]?.name ?? null);
      })
      .catch((e) => setError(e.message));
  }, []);

  if (error) {
    return (
      <>
        <NavBar />
        <div className="container" style={{ paddingTop: 80 }}>
          <p style={{ fontFamily: "var(--font-mono)", color: "var(--coral)" }}>
            ERR: {error}. Run <code>python scripts/compile_ocean_data.py</code> from the project
            root, then restart the dev server.
          </p>
        </div>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <NavBar />
        <div className="container" style={{ paddingTop: 80 }}>
          <p style={{ fontFamily: "var(--font-mono)", color: "var(--slate)" }}>loading survey data…</p>
        </div>
      </>
    );
  }

  const station = data.coralStations.find((s) => s.name === selectedStation) || data.coralStations[0];

  return (
    <>
      <CursorGlow />
      <div id="top" />
      <NavBar />
      <Hero stationCount={data.coralStations.length} generatedAt={data.generatedAt} />
      <QuoteBar />

      <section className="container" id="reefs" style={{ marginTop: 64 }}>
        <SectionHeading
          eyebrow="Coral Bleaching Watch"
          title="Six sanctuaries, one shared threshold."
          badge={{ kind: "live", label: "NOAA-derived" }}
        />
        <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 32, marginTop: 32 }}>
          <DepthGauge
            stations={data.coralStations}
            selected={station.name}
            onSelect={setSelectedStation}
          />
          <div>
            <RiskMap stations={data.coralStations} biodiversity={data.marineBiodiversity} />
            <BleachingTrend station={station} />
          </div>
        </div>
      </section>

      <section className="container" id="species" style={{ marginTop: 96 }}>
        <SectionHeading
          eyebrow="Species Presence"
          title="Who's still using these waters."
          badge={{ kind: "live", label: "Occurrence records" }}
        />
        <BiodiversityPanel biodiversity={data.marineBiodiversity} />
      </section>

      <section className="container" id="vessels" style={{ marginTop: 96, marginBottom: 96 }}>
        <SectionHeading
          eyebrow="Fishing Pressure"
          title="Where a live feed would go."
          badge={{ kind: "sim", label: "Simulated demo layer" }}
        />
        <VesselPanel vessel={data.vesselMonitoring} />
      </section>

      <Footer />
    </>
  );
}

function SectionHeading({ eyebrow, title, badge }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12 }}>
      <div>
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.08em",
          textTransform: "uppercase", color: "var(--cyan)", margin: "0 0 8px",
        }}>{eyebrow}</p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, margin: 0, maxWidth: 520 }}>{title}</h2>
      </div>
      <span className={`badge badge--${badge.kind}`}>{badge.label}</span>
    </div>
  );
}
