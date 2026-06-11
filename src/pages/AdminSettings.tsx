import { useState, useEffect, useRef, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { 
  Globe, 
  Check,
  Save,
  Image,
  Upload,
  Loader2
} from 'lucide-react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { cn } from '../lib/utils';

export default function AdminSettings() {
  const stored = localStorage.getItem('user');
  const userData = stored ? JSON.parse(stored) : null;
  const callerId = userData?.id;

  const siteConfig = useQuery(api.config.get);

  const [activeSection, setActiveSection] = useState('cosmetic');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [logoUrl, setLogoUrl] = useState('');
  const [logoText, setLogoText] = useState('');
  const [primaryColor, setPrimaryColor] = useState('');
  const [siteTitle, setSiteTitle] = useState('');
  const [siteDescription, setSiteDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateConfig = useMutation(api.config.update);
  const generateUploadUrl = useMutation(api.config.generateUploadUrl);
  const saveLogo = useMutation(api.config.saveLogo);

  useEffect(() => {
    if (siteConfig) {
      setLogoUrl(siteConfig.logoUrl || '');
      setLogoText(siteConfig.logoText);
      setPrimaryColor(siteConfig.primaryColor);
      setSiteTitle(siteConfig.siteTitle);
      setSiteDescription(siteConfig.siteDescription || '');
    } else {
      setLogoText('1DORUZ');
      setPrimaryColor('#C5A059');
      setSiteTitle('1DORUZ RECORDS | Premium Independent Label');
    }
  }, [siteConfig]);

  const handleUpload = async (file: File) => {
    if (!callerId || !file) return;
    setIsUploading(true);
    try {
      const uploadUrl = await generateUploadUrl({ callerId: callerId as any });
      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: file,
      });
      const { storageId } = await response.json();
      await saveLogo({ callerId: callerId as any, storageId: storageId as any });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch {
      alert('Upload failed.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!callerId) return;
    setIsSaving(true);
    try {
      await updateConfig({
        callerId: callerId as any,
        logoUrl: logoUrl || undefined,
        logoText,
        primaryColor,
        siteTitle,
        siteDescription: siteDescription || undefined,
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch {
      alert('Failed to save settings.');
    } finally {
      setIsSaving(false);
    }
  };

  const SECTIONS = [
    { id: 'cosmetic', label: 'Brand & Logo', icon: Image, description: 'Logo, colors, and visual identity.' },
    { id: 'general', label: 'Site Metadata', icon: Globe, description: 'Title, description, and SEO.' },
  ];

  return (
    <div className="min-h-screen bg-page p-4 sm:p-8 lg:p-12 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 sm:mb-16">
           <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold-500 mb-2 block">Control Panel</span>
           <h1 className="font-serif text-[28px] sm:text-5xl font-bold text-white leading-tight">System Settings</h1>
           <p className="text-muted text-sm mt-1 uppercase tracking-widest font-mono">Configure the 1DORUZ digital ecosystem</p>
        </header>

        <form onSubmit={handleSave}>
          <div className="grid lg:grid-cols-[300px_1fr] gap-8 lg:gap-12">
            <aside className="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-col gap-3 sm:gap-4 pb-4 lg:pb-0">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  type="button"
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
                       activeSection === section.id ? "text-white" : "text-muted"
                     )}>{section.label}</span>
                  </div>
                  <p className="text-[10px] text-zinc-600 uppercase tracking-tight leading-relaxed group-hover:text-zinc-500 transition-colors hidden sm:block">
                    {section.description}
                  </p>
                </button>
              ))}
            </aside>

            <main className="luxury-card p-6 sm:p-12 bg-zinc-950/50 backdrop-blur-sm">
               {activeSection === 'cosmetic' && (
                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                   <div>
                     <h3 className="font-serif text-[22px] sm:text-2xl font-bold text-white mb-8 italic border-b border-zinc-900 pb-4">Brand Identity</h3>
                     <div className="space-y-8">
                       <div className="space-y-3">
                         <label className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059]">Logo Image</label>
                         <div className="flex items-center gap-4">
                           <div className="w-20 h-20 bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden shrink-0">
                             {logoUrl ? (
                               <img src={logoUrl} alt="logo preview" className="w-full h-full object-contain" />
                             ) : (
                               <Image size={24} className="text-zinc-600" />
                             )}
                           </div>
                           <div className="space-y-3 flex-1">
                             <input
                               type="file"
                               ref={fileInputRef}
                               accept="image/*"
                               className="hidden"
                               onChange={(e) => {
                                 const file = e.target.files?.[0];
                                 if (file) handleUpload(file);
                               }}
                             />
                             <button
                               type="button"
                               onClick={() => fileInputRef.current?.click()}
                               disabled={isUploading}
                               className="flex items-center justify-center gap-2 px-6 py-4 border border-zinc-800 text-[10px] font-bold uppercase tracking-widest text-white hover:border-gold-500 transition-all disabled:opacity-50"
                             >
                               {isUploading ? (
                                 <><Loader2 size={14} className="animate-spin" /> Uploading...</>
                               ) : (
                                 <><Upload size={14} /> Upload Logo</>
                               )}
                             </button>
                             <p className="text-[9px] text-zinc-600 uppercase tracking-widest">PNG, JPG, SVG or WebP</p>
                           </div>
                         </div>
                       </div>

                       <div className="space-y-3">
                         <label className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059]">Logo Image URL</label>
                         <div className="flex gap-3">
                           <input
                             type="url"
                             value={logoUrl}
                             onChange={(e) => setLogoUrl(e.target.value)}
                             placeholder="https://example.com/logo.png"
                             className="bg-zinc-900 border border-zinc-800 px-4 py-4 text-sm font-mono text-white w-full focus:outline-none focus:border-gold-500 transition-colors min-h-[44px]"
                           />
                         </div>
                       </div>

                       <div className="space-y-3">
                         <label className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059]">Logo Text (fallback)</label>
                         <input
                           type="text"
                           value={logoText}
                           onChange={(e) => setLogoText(e.target.value)}
                           className="bg-zinc-900 border border-zinc-800 px-4 py-4 text-sm text-white w-full focus:outline-none focus:border-gold-500 transition-colors min-h-[44px]"
                         />
                       </div>

                       <div className="space-y-3">
                         <label className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059]">Primary Brand Color</label>
                         <div className="flex items-center gap-4">
                           <input
                             type="color"
                             value={primaryColor}
                             onChange={(e) => setPrimaryColor(e.target.value)}
                             className="w-14 h-14 border border-zinc-800 cursor-pointer bg-transparent"
                           />
                           <input
                             type="text"
                             value={primaryColor}
                             onChange={(e) => setPrimaryColor(e.target.value)}
                             className="bg-zinc-900 border border-zinc-800 px-4 py-4 text-sm font-mono text-white w-full focus:outline-none focus:border-gold-500 transition-colors min-h-[44px]"
                           />
                         </div>
                       </div>
                     </div>
                   </div>
                 </motion.div>
               )}

               {activeSection === 'general' && (
                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                   <h3 className="font-serif text-[22px] sm:text-2xl font-bold text-white mb-8 italic border-b border-zinc-900 pb-4">Site Metadata</h3>
                   <div className="space-y-8">
                     <div className="space-y-3">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059]">Site Title</label>
                       <input
                         type="text"
                         value={siteTitle}
                         onChange={(e) => setSiteTitle(e.target.value)}
                         className="bg-zinc-900 border border-zinc-800 p-5 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors w-full"
                       />
                     </div>
                     <div className="space-y-3">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059]">Site Description</label>
                       <textarea
                         value={siteDescription}
                         onChange={(e) => setSiteDescription(e.target.value)}
                         className="bg-zinc-900 border border-zinc-800 p-5 text-sm text-white h-40 focus:outline-none focus:border-gold-500 resize-none transition-colors leading-relaxed w-full"
                       />
                     </div>
                   </div>
                 </motion.div>
               )}
            </main>
          </div>

          <div className="flex justify-end mt-8">
            <button
              type="submit"
              disabled={isSaving}
              className={cn(
                "px-12 py-5 sm:py-4 text-[10px] uppercase tracking-widest font-bold flex items-center gap-3 min-w-[200px] justify-center transition-all duration-500 shadow-xl touch-manipulation",
                saveSuccess ? "bg-green-500 text-black border-green-500 shadow-green-500/20" : "bg-gold-500 text-black border-gold-500 hover:bg-white",
                isSaving && "opacity-50 cursor-not-allowed"
              )}
            >
              {isSaving ? (
                <div className="h-4 w-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              ) : saveSuccess ? (
                <><Check size={16} /> Saved</>
              ) : (
                <><Save size={16} /> Save Settings</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
