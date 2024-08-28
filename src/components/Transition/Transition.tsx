import { motion, Variants } from "framer-motion";
import React from "react";

const animationConfiguration: Variants = {
  initial: {
    rotateX: 90, // Start rotated from top
    opacity: 0,
    y: "-100%",
  },
  animate: {
    rotateX: 0, // Rotate back to normal
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1], // Smooth transition
    },
  },
  exit: {
    rotateX: -90, // Rotate towards the bottom
    opacity: 0,
    y: "100%",
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

interface TransitionsProps {
  children: React.ReactNode;
}

const Transitions: React.FC<TransitionsProps> = ({ children }) => {
  return (
    <motion.div
      style={{
        backgroundColor: "inherit", // Inherit background from parent
        position: "absolute", // Overlay the transitioning element
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        transformOrigin: "top", // Flip from the top
      }}
      variants={animationConfiguration}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};

export default Transitions;
