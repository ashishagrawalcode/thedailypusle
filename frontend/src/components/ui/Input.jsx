import React from 'react';

export const Input = ({ className = '', ...props }) => {
  return (
    <input
      className={`w-full px-4 py-3 bg-transparent border border-charcoal text-charcoal placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-charcoal transition-all ${className}`}
      {...props}
    />
  );
};
