import { useState, useEffect, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { Mail, ArrowRight, Lock, ShieldCheck } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

function storeSession(user: any) {
  localStorage.setItem('user', JSON.stringify({ ...user, loginAt: Date.now() }));
  if (user.role === 'admin') localStorage.setItem('isAdmin', 'true');
  if (user.isNewUser) localStorage.setItem('pendingUserId', user.id);
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usePassword, setUsePassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const sendMagicLink = useMutation(api.auth.sendMagicLink);
  const verifyMagicLink = useMutation(api.auth.verifyMagicLink);
  const loginWithPassword = useMutation(api.auth.loginWithPassword);

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) return;

    setVerifying(true);
    setVerifyError('');
    verifyMagicLink({ token })
      .then((user) => {
        storeSession(user);
        if (user.isNewUser) {
          navigate('/complete-profile');
        } else if (user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/profile');
        }
      })
      .catch((err) => {
        setVerifyError(err.message || 'Invalid or expired link.');
      })
      .finally(() => setVerifying(false));
  }, [searchParams, verifyMagicLink, navigate]);

  const handleMagicLink = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      await sendMagicLink({ email });
      setMagicLinkSent(true);
    } catch {
      alert('Failed to send magic link. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsSubmitting(true);
    setVerifyError('');
    try {
      const user = await loginWithPassword({ email, password });
      storeSession(user);
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    } catch (err: any) {
      setVerifyError(err.message || 'Login failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-zinc-400 text-sm uppercase tracking-widest">Verifying your link...</p>
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
            <h1 className="font-serif text-3xl font-bold text-white uppercase tracking-wider">Sign In</h1>
            <p className="text-zinc-500 mt-2 text-sm uppercase tracking-widest font-mono">Access your 1DORUZ account</p>
          </div>

          {verifyError && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm text-center">{verifyError}</p>
            </div>
          )}

          {magicLinkSent ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-gold-500/10 border border-gold-500/30 rounded-lg text-center"
            >
              <p className="text-gold-500 text-sm font-bold mb-1">Check your inbox!</p>
              <p className="text-zinc-400 text-xs">We sent a sign-in link to <strong className="text-white">{email}</strong>.</p>
              <p className="text-zinc-500 text-[10px] mt-3 uppercase tracking-widest">Link expires in 15 minutes</p>
            </motion.div>
          ) : usePassword ? (
            <form onSubmit={handlePasswordLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-zinc-950 border border-zinc-800 pl-12 pr-4 py-4 text-white focus:border-gold-500 focus:outline-none transition-colors rounded-none text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                    className="w-full bg-zinc-950 border border-zinc-800 pl-12 pr-4 py-4 text-white focus:border-gold-500 focus:outline-none transition-colors rounded-none text-sm"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={!email || !password || isSubmitting}
                className="luxury-button w-full bg-gold-500 text-zinc-950 hover:bg-gold-400 disabled:opacity-50 flex items-center justify-center gap-2 group"
              >
                {isSubmitting ? 'Signing in...' : 'Sign In'} <ArrowRight size={18} />
              </button>
              <button
                type="button"
                onClick={() => setUsePassword(false)}
                className="w-full text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-gold-500 transition-colors"
              >
                Use magic link instead
              </button>
            </form>
          ) : (
            <form onSubmit={handleMagicLink} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-zinc-950 border border-zinc-800 pl-12 pr-4 py-4 text-white focus:border-gold-500 focus:outline-none transition-colors rounded-none text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!email || isSubmitting}
                className="luxury-button w-full bg-gold-500 text-zinc-950 hover:bg-gold-400 disabled:opacity-50 flex items-center justify-center gap-2 group"
              >
                {isSubmitting ? 'Sending...' : 'Send Magic Link'} <ArrowRight size={18} />
              </button>
              <button
                type="button"
                onClick={() => setUsePassword(true)}
                className="w-full text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-gold-500 transition-colors"
              >
                Sign in with password instead
              </button>
            </form>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-zinc-600 uppercase tracking-widest">
            No account? You'll be registered automatically when you sign in.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
