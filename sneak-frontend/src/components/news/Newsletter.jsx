import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useToast } from "../../context/ToastContext";
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
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      showToast("Please login to subscribe.", "info");
      navigate("/login");
      return;
    }

    const enteredEmail = e.target[0].value; // First input is email

    if (enteredEmail !== user.email) {
      showToast("Invalid email address. Please use your account email.", "error");
      return;
    }

    showToast("Redirecting to your subscription details...", "success");
    // Navigate to Account Page and switch to 'profile' tab
    navigate("/account", { state: { activeTab: "profile" } });
  };

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

          <form className="newsletter-form" onSubmit={handleSubmit}>
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