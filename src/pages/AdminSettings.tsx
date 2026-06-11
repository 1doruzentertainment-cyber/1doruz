import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Settings as SettingsIcon, 
  Palette, 
  Globe, 
  Shield, 
  Bell, 
  Mail, 
  Database,
  Check,
  Save,
  Monitor,
  Cloud
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function AdminSettings() {
  const [activeSection, setActiveSection] = useState('cosmetic');
  const [contrastSetting, setContrastSetting] = useState('black');
  const [typographyPair, setTypographyPair] = useState('heritage');

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleDeploy = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  const SECTIONS = [
    { id: 'cosmetic', label: 'Website Cosmetic', icon: Palette, description: 'Themes, typography, and visual brand identity.' },
    { id: 'general', label: 'General Settings', icon: Globe, description: 'Metadata, SEO, and global site behavior.' },
    { id: 'security', label: 'Security & Access', icon: Shield, description: 'Admin roles, permissions, and session logs.' },
    { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Email alerts for demos and contact forms.' },
    { id: 'infrastructure', label: 'Data & Engine', icon: Database, description: 'Database links and system health.' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] p-4 sm:p-8 lg:p-12 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 sm:mb-16">
           <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold-500 mb-2 block">Control Panel</span>
           <h1 className="font-serif text-[28px] sm:text-5xl font-bold text-white leading-tight">System Settings</h1>
           <p className="text-zinc-500 text-sm mt-1 uppercase tracking-widest font-mono">Configure the 1DORUZ digital ecosystem</p>
        </header>

        <div className="grid lg:grid-cols-[300px_1fr] gap-8 lg:gap-12">
          {/* Sidebar Nav - Improved for Mobile */}
          <aside className="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-col gap-3 sm:gap-4 pb-4 lg:pb-0">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  "w-full text-left p-5 sm:p-6 border transition-all group min-h-[44px] touch-manipulation flex flex-col justify-center",
                  activeSection === section.id 
                    ? "bg-gold-500/5 border-gold-500/40 shadow-[0_0_20px_rgba(197,160,89,0.05)]" 
                    : "bg-zinc-950 border-zinc-900 hover:border-zinc-800"
                )}
              >
                <div className="flex items-center gap-4 mb-2">
                   <div className={cn(
                     "p-2 rounded-lg transition-colors",
                     activeSection === section.id ? "bg-gold-500 text-black" : "bg-zinc-900 text-zinc-600"
                   )}>
                     <section.icon size={16} />
                   </div>
                   <span className={cn(
                     "text-[10px] font-bold uppercase tracking-widest",
                     activeSection === section.id ? "text-white" : "text-zinc-500"
                   )}>{section.label}</span>
                </div>
                <p className="text-[10px] text-zinc-600 uppercase tracking-tight leading-relaxed group-hover:text-zinc-500 transition-colors hidden sm:block">
                  {section.description}
                </p>
              </button>
            ))}
          </aside>

          {/* Settings Canvas */}
          <main className="luxury-card p-6 sm:p-12 bg-zinc-950/50 backdrop-blur-sm">
             {activeSection === 'cosmetic' && (
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                 <div>
                   <h3 className="font-serif text-[22px] sm:text-2xl font-bold text-white mb-8 italic border-b border-zinc-900 pb-4">Brand Aesthetics</h3>
                   <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059]">Primary Color</label>
                        <div className="flex items-center gap-4">
                           <div className="w-14 h-14 bg-[#C5A059] border border-white/20 shadow-xl" />
                           <input type="text" defaultValue="#C5A059" className="bg-zinc-900 border border-zinc-800 px-4 py-4 text-sm font-mono text-zinc-400 w-full focus:outline-none focus:border-gold-500 transition-colors min-h-[44px]" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Accent Contrast</label>
                        <div className="flex gap-3">
                           <div 
                            onClick={() => setContrastSetting('black')}
                            className={cn(
                              "w-full h-14 border cursor-pointer transition-all flex items-center justify-center touch-manipulation hover:scale-[1.02]",
                              contrastSetting === 'black' ? "bg-black border-gold-500 shadow-[0_0_15px_rgba(197,160,89,0.1)]" : "bg-black border-white/5 hover:border-gold-500"
                            )}
                           >
                             {contrastSetting === 'black' && <Check className="text-gold-500" size={16} />}
                           </div>
                           <div 
                            onClick={() => setContrastSetting('zinc')}
                            className={cn(
                              "w-full h-14 border cursor-pointer transition-all flex items-center justify-center touch-manipulation hover:scale-[1.02]",
                              contrastSetting === 'zinc' ? "bg-zinc-900 border-gold-500 shadow-[0_0_15px_rgba(197,160,89,0.1)]" : "bg-zinc-900 border-white/5 hover:border-gold-500"
                            )}
                           >
                             {contrastSetting === 'zinc' && <Check className="text-gold-500" size={16} />}
                           </div>
                           <div 
                            onClick={() => setContrastSetting('white')}
                            className={cn(
                              "w-full h-14 border cursor-pointer transition-all flex items-center justify-center touch-manipulation hover:scale-[1.02]",
                              contrastSetting === 'white' ? "bg-white/5 border-gold-500 shadow-[0_0_15px_rgba(197,160,89,0.1)]" : "bg-white/5 border-white/5 hover:border-gold-500"
                            )}
                           >
                             {contrastSetting === 'white' && <Check className="text-gold-500" size={16} />}
                           </div>
                        </div>
                      </div>
                   </div>
                 </div>

                 <div className="pt-12 border-t border-zinc-900">
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-8">Typography Pairs</h4>
                    <div className="grid gap-4 sm:gap-6">
                      <div 
                        onClick={() => setTypographyPair('heritage')}
                        className={cn(
                          "luxury-card p-6 sm:p-8 border transition-all flex justify-between items-center group cursor-pointer hover:bg-gold-500/5 touch-manipulation",
                          typographyPair === 'heritage' ? "border-gold-500/40 bg-gold-500/5" : "border-zinc-900 opacity-50 hover:opacity-100"
                        )}
                      >
                         <div>
                           <div className="font-serif text-lg sm:text-xl text-white">Playfair Display / Inter</div>
                           <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Heritage & Modernity {typographyPair === 'heritage' && "(Active)"}</div>
                         </div>
                         {typographyPair === 'heritage' && <Check className="text-gold-500" size={20} />}
                      </div>
                      <div 
                        onClick={() => setTypographyPair('brutalist')}
                        className={cn(
                          "luxury-card p-6 sm:p-8 border transition-all flex justify-between items-center group cursor-pointer hover:bg-gold-500/5 touch-manipulation",
                          typographyPair === 'brutalist' ? "border-gold-500/40 bg-gold-500/5" : "border-zinc-900 opacity-50 hover:opacity-100"
                        )}
                      >
                         <div>
                           <div className="font-mono text-lg sm:text-xl text-white">Space Grotesk / JetBrains</div>
                           <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Brutalist / Technical {typographyPair === 'brutalist' && "(Active)"}</div>
                         </div>
                         {typographyPair === 'brutalist' && <Check className="text-gold-500" size={20} />}
                      </div>
                    </div>
                 </div>

                 <div className="pt-12 border-t border-zinc-900 flex justify-end">
                    <button 
                      onClick={handleDeploy}
                      disabled={isSaving}
                      className={cn(
                        "w-full sm:w-auto px-12 py-5 sm:py-4 text-[10px] uppercase tracking-widest font-bold flex items-center gap-3 min-w-[200px] justify-center transition-all duration-500 shadow-xl touch-manipulation",
                        saveSuccess ? "bg-green-500 text-black border-green-500 shadow-green-500/20" : "bg-gold-500 text-black border-gold-500 hover:bg-white",
                        isSaving && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      {isSaving ? (
                        <div className="h-4 w-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                      ) : saveSuccess ? (
                        <><Check size={16} /> Deployed Successfully</>
                      ) : (
                        <><Save size={16} /> Deploy Changes</>
                      )}
                    </button>
                 </div>
               </motion.div>
             )}

             {activeSection === 'general' && (
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                 <h3 className="font-serif text-[22px] sm:text-2xl font-bold text-white mb-8 italic border-b border-zinc-900 pb-4">Global Parameters</h3>
                 <div className="space-y-10">
                    <div className="grid gap-3">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059]">Site Title</label>
                       <input type="text" defaultValue="1DORUZ RECORDS | Premium Independent Label" className="bg-zinc-900 border border-zinc-800 p-5 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors" />
                    </div>
                    <div className="grid gap-3">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059]">SEO Description</label>
                       <textarea className="bg-zinc-900 border border-zinc-800 p-5 text-sm text-white h-40 focus:outline-none focus:border-gold-500 resize-none transition-colors leading-relaxed">The destination for experimental soul, cinematic techno, and boundary-pushing audio talent.</textarea>
                    </div>
                 </div>
               </motion.div>
             )}

             {activeSection !== 'cosmetic' && activeSection !== 'general' && (
                <div className="py-24 flex flex-col items-center justify-center text-zinc-700 italic border-2 border-dashed border-zinc-900/50 rounded-xl">
                   <SettingsIcon size={40} className="mb-6 opacity-20" />
                   <p className="text-[10px] uppercase tracking-widest font-bold">Standard Config Mode</p>
                   <p className="text-[10px] uppercase tracking-[0.2em] mt-2 opacity-50">Under Architecture Update</p>
                </div>
             )}
          </main>
        </div>
      </div>
    </div>
  );
}
