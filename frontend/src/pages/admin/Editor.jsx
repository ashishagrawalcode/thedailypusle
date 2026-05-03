import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { CATEGORIES } from '../../config/constants';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';

export const Editor = () => {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    imageUrl: '',
    category: CATEGORIES[3].label,
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(''); // NEW: Track real errors
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(''); // Clear old errors

    try {
      // 1. Get your Admin Badge
      const token = localStorage.getItem('bulletin_token');

      // 2. Send the data AND the badge to the real database
      // (Notice we don't need JSON.stringify if using Axios, it does it automatically)
      await api.post('/notices', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // 3. ONLY run this if the database says YES
      setSuccess(true);
      setTimeout(() => {
        navigate('/admin');
      }, 1500);

    } catch (err) {
      // 4. If the database says NO, catch the real error and show it!
      console.error(err);
      setError(err.response?.data?.error || "Failed to publish. Check your clearance.");
      setIsSubmitting(false); // Let the user try again
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          className="text-brand-orange mb-6"
        >
          <CheckCircle size={80} />
        </motion.div>
        <h2 className="text-3xl font-bold tracking-tight text-brand-charcoal">Dispatch Published!</h2>
        <p className="text-brand-charcoal/50 mt-3 font-medium">Redirecting to hub...</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-4xl font-sans mx-auto"
    >
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-brand-charcoal">Write New Dispatch</h1>
        <p className="text-brand-charcoal/50 mt-2 font-medium">Craft your story. It will go live immediately upon publishing.</p>
      </header>

      {/* NEW: Display the error message if the server blocks us */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl flex items-center gap-3">
          <AlertCircle size={20} />
          <p className="font-medium">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-10 rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-brand-orange/10">
        {/* ... All your existing form inputs go here ... */}
        {/* (I am omitting the inputs to save space, keep yours exactly as they were!) */}
        
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/40 ml-1">Headline</label>
          <Input 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            required 
            className="rounded-2xl border-brand-orange/10 text-2xl font-bold placeholder:font-normal placeholder:text-brand-charcoal/30 text-brand-charcoal px-6 py-5 bg-brand-beige/30 focus:bg-white focus:border-brand-orange"
            placeholder="e.g. Global Markets Rally"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/40 ml-1">Category</label>
            <select 
              name="category" 
              value={formData.category} 
              onChange={handleChange}
              className="w-full px-6 py-5 bg-brand-beige/30 border border-brand-orange/10 rounded-2xl text-brand-charcoal font-medium focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:bg-white transition-all appearance-none"
            >
              {CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.label}>{cat.label}</option>
              ))}
            </select>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/40 ml-1">Cover Image URL</label>
            <Input 
              name="imageUrl" 
              value={formData.imageUrl} 
              onChange={handleChange} 
              required 
              className="rounded-2xl border-brand-orange/10 px-6 py-5 bg-brand-beige/30 focus:bg-white focus:border-brand-orange text-brand-charcoal"
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/40 ml-1">Excerpt</label>
          <Input 
            name="excerpt" 
            value={formData.excerpt} 
            onChange={handleChange} 
            required 
            className="rounded-2xl border-brand-orange/10 px-6 py-5 bg-brand-beige/30 focus:bg-white focus:border-brand-orange text-brand-charcoal"
            placeholder="A short summary of the article..."
          />
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/40 ml-1">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={14}
            className="w-full px-6 py-5 bg-brand-beige/30 border border-brand-orange/10 rounded-2xl text-brand-charcoal placeholder-brand-charcoal/30 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:bg-white transition-all resize-none leading-relaxed text-lg"
            placeholder="Write your story here..."
          />
        </div>

        <div className="pt-6 border-t border-brand-orange/5 flex justify-end">
          <Button type="submit" disabled={isSubmitting} className="rounded-2xl px-10 py-5 bg-brand-orange hover:bg-brand-orange/90 text-white font-bold shadow-xl shadow-brand-orange/20 text-sm tracking-widest uppercase cursor-pointer">
            {isSubmitting ? 'Publishing...' : 'Publish to Front Page'}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};