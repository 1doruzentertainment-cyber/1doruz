import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function CompleteProfile() {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem('pendingUserId');

  const updateProfile = useMutation(api.users.updateProfile);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !userId) return;
    setIsSubmitting(true);
    try {
      await updateProfile({ id: userId as any, name: name.trim() });
      localStorage.removeItem('pendingUserId');
      const stored = localStorage.getItem('user');
      if (stored) {
        const user = JSON.parse(stored);
        user.name = name.trim();
        localStorage.setItem('user', JSON.stringify(user));
      }
      navigate('/profile');
    } catch {
      alert('Failed to save profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-zinc-400 text-sm">No account data found. <a href="/login" className="text-gold-500 underline">Sign in again</a>.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20 pb-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-500/5 via-transparent to-transparent opacity-50" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="luxury-card p-10 rounded-2xl">
          <div className="text-center mb-10">
            <div className="inline-flex w-16 h-16 bg-gold-500 items-center justify-center font-bold text-black text-2xl mb-6">1D</div>
            <h1 className="font-serif text-3xl font-bold text-white uppercase tracking-wider">Welcome!</h1>
            <p className="text-zinc-500 mt-2 text-sm uppercase tracking-widest font-mono">Set up your profile to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 block">Display Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name or alias"
                  className="w-full bg-zinc-950 border border-zinc-800 pl-12 pr-4 py-4 text-white focus:border-gold-500 focus:outline-none transition-colors rounded-none text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!name.trim() || isSubmitting}
              className="luxury-button w-full bg-gold-500 text-zinc-950 hover:bg-gold-400 disabled:opacity-50 flex items-center justify-center gap-2 group"
            >
              {isSubmitting ? 'Saving...' : 'Continue to Profile'} <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
