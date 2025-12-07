import { motion } from "framer-motion";
import { FiWifiOff, FiRefreshCw } from "react-icons/fi";
import "./NetworkError.css";

// Use your existing transparent shoe asset
const ERROR_SHOE = "/assets/shoe6-nobg.png";

export default function NetworkError({ onRetry }) {
  return (
    <div className="network-error-container">

      {/* Animated Visual Wrapper */}
      <div className="error-visuals">
        {/* Glitching Shoe */}
        <motion.img
          src={ERROR_SHOE}
          alt="Connection Lost"
          className="error-shoe"
          animate={{
            x: [-2, 2, -2, 2, 0],
            filter: ["grayscale(100%) blur(0px)", "grayscale(100%) blur(2px)", "grayscale(100%) blur(0px)"]
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 3
          }}
        />

        {/* Floating Wifi Icon */}
        <motion.div
          className="wifi-badge"
          animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FiWifiOff size={32} />
        </motion.div>
      </div>

      {/* Text Content */}
      <div className="error-content">
        <h2>Connection Dropped</h2>
        <p>Don't trip. It's just a bad signal.</p>
        <p className="sub-text">Check your internet and try again.</p>

        <button className="retry-btn" onClick={onRetry}>
          <FiRefreshCw className="btn-icon" /> Retry Connection
        </button>
      </div>
    </div>
  );
}