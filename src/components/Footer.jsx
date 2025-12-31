import { Globe, ShieldCheck, Satellite } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-16 bg-black/40 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-400">

        {/* Brand */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-white tracking-wide">
            Space Zip
          </h2>
          <p className="text-gray-500 leading-relaxed">
            An AI-powered space intelligence platform for real-time monitoring,
            risk prediction, and situational awareness.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-3">
          <h3 className="text-white font-medium uppercase tracking-wider text-xs">
            Core Capabilities
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Satellite size={14} /> Live Space Object Tracking
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck size={14} /> AI-Based Risk Prediction
            </li>
            <li className="flex items-center gap-2">
              <Globe size={14} /> Global Situational Awareness
            </li>
          </ul>
        </div>

        {/* Credits */}
        <div className="space-y-3 md:text-right">
          <h3 className="text-white font-medium uppercase tracking-wider text-xs">
            Project Info
          </h3>
          <p>
            © {new Date().getFullYear()} Space Zip
          </p>
          <p className="text-gray-500">
            An Idea by <span className="text-gray-300">Vignesh M</span>
          </p>
          
        </div>

      </div>

      {/* Bottom strip */}
      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-600 tracking-wide">
        Intelligent • Secure • Scalable Space Monitoring
      </div>
    </footer>
  );
}
