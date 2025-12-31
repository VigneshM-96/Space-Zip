import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Satellite,
  Activity,
  Radar,
  Cpu,
  PieChart,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";

/**
 * VisionAlert.jsx
 * Section-scrolling Vision Alert page (Option 2 - ready for API integration).
 *
 * How to integrate real APIs:
 * - NASA NEO: https://api.nasa.gov/neo/rest/v1/ (replace fetchAsteroids placeholder)
 * - USGS Earthquakes: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson
 * - Space debris: Space-Track or N2YO (requires auth) — replace fetchDebris placeholder
 * - Atmospheric anomalies / DONKI: https://api.nasa.gov/DONKI/
 *
 * NOTE: This file focuses on UI + structured placeholders so you can plug-in real endpoints quickly.
 */

/* ---------- Styles specific to this page (scoped) ---------- */
/* Using inline <style> so you can drop this file without editing global CSS */
const ScopedStyles = () => (
  <style>{`
    /* soft frosted glass card (Option A) */
    .glass {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }
    .glow-text { text-shadow: 0 0 10px rgba(255,255,255,0.85); }
    .radar-sweep { transform-origin: 150px 150px; animation: sweep 3.6s linear infinite; }
    @keyframes sweep { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    .orbit { transform-origin: 50% 50%; animation: orbit 10s linear infinite; }
    @keyframes orbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    .asteroid-blip { transition: transform .2s ease; }
    .asteroid-blip:hover { transform: scale(1.2); }
    /* subtle section snap for scrolling pages */
    section { scroll-margin-top: 96px; } /* keeps header visible if fixed navbar */
  `}</style>
);

export default function VisionAlert() {
  // UI state (simulated initially). Replace with API data as needed.
  const [asteroids, setAsteroids] = useState([]);
  const [quakes, setQuakes] = useState([]);
  const [debrisCount, setDebrisCount] = useState(0);
  const [anomalies, setAnomalies] = useState([]);
  const [aiScores, setAiScores] = useState({
    impactRisk: 0.02,
    collisionRisk: 0.08,
    unknownObject: 0.01,
  });

  // Loading flags (useful for toggles and spinners)
  const [loading, setLoading] = useState(true);

  // === Placeholder fetchers (replace these with real network calls) ===
  async function fetchAsteroids() {
    // Example: Use NASA NEO API
    // const res = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=...&end_date=...&api_key=YOUR_KEY`);
    // const data = await res.json();
    // Map response to desired shape
    // For now simulate:
    const sample = [
      {
        id: "2024-ZQ9",
        name: "2024 ZQ9",
        diameter_km: 0.78,
        miss_km: 76000,
        velocity_km_s: 25.4,
        approach: "2025-11-30T13:30Z",
        hazard: true,
        orbitDeg: 120,
        orbitRadius: 120,
      },
      {
        id: "2025-AX12",
        name: "2025 AX12",
        diameter_km: 0.12,
        miss_km: 480000,
        velocity_km_s: 12.3,
        approach: "2025-12-02T04:12Z",
        hazard: false,
        orbitDeg: 240,
        orbitRadius: 160,
      },
      {
        id: "2023-EJ5",
        name: "2023 EJ5",
        diameter_km: 0.03,
        miss_km: 1200000,
        velocity_km_s: 8.1,
        approach: "2025-12-10T07:05Z",
        hazard: false,
        orbitDeg: 300,
        orbitRadius: 200,
      },
    ];
    setAsteroids(sample);
  }

  async function fetchQuakes() {
    // Example: USGS all_day summary
    // const res = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson');
    // const json = await res.json();
    // Map to structure: {id, place, mag, time}
    const sample = [
      { id: "q1", place: "Honshu, Japan", mag: 5.6, time: "2025-11-29 18:23 UTC" },
      { id: "q2", place: "Anchorage, Alaska", mag: 4.9, time: "2025-11-29 12:12 UTC" },
      { id: "q3", place: "Lima, Peru", mag: 6.1, time: "2025-11-28 03:40 UTC" },
    ];
    setQuakes(sample);
  }

  async function fetchDebris() {
    // Space-Track / N2YO integration belongs here (requires credentials)
    // For now simulate a count and risk
    setDebrisCount(1247 + Math.floor(Math.random() * 20));
  }

  async function fetchAnomalies() {
    // Placeholder for NASA DONKI or other feeds. Simulate few anomalies:
    setAnomalies([
      { id: "a1", type: "Radiation Spike", value: "3.2x baseline", location: "Polar regions", severity: 0.34 },
      { id: "a2", type: "Unusual Signal", value: "Narrow-band Burst", location: "Equatorial", severity: 0.18 },
    ]);
  }

  // Combine and compute a simple AI blended score
  function computeAiScoresFromData() {
    // very small heuristic for demonstration
    const impactRisk = Math.min(1, (asteroids.filter(a => a.hazard).length * 0.25) + 0.01);
    const collisionRisk = Math.min(1, debrisCount / 8000 + 0.02);
    const unknownObject = Math.min(1, anomalies.length * 0.05);
    setAiScores({
      impactRisk: parseFloat(impactRisk.toFixed(3)),
      collisionRisk: parseFloat(collisionRisk.toFixed(3)),
      unknownObject: parseFloat(unknownObject.toFixed(3)),
    });
  }

  useEffect(() => {
    let mounted = true;
    // initial load (replace with real calls)
    Promise.resolve()
      .then(fetchAsteroids)
      .then(fetchQuakes)
      .then(fetchDebris)
      .then(fetchAnomalies)
      .then(() => {
        if (!mounted) return;
        computeAiScoresFromData();
        setLoading(false);
      });

    // small interval to simulate live updates
    const interval = setInterval(async () => {
      await fetchDebris(); // simulated increment
      computeAiScoresFromData();
    }, 8000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // small helper formatting
  function fmt(n) {
    if (n === null || n === undefined) return "-";
    if (typeof n === "number") return n.toLocaleString();
    return n;
  }

  // overall threat (UI KPI)
  function overallThreat() {
    const a = asteroids.filter(a => a.hazard).length;
    const q = Math.max(0, ...quakes.map(q => q.mag || 0));
    const r = aiScores.impactRisk || 0;
    const raw = Math.min(1, a * 0.25 + q / 10 * 0.2 + r * 0.6);
    return parseFloat(raw.toFixed(3));
  }

  /* ----------------- UI ----------------- */
  return (
    <div className="min-h-screen text-white">
      <ScopedStyles />

      {/* HERO / INTRO (full width section) */}
      <section
  id="vision-hero"
  className="min-h-screen flex items-center justify-center relative px-6 lg:px-12 pt-24 sm:pt-32 md:pt-0"
>

        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* left: textual header + KPI */}
          <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl lg:text-6xl font-extrabold glow-text">
              Vision Alert System
            </h1>
            <p className="mt-4 text-lg text-gray-300 max-w-xl">
              Planetary risk intelligence — real-time monitoring of near-Earth objects, seismic activity,
              orbital debris, atmospheric anomalies, and AI-driven risk predictions.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <div className="glass px-4 py-3 rounded-lg">
                <p className="text-xs text-gray-300">Overall Threat</p>
                <p className="text-2xl font-semibold">{Math.round(overallThreat() * 100)}%</p>
              </div>

              <div className="glass px-4 py-3 rounded-lg">
                <p className="text-xs text-gray-300">Debris Tracked</p>
                <p className="text-2xl font-semibold">{fmt(debrisCount)}</p>
              </div>

              <div className="glass px-4 py-3 rounded-lg">
                <p className="text-xs text-gray-300">AI Impact Risk</p>
                <p className="text-2xl font-semibold">{Math.round(aiScores.impactRisk * 100)}%</p>
              </div>

              <div className="mt-2 w-full lg:w-auto">
                <Link to="/live-dashboard" className="inline-block mt-4 px-5 py-2 border rounded-lg glass border-white/12 hover:scale-[1.02] transition">
                  View Full Dashboard
                </Link>
              </div>
            </div>
          </motion.div>

          {/* right: orbital view (SVG) */}
          <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="flex items-center justify-center">
            <div className="glass rounded-xl p-6 w-full max-w-md">
              <OrbitalView asteroids={asteroids} />
              <p className="mt-4 text-sm text-gray-300">Simulated orbital view. Click a blip for details.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section: Nearby Asteroids (full width) */}
      <section id="asteroids" className="px-6 lg:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="Nearby Asteroids" subtitle="Objects approaching near-Earth — prioritized by risk" />
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              {asteroids.map((a) => (
                <motion.div key={a.id} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg flex items-center justify-center bg-black/30 border border-white/6">
                      <Satellite size={28} />
                    </div>
                    <div>
                      <p className="font-semibold">{a.name}</p>
                      <p className="text-sm text-gray-300">Diameter: {a.diameter_km} km • Velocity: {a.velocity_km_s} km/s</p>
                      <p className="text-xs text-gray-400">Closest approach: {a.approach}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`${a.hazard ? "bg-red-600/80" : "bg-green-600/60"} px-3 py-1 rounded-full text-xs`}>{a.hazard ? "High" : "Low"}</span>
                    <p className="text-xs text-gray-300 mt-2">Miss: {fmt(a.miss_km)} km</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="glass p-4 rounded-xl">
              <h3 className="font-semibold mb-3">Priority Monitor</h3>
              <p className="text-sm text-gray-300">Objects flagged for follow-up and trajectory refinement.</p>

              <div className="mt-4 grid gap-3">
                {asteroids
                  .filter(a => a.hazard)
                  .map((a) => (
                    <div key={a.id} className="p-3 rounded-md border border-white/6 bg-black/30">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{a.name}</p>
                          <p className="text-xs text-gray-300">Approach: {a.approach}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-red-400">Track Now</p>
                          <p className="text-xs text-gray-300">{fmt(a.miss_km)} km</p>
                        </div>
                      </div>
                    </div>
                  ))}
                {asteroids.filter(a => a.hazard).length === 0 && <p className="text-sm text-gray-400">No high-risk objects at present.</p>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Earthquake Watch */}
      <section id="quakes" className="px-6 lg:px-12 py-20 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="Earthquake Watch" subtitle="Global seismic highlights (USGS feed recommended)" />
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {quakes.map(q => (
                <motion.div key={q.id} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} className="glass p-4 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="font-medium">{q.place}</p>
                    <p className="text-xs text-gray-300">{q.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{q.mag}</p>
                    <p className="text-xs text-gray-300">Magnitude</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="glass p-4 rounded-lg">
              <h3 className="font-semibold">Seismic Hotspots</h3>
              <p className="text-sm text-gray-300 mt-2">Integration note: call USGS GeoJSON to populate global map or heatmap here.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Space Debris / Anomalies */}
      <section id="debris" className="px-6 lg:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="Space Debris Tracking" subtitle="LEO fragmentation & collision risk" />
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="glass p-6 rounded-xl">
              <h3 className="font-semibold">Cataloged Fragments</h3>
              <p className="text-2xl font-bold mt-3">{fmt(debrisCount)}</p>
              <p className="text-sm text-gray-300 mt-2">Estimated objects tracked (simulated). Replace with Space-Track API.</p>
            </div>

            <div className="glass p-6 rounded-xl">
              <h3 className="font-semibold">Collision Risk</h3>
              <p className="text-sm text-gray-300 mt-2">Probability gauge and recommended actions for satellite operators.</p>
              <div className="mt-4">
                <MiniGauge value={aiScores.collisionRisk} />
              </div>
            </div>

            <div className="glass p-6 rounded-xl">
              <h3 className="font-semibold">Anomalies Detected</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-300">
                {anomalies.map(a => (
                  <li key={a.id} className="flex justify-between">
                    <span>{a.type}</span>
                    <span className="text-gray-200">{a.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Atmospheric Anomalies & Alien Probability */}
      <section id="anomalies" className="px-6 lg:px-12 py-20 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="Atmospheric Anomalies & Probability" subtitle="Radiation spikes, aurora events, unusual signals" />
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass p-6 rounded-xl">
              <h3 className="font-semibold">Radiation & Aurora Index</h3>
              <p className="text-sm text-gray-300 mt-2">Realtime solar/geomagnetic indices should come from NOAA/NASA DONKI or Kp index feeds.</p>

              <div className="mt-4">
                <div className="w-full bg-white/8 rounded-full h-3 overflow-hidden">
                  <div className="h-full bg-white" style={{ width: "32%" }} />
                </div>
                <p className="mt-2 text-sm text-gray-300">Aurora intensity: 3.2</p>
              </div>
            </div>

            <div className="glass p-6 rounded-xl">
              <h3 className="font-semibold">Alien Probability (Scientific Estimate)</h3>
              <p className="text-sm text-gray-300 mt-2">This is a scientific confidence score based on signal anomalies & multi-source correlation.</p>

              <div className="mt-6 flex items-center gap-6">
                <div className="w-36 h-36 rounded-full flex items-center justify-center glass">
                  <p className="text-2xl font-bold">{Math.round(aiScores.unknownObject * 100)}%</p>
                </div>

                <div>
                  <p className="text-sm text-gray-300">Model confidence in unexplained detections</p>
                  <p className="mt-2 text-xs text-gray-400">Integration note: combine radio telescope telemetry, signal processing, and anomaly detection models.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: AI Risk Prediction (full width) */}
      <section id="ai" className="px-6 lg:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="AI Risk Prediction" subtitle="Model outputs and recommended actions" />
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="glass p-6 rounded-xl">
              <PredictionRow title="Impact Risk" value={aiScores.impactRisk} desc="Chance of object impacting ground/atmosphere." />
            </div>
            <div className="glass p-6 rounded-xl">
              <PredictionRow title="Collision Risk" value={aiScores.collisionRisk} desc="Risk to operational satellites." />
            </div>
            <div className="glass p-6 rounded-xl">
              <PredictionRow title="Unknown Object" value={aiScores.unknownObject} desc="Model confidence for unidentified detections." />
            </div>
          </div>

          <div className="mt-6 glass p-6 rounded-xl">
            <h4 className="font-semibold">Recommended Actions</h4>
            <ul className="list-disc pl-5 mt-3 text-sm text-gray-300">
              <li>Monitor flagged asteroids for refined orbital solutions.</li>
              <li>Coordinate with satellite operators for maneuver windows.</li>
              <li>Escalate strong signal anomalies to specialized research nodes.</li>
            </ul>

            <div className="mt-4 flex gap-3">
              <Link to="/live-dashboard" className="px-3 py-2 border rounded-md">Open Dashboard</Link>
              <button className="px-3 py-2 bg-white/6 rounded-md">Export Snapshot</button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

/* ---------- small UI helper components ---------- */

function SectionHeader({ title, subtitle }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold">{title}</h2>
      {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
    </div>
  );
}

function MiniGauge({ value = 0 }) {
  // semicircular gauge (0..1)
  const pct = Math.max(0, Math.min(1, value));
  const angle = 180 * pct;
  const radius = 46;
  const circumference = Math.PI * radius;
  const dash = (circumference * pct).toFixed(2);

  return (
    <svg width="100%" viewBox="0 0 120 60">
      <g transform="translate(10,2)">
        <path d={`M10 ${50} A ${radius} ${radius} 0 0 1 ${10 + 2*radius} ${50}`} stroke="rgba(255,255,255,0.08)" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d={`M10 ${50} A ${radius} ${radius} 0 0 1 ${10 + 2*radius} ${50}`} stroke="rgba(255,255,255,0.35)" strokeWidth="8" fill="none" strokeLinecap="round" strokeDasharray={`${dash} ${circumference - dash}`} />
        <circle cx={10 + radius + Math.cos((180 - angle) * Math.PI/180) * radius} cy={50 - Math.sin((180 - angle) * Math.PI/180) * radius} r={4} fill="#fff" />
      </g>
    </svg>
  );
}

function PredictionRow({ title, value = 0, desc }) {
  const pct = Math.round(value * 100);
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-xs text-gray-400">{desc}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">{pct}%</p>
          <p className="text-xs text-gray-300">Probability</p>
        </div>
      </div>

      <div className="mt-3 w-full h-2 bg-white/8 rounded-full">
        <div className="h-full bg-white rounded-full" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/* ---------- OrbitalView: SVG Earth + orbits + clickable asteroid blips ---------- */
function OrbitalView({ asteroids = [] }) {
  // draw an SVG with orbits; asteroids contain orbitDeg and orbitRadius
  // each asteroid is represented as a small blip placed on its orbit
  return (
    <div className="w-full flex items-center justify-center">
      <svg viewBox="0 0 340 340" width="100%" height="300" className="rounded-md">
        <defs>
          <radialGradient id="earthGrad">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#0b3b6b" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#000814" stopOpacity="0.8" />
          </radialGradient>
        </defs>

        <g transform="translate(170,170)">
          {/* outer background rings */}
          <circle r="140" fill="none" stroke="rgba(255,255,255,0.03)" />
          <circle r="100" fill="none" stroke="rgba(255,255,255,0.02)" />
          <circle r="60" fill="none" stroke="rgba(255,255,255,0.01)" />

          {/* Earth at center */}
          <circle r="50" fill="url(#earthGrad)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

          {/* orbit paths */}
          <g className="orbit" style={{ animationDuration: "18s" }}>
            {/* draw parametric orbits for each asteroid */}
            {asteroids.map((a, i) => {
              const r = a.orbitRadius || (80 + (i * 30));
              // position using angle (in degrees)
              const angle = (a.orbitDeg || (i * 120)) * (Math.PI / 180);
              const x = Math.cos(angle) * r;
              const y = Math.sin(angle) * r;
              // small jitter to animate (CSS transform handled below)
              return (
                <g key={a.id} transform={`translate(${0}, ${0})`} style={{ transformOrigin: "170px 170px" }}>
                  {/* orbit circle */}
                  <circle key={"orbit-" + a.id} r={r} fill="none" stroke="rgba(255,255,255,0.02)" />
                  {/* blip */}
                  <circle
                    className="asteroid-blip"
                    cx={x}
                    cy={y}
                    r={10}
                    fill={a.hazard ? "#ff6b6b" : "#ffffff"}
                    stroke="rgba(255,255,255,0.08)"
                    onClick={() => alert(`${a.name}\nMiss: ${fmt(a.miss_km)} km\nApproach: ${a.approach}`)}
                    style={{ cursor: "pointer" }}
                  />
                </g>
              );
            })}
          </g>
        </g>
      </svg>
    </div>
  );
}

/* ---------- misc helpers ---------- */
function fmt(n) {
  if (n === null || n === undefined) return "-";
  if (typeof n === "number") return n.toLocaleString();
  return n;
}
