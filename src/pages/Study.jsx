import { motion } from "framer-motion";
import { Rocket, Brain, Briefcase, Telescope, Sparkles, Globe, Cpu, Satellite } from "lucide-react";

export default function Study() {
  return (
    <div className="text-white overflow-x-hidden min-h-screen">

      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 lg:px-12 relative">
        <motion.h1
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="text-6xl md:text-7xl font-extrabold drop-shadow-[0_0_20px_#fff] glow-white leading-tight"
        >
          Explore the Cosmos <br /> Unlock Your Space Career
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="max-w-3xl mt-6 text-lg opacity-90"
        >
          Learn about space science, explore mysteries of the universe, and discover career paths
          to join the most exciting industries pushing humanity into the stars.
        </motion.p>

        <Sparkles className="mt-10 animate-pulse" size={38} />
      </section>

      {/* SPACE CAREER ROADMAP */}
      <section className="py-28 px-6 relative z-10">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-14 glow-white"
        >
          Space Career Roadmap
        </motion.h2>

        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-0"
          >
            {[
              { step: "Foundation", desc: "Physics, Math, Astronomy basics", icon: Brain },
              { step: "Specialization", desc: "Aerospace, AI, Robotics, Space Environment", icon: Cpu },
              { step: "Projects", desc: "Satellites, simulations, research programs", icon: Rocket },
              { step: "Internships", desc: "Space agencies & startups", icon: Globe },
              { step: "Career", desc: "Space Engineer, Scientist, Analyst, AI Space Expert", icon: Briefcase },
            ].map((stage, i) => (
              <motion.div
                key={i}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.2 }}
                className="bg-black/30 panel p-6 rounded-xl border border-white/10 flex flex-col items-center text-center w-full md:w-1/5 shadow-lg backdrop-blur-sm"
              >
                <stage.icon size={36} className="mb-3 text-white/80" />
                <h3 className="font-semibold text-lg">{stage.step}</h3>
                <p className="text-sm text-gray-300 mt-2">{stage.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="hidden md:block absolute top-1/2 left-2/12 right-2/12 h-[2px] bg-white/20 z-0"></div>
        </div>
      </section>

      {/* GLOBAL SPACE COMPANIES */}
      <section className="pb-28 px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12 glow-white"
        >
          Global Space Leaders
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {[
            { name: "NASA", goal: "Human exploration of Moon, Mars & planetary defense." },
            { name: "SpaceX", goal: "Multi-planetary life and Starship innovations." },
            { name: "ISRO", goal: "Affordable space access & scientific missions." },
            { name: "ESA", goal: "Climate studies, space telescopes, exoplanet exploration." },
            { name: "Blue Origin", goal: "Reusable rockets & commercial space travel." },
            { name: "Roscosmos", goal: "Space transport, ISS participation, deep-space missions." },
          ].map((org, i) => (
            <motion.div
              key={i}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
              className="bg-black/30 panel p-6 rounded-xl border border-white/10 shadow-md backdrop-blur-sm"
            >
              <h3 className="text-xl font-semibold">{org.name}</h3>
              <p className="text-sm mt-2 text-gray-300">{org.goal}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SPACE THEORIES & CONCEPTS */}
      <section className="pb-28 px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold text-center mb-14 glow-white"
        >
          Key Space Theories & Concepts
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { title: "Dark Matter & Dark Energy", desc: "About 95% of the universe remains unknown." },
            { title: "General Relativity", desc: "Gravity curves space-time." },
            { title: "Quantum Entanglement", desc: "Particles interact faster-than-light." },
            { title: "Exoplanet Habitats", desc: "Planets outside Solar System suitable for life." },
            { title: "Cosmic Microwave Background", desc: "Earliest light from Big Bang." },
            { title: "Black Hole Information Paradox", desc: "What happens inside black holes?" },
            { title: "Solar System Dynamics", desc: "Planetary orbits, asteroids, comets, and gravity assists." },
            { title: "Astrobiology", desc: "Study of life in extreme environments & beyond Earth." },
          ].map((concept, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.85, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
              className="bg-black/30 panel p-8 rounded-2xl border border-white/10 text-center shadow-md backdrop-blur-sm"
            >
              <Brain className="mx-auto mb-4 text-white/80" size={36} />
              <h3 className="text-xl font-semibold">{concept.title}</h3>
              <p className="text-sm mt-2 text-gray-300">{concept.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SPACE MYSTERIES */}
      <section className="pb-28 px-6 text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold glow-white mb-12"
        >
          Mysteries of the Universe
        </motion.h2>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="bg-black/30 panel p-10 rounded-3xl max-w-4xl mx-auto text-lg opacity-90 border border-white/10 shadow-md backdrop-blur-sm"
        >
          <Telescope className="mx-auto mb-4 text-white/80" size={44} />
          Are we alone in the universe?  
          What lies beyond the observable universe?  
          Why does dark energy dominate cosmic expansion?  
          How will AI and robotics shape our space exploration future?  

          Keep exploring, the cosmos rewards curiosity.
        </motion.div>
      </section>

      {/* RESOURCES */}
      <section className="pb-28 px-6 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold text-center mb-14 glow-white"
        >
          Resources & Learning
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "NASA Exoplanet Exploration", link: "https://exoplanets.nasa.gov/" },
            { title: "SpaceX Research Hub", link: "https://www.spacex.com/research" },
            { title: "ESA Education", link: "https://www.esa.int/Education" },
            { title: "ISRO Science & Tech", link: "https://www.isro.gov.in/" },
            { title: "Universe Today", link: "https://www.universetoday.com/" },
            { title: "Astrophysics UCLA", link: "https://www.astro.ucla.edu/" },
          ].map((res, i) => (
            <motion.a
              key={i}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
              href={res.link}
              target="_blank"
              rel="noopener noreferrer"
              className="panel p-6 rounded-xl text-center border border-white/10 bg-black/30 shadow-md backdrop-blur-sm hover:shadow-[0_0_15px_#fff]"
            >
              <h3 className="text-lg font-semibold">{res.title}</h3>
            </motion.a>
          ))}
        </div>
      </section>

    </div>
  );
}
