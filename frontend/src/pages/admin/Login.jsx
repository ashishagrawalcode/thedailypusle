import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Lock, ArrowLeft } from 'lucide-react';
import api from '../../services/api';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // The API call must succeed to login
      const res = await api.post('/login', { email, password });
      login(res.data.user, res.data.token);
      navigate('/admin');
    } catch (err) {
      console.error(err);
      // Strictly enforce backend verification. No local fallbacks.
      setError("Authentication failed. Please verify your credentials and ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-beige p-6 relative overflow-hidden font-sans">
      <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-brand-orange/10 rounded-full blur-[100px] -z-10 mix-blend-multiply" />
      <div className="absolute -bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-brand-magenta/10 rounded-full blur-[100px] -z-10 mix-blend-multiply" />

      <Link to="/" className="absolute top-8 left-8 text-brand-charcoal/50 hover:text-brand-orange flex items-center gap-2 font-bold text-xs uppercase tracking-widest transition-colors z-20">
        <ArrowLeft size={16} /> Back to Pulse
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-white/70 backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(228,61,18,0.15)] border border-white/50 relative z-10"
      >
        <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mb-8 shadow-sm border border-brand-charcoal/5">
          <Lock className="w-6 h-6 text-brand-orange" />
        </div>

        <h1 className="text-4xl font-black tracking-tight text-brand-charcoal mb-3">Newsroom Access</h1>
        <p className="text-brand-charcoal/60 mb-8 font-medium leading-relaxed">Enter your credentials to access the TheDailyPulse publishing tools.</p>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-red-50 text-red-600 text-sm rounded-2xl font-bold border border-red-100 shadow-sm"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/50 ml-2">Email</label>
            <Input
              type="email"
              placeholder="editor@pulse.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-3xl bg-white/80 border-brand-charcoal/5 focus:bg-white focus:border-brand-orange px-6 py-5 text-brand-charcoal font-medium shadow-sm transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/50 ml-2">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-3xl bg-white/80 border-brand-charcoal/5 focus:bg-white focus:border-brand-orange px-6 py-5 text-brand-charcoal font-medium shadow-sm transition-all"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full rounded-3xl py-5 mt-4 bg-brand-orange hover:bg-brand-orange/90 text-white font-bold shadow-[0_10px_30px_-10px_rgba(228,61,18,0.5)] transition-all text-xs tracking-[0.2em] uppercase cursor-pointer">
            {loading ? "Authenticating..." : "Sign In"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};