import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Loader } from '../../components/ui/Loader';
import { FallbackImage } from '../../components/ui/FallbackImage';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        
        // Backend only has a GET all endpoint, so we fetch all and find the match
        const res = await axios.get(`${apiUrl}/notices`);
        
        if (res.data) {
          const matchedArticle = res.data.find(n => n.id.toString() === id.toString());
          if (matchedArticle) {
            setArticle(matchedArticle);
          } else {
            throw new Error("Not found");
          }
        } else {
          throw new Error("Not found");
        }
      } catch (err) {
        console.error("API failed to load article:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticle();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <Loader />;

  if (error || !article) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-brand-beige">
        <h1 className="text-4xl font-bold tracking-tight text-brand-charcoal mb-4">Article Not Found</h1>
        <Link to="/" className="text-brand-orange hover:text-brand-magenta transition-colors font-bold text-sm uppercase tracking-widest flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Front Page
        </Link>
      </div>
    );
  }

  return (
    <article className="pb-24 bg-brand-beige min-h-screen">
      <div className="relative w-full h-[60vh] md:h-[70vh] mb-16 overflow-hidden bg-brand-charcoal">
        <FallbackImage
          src={article.imageUrl}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-brand-beige" />
      </div>

      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 -mt-40 relative z-10"
        >
          <span className="inline-block px-4 py-1.5 bg-brand-orange text-white text-[10px] font-bold tracking-[0.2em] uppercase rounded-full mb-8 shadow-xl border border-brand-orange/20">
            {article.category}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-[900] text-brand-charcoal leading-[0.95] tracking-tighter mb-6 bg-white/95 backdrop-blur-2xl p-8 md:p-12 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(228,61,18,0.1)] border border-brand-orange/10" style={{ fontFamily: 'var(--font-display)' }}>
            {article.title}
          </h1>
          <p className="text-xl md:text-2xl text-brand-charcoal/60 font-sans font-medium leading-relaxed max-w-2xl mx-auto">
            {article.excerpt}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="prose prose-lg md:prose-xl prose-stone max-w-none 
            first-letter:text-7xl md:first-letter:text-8xl first-letter:font-[900] first-letter:text-brand-orange first-letter:mr-4 first-letter:mt-2 first-letter:float-left
            font-sans text-brand-charcoal leading-relaxed font-medium"
        >
          {(article.content || article.excerpt).split('\n').map((paragraph, idx) => (
            <p key={idx} className="mb-8">{paragraph}</p>
          ))}
        </motion.div>

        <hr className="my-16 border-brand-orange/10" />

        <div className="flex justify-center">
          <Link to="/" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-brand-charcoal rounded-2xl hover:bg-brand-orange hover:text-white transition-all font-bold text-xs tracking-[0.2em] uppercase shadow-lg shadow-brand-orange/5 border border-brand-orange/10">
            <ArrowLeft size={16} /> Return to Front Page
          </Link>
        </div>
      </div>
    </article>
  );
};
