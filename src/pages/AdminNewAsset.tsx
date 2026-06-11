import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Box, 
  Upload, 
  File, 
  Link as LinkIcon, 
  Tag, 
  Layers,
  Save,
  Globe,
  Check
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function AdminNewAsset() {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        navigate('/admin');
      }, 1500);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-page p-4 sm:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/admin')}
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 hover:text-gold-500 transition-colors mb-12"
        >
          <ArrowLeft size={14} /> Back to Overview
        </button>

        <header className="mb-16">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4 italic">Resource Asset Registry</h1>
          <p className="text-zinc-500 text-sm uppercase tracking-widest font-mono">Archive and manage digital properties for the label</p>
        </header>

        <form onSubmit={handleSave} className="space-y-12">
          {/* File Upload Section */}
          <section className="luxury-card p-6 sm:p-10 flex flex-col items-center justify-center min-h-[300px] border-dashed border-zinc-800 bg-zinc-950 group hover:border-gold-500 transition-colors cursor-pointer">
             <div className="h-20 w-20 rounded-full bg-zinc-900 flex items-center justify-center mb-6 group-hover:bg-gold-500 group-hover:text-black transition-colors">
                <Upload size={32} />
             </div>
             <h3 className="text-sm font-bold text-white uppercase tracking-[0.3em] mb-2">Drop Electronic Files</h3>
             <p className="text-[10px] text-zinc-600 uppercase tracking-widest">WAV, FLAC, AIFF, PDF, OR ZIP (Max 2GB)</p>
          </section>

          {/* Metadata */}
          <section className="grid md:grid-cols-2 gap-12">
             <div className="luxury-card p-6 sm:p-10 space-y-8">
                <div className="grid gap-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059]">Asset Title</label>
                  <input type="text" placeholder="Internal Master Stem_01" className="bg-zinc-950 border border-zinc-900 p-4 text-sm text-white focus:outline-none focus:border-gold-500" />
                </div>
                <div className="grid gap-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Asset Type</label>
                  <div className="grid grid-cols-2 gap-2">
                     <button type="button" className="py-3 border border-[#C5A059] text-[9px] font-bold uppercase tracking-widest text-[#C5A059] bg-[#C5A059]/5">Master Tape</button>
                     <button type="button" className="py-3 border border-zinc-800 text-[9px] font-bold uppercase tracking-widest text-zinc-500">Legal Document</button>
                     <button type="button" className="py-3 border border-zinc-800 text-[9px] font-bold uppercase tracking-widest text-zinc-500">Brand Kit</button>
                     <button type="button" className="py-3 border border-zinc-800 text-[9px] font-bold uppercase tracking-widest text-zinc-500">Technical Rider</button>
                  </div>
                </div>
             </div>

             <div className="luxury-card p-6 sm:p-10 space-y-8">
                <div className="grid gap-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Global Association</label>
                  <select className="bg-zinc-950 border border-zinc-900 p-4 text-sm text-zinc-500 focus:outline-none focus:border-gold-500 appearance-none">
                     <option>Not Associated</option>
                     <option>MARA LUNA - Project X</option>
                     <option>ZEPHYR - Cinematic Soul EP</option>
                  </select>
                </div>
                <div className="grid gap-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Accessibility Access</label>
                  <div className="space-y-4">
                     <div className="flex items-center gap-4 text-white text-xs">
                        <input type="checkbox" className="w-4 h-4 rounded-none bg-zinc-900 border-zinc-800 accent-gold-500" />
                        <span className="uppercase tracking-widest">Public Domain Asset</span>
                     </div>
                     <div className="flex items-center gap-4 text-white text-xs">
                        <input type="checkbox" className="w-4 h-4 rounded-none bg-zinc-900 border-zinc-800 accent-gold-500" defaultChecked />
                        <span className="uppercase tracking-widest">Admin Authorization Required</span>
                     </div>
                  </div>
                </div>
             </div>
          </section>

          <div className="flex flex-col sm:flex-row justify-end gap-6 pt-10 border-t border-zinc-900">
             <button 
              disabled={isSaving}
              className={cn(
                "luxury-button px-12 py-4 flex items-center justify-center gap-3 font-bold transition-all duration-500 min-w-[220px]",
                saveSuccess ? "bg-green-500 text-black border-green-500" : "bg-white text-black border-white",
                isSaving && "opacity-70 cursor-not-allowed"
              )}
             >
                {isSaving ? (
                  <div className="h-4 w-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : saveSuccess ? (
                   <><Check size={18} /> Asset Archived</>
                ) : (
                  <><Box size={18} /> Archive Asset</>
                )}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}
