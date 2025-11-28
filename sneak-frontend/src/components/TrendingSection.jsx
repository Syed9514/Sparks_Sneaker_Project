import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { getProducts } from "../features/products/productSlice";
import ProductCard from "./ProductCard"; // Reusing your existing card
import "./TrendingSection.css";

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delay between each card popping in
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 50, damping: 20 }
  },
};

const titleVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const lineVariants = {
  hidden: { width: 0 },
  visible: { 
    width: "100px", 
    transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } 
  }
};

export default function TrendingSection() {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);
  const [trending, setTrending] = useState([]);

  // Fetch products if not already loaded
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getProducts());
    }
  }, [status, dispatch]);

  // Pick 3 random products once data is loaded
  useEffect(() => {
    if (products.length > 0) {
      // Shuffle array and pick first 3
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      setTrending(shuffled.slice(0, 3));
    }
  }, [products]);

  return (
    <section className="trending-section">
      <div className="trending-container">
        {/* Header Animation */}
        <motion.div 
          className="trending-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.h2 variants={titleVariants}>Trending Now</motion.h2>
          <motion.div className="trending-line" variants={lineVariants} />
        </motion.div>

        {/* Cards Grid Animation */}
        <motion.div 
          className="trending-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {trending.length > 0 ? (
            trending.map((product) => (
              <motion.div key={product._id} variants={cardVariants}>
                {/* We wrap ProductCard in a motion div to handle the 
                   pop-in animation without breaking the internal CSS of ProductCard 
                */}
                <ProductCard sneaker={product} />
              </motion.div>
            ))
          ) : (
            <p>Loading the hottest drops...</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}