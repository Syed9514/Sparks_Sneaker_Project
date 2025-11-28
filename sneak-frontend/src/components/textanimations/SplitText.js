import React from 'react';
import { motion } from 'framer-motion';

const SplitText = ({ text, className = '', delay = 0 }) => {
  // Animation for the container to handle staggering
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay / 1000,
      },
    },
  };

  // Animation for each individual letter
  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotate: 5
    },
    visible: {
      opacity: 1, 
      y: 0, 
      rotate: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  // Split text into words first
  const words = text.split(" ");

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      style={{ display: "inline-block", width: "100%" }} // Allow container to fill width
    >
      {words.map((word, i) => (
        // Wrap each word in a span that keeps it together
        <span key={i} style={{ display: "inline-block", whiteSpace: "nowrap", marginRight: "0.25em" }}>
          {word.split("").map((char, j) => (
            <motion.span
              key={j}
              variants={letterVariants}
              style={{ display: "inline-block" }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  );
};

export default SplitText;