import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { text: "Home", link: "/" },
    { text: "Vision Alert", link: "/vision-alert" },
    { text: "Study", link: "/study" },
    { text: "Rocket Launches", link: "/rocket-launches" },
    { text: "Live Dashboard", link: "/live-dashboard" },
  ];

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-transparent z-50 
        flex justify-between items-center py-5 px-6 select-none">

        {/* Mobile Toggle Button */}
        <button
          className="lg:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={32} /> : <Menu size={32} />}
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-10 text-lg">
          {navLinks.map((item, i) => (
            <Link
              key={i}
              to={item.link}
              className="text-white hover:drop-shadow-[0_0_10px_#fff] transition"
            >
              {item.text}
            </Link>
          ))}
        </div>

        {/* Logo Right */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wider text-white drop-shadow-[0_0_15px_#fff]"
        >
          SPACE ZIP
        </Link>
      </nav>

      {/* Mobile Slide Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-0 left-0 w-3/4 h-full bg-black/80 backdrop-blur-xl 
            border-r border-white/20 z-40 flex flex-col items-center justify-center gap-10"
          >
            {navLinks.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={item.link}
                  onClick={() => setOpen(false)}
                  className="text-2xl text-white font-medium tracking-wide 
                  hover:drop-shadow-[0_0_25px_#fff] transition"
                >
                  {item.text}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
