import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { motion } from 'framer-motion';
import { Loader } from '../../components/ui/Loader';
import { FallbackImage } from '../../components/ui/FallbackImage';
import { DUMMY_NOTICES } from '../../config/constants';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await api.get('/notices');
        if (res.data && res.data.length > 0) {
          setNotices(res.data);
        } else {
          setNotices(DUMMY_NOTICES);
        }
      } catch (err) {
        console.warn("API fetch failed. Falling back to constants.");
        setNotices(DUMMY_NOTICES);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  if (loading) return <Loader />;
  if (notices.length === 0) return null;

  const [heroNotice, ...gridNotices] = notices;

  return (
    <div className="w-full bg-brand-beige min-h-screen pt-8 overflow-hidden font-sans relative">
      {/* Background ambient radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-white/60 blur-[120px] -z-10 rounded-full pointer-events-none" />

      {/* Top Stories - Hero */}
      <motion.section
        initial={{ opacity: 0, y: 50, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="px-4 sm:px-6 md:px-8 max-w-7xl mx-auto mb-20 md:mb-32 mt-4"
      >
        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-charcoal/40 mb-6 flex items-center gap-4 before:h-[1px] before:flex-1 before:bg-brand-charcoal/10 after:h-[1px] after:flex-1 after:bg-brand-charcoal/10">Top Stories</h2>

        <div className="relative w-full h-[65vh] md:h-[75vh] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden group shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] border border-white/50 cursor-pointer">
          <Link to={`/article/${heroNotice.id}`} className="absolute inset-0 z-20">
            <span className="sr-only">Read {heroNotice.title}</span>
          </Link>
          <FallbackImage
            src={heroNotice.imageUrl}
            alt={heroNotice.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-105"
          />
          {/* Subtle gradient to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/20 to-transparent mix-blend-multiply opacity-80" />
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 z-10">
            <span className="text-brand-gold font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs mb-4 bg-white/10 backdrop-blur-md self-start px-4 py-1.5 rounded-full border border-white/20">
              {heroNotice.category}
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-[8rem] font-[900] text-white leading-[0.85] tracking-tighter mb-6 drop-shadow-2xl" style={{ fontFamily: 'var(--font-display)' }}>
              {heroNotice.title}
            </h1>
            <p className="text-white/90 text-lg md:text-2xl font-medium max-w-3xl line-clamp-2 md:line-clamp-3 leading-relaxed drop-shadow-lg">
              {heroNotice.excerpt}
            </p>
          </div>
        </div>
      </motion.section>

      {/* Trending - Horizontal Scroll */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full relative mb-20 md:mb-32 py-16"
      >
        <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl border-y border-white/50 -z-10" />
        <div className="px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-brand-charcoal mb-10 tracking-tight">
            Trending Now
          </h2>
          {/* Added -mx-4 and px-4 on mobile to allow cards to bleed to edge but maintain padding */}
          <div className="flex overflow-x-auto gap-6 pb-12 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar snap-x snap-mandatory">
            {gridNotices.map((notice) => (
              <Link
                key={notice.id}
                to={`/article/${notice.id}`}
                className="flex-none w-[85vw] sm:w-[350px] md:w-[420px] snap-center sm:snap-start bg-white/80 backdrop-blur-xl rounded-[2rem] p-5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-white flex flex-col group hover:-translate-y-2 transition-all duration-500"
              >
                <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 shadow-inner">
                  <FallbackImage
                    src={notice.imageUrl}
                    alt={notice.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-2 h-2 rounded-full bg-brand-orange"></span>
                  <span className="text-[10px] font-bold text-brand-charcoal/40 uppercase tracking-[0.2em]">{notice.category}</span>
                </div>
                <h3 className="text-2xl font-black text-brand-charcoal leading-tight mb-3 group-hover:text-brand-orange transition-colors">
                  {notice.title}
                </h3>
                <p className="text-brand-charcoal/60 text-sm md:text-base line-clamp-2 font-medium leading-relaxed">
                  {notice.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      {/* For You - Grid */}
      <section className="px-4 sm:px-6 md:px-8 max-w-7xl mx-auto mb-32">
        <h2 className="text-3xl font-black text-brand-charcoal mb-12 tracking-tight">For You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {gridNotices.map((notice, index) => (
            <motion.article
              key={`foryou-${notice.id}`}
              initial={{ opacity: 0, y: 80, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ margin: "-50px" }}
              transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col"
            >
              <Link to={`/article/${notice.id}`} className="flex flex-col h-full">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] mb-6 border border-white">
                  <FallbackImage
                    src={notice.imageUrl}
                    alt={notice.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm">
                    <span className="text-[10px] font-bold text-brand-charcoal uppercase tracking-[0.2em]">{notice.category}</span>
                  </div>
                </div>
                <div className="flex-grow flex flex-col px-2">
                  <h3 className="text-2xl md:text-3xl font-black text-brand-charcoal leading-tight mb-4 group-hover:text-brand-orange transition-colors">
                    {notice.title}
                  </h3>
                  <p className="text-brand-charcoal/60 text-base md:text-lg leading-relaxed line-clamp-3 font-medium">
                    {notice.excerpt}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
};
