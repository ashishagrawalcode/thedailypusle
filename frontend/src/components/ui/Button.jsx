import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({ children, className = '', variant = 'primary', ...props }) => {
  const baseClasses = "inline-flex items-center justify-center px-6 py-3 text-sm font-medium tracking-wide uppercase transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";
  const variants = {
    primary: "bg-charcoal text-offwhite hover:bg-black border border-transparent",
    outline: "bg-transparent text-charcoal border border-charcoal hover:bg-gray-100",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
