import { motion } from "framer-motion";
import { Rocket, AlertTriangle, ChartBar, Earth, Lightbulb, Globe } from "lucide-react";

// Dummy data — replace with real API results later
const upcomingLaunches = [
  { id: 1, name: "Luna-2X", country: "USA", company: "SpaceX", aim: "Lunar lander deliver satellite constellation" },
  { id: 2, name: "Mars Orbiter Mk-III", country: "India", company: "ISRO", aim: "Mars atmospheric survey" },
  { id: 3, name: "Starlink 85", country: "USA", company: "SpaceX", aim: "Add 60 satellites to constellation" },
];

const pastFailures = [
  { id: 1, name: "Falcon X-12", country: "USA", company: "SpaceX", reason: "Second stage engine anomaly", date: "2024-09-17" },
  { id: 2, name: "Nova-5 (Block C)", country: "Russia", company: "Roscosmos", reason: "Guidance computer fault", date: "2025-01-04" },
  { id: 3, name: "ISRO Launch-22", country: "India", company: "ISRO", reason: "Fuel leak detected pre-launch", date: "2024-11-02" },
];

const launchStats = [
  { country: "USA", success: 125, fail: 5 },
  { country: "India", success: 45, fail: 2 },
  { country: "Russia", success: 98, fail: 8 },
  { country: "China", success: 80, fail: 4 },
];

const launchFacts = [
  "The first liquid-fueled rocket was launched by Robert Goddard in 1926.",
  "A single rocket launch releases enough kinetic energy to power a city for a day.",
  "Reusable rocket boosters can reduce launch cost by up to 70%.",
  "The fastest rocket ever launched reached a velocity of over 11 km/s.",
];

const indiaNextMissions = [
  { mission: "Gaganyaan Test Flight 2", aim: "Crew module re-entry test", date: "2026-03-15" },
  { mission: "Chandrayaan-4 Orbiter", aim: "Lunar south pole mapping", date: "2026-09-10" },
];

export default function RocketLaunches() {
  return (
    <div className="text-white overflow-x-hidden">
      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 lg:px-12">
        <motion.h1
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-7xl font-extrabold drop-shadow-[0_0_20px_#fff] glow-white"
        >
          Rocket Launch Center
        </motion.h1>
        <p className="mt-4 max-w-2xl text-lg opacity-80">
          Track upcoming launches, learn from past failures, and explore global space-flight statistics.  
          Stay ahead in the countdown to the stars.
        </p>
        <Rocket className="mt-8 animate-bounce" size={48} />
      </section>

      {/* UPCOMING LAUNCHES */}
      <section className="py-20 px-6 lg:px-12">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-semibold mb-10 glow-white"
        >
          Upcoming Launches
        </motion.h2>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {upcomingLaunches.map(l => (
            <motion.div
              key={l.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="panel bg-black/25 backdrop-blur-sm border border-white/10 p-6 rounded-xl shadow-md"
            >
              <div className="flex items-center gap-4">
                <Rocket size={32} />
                <h3 className="text-2xl font-bold">{l.name}</h3>
              </div>
              <p className="mt-2 text-sm text-gray-300">Country: {l.country}</p>
              <p className="text-sm text-gray-300">Company: {l.company}</p>
              <p className="mt-2">Aim: {l.aim}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PAST FAILURES */}
      <section className="py-20 px-6 lg:px-12 bg-black/20">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-semibold mb-10 glow-white"
        >
          Recent Launch Failures & Root Causes
        </motion.h2>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {pastFailures.map(f => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="panel bg-black/25 backdrop-blur-sm border border-white/10 p-6 rounded-xl shadow-md"
            >
              <div className="flex items-center gap-4">
                <AlertTriangle size={32} className="text-red-400" />
                <h3 className="text-2xl font-bold">{f.name}</h3>
              </div>
              <p className="mt-2 text-sm text-gray-300">Country: {f.country}</p>
              <p className="text-sm text-gray-300">Company: {f.company}</p>
              <p className="mt-2">Date: {f.date}</p>
              <p className="mt-2">Failure Reason: {f.reason}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* LAUNCH STATISTICS GRAPH */}
      <section className="py-20 px-6 lg:px-12">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-semibold mb-12 glow-white text-center"
        >
          Global Launch Success Stats
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          <LaunchStatsChart data={launchStats} />
        </div>
      </section>

      {/* SUGGESTED LAUNCH WINDOWS */}
      <section className="py-20 px-6 lg:px-12 bg-black/20">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-semibold mb-10 glow-white"
        >
          Recommended Launch Windows
        </motion.h2>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Example suggestions */}
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} className="panel bg-black/25 backdrop-blur-sm border border-white/10 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold">Mid-December 2025</h3>
            <p className="text-sm text-gray-300 mt-2">Good for polar-orbit payloads; favourable earth-sun geometry.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} className="panel bg-black/25 backdrop-blur-sm border border-white/10 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold">Late-January 2026</h3>
            <p className="text-sm text-gray-300 mt-2">Ideal for interplanetary injection missions toward Mars window.</p>
          </motion.div>
        </div>
      </section>

      {/* INTERESTING FACTS */}
      <section className="py-20 px-6 lg:px-12">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-semibold mb-10 glow-white text-center"
        >
          Rocket Launch Facts 
        </motion.h2>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {launchFacts.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} className="panel bg-black/25 backdrop-blur-sm border border-white/10 p-6 rounded-xl shadow-md">
              <Lightbulb size={28} className="mb-3" />
              <p className="text-sm">{f}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* INDIA NEXT MISSIONS */}
      <section className="pb-28 px-6 lg:px-12 bg-black/20">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-semibold mb-10 glow-white text-center"
        >
          India’s Upcoming Missions
        </motion.h2>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {indiaNextMissions.map(m => (
            <motion.div key={m.mission} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} className="panel bg-black/25 backdrop-blur-sm border border-white/10 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold">{m.mission}</h3>
              <p className="mt-2 text-sm text-gray-300">Date: {m.date}</p>
              <p className="mt-2">Mission Aim: {m.aim}</p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}

// --- LaunchStatsChart: simple SVG bar chart ---
function LaunchStatsChart({ data }) {
  const max = Math.max(...data.map(d => d.success + d.fail));
  return (
    <svg viewBox="0 0 400 250" className="w-full h-auto">
      {data.map((d, i) => {
        const total = d.success + d.fail;
        const successH = (d.success / max) * 200;
        const failH = (d.fail / max) * 200;
        const x = 60 + i * 80;
        return (
          <g key={d.country}>
            {/* success bar */}
            <rect x={x} y={220 - successH} width={24} height={successH} fill="#4ade80" />
            {/* fail bar */}
            <rect x={x + 26} y={220 - failH} width={24} height={failH} fill="#f87171" />
            {/* label */}
            <text x={x + 12} y={240} textAnchor="middle" className="fill-white text-xs">
              {d.country}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
