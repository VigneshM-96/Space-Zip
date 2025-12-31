// src/App.jsx
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import VisionAlert from "./pages/VisionAlert";
import RocketLaunches from "./pages/RocketLaunches";
import Study from "./pages/Study";
import LiveDashboard from "./pages/LiveDashboard";

import Starfield from "./components/StarField";

function App() {
  return (
    <Router>
      {/* 🌌 Starfield background */}
      <Starfield className="fixed top-0 left-0 w-full h-full z-0" />

      {/* Content above the starfield */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        {/* Main content area */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />                   {/* Home page */}
            <Route path="/vision-alert" element={<VisionAlert />} />
            <Route path="/rocket-launches" element={<RocketLaunches />} />
            <Route path="/study" element={<Study />} />
            <Route path="/live-dashboard" element={<LiveDashboard />} />

            {/* Fallback route */}
            <Route path="*" element={<Home />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
