import React from 'react';
import { motion } from 'framer-motion';

export const NeonButton = ({ 
  children, 
  onClick, 
  color = 'pink', 
  className = '',
  type = 'button',
  disabled = false,
  ...props 
}) => {
  const colorMap = {
    pink: 'text-neonPink border-neonPink shadow-neon-pink hover:bg-neonPink hover:text-darkBg',
    blue: 'text-neonBlue border-neonBlue shadow-neon-blue hover:bg-neonBlue hover:text-darkBg',
    green: 'text-neonGreen border-neonGreen shadow-neon-green hover:bg-neonGreen hover:text-darkBg',
    yellow: 'text-neonYellow border-neonYellow shadow-neon-yellow hover:bg-neonYellow hover:text-darkBg',
  };

  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        border-2 px-6 py-3 font-y2k text-sm uppercase transition-all duration-300
        ${colorMap[color]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  );
};
