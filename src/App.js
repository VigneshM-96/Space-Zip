// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
      <Starfield />

      {/* Content above the starfield */}
      <div className="relative z-10">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vision-alert" element={<VisionAlert />} />
          <Route path="/rocket-launches" element={<RocketLaunches />} />
          <Route path="/study" element={<Study />} />
          <Route path="/live-dashboard" element={<LiveDashboard />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
