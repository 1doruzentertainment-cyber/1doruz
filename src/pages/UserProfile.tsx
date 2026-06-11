import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Settings, 
  Music4, 
  LogOut, 
  Mail, 
  Shield,
  Camera,
  Check,
  KeyRound,
  Loader2,
  FileAudio,
  ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { cn } from '../lib/utils';

export default function UserProfile() {
  const navigate = useNavigate();
  const stored = localStorage.getItem('user');
  const userData = stored ? JSON.parse(stored) : null;
  const userId = userData?.id;
  const userEmail = userData?.email;

  const user = useQuery(api.users.getById, userId ? { id: userId as any } : 'skip');
  const myDemos = useQuery(api.demos.getByEmail, userEmail ? { email: userEmail } : 'skip');

  const [activeView, setActiveView] = useState('overview');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [displayName, setDisplayName] = useState('');

  const updateProfile = useMutation(api.users.updateProfile);
  const setPassword = useMutation(api.auth.setPassword);

  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const [preferences, setPreferences] = useState({
    newsletter: true,
    newReleases: false
  });

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('pendingUserId');
    navigate('/');
  };

  const handleSaveSettings = async (e: FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    setIsSaving(true);
    try {
      await updateProfile({ id: userId as any, name: displayName || undefined });
      const stored = localStorage.getItem('user');
      if (stored) {
        const u = JSON.parse(stored);
        u.name = displayName || u.name;
        localStorage.setItem('user', JSON.stringify(u));
      }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch {
      alert('Failed to update profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSetPassword = async (e: FormEvent) => {
    e.preventDefault();
    if (newPassword !== passwordConfirm) {
      setPasswordError('Passwords do not match.');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      return;
    }
    setPasswordError('');
    setIsSaving(true);
    try {
      await setPassword({ userId: userId as any, password: newPassword });
      setPasswordSuccess(true);
      setNewPassword('');
      setPasswordConfirm('');
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (err: any) {
      setPasswordError(err.message || 'Failed to set password.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-24">
        <p className="text-zinc-400 text-sm">Please <a href="/login" className="text-gold-500 underline">sign in</a> to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page pt-24 sm:pt-32 pb-24 px-4 sm:px-6 overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-[300px_1fr] gap-8 lg:gap-12">
          
          {/* Sidebar / Profile Card */}
          <aside className="space-y-6 lg:space-y-8">
            <div className="luxury-card p-6 sm:p-10 text-center">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-800 overflow-hidden">
                  <User size={32} className="text-zinc-600" />
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-gold-500 rounded-full text-black hover:bg-gold-400 transition-colors shadow-xl">
                  <Camera size={12} />
                </button>
              </div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-white uppercase tracking-tight">{user?.name || user?.email?.split('@')[0] || 'Member'}</h2>
              <p className="text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-widest font-mono mt-1 italic">1DORUZ Member</p>
              
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-zinc-900 space-y-3 sm:space-y-4">
                <button 
                  onClick={() => setActiveView(activeView === 'overview' ? 'settings' : 'overview')}
                  className={cn(
                    "w-full py-4 sm:py-3 border text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 touch-manipulation",
                    activeView === 'settings' 
                      ? "bg-gold-500 text-black border-gold-500" 
                      : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-white"
                  )}
                >
                  <Settings size={14} /> {activeView === 'settings' ? 'Back to Overview' : 'Account Settings'}
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full py-4 sm:py-3 border border-red-500/20 text-[10px] font-bold uppercase tracking-widest text-red-500/60 hover:text-red-500 hover:bg-red-500/5 transition-all flex items-center justify-center gap-2 touch-manipulation"
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            </div>

            <div className="luxury-card p-6 sm:p-8 bg-gold-500/5 border-gold-500/10 hidden lg:block">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-500 mb-4">Member Perk</h4>
              <p className="text-xs text-zinc-400 leading-relaxed italic">
                "Early access to vinyl drops and exclusive artist mastering workshops."
              </p>
            </div>
          </aside>

          {/* Main Content */}
          <main className="space-y-12">
            <AnimatePresence mode="wait">
              {activeView === 'overview' ? (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-12"
                >
                    <section className="luxury-card p-5 sm:p-12">
                    <div className="flex items-center gap-3 mb-8 sm:mb-10">
                      <Music4 className="text-gold-500" size={20} />
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">Your Demo Vault</h3>
                      <span className="text-[10px] text-zinc-600 uppercase tracking-widest ml-auto">
                        {myDemos?.length ?? 0} submission{(myDemos?.length ?? 0) !== 1 ? 's' : ''}
                      </span>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                      {myDemos === undefined ? (
                        <div className="p-8 text-center">
                          <Loader2 size={20} className="mx-auto text-zinc-600 animate-spin" />
                        </div>
                      ) : myDemos.length === 0 ? (
                        <div className="p-8 text-center border border-dashed border-zinc-800">
                          <Music4 size={24} className="mx-auto text-zinc-600 mb-3" />
                          <p className="text-zinc-500 text-sm">No demo submissions yet.</p>
                          <p className="text-[10px] text-zinc-700 uppercase tracking-widest mt-1">Your submissions will appear here</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {myDemos.map((demo) => (
                            <div key={demo._id} className="flex items-center justify-between p-5 border border-zinc-800 hover:border-zinc-700 transition-colors">
                              <div className="flex items-center gap-4 min-w-0">
                                <FileAudio size={20} className="text-zinc-600 shrink-0" />
                                <div className="min-w-0">
                                  <p className="text-sm text-white font-medium truncate">{demo.artistName}</p>
                                  <p className="text-[10px] text-zinc-600 uppercase tracking-widest mt-0.5">
                                    Status: <span className={cn(
                                      "font-bold",
                                      demo.status === 'pending' && 'text-yellow-500',
                                      demo.status === 'reviewed' && 'text-blue-500',
                                      demo.status === 'accepted' && 'text-green-500',
                                      demo.status === 'rejected' && 'text-red-500'
                                    )}>{demo.status}</span>
                                  </p>
                                </div>
                              </div>
                              {demo.demoUrl && (
                                <a href={demo.demoUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-gold-500 transition-colors p-2">
                                  <ExternalLink size={16} />
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      <button 
                        onClick={() => navigate('/submit-demo')}
                        className="w-full py-5 border-2 border-dashed border-zinc-800 text-zinc-600 hover:border-gold-500 hover:text-gold-500 transition-all text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 min-h-[50px] touch-manipulation"
                      >
                        Submit New Audio Asset
                      </button>
                    </div>
                  </section>

                  <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                    <div className="luxury-card p-6 sm:p-10">
                      <div className="flex items-center gap-3 mb-8">
                        <Mail className="text-zinc-500" size={18} />
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-white uppercase tracking-tight">Preferences</h3>
                      </div>
                      <div className="space-y-6">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-widest">Newsletter</span>
                          <button 
                            onClick={() => setPreferences(prev => ({ ...prev, newsletter: !prev.newsletter }))}
                            className={cn(
                              "w-12 h-6 rounded-full relative transition-colors duration-300 flex-shrink-0 touch-manipulation",
                              preferences.newsletter ? "bg-gold-500" : "bg-zinc-800"
                            )}
                          >
                            <motion.div 
                              initial={false}
                              animate={{ x: preferences.newsletter ? 26 : 6 }}
                              className="absolute top-1 h-4 w-4 bg-black rounded-full shadow-sm" 
                            />
                          </button>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-widest">New Releases</span>
                          <button 
                            onClick={() => setPreferences(prev => ({ ...prev, newReleases: !prev.newReleases }))}
                            className={cn(
                              "w-12 h-6 rounded-full relative transition-colors duration-300 flex-shrink-0 touch-manipulation",
                              preferences.newReleases ? "bg-gold-500" : "bg-zinc-800"
                            )}
                          >
                            <motion.div 
                              initial={false}
                              animate={{ x: preferences.newReleases ? 26 : 6 }}
                              className="absolute top-1 h-4 w-4 bg-black rounded-full shadow-sm" 
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="luxury-card p-6 sm:p-10">
                      <div className="flex items-center gap-3 mb-6">
                        <Shield className="text-zinc-500" size={18} />
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-white uppercase tracking-tight">Security</h3>
                      </div>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-8 leading-relaxed">Last login: Today from Berlin, DE</p>
                      <button 
                        onClick={() => setActiveView('settings')}
                        className="w-full sm:w-auto py-3 sm:py-0 text-[10px] font-bold uppercase tracking-widest text-gold-500 hover:underline active:bg-gold-500/5 transition-colors border border-gold-500/20 sm:border-none inline-flex items-center justify-center"
                      >
                        Manage Security
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-12"
                >
                  <section className="luxury-card p-6 sm:p-12 bg-zinc-950/50 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-10 border-b border-zinc-900 pb-6 uppercase tracking-wider">
                      <Settings className="text-gold-500" size={20} />
                      <h3 className="font-serif text-[22px] sm:text-2xl font-bold text-white">Identity & Access</h3>
                    </div>

                    <form onSubmit={handleSaveSettings} className="space-y-10">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059]">Display Name</label>
                          <input 
                            type="text" 
                            value={displayName}
                            onChange={e => setDisplayName(e.target.value)}
                            placeholder={user?.name || user?.email?.split('@')[0] || 'Your name'}
                            className="w-full bg-zinc-900 border border-zinc-800 p-5 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors min-h-[44px]" 
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059]">Email Address</label>
                          <input 
                            type="email" 
                            value={user?.email || ''} 
                            disabled
                            className="w-full bg-zinc-900/50 border border-zinc-800 p-5 text-sm text-zinc-600 cursor-not-allowed min-h-[44px]" 
                          />
                        </div>
                      </div>

                      <div className="pt-8 border-t border-zinc-900">
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-6">Security Shield</h4>
                        <div className="bg-zinc-900/40 border border-zinc-800 p-6 flex items-center justify-between gap-4 rounded-sm">
                          <div>
                            <div className="text-[11px] font-bold text-white uppercase tracking-wider">Two-Factor Authentication</div>
                            <p className="text-[10px] text-zinc-600 uppercase tracking-widest mt-1">Enhance account security via app notifications</p>
                          </div>
                          <div className="w-12 h-6 bg-gold-500 rounded-full relative flex-shrink-0">
                            <div className="absolute top-1 left-[26px] h-4 w-4 bg-black rounded-full shadow-md" />
                          </div>
                        </div>
                      </div>

                      <div className="pt-8 border-t border-zinc-900">
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-6">Password</h4>
                        <form onSubmit={handleSetPassword} className="space-y-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">New Password</label>
                              <div className="relative">
                                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                                <input
                                  type="password"
                                  value={newPassword}
                                  onChange={(e) => setNewPassword(e.target.value)}
                                  placeholder="Min. 6 characters"
                                  className="w-full bg-zinc-950 border border-zinc-800 pl-12 pr-4 py-4 text-white focus:border-gold-500 focus:outline-none transition-colors text-sm"
                                />
                              </div>
                            </div>
                            <div className="space-y-3">
                              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Confirm Password</label>
                              <input
                                type="password"
                                value={passwordConfirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                placeholder="Repeat password"
                                className="w-full bg-zinc-950 border border-zinc-800 px-4 py-4 text-white focus:border-gold-500 focus:outline-none transition-colors text-sm"
                              />
                            </div>
                          </div>
                          {passwordError && (
                            <p className="text-red-400 text-[10px] uppercase tracking-widest">{passwordError}</p>
                          )}
                          <div className="flex items-center justify-end gap-6">
                            {passwordSuccess && (
                              <span className="text-green-500 text-[10px] uppercase tracking-widest flex items-center gap-2">
                                <Check size={14} /> Password saved
                              </span>
                            )}
                            <button
                              type="submit"
                              disabled={!newPassword || !passwordConfirm || isSaving}
                              className="px-10 py-3 bg-zinc-900 border border-zinc-800 text-[10px] font-bold uppercase tracking-widest text-white hover:border-gold-500 hover:text-gold-500 transition-all disabled:opacity-30"
                            >
                              {isSaving ? 'Saving...' : 'Set Password'}
                            </button>
                          </div>
                        </form>
                      </div>

                      <div className="pt-12 flex flex-col sm:flex-row justify-end items-center gap-6">
                        <button 
                          type="button" 
                          onClick={() => setActiveView('overview')}
                          className="w-full sm:w-auto text-[10px] font-bold uppercase tracking-widest text-zinc-600 hover:text-white transition-colors py-4 sm:py-0 border border-zinc-800 sm:border-none inline-flex items-center justify-center touch-manipulation"
                        >
                          Discard Changes
                        </button>
                        <button 
                          disabled={isSaving}
                          className={cn(
                            "w-full sm:w-auto px-16 py-5 sm:py-4 text-[10px] uppercase tracking-widest font-bold flex items-center gap-3 transition-all duration-500 min-w-[220px] justify-center shadow-lg touch-manipulation",
                            saveSuccess ? "bg-green-500 text-black border-green-500 shadow-green-500/20" : "bg-gold-500 text-black border-gold-500 hover:bg-white",
                            isSaving && "opacity-70 cursor-not-allowed"
                          )}
                        >
                          {isSaving ? (
                            <div className="h-4 w-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                          ) : saveSuccess ? (
                            <><motion.div initial={{scale:0}} animate={{scale:1}} className="flex items-center"><Check size={18} /></motion.div> Profile Updated</>
                          ) : (
                            <>Update Account Data</>
                          )}
                        </button>
                      </div>
                    </form>
                  </section>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
