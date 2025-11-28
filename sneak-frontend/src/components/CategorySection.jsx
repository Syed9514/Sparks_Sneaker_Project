import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./CategorySection.css";

const categories = [
  {
    name: "Men",
    image: "/assets/categories/men.png",
    path: "/men",
  },
  {
    name: "Women",
    image: "/assets/categories/women.png",
    path: "/women",
  },
  {
    name: "Kids",
    image: "/assets/categories/kid.png",
    path: "/kids",
  },
];

// --- VARIANTS ---
const titleVariant = {
  hidden: { opacity: 0, y: -50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const cardVariant = {
  hidden: { opacity: 0, rotateX: 15, y: 30 }, // 3D rotation start
  visible: { 
    opacity: 1, 
    rotateX: 0, 
    y: 0,
    transition: { type: "spring", stiffness: 50 } 
  }
};

const textVariant = {
  rest: { y: 0 },
  hover: { y: -10, transition: { duration: 0.3 } }
};

export default function CategorySection() {
  return (
    <section className="category-section">
      <div className="category-container">
        <motion.h2 
          className="category-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={titleVariant}
        >
          Shop by Category
        </motion.h2>

        <motion.div 
          className="category-grid"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {categories.map((cat) => (
            <Link to={cat.path} key={cat.name}>
              <motion.div 
                className="category-card"
                variants={cardVariant}
                initial="rest"
                whileHover="hover"
                whileTap="hover"
              >
                {/* Background Image Layer for Zoom Effect */}
                <motion.div 
                  className="category-bg" 
                  style={{ backgroundImage: `url(${cat.image})` }}
                  variants={{
                    rest: { scale: 1 },
                    hover: { scale: 1.1 }
                  }}
                  transition={{ duration: 0.5 }}
                />

                {/* Overlay Layer */}
                <div className="category-overlay">
                  <motion.h3 variants={textVariant}>
                    {cat.name}
                  </motion.h3>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}