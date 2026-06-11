import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Disc, 
  Upload, 
  Calendar, 
  Music, 
  Save, 
  Link as LinkIcon,
  Tag,
  Check
} from 'lucide-react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { cn } from '../lib/utils';

export default function AdminAddRelease() {
  const navigate = useNavigate();
  const artists = useQuery(api.artists.list);
  const [title, setTitle] = useState('');
  const [artistId, setArtistId] = useState('');
  const [artistName, setArtistName] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [coverArtUrl, setCoverArtUrl] = useState('https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=1200');
  const [releaseType, setReleaseType] = useState<'Single' | 'EP' | 'Album'>('Single');
  const [spotify, setSpotify] = useState('');
  const [appleMusic, setAppleMusic] = useState('');
  const [tidal, setTidal] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const createRelease = useMutation(api.releases.create);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!artistId || !artistName) return;
    setIsSaving(true);
    try {
      await createRelease({
        title,
        artistId: artistId as any,
        artistName,
        releaseDate,
        coverArtUrl,
        type: releaseType,
        streamingLinks: {
          spotify: spotify || undefined,
          appleMusic: appleMusic || undefined,
          tidal: tidal || undefined,
        },
        featured: false,
      });
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        navigate('/admin/releases');
      }, 1500);
    } catch (error) {
      console.error('Failed to create release:', error);
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] p-4 sm:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/admin/releases')}
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 hover:text-gold-500 transition-colors mb-12"
        >
          <ArrowLeft size={14} /> Back to Catalog
        </button>

        <header className="mb-16">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">New Release</h1>
          <p className="text-zinc-500 text-sm uppercase tracking-widest font-mono">Publish sonic content to global platforms</p>
        </header>

        <form onSubmit={handleSave} className="space-y-12">
          <section className="luxury-card p-6 sm:p-10 grid md:grid-cols-[300px_1fr] gap-12">
            <div className="space-y-6">
               <div className="aspect-square bg-zinc-900 border-2 border-dashed border-zinc-800 flex flex-col items-center justify-center group hover:border-gold-500 transition-colors cursor-pointer overflow-hidden">
                  <Upload size={32} className="text-zinc-700 group-hover:text-gold-500 mb-2" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 group-hover:text-gold-500">Cover Art</span>
                  <p className="text-[8px] text-zinc-800 mt-2">3000 x 3000px Minimum</p>
               </div>
               <div className="flex gap-2">
                  <button 
                    type="button"
                    onClick={() => setReleaseType('Single')}
                    className={cn(
                      "flex-1 py-3 border text-[9px] font-bold uppercase tracking-widest transition-all",
                      releaseType === 'Single' ? "text-[#C5A059] bg-[#C5A059]/5 border-[#C5A059]/40 shadow-[0_0_15px_rgba(197,160,89,0.1)]" : "border-zinc-800 text-zinc-500 hover:text-white"
                    )}
                  >Single</button>
                  <button 
                    type="button"
                    onClick={() => setReleaseType('EP')}
                    className={cn(
                      "flex-1 py-3 border text-[9px] font-bold uppercase tracking-widest transition-all",
                      releaseType === 'EP' ? "text-[#C5A059] bg-[#C5A059]/5 border-[#C5A059]/40 shadow-[0_0_15px_rgba(197,160,89,0.1)]" : "border-zinc-800 text-zinc-500 hover:text-white"
                    )}
                  >EP</button>
                  <button 
                    type="button"
                    onClick={() => setReleaseType('Album')}
                    className={cn(
                      "flex-1 py-3 border text-[9px] font-bold uppercase tracking-widest transition-all",
                      releaseType === 'Album' ? "text-[#C5A059] bg-[#C5A059]/5 border-[#C5A059]/40 shadow-[0_0_15px_rgba(197,160,89,0.1)]" : "border-zinc-800 text-zinc-500 hover:text-white"
                    )}
                  >Album</button>
               </div>
            </div>

            <div className="space-y-8">
               <div className="grid gap-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Release Title</label>
                  <input
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text" placeholder="Sonic Echoes" className="bg-zinc-950 border border-zinc-800 p-4 text-sm text-white focus:outline-none focus:border-gold-500" />
               </div>
               <div className="grid gap-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Artist</label>
                  <select
                    required
                    value={artistId}
                    onChange={(e) => {
                      const id = e.target.value;
                      setArtistId(id);
                      const artist = artists?.find((a: any) => a._id === id);
                      if (artist) setArtistName(artist.name);
                    }}
                    className="bg-zinc-950 border border-zinc-800 p-4 text-sm text-white focus:outline-none focus:border-gold-500 appearance-none"
                  >
                     <option value="">Select Artist...</option>
                     {artists?.map((a: any) => (
                       <option key={a._id} value={a._id}>{a.name}</option>
                     ))}
                  </select>
               </div>
               <div className="grid md:grid-cols-2 gap-8">
                  <div className="grid gap-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Release Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                      <input
                        required
                        value={releaseDate}
                        onChange={(e) => setReleaseDate(e.target.value)}
                        type="date" className="w-full bg-zinc-950 border border-zinc-800 pl-12 pr-4 py-4 text-sm text-white focus:outline-none focus:border-gold-500" />
                    </div>
                  </div>
               </div>
            </div>
          </section>

          <section className="luxury-card p-6 sm:p-10 space-y-10">
             <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-white border-b border-zinc-800 pb-4">Digital Distribution</h3>
             <div className="grid gap-4">
                <div className="flex items-center gap-4 bg-zinc-950 border border-zinc-800 p-4">
                   <LinkIcon size={18} className="text-zinc-600" />
                   <input value={spotify} onChange={(e) => setSpotify(e.target.value)} type="text" placeholder="Spotify Link" className="bg-transparent border-none focus:outline-none text-xs text-white w-full" />
                </div>
                <div className="flex items-center gap-4 bg-zinc-950 border border-zinc-800 p-4">
                   <LinkIcon size={18} className="text-zinc-600" />
                   <input value={appleMusic} onChange={(e) => setAppleMusic(e.target.value)} type="text" placeholder="Apple Music Link" className="bg-transparent border-none focus:outline-none text-xs text-white w-full" />
                </div>
                <div className="flex items-center gap-4 bg-zinc-950 border border-zinc-800 p-4">
                   <LinkIcon size={18} className="text-zinc-600" />
                   <input value={tidal} onChange={(e) => setTidal(e.target.value)} type="text" placeholder="Tidal Link" className="bg-transparent border-none focus:outline-none text-xs text-white w-full" />
                </div>
             </div>
          </section>

          <div className="flex flex-col sm:flex-row justify-end items-center gap-6 pt-10">
             <button 
              type="button" 
              onClick={() => navigate('/admin/releases')} 
              disabled={isSaving}
              className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 hover:text-white transition-colors disabled:opacity-30"
             >
              Save as Draft
             </button>
             <button 
              disabled={isSaving}
              className={cn(
                "luxury-button px-12 py-4 flex items-center justify-center gap-3 font-bold transition-all duration-500 min-w-[240px]",
                saveSuccess ? "bg-green-500 text-black border-green-500" : "bg-white text-black border-white",
                isSaving && "opacity-70 cursor-not-allowed"
              )}
             >
                {isSaving ? (
                  <div className="h-4 w-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : saveSuccess ? (
                  <><Check size={18} /> Scheduled Successfully</>
                ) : (
                  <><Save size={18} /> Schedule Deployment</>
                )}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}
