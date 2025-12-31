import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Rocket,
  Eye,
  Satellite,
  GraduationCap,
  Shield,
  Globe,
  Cpu,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const features = [
    { name: "Vision Alert", icon: <Eye size={42} />, link: "/vision-alert" },
    { name: "Rocket Launches", icon: <Rocket size={42} />, link: "/rocket-launches" },
    { name: "Study", icon: <GraduationCap size={42} />, link: "/study" },
    { name: "Live Dashboard", icon: <Satellite size={42} />, link: "/live-dashboard" },
  ];

  const stats = [
    { label: "Active Satellites", value: 9554 },
    { label: "Rocket Launches", value: 203 },
    { label: "Space Agencies", value: 75 },
  ];

  const [count, setCount] = useState(stats.map(() => 0));

  useEffect(() => {
    const intervals = stats.map((stat, i) =>
      setInterval(() => {
        setCount((prev) => {
          const updated = [...prev];
          if (updated[i] < stat.value) {
            updated[i] += Math.ceil(stat.value / 100);
          }
          return updated;
        });
      }, 30)
    );
    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <div className="text-white">

      {/* HERO */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-7xl md:text-8xl font-extrabold tracking-widest
          drop-shadow-[0_0_35px_rgba(255,255,255,0.65)]"
        >
          SPACE ZIP
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3 }}
          className="max-w-3xl mt-6 text-lg opacity-90 leading-relaxed
          drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]"
        >
          A futuristic gateway for exploration and real-time space intelligence.
          Discover what lies beyond Earth through data, vision, and innovation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6 }}
          className="mt-10"
        >
          <Link
            to="/study"
            className="px-10 py-3 text-lg font-semibold border border-white/40 rounded-lg
            backdrop-blur-md transition
            hover:bg-white/5
            drop-shadow-[0_0_25px_rgba(255,255,255,0.45)]
            hover:drop-shadow-[0_0_45px_rgba(255,255,255,0.75)]"
          >
            Begin The Journey
          </Link>
        </motion.div>
      </section>

      {/* LIVE STATS */}
      <section className="py-20 bg-black/60 backdrop-blur-xl border-y border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center max-w-6xl mx-auto">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]"
            >
              <h3 className="text-4xl font-bold text-white">
                {count[i]}+
              </h3>
              <p className="opacity-80 mt-2">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MISSION */}
      <section className="py-24 px-6 text-center bg-white/5 backdrop-blur-sm border-y border-white/10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-semibold
          drop-shadow-[0_0_25px_rgba(255,255,255,0.55)]"
        >
          Our Mission
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="max-w-4xl mx-auto mt-6 text-lg opacity-90 leading-relaxed"
        >
          To build an intelligent platform where curiosity meets advanced technology,
          enabling space education, launch tracking, and real-time situational awareness.
        </motion.p>
      </section>

      {/* FEATURES */}
      <section className="py-28 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl text-center font-semibold mb-16
          drop-shadow-[0_0_25px_rgba(255,255,255,0.55)]"
        >
          Explore Key Sections
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{
                scale: 1.08,
                boxShadow: "0 0 40px rgba(255,255,255,0.45)",
              }}
              transition={{ duration: 0.4 }}
              className="p-8 text-center rounded-xl border border-white/20
              bg-white/5 backdrop-blur-lg cursor-pointer
              hover:border-white/50"
            >
              <div className="flex justify-center text-white mb-4
              drop-shadow-[0_0_25px_rgba(255,255,255,0.55)]">
                {item.icon}
              </div>

              <Link
                to={item.link}
                className="text-lg font-semibold tracking-wide
                drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY SPACE ZIP */}
      <section className="py-24 px-6 bg-black/60 backdrop-blur-lg border-t border-white/10">
        <h2 className="text-4xl font-semibold text-center mb-12
        drop-shadow-[0_0_25px_rgba(255,255,255,0.55)]">
          Why Space Zip?
        </h2>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto text-center">
          <InfoCard
            icon={<Shield size={40} />}
            title="Reliable Data"
            text="Powered by trusted global space APIs for accuracy and consistency."
          />
          <InfoCard
            icon={<Cpu size={40} />}
            title="AI Assisted"
            text="Intelligent systems analyze debris, launches, and potential risks."
          />
          <InfoCard
            icon={<Globe size={40} />}
            title="Educational Vision"
            text="Built for students, researchers, and space enthusiasts worldwide."
          />
        </div>
      </section>
    </div>
  );
}

function InfoCard({ icon, title, text }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="p-8 border border-white/20 bg-white/5 rounded-xl
      drop-shadow-[0_0_30px_rgba(255,255,255,0.45)]"
    >
      <div className="mb-4 flex justify-center text-white
      drop-shadow-[0_0_20px_rgba(255,255,255,0.55)]">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="opacity-85">{text}</p>
    </motion.div>
  );
}
