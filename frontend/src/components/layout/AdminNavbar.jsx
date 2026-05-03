import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PenTool, UserCircle, LogOut } from 'lucide-react';
import { BRAND } from '../../config/constants';
import { useAuth } from '../../context/AuthContext';

export const AdminNavbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Hub' },
    { path: '/admin/editor', icon: PenTool, label: 'Write' },
    { path: '/admin/profile', icon: UserCircle, label: 'Profile' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-3xl border-b border-brand-charcoal/5 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xl md:text-2xl font-black tracking-tight text-brand-orange hover:opacity-80 transition-opacity">
              TheDaily<span className="font-medium text-brand-charcoal/80">Pulse</span>
            </Link>
            <span className="hidden md:inline-flex items-center px-2.5 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-[9px] font-bold uppercase tracking-widest border border-brand-orange/20">
              {user?.role}
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            {navItems.map(item => {
              const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                    isActive 
                      ? 'bg-brand-charcoal text-white shadow-md shadow-brand-charcoal/20' 
                      : 'text-brand-charcoal/60 hover:text-brand-charcoal hover:bg-brand-charcoal/5'
                  }`}
                >
                  <item.icon size={16} className={isActive ? 'text-brand-gold' : ''} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/" className="text-xs font-bold uppercase tracking-widest text-brand-charcoal/50 hover:text-brand-orange transition-colors hidden sm:block">
              Exit
            </Link>
            <button onClick={handleLogout} className="text-brand-magenta hover:opacity-70 p-2 cursor-pointer transition-opacity" title="Sign Out">
               <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="md:hidden border-t border-brand-charcoal/5 overflow-x-auto no-scrollbar bg-white/50 backdrop-blur-3xl">
        <div className="flex items-center justify-center gap-2 px-4 py-3 min-w-max">
          {navItems.map(item => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                  isActive 
                    ? 'bg-brand-charcoal text-white' 
                    : 'text-brand-charcoal/60 bg-brand-charcoal/5'
                }`}
              >
                <item.icon size={14} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
};
