import React from "react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";

export default function BleachingTrend({ station }) {
  const data = (station.history || []).filter((_, i) => i % 3 === 0); // thin for render perf

  return (
    <div style={{
      marginTop: 24, background: "var(--panel)", border: "1px solid var(--line)",
      borderRadius: 10, padding: "20px 20px 8px",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, margin: 0 }}>
          {station.name} — Degree Heating Weeks
        </h3>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--slate)" }}>
          all-time max {station.allTimeMaxDHW} °C-weeks
        </span>
      </div>
      {data.length === 0 ? (
        <p style={{ color: "var(--slate)", fontSize: 13, paddingBottom: 20 }}>
          No records since 2024 for this station — showing latest available reading only
          ({station.latest?.date ?? "unknown date"}).
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="dhwFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3fd4c4" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#3fd4c4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(237,234,226,0.06)" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#7f97a3" }} minTickGap={40} />
            <YAxis tick={{ fontSize: 10, fill: "#7f97a3" }} width={30} />
            <Tooltip
              contentStyle={{ background: "#0a1622", border: "1px solid rgba(237,234,226,0.12)", fontSize: 12 }}
              labelStyle={{ color: "#edeae2" }}
            />
            <Area type="monotone" dataKey="dhw" stroke="#3fd4c4" fill="url(#dhwFill)" strokeWidth={2} name="DHW" />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
