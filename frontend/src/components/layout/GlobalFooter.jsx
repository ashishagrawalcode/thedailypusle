import React from 'react';
import { BRAND, CATEGORIES } from '../../config/constants';
import { Link } from 'react-router-dom';

export const GlobalFooter = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-20 pb-12 px-6 lg:px-12 mt-20 font-sans">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-4xl font-serif font-black tracking-tighter uppercase mb-6 text-charcoal">{BRAND.NAME}</h2>
          <p className="text-gray-500 max-w-md text-base leading-relaxed font-light">
            {BRAND.TAGLINE}. Delivering uncompromised journalism and deep analysis to keep you ahead of the curve. Beautifully designed for the modern reader.
          </p>
        </div>
        
        <div>
          <h3 className="text-[10px] font-bold tracking-widest uppercase mb-8 text-charcoal">Sections</h3>
          <ul className="space-y-5">
            {CATEGORIES.map(cat => (
              <li key={cat.id}>
                <Link to={`/category/${cat.id}`} className="text-gray-500 hover:text-blue-600 transition-colors font-medium">
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[10px] font-bold tracking-widest uppercase mb-8 text-charcoal">Company</h3>
          <ul className="space-y-5">
            <li><Link to="/about" className="text-gray-500 hover:text-blue-600 transition-colors font-medium">About Us</Link></li>
            <li><Link to="/careers" className="text-gray-500 hover:text-blue-600 transition-colors font-medium">Careers</Link></li>
            <li><Link to="/contact" className="text-gray-500 hover:text-blue-600 transition-colors font-medium">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 font-medium tracking-wide">
        <p>&copy; {new Date().getFullYear()} {BRAND.NAME}. All rights reserved.</p>
        <div className="flex gap-8 mt-6 md:mt-0">
          <Link to="/privacy" className="hover:text-charcoal transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-charcoal transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};
