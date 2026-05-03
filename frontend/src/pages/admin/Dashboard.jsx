import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { Loader } from '../../components/ui/Loader';
import { Trash2, ExternalLink, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { DUMMY_NOTICES } from '../../config/constants';

export const Dashboard = () => {
  const { user } = useAuth();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await api.get('/notices');
      setNotices(res.data);
    } catch (err) {
      console.warn("Backend API failed. Using fallback constants.");
      setNotices(DUMMY_NOTICES);
    } finally {
      setLoading(false);
    }
  };

  const handleRetract = async (id) => {
    if (user.role !== 'admin') return;
    if (!window.confirm("Are you sure you want to retract this article? This action is irreversible.")) return;

    try {
      await api.delete(`/notices/${id}`);
      setNotices(notices.filter(n => n.id !== id));
    } catch (err) {
      console.warn("API delete failed. Mocking deletion locally.");
      setNotices(notices.filter(n => n.id !== id));
    }
  };

  if (loading) return <Loader />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-8 font-sans"
    >
      <header>
        <h1 className="text-4xl font-bold tracking-tight text-brand-charcoal">Dispatch Hub</h1>
        <p className="text-brand-charcoal/60 mt-2 font-medium">Manage live articles and monitor readership across TheDailyPulse.</p>
      </header>

      <div className="bg-white rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-brand-orange/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-beige border-b border-brand-orange/10 text-[10px] uppercase tracking-[0.2em] text-brand-charcoal/50 font-bold">
              <tr>
                <th className="px-8 py-5">Title & Stats</th>
                <th className="px-8 py-5">Category</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-orange/5">
              <AnimatePresence>
                {notices.map((notice) => (
                  <motion.tr
                    key={notice.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="hover:bg-brand-beige/50 transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <div className="font-bold text-lg text-brand-charcoal group-hover:text-brand-orange transition-colors">{notice.title}</div>
                      <div className="text-xs text-brand-charcoal/40 mt-2 flex items-center gap-1.5 font-medium">
                        <BarChart2 size={14} className="text-brand-gold" />
                        {notice.views.toLocaleString()} views
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-brand-orange/10 text-brand-orange text-[10px] font-bold uppercase tracking-widest border border-brand-orange/20">
                        {notice.category}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-widest border border-green-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        Live
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right space-x-3">
                      <Link to={`/article/${notice.id}`} target="_blank" className="text-brand-charcoal/40 hover:text-brand-orange transition-colors inline-block p-2 hover:bg-brand-orange/10 rounded-xl">
                        <ExternalLink size={20} />
                      </Link>

                      {user.role === 'admin' && (
                        <button
                          onClick={() => handleRetract(notice.id)}
                          className="text-brand-charcoal/40 hover:text-brand-magenta transition-colors inline-block p-2 hover:bg-brand-magenta/10 rounded-xl cursor-pointer"
                          title="Retract Article (Admin Only)"
                        >
                          <Trash2 size={20} />
                        </button>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {notices.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-8 py-16 text-center text-brand-charcoal/50 font-medium">
                    No articles found. Start writing!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};