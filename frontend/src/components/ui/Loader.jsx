import React from 'react';
import { motion } from 'framer-motion';

export const Loader = () => {
  return (
    <div className="flex min-h-[50vh] w-full items-center justify-center bg-offwhite">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="text-2xl md:text-4xl font-serif font-black tracking-tight text-charcoal uppercase text-center px-4"
      >
        Warming the presses...
      </motion.div>
    </div>
  );
};
