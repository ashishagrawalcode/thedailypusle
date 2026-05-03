import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, UserCircle } from 'lucide-react';
import { BRAND, CATEGORIES } from '../../config/constants';
import { useAuth } from '../../context/AuthContext';

export const GlobalNavbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const { user } = useAuth();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] flex flex-col bg-white/90 backdrop-blur-3xl border-b border-brand-charcoal/5 shadow-sm transition-all">
        {/* Top Minimal Bar */}
        <div className="flex items-center justify-between px-4 lg:px-8 py-3 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-4 w-1/3">
            <button 
              onClick={() => setSearchOpen(true)}
              className="text-brand-charcoal/50 hover:text-brand-orange transition-colors cursor-pointer p-1"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          <Link to="/" className="w-1/3 text-center text-2xl md:text-3xl font-black tracking-tighter text-brand-orange hover:opacity-80 transition-opacity">
            {BRAND.NAME}
          </Link>

          <div className="flex items-center justify-end gap-3 w-1/3">
            {user ? (
              <Link to="/admin" className="text-brand-charcoal/50 hover:text-brand-orange transition-colors">
                <UserCircle className="w-6 h-6" />
              </Link>
            ) : (
              <Link to="/admin/login" className="text-brand-charcoal/50 hover:text-brand-orange transition-colors text-xs font-bold uppercase tracking-widest hidden sm:block">
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Horizontal Scrolling Categories (Apple News Style) */}
        <div className="w-full overflow-x-auto no-scrollbar border-t border-brand-charcoal/5 bg-white/50 backdrop-blur-md">
          <div className="flex items-center justify-center sm:justify-start gap-6 px-4 lg:px-8 py-2.5 min-w-max max-w-7xl mx-auto w-full">
            {CATEGORIES.map(cat => (
              <Link 
                key={cat.id} 
                to={`/category/${cat.id}`} 
                className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-charcoal/60 hover:text-brand-orange transition-colors whitespace-nowrap"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[95px] left-0 right-0 z-[110] bg-white/95 backdrop-blur-3xl border-b border-brand-charcoal/10 shadow-2xl p-6 lg:px-8"
          >
            <div className="max-w-4xl mx-auto flex items-center gap-4">
              <Search className="w-6 h-6 text-brand-charcoal/40" />
              <input 
                type="text" 
                placeholder="Channels, Topics, and Stories" 
                className="flex-1 text-2xl font-bold outline-none bg-transparent placeholder-brand-charcoal/20 text-brand-charcoal"
                autoFocus
              />
              <button onClick={() => setSearchOpen(false)} className="text-xs font-bold uppercase tracking-widest text-brand-magenta hover:opacity-70 p-2 cursor-pointer bg-brand-magenta/10 rounded-full px-4">
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
