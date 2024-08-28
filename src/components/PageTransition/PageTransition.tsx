// src/components/PageTransition/PageTransition.tsx
import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { animations, AnimationType } from '../../animation/animations';

interface Props {
  children: React.ReactNode;
  transitionKey: AnimationType; // Use AnimationType for type safety
}

const PageTransition: React.FC<Props> = ({ children, transitionKey }) => {
  const location = useLocation();
  const controls = useAnimation();

  React.useEffect(() => {
    controls.start('animate');
  }, [location, transitionKey, controls]);

  const animation = animations[transitionKey];

  return (
    <motion.div
      key={transitionKey}
      initial={animation.initial}
      animate={controls}
      exit={animation.exit}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;