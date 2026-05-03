import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Activity, FileText, Eye, Loader, AlertCircle } from 'lucide-react';
import axios from 'axios';

export const Profile = () => {
  const { user: contextUser } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfileStats = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        
        // Since backend doesn't have a specific /profile route, we fetch all notices 
        // and calculate the stats for the current user locally.
        const res = await axios.get(`${apiUrl}/notices`);
        
        if (res.data) {
          const userNotices = res.data.filter(notice => notice.authorId === contextUser?.id);
          const totalViews = userNotices.reduce((acc, curr) => acc + (curr.views || 0), 0);
          
          setProfileData({
            stats: {
              totalArticles: userNotices.length,
              totalViews: totalViews
            }
          });
        }
      } catch (err) {
        console.error("Failed to load profile stats:", err);
        setError("Unable to load profile data from the server.");
      } finally {
        setLoading(false);
      }
    };

    if (contextUser?.id) {
      fetchProfileStats();
    } else {
      setLoading(false); // If no user context yet, stop loading
    }
  }, [contextUser]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-brand-orange">
        <Loader className="animate-spin mb-4" size={32} />
        <p className="text-sm font-bold tracking-widest uppercase">Loading Profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-6 rounded-3xl border border-red-100 shadow-sm max-w-lg mx-auto mt-10 text-center flex flex-col items-center gap-3">
        <AlertCircle size={32} />
        <p className="font-bold">{error}</p>
      </div>
    );
  }

  const user = profileData?.user || contextUser;
  const stats = profileData?.stats || { totalArticles: 0, totalViews: 0 };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-4xl font-sans mx-auto"
    >
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-brand-charcoal">My Profile</h1>
        <p className="text-brand-charcoal/50 mt-2 font-medium">Manage your personal settings and view your activity metrics.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1 md:col-span-1">
          <div className="bg-white rounded-3xl p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-brand-orange/10 flex flex-col items-center text-center relative overflow-hidden group hover:shadow-[0_30px_60px_-15px_rgba(228,61,18,0.1)] transition-shadow duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 w-24 h-24 bg-brand-orange/10 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-lg shadow-brand-orange/10">
              <User size={40} className="text-brand-orange" />
            </div>
            <h2 className="relative z-10 text-2xl font-bold text-brand-charcoal mb-1">{user?.name || "Editor"}</h2>
            <div className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-beige text-brand-charcoal/70 text-[10px] font-bold uppercase tracking-widest border border-brand-orange/10 mb-6">
              <Shield size={12} className={user?.role?.toLowerCase() === 'admin' ? 'text-brand-magenta' : 'text-brand-orange'} />
              {user?.role}
            </div>
            
            <div className="relative z-10 w-full text-left space-y-4 pt-6 border-t border-brand-orange/5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/40 mb-1">Email</p>
                <div className="flex items-center gap-2 text-brand-charcoal font-medium text-sm">
                  <Mail size={16} className="text-brand-charcoal/40" />
                  {user?.email}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-brand-orange/10">
            <h3 className="text-lg font-bold text-brand-charcoal mb-6 flex items-center gap-2">
              <Activity className="text-brand-orange" size={20} />
              Platform Analytics
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-brand-beige/50 rounded-2xl p-6 border border-brand-orange/5 transition-transform hover:-translate-y-1 duration-300">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/60">Total Dispatches</p>
                  <FileText size={20} className="text-brand-orange/40" />
                </div>
                <p className="text-5xl font-black text-brand-charcoal">{stats.totalArticles}</p>
                <p className="text-xs text-brand-charcoal/40 font-medium mt-2">Articles published</p>
              </div>

              <div className="bg-brand-orange/5 rounded-2xl p-6 border border-brand-orange/10 transition-transform hover:-translate-y-1 duration-300">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">Total Reads</p>
                  <Eye size={20} className="text-brand-orange/40" />
                </div>
                <p className="text-5xl font-black text-brand-orange">{stats.totalViews.toLocaleString()}</p>
                <p className="text-xs text-brand-orange/60 font-medium mt-2">All-time views generated</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
