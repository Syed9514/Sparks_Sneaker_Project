import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';
import './Toast.css';

const toastVariants = {
  initial: { opacity: 0, y: -50, scale: 0.9 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
};

const Toast = ({ message, type, action, onClose }) => {
  const getIcon = () => {
    switch (type) {
      case 'success': return <FiCheckCircle className="toast-icon success" />;
      case 'error': return <FiAlertCircle className="toast-icon error" />;
      default: return <FiInfo className="toast-icon info" />;
    }
  };

  return (
    <motion.div
      className={`toast-card ${type}`}
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      layout
    >
      <div className="toast-content">
        {getIcon()}
        <p className="toast-message">{message}</p>
      </div>

      {action && (
        <button className="toast-action-btn" onClick={action.onClick}>
          {action.label}
        </button>
      )}

      <button className="toast-close-btn" onClick={onClose}>
        <FiX />
      </button>
    </motion.div>
  );
};

export default Toast;
