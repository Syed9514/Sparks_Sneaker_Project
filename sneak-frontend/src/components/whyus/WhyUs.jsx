import { motion } from "framer-motion";
import { FiCheckCircle, FiTruck, FiRefreshCw, FiShield } from "react-icons/fi";
import "./WhyUs.css";

// --- VARIANTS ---
const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 } // Stagger speed
  }
};

const itemVariant = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5 }
  }
};

const iconVariant = {
  hidden: { rotate: -180, scale: 0.5, opacity: 0 },
  visible: { 
    rotate: 0, 
    scale: 1, 
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

export default function WhyUs() {
  const features = [
    {
      icon: <FiCheckCircle size={28} />,
      title: "Verified Authentic",
      desc: "Every pair manual inspected. No fakes, ever."
    },
    {
      icon: <FiTruck size={28} />,
      title: "Global Velocity",
      desc: "Expedited shipping to over 120 countries."
    },
    {
      icon: <FiShield size={28} />,
      title: "Secure Payments",
      desc: "Bank-grade encryption for 100% safe transactions."
    },
    {
      icon: <FiRefreshCw size={28} />,
      title: "Easy Returns",
      desc: "7-day hassle-free exchange policy."
    }
  ];

  return (
    <section className="whyus-section">
      <div className="whyus-container">
        
        {/* Left Column: Text */}
        <motion.div 
          className="whyus-header"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="subtitle">The Sparks_Sneakers Promise</span>
          <h2>Built for the <br /> Culture.</h2>
          <p>
            We didn't just build a store; we built an archive. Founded by collectors 
            for collectors, we bridge the gap between exclusive drops and the people 
            who actually wear them.
          </p>
        </motion.div>

        {/* Right Column: Features Grid */}
        <motion.div 
          className="features-grid"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div 
              className="feature-card" 
              key={index}
              variants={itemVariant}
              whileHover={{ y: -5 }} // Subtle lift on hover
            >
              <motion.div className="icon-wrapper" variants={iconVariant}>
                {feature.icon}
              </motion.div>
              <div className="text-wrapper">
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}