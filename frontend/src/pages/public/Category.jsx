import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Loader } from '../../components/ui/Loader';
import { FallbackImage } from '../../components/ui/FallbackImage';
import { ArrowLeft, Hash } from 'lucide-react';

export const Category = () => {
  const { categoryName } = useParams();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCategoryNotices = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const res = await axios.get(`${apiUrl}/notices`);
        
        if (res.data) {
          // Filter by category name (case insensitive)
          const filtered = res.data.filter(
            n => n.category.toLowerCase() === categoryName.toLowerCase()
          );
          setNotices(filtered);
        } else {
          setNotices([]);
        }
      } catch (err) {
        console.error("API failed to load category notices:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategoryNotices();
    window.scrollTo(0, 0);
  }, [categoryName]);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-brand-beige">
        <h1 className="text-4xl font-bold tracking-tight text-brand-charcoal mb-4">Error Loading Category</h1>
        <Link to="/" className="text-brand-orange hover:text-brand-magenta transition-colors font-bold text-sm uppercase tracking-widest flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Front Page
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-brand-beige min-h-screen pt-8 overflow-hidden font-sans relative">
      {/* Background ambient radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-orange/5 blur-[120px] -z-10 rounded-full pointer-events-none" />

      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="px-4 sm:px-6 md:px-8 max-w-7xl mx-auto mb-16 mt-10"
      >
        <Link to="/" className="inline-flex items-center gap-2 text-brand-charcoal/50 hover:text-brand-orange font-bold text-[10px] uppercase tracking-widest mb-8 transition-colors">
          <ArrowLeft size={14} /> Home
        </Link>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-brand-orange/10">
            <Hash size={24} className="text-brand-orange" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-brand-charcoal tracking-tight capitalize">
            {categoryName}
          </h1>
        </div>
        <p className="text-brand-charcoal/50 font-medium text-lg max-w-2xl">
          Explore the latest stories, deep dives, and breaking news in {categoryName}.
        </p>
      </motion.section>

      <section className="px-4 sm:px-6 md:px-8 max-w-7xl mx-auto mb-32">
        {notices.length === 0 ? (
          <div className="bg-white/50 backdrop-blur-xl border border-white rounded-[2rem] p-16 text-center shadow-[0_20px_40px_-15px_rgba(0,0,0,0.02)]">
            <p className="text-xl text-brand-charcoal/50 font-medium">No articles found in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {notices.map((notice, index) => (
              <motion.article
                key={`cat-${notice.id}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col h-full"
              >
                <Link to={`/article/${notice.id}`} className="flex flex-col h-full bg-white/80 backdrop-blur-xl rounded-[2rem] p-5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-white hover:-translate-y-2 transition-all duration-500">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] shadow-inner mb-6">
                    <FallbackImage
                      src={notice.imageUrl}
                      alt={notice.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-grow flex flex-col px-2">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-2 h-2 rounded-full bg-brand-orange"></span>
                      <span className="text-[10px] font-bold text-brand-charcoal/40 uppercase tracking-[0.2em]">{notice.category}</span>
                    </div>
                    <h3 className="text-2xl font-black text-brand-charcoal leading-tight mb-4 group-hover:text-brand-orange transition-colors">
                      {notice.title}
                    </h3>
                    <p className="text-brand-charcoal/60 text-sm md:text-base leading-relaxed line-clamp-3 font-medium">
                      {notice.excerpt}
                    </p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};