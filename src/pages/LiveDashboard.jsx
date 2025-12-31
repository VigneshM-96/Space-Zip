import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Satellite, RefreshCw, DownloadCloud, Globe as GlobeIcon } from "lucide-react";

/**
 * LiveDashboard.jsx - Space Command HQ (Option A)
 * - Rotating canvas globe with orbiting satellites
 * - Glass cards (less transparent) and polished visuals
 * - Animated SVG charts (donut + bars)
 * - MissionConsole top panel
 *
 * Replace simulated data & refreshAll() with real API calls later.
 */

/* -------------------- Main Component -------------------- */
export default function LiveDashboard() {
  // states
  const [loading, setLoading] = useState(false);

  const [satTotal, setSatTotal] = useState(7645);
  const [satByCountry, setSatByCountry] = useState([
    { country: "USA", count: 3200 },
    { country: "China", count: 1100 },
    { country: "Russia", count: 850 },
    { country: "India", count: 450 },
    { country: "EU/ESA", count: 300 },
  ]);

  const [rocketStats, setRocketStats] = useState([
    { name: "SpaceX", success: 850, fail: 12 },
    { name: "ISRO", success: 180, fail: 6 },
    { name: "Roscosmos", success: 420, fail: 22 },
    { name: "CNSA", success: 400, fail: 8 },
  ]);

  const [exoplanets, setExoplanets] = useState([
    { name: "TRAPPIST-1e", habitability: 0.84 },
    { name: "Kepler-186f", habitability: 0.72 },
    { name: "Proxima b", habitability: 0.58 },
  ]);

  const [spaceHealth, setSpaceHealth] = useState({
    kpIndex: 3,
    solarWindSpeed: 410,
    sunspotNumber: 35,
    cosmicRayLevel: 1.1,
  });

  // simulate refresh (replace with API calls)
  async function refreshAll() {
    setLoading(true);
    // placeholder delay - replace with fetch calls
    await new Promise((r) => setTimeout(r, 900));
    // mild simulated updates
    setSatTotal((s) => s + Math.floor(Math.random() * 5 - 2));
    setSatByCountry((arr) => arr.map((c) => ({ ...c, count: Math.max(3, c.count + Math.floor(Math.random() * 6 - 2)) })));
    setRocketStats((r) => r.map((c) => ({ ...c, success: Math.max(1, c.success + Math.floor(Math.random() * 3)) })));
    setExoplanets((p) => p.map((x) => ({ ...x, habitability: Math.min(0.99, +(x.habitability + (Math.random() - 0.5) * 0.03).toFixed(2)) })));
    setSpaceHealth((h) => ({
      kpIndex: Math.max(0, Math.min(9, h.kpIndex + Math.floor(Math.random() * 3 - 1))),
      solarWindSpeed: Math.max(250, h.solarWindSpeed + Math.floor(Math.random() * 40 - 20)),
      sunspotNumber: Math.max(0, h.sunspotNumber + Math.floor(Math.random() * 7 - 3)),
      cosmicRayLevel: +(h.cosmicRayLevel + (Math.random() - 0.5) * 0.05).toFixed(2),
    }));
    setLoading(false);
  }

  useEffect(() => {
    refreshAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen text-white px-4 lg:px-12 pb-10 pt-[100px] relative overflow-x-hidden">


      {/* background starfield or canvas lives globally; ensure your Starfield component is mounted in App */}
      {/* Mission console (top) */}
      <div className="max-w-7xl mx-auto mt-6">
        <MissionConsole
          satTotal={satTotal}
          topCountry={satByCountry[0]}
          kpIndex={spaceHealth.kpIndex}
          solarWind={spaceHealth.solarWindSpeed}
          onRefresh={refreshAll}
          loading={loading}
        />
      </div>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Globe + Satellites + Rockets */}
        <section className="lg:col-span-7 space-y-6">
          {/* Rotating Globe Card */}
          <GlassCard title="Orbital View" subtitle="Rotating globe with satellite positions">
            <div className="relative w-full h-[420px] rounded-xl overflow-hidden">
              <RotatingGlobe satCount={satTotal} satByCountry={satByCountry} />
              <div className="absolute left-6 top-6 bg-white/6 border border-white/10 px-3 py-1 rounded-md text-xs">
                <div className="flex items-center gap-2">
                  <Satellite size={16} /> <span className="font-semibold">{satTotal.toLocaleString()}</span>
                </div>
                <div className="text-gray-300 text-[11px] mt-0.5">Active cataloged objects</div>
              </div>
            </div>
          </GlassCard>

          {/* Rocket success and details */}
          <GlassCard title="Rocket Launch Performance" subtitle="Company success rates & quick metrics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <BarChartSVG data={rocketStats} />
                <p className="text-xs text-gray-300 mt-2">Success vs failures (historical)</p>
              </div>

              <div className="space-y-3">
                {rocketStats.map((r) => {
                  const total = (r.success || 0) + (r.fail || 0) || 1;
                  const pct = Math.round((r.success / total) * 100);
                  return (
                    <div key={r.name} className="flex justify-between items-center p-3 rounded-md bg-black/10 border border-white/6">
                      <div>
                        <p className="font-semibold">{r.name}</p>
                        <p className="text-xs text-gray-300">Launches: {total}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">{pct}%</p>
                        <p className="text-xs text-gray-400">{r.success}/{total}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </GlassCard>

          {/* Exoplanet candidates */}
          <GlassCard title="Potentially Habitable Worlds" subtitle="Top candidates & habitability scores">
            <div className="grid md:grid-cols-3 gap-4">
              {exoplanets.map((p) => (
                <div key={p.name} className="p-3 rounded-md bg-black/10 border border-white/6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-xs text-gray-300">Candidate exoplanet</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{Math.round(p.habitability * 100)}%</p>
                      <p className="text-xs text-gray-400">Habitability</p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="w-full h-2 bg-white/6 rounded overflow-hidden">
                      <div className="h-full bg-white" style={{ width: `${p.habitability * 100}%` }} />
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Data sample from NASA Exoplanet Archive (replace with API).</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>

        {/* Right column: health, snapshot, insights */}
        <aside className="lg:col-span-5 space-y-6">
          <GlassCard title="Universe Health" subtitle="Space weather & environmental telemetry">
            <div className="space-y-3">
              <SmallStat label="Geomagnetic Kp-index" value={spaceHealth.kpIndex} hint="0 (quiet) - 9 (severe)" />
              <SmallStat label="Solar Wind" value={`${spaceHealth.solarWindSpeed} km/s`} />
              <SmallStat label="Sunspot Number" value={spaceHealth.sunspotNumber} />
              <SmallStat label="Cosmic Ray Level" value={spaceHealth.cosmicRayLevel} hint="relative baseline" />
              <div className="mt-3 text-xs text-gray-400">Sources: NOAA, NASA DONKI — plug API to fetch live values.</div>
            </div>
          </GlassCard>

          <GlassCard title="Overall Snapshot" subtitle="Controls & export">
            <div className="space-y-3">
              <div className="flex gap-2">
                <button onClick={refreshAll} className="flex-1 px-3 py-2 rounded-md bg-white/8 border border-white/12">
                  <RefreshCw size={16} className="inline-block mr-2" /> {loading ? "Refreshing..." : "Refresh"}
                </button>
                <button onClick={() => exportSnapshot({ satTotal, satByCountry, rocketStats, spaceHealth })} className="px-3 py-2 rounded-md bg-white/10 border border-white/12">
                  <DownloadCloud size={16} className="inline-block mr-2" /> Export
                </button>
              </div>

              <div className="mt-3 text-sm text-gray-300">
                <p><strong>API suggestions:</strong></p>
                <ul className="list-disc ml-5 mt-2 text-xs">
                  <li>Space-Track / CelesTrak — satellites (TLEs)</li>
                  <li>The Space Devs (Launch Library) — launches</li>
                  <li>NASA Exoplanet Archive — exoplanet metadata</li>
                  <li>NOAA / NASA DONKI — space weather</li>
                </ul>
              </div>
            </div>
          </GlassCard>

          <GlassCard title="Quick Insights" subtitle="AI hints & suggestions">
            <div className="text-sm text-gray-300 space-y-2">
              <p><strong>Insight:</strong> Constellation growth increases collision risk — suggest automated conjunction alerts.</p>
              <p><strong>Tip:</strong> Use combined TLE + operator registry to estimate ownership vs active count.</p>
              <p><strong>Recommend:</strong> Add a watchlist and webhook alerts for Kp & debris flux spikes.</p>
            </div>
          </GlassCard>

          <GlassCard title="Top Countries (by satellites)" subtitle="">
            <div className="grid grid-cols-1 gap-2">
              {satByCountry.map((c) => (
                <div key={c.country} className="flex items-center justify-between p-3 rounded-md bg-black/10 border border-white/6">
                  <div>
                    <p className="font-semibold">{c.country}</p>
                    <p className="text-xs text-gray-300">Satellites</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{c.count.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">{Math.round((c.count / Math.max(1, satTotal)) * 100)}%</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </aside>
      </main>
    </div>
  );
}

/* -------------------------- Mission Console -------------------------- */
function MissionConsole({ satTotal, topCountry, kpIndex, solarWind, onRefresh, loading }) {
  return (
    <div className="rounded-2xl bg-white/12 border border-white/10 backdrop-blur-md p-3 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <GlobeIcon size={22} />
          <div>
            <div className="text-xs text-gray-300">Active Satellites</div>
            <div className="font-semibold">{satTotal.toLocaleString()}</div>
          </div>
        </div>

        <div className="pl-4 border-l border-white/6">
          <div className="text-xs text-gray-300">Top operator</div>
          <div className="font-semibold">{topCountry?.country} ({topCountry?.count?.toLocaleString()})</div>
        </div>

        <div className="pl-4 border-l border-white/6">
          <div className="text-xs text-gray-300">Kp index</div>
          <div className="font-semibold">{kpIndex}</div>
        </div>

        <div className="pl-4 border-l border-white/6">
          <div className="text-xs text-gray-300">Solar wind</div>
          <div className="font-semibold">{solarWind} km/s</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={onRefresh} className="px-3 py-1 rounded-md bg-white/8 border border-white/12 text-sm">
          <RefreshCw size={14} className="inline-block mr-2" /> {loading ? "Refreshing..." : "Refresh"}
        </button>
        <button className="px-3 py-1 rounded-md bg-white/8 border border-white/12 text-sm">Settings</button>
      </div>
    </div>
  );
}

/* -------------------------- Visual Components -------------------------- */

function RotatingGlobe({ satCount = 0, satByCountry = [] }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = canvas.width = canvas.clientWidth * devicePixelRatio;
    let h = canvas.height = canvas.clientHeight * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);

    let angle = 0;
    const satellites = generateSatellites(satByCountry, Math.max(80, Math.min(450, Math.floor(satCount / 6))));

    function resize() {
      w = canvas.width = canvas.clientWidth * devicePixelRatio;
      h = canvas.height = canvas.clientHeight * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    }
    window.addEventListener("resize", resize);

    function draw() {
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      ctx.clearRect(0, 0, cw, ch);

      // background subtle radial glow
      const g = ctx.createRadialGradient(cw / 2, ch / 2, 10, cw / 2, ch / 2, Math.max(cw, ch));
      g.addColorStop(0, "rgba(10,20,40,0.6)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, cw, ch);

      // globe circle
      const cx = cw / 2;
      const cy = ch / 2;
      const r = Math.min(cw, ch) * 0.38;

      // globe gradient & rim
      const globeGrad = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, r * 0.1, cx, cy, r);
      globeGrad.addColorStop(0, "#2a3a66");
      globeGrad.addColorStop(0.6, "#0b2546");
      globeGrad.addColorStop(1, "#041025");
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = globeGrad;
      ctx.fill();

      // continents (very stylized) rotate by angle
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((angle * Math.PI) / 180);
      ctx.fillStyle = "rgba(255,255,255,0.03)";
      // draw some rough continent shapes (abstract)
      ctx.beginPath();
      ctx.ellipse(-r * 0.15, -r * 0.05, r * 0.35, r * 0.18, -0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(r * 0.25, r * 0.05, r * 0.28, r * 0.14, 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // subtle rim
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // orbit rings
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.ellipse(cx, cy, r * (1 + 0.12 * i), r * (0.6 + 0.08 * i), (angle + i * 20) * (Math.PI / 180), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${0.01 + i * 0.02})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // satellites (blips) orbiting
      satellites.forEach((s, idx) => {
        // compute rotated position
        const orbitR = r * (0.85 + s.alt * 0.6);
        const theta = ((angle * (s.speed * 0.02)) + s.offset + idx) * (Math.PI / 180);
        const x = cx + Math.cos(theta + s.phase) * orbitR;
        const y = cy + Math.sin(theta + s.phase) * orbitR * 0.72; // slight flatten

        // draw blip
        ctx.beginPath();
        ctx.fillStyle = s.color;
        ctx.globalAlpha = 0.95;
        ctx.arc(x, y, s.size, 0, Math.PI * 2);
        ctx.fill();

        // small glow
        ctx.beginPath();
        ctx.fillStyle = s.color;
        ctx.globalAlpha = 0.12;
        ctx.arc(x, y, s.size * 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // small center glow
      ctx.beginPath();
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 1.2);
      cg.addColorStop(0, "rgba(255,255,255,0.02)");
      cg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = cg;
      ctx.fillRect(0, 0, cw, ch);

      // advance
      angle += 0.22;
      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [satCountToSeed(satByCountry)]); // re-seed when satByCountry changes

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}

/* ----------------- Helpers for globe ----------------- */
function satCountToSeed(arr) {
  // simple deterministic seed based on data
  return arr.map((x) => x.count).join("-");
}

function generateSatellites(satByCountry = [], desiredCount = 150) {
  const colors = ["#60a5fa", "#34d399", "#f472b6", "#facc15", "#a78bfa"];
  const total = Math.max(1, satByCountry.reduce((s, c) => s + c.count, 0));
  const sats = [];
  for (let i = 0; i < desiredCount; i++) {
    // loosely distribute by country weights
    const pick = satByCountry[i % satByCountry.length];
    const base = pick ? pick.count : 1;
    const size = (Math.random() * 1.6) + 0.8;
    sats.push({
      size,
      alt: Math.random() * 0.6 + 0.15,
      speed: 0.2 + Math.random() * 1.2,
      offset: Math.random() * 360,
      phase: Math.random() * Math.PI * 2,
      color: colors[i % colors.length],
      country: pick ? pick.country : "Unknown",
      weight: base,
    });
  }
  return sats;
}

/* ----------------- Small UI / charts ----------------- */

function GlassCard({ title, subtitle, children }) {
  // Slightly less transparent glass: bg-white/18 for clarity (adjustable)
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/18 border border-white/12 backdrop-blur-sm rounded-2xl p-5 shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          {subtitle && <p className="text-xs text-gray-300 mt-1">{subtitle}</p>}
        </div>
      </div>

      <div className="mt-4">{children}</div>
    </motion.section>
  );
}

function SmallStat({ label, value, units = "", hint = "" }) {
  return (
    <div className="p-3 rounded-md bg-black/10 border border-white/6 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-300">{label}</p>
        {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
      </div>
      <div className="text-right">
        <p className="text-lg font-bold">{value} {units}</p>
      </div>
    </div>
  );
}

/* ----------------- Charts (SVG) ----------------- */

function BarChartSVG({ data = [] }) {
  // vertical grouped bars (success vs fail) with labels
  const width = 360;
  const height = 180;
  const padding = 30;
  const max = Math.max(...data.map((d) => (d.success + d.fail)), 1);
  const groupW = (width - padding * 2) / data.length;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-44">
      {/* grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((v, i) => (
        <line key={i} x1={padding} x2={width - padding} y1={padding + (height - padding * 2) * v} y2={padding + (height - padding * 2) * v} stroke="rgba(255,255,255,0.03)" />
      ))}

      {data.map((d, i) => {
        const total = Math.max(1, d.success + d.fail);
        const successH = (d.success / max) * (height - padding * 2);
        const failH = (d.fail / max) * (height - padding * 2);
        const x = padding + i * groupW;
        const barW = Math.min(groupW * 0.35, 28);

        const successY = height - padding - successH;
        const failY = height - padding - failH;

        return (
          <g key={d.name}>
            <rect x={x + (groupW - barW * 2) / 2} y={successY} width={barW} height={successH} rx="4" fill="#34d399" />
            <rect x={x + (groupW - barW * 2) / 2 + barW + 6} y={failY} width={barW} height={failH} rx="4" fill="#fb7185" />
            <text x={x + groupW / 2} y={height - 6} fontSize="11" fill="#fff" textAnchor="middle">{d.name}</text>
          </g>
        );
      })}
    </svg>
  );
}

function DonutChartSVG({ data = [] }) {
  const total = data.reduce((s, d) => s + (d.count || 0), 0) || 1;
  const colors = ["#60a5fa", "#34d399", "#facc15", "#fb7185", "#a78bfa"];
  let start = 0;
  const cx = 50, cy = 50, r = 32;
  return (
    <svg viewBox="0 0 100 100" className="w-full h-28">
      <g transform="translate(0,0)">
        {data.map((d, i) => {
          const angle = (d.count / total) * Math.PI * 2;
          const x1 = cx + r * Math.cos(start);
          const y1 = cy + r * Math.sin(start);
          const x2 = cx + r * Math.cos(start + angle);
          const y2 = cy + r * Math.sin(start + angle);
          const large = angle > Math.PI ? 1 : 0;
          const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
          start += angle;
          return <path key={i} d={path} fill={colors[i % colors.length]} stroke="rgba(255,255,255,0.02)" />;
        })}
        {/* inner circle to create donut hole */}
        <circle cx={cx} cy={cy} r={r * 0.6} fill="rgba(0,0,0,0.45)" />
      </g>
    </svg>
  );
}

/* ----------------- Utility ----------------- */

function exportSnapshot(payload) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `spacezip_snapshot_${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
