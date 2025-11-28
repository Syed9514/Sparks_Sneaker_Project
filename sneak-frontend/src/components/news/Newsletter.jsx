import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import "./Newsletter.css";

// --- VARIANTS ---
const cardVariant = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const inputVariant = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { delay: 0.3, duration: 0.5 } 
  }
};

const btnVariant = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { delay: 0.4, duration: 0.5 } 
  },
  hover: { scale: 1.05, x: 5 } // Slight move right on hover
};

export default function Newsletter() {
  return (
    <section className="newsletter-section">
      <motion.div 
        className="newsletter-card"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={cardVariant}
      >
        <div className="newsletter-content">
          <motion.span 
            className="newsletter-tag"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Stay in the loop
          </motion.span>
          
          <h2>Don't Miss the Drop</h2>
          <p>Join the list. Get exclusive access to new releases, restocks, and member-only events.</p>
          
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <motion.input 
              type="email" 
              placeholder="Enter your email" 
              required 
              variants={inputVariant}
            />
            <motion.button 
              type="submit" 
              aria-label="Subscribe"
              variants={btnVariant}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              <FiArrowRight />
            </motion.button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}