import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import "./HomeHero.css";

// Animation Variants for cleaner code
const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", delay },
  }),
};

const imageVariant = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: "easeOut", delay: 0.2 },
  },
};

export default function HomeHero() {
  // Parallax Logic: Map scroll position (0px to 600px) to movement values
  const { scrollY } = useScroll();
  const ySneaker = useTransform(scrollY, [0, 600], [0, 100]); // Sneaker moves down slower
  const yText = useTransform(scrollY, [0, 600], [0, 50]); // Text moves down slightly
  const yBlob = useTransform(scrollY, [0, 600], [0, -100]); // Blob moves UP (contrast)

  return (
    <section className="home-hero">
      {/* 1. Background Blob (Floating + Parallax) */}
      <motion.div 
        className="hero-blob"
        style={{ y: yBlob }} // Parallax effect
        animate={{ 
          y: [0, -30, 0], 
          scale: [1, 1.05, 1],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />

      <div className="hero-container">
        {/* 2. Left Content (Text) */}
        <motion.div 
          className="hero-content"
          style={{ y: yText }} // Parallax effect
          initial="hidden"
          animate="visible"
        >
          <motion.span 
            className="hero-tag"
            variants={fadeUpVariant}
            custom={0.1}
          >
            New Collection 2025
          </motion.span>

          <motion.h1 variants={fadeUpVariant} custom={0.2}>
            Step Into <br /> 
            <span className="highlight-text">The Future.</span>
          </motion.h1>

          <motion.p variants={fadeUpVariant} custom={0.3}>
            Experience the ultimate fusion of comfort and street culture. 
            Limited drops available now.
          </motion.p>

          <motion.div variants={fadeUpVariant} custom={0.4}>
            <Link to="/collection">
              <motion.button 
                className="hero-btn"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                Shop Now
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* 3. Right Content (Sneaker Image) */}
        <motion.div 
          className="hero-image-wrapper"
          style={{ y: ySneaker }} // Parallax effect
          initial="hidden"
          animate="visible"
          variants={imageVariant}
        >
          {/* Ensure this path points to a real image in your public folder */}
          <img src="/assets/shoe6-nobg.png" alt="Exclusive Sneaker" className="hero-img" />
          
          {/* Decorative Circle behind shoe */}
          <div className="hero-circle"></div>
        </motion.div>
      </div>
    </section>
  );
}