import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Upload, 
  Plus, 
  X, 
  Instagram, 
  Twitter, 
  Globe, 
  Music2, 
  Save,
  Check
} from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { cn } from '../lib/utils';

export default function AdminAddArtist() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [genres, setGenres] = useState<string[]>([]);
  const [newGenre, setNewGenre] = useState('');
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [spotify, setSpotify] = useState('');
  const [website, setWebsite] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const createArtist = useMutation(api.artists.create);

  const addGenre = () => {
    if (newGenre && !genres.includes(newGenre)) {
      setGenres([...genres, newGenre]);
      setNewGenre('');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await createArtist({
        name,
        bio,
        imageUrl: 'https://images.unsplash.com/photo-1514525253361-bee237cb45d0?auto=format&fit=crop&q=80&w=1200',
        genres,
        socialLinks: {
          instagram: instagram || undefined,
          twitter: twitter || undefined,
          spotify: spotify || undefined,
        },
        bookingEmail: 'bookings@1doruz.com',
        featured: false,
      });
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        navigate('/admin/artists');
      }, 1500);
    } catch (error) {
      console.error('Failed to create artist:', error);
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-page p-4 sm:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/admin/artists')}
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 hover:text-gold-500 transition-colors mb-12"
        >
          <ArrowLeft size={14} /> Back to Roster
        </button>

        <header className="mb-16">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">Onboard Artist</h1>
          <p className="text-zinc-500 text-sm uppercase tracking-widest font-mono">Register new talent to the 1DORUZ catalog</p>
        </header>

        <form onSubmit={handleSave} className="space-y-12">
          <section className="luxury-card p-6 sm:p-10 space-y-10">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-white border-b border-zinc-800 pb-4">01. Visual Identity</h3>
            <div className="flex flex-col md:flex-row gap-10">
              <div className="w-full md:w-48 h-48 bg-zinc-900 border-2 border-dashed border-zinc-800 flex flex-col items-center justify-center group hover:border-gold-500 transition-colors cursor-pointer">
                 <Upload size={24} className="text-zinc-700 group-hover:text-gold-500 mb-2" />
                 <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 group-hover:text-gold-500">Press Photo</span>
              </div>
              <div className="flex-1 space-y-6">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block mb-2">Stage Name</label>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text" placeholder="e.g. SONIC PHANTOM" className="w-full bg-zinc-950 border border-zinc-800 p-4 text-sm text-white focus:outline-none focus:border-gold-500" />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block mb-2">Artist Bio</label>
                  <textarea
                    required
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Describe the artist's sound and journey..." className="w-full bg-zinc-950 border border-zinc-800 p-4 text-sm text-white h-32 focus:outline-none focus:border-gold-500 resize-none line-clamp-4"></textarea>
                </div>
              </div>
            </div>
          </section>

          <section className="luxury-card p-6 sm:p-10 space-y-10">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-white border-b border-zinc-800 pb-4">02. Sonic Profile</h3>
            <div className="space-y-6">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block mb-2">Genres & Tags</label>
              <div className="flex flex-col sm:flex-row gap-4">
                 <input 
                  type="text" 
                  value={newGenre}
                  onChange={(e) => setNewGenre(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addGenre())}
                  placeholder="Techno, Soul, etc." 
                  className="flex-1 bg-zinc-950 border border-zinc-800 p-4 text-sm text-white focus:outline-none focus:border-gold-500" 
                 />
                 <button 
                  type="button"
                  onClick={addGenre}
                  className="bg-white text-black px-8 py-4 sm:py-0 font-bold text-[10px] uppercase tracking-widest hover:bg-gold-500 transition-colors"
                 >
                   Add Tag
                 </button>
              </div>
              <div className="flex flex-wrap gap-2 pt-4">
                 {genres.map(genre => (
                   <span key={genre} className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-zinc-400">
                     {genre} <X size={12} className="cursor-pointer hover:text-white" onClick={() => setGenres(genres.filter(g => g !== genre))} />
                   </span>
                 ))}
                 {genres.length === 0 && <span className="text-[10px] italic text-zinc-600">No genres added yet...</span>}
              </div>
            </div>
          </section>

          <section className="luxury-card p-6 sm:p-10 space-y-10">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-white border-b border-zinc-800 pb-4">03. Digital Presence</h3>
            <div className="grid md:grid-cols-2 gap-8">
               <div className="space-y-4">
                  <div className="flex items-center gap-4 bg-zinc-950 border border-zinc-800 p-4">
                    <Instagram size={18} className="text-zinc-600" />
                    <input value={instagram} onChange={(e) => setInstagram(e.target.value)} type="text" placeholder="Instagram URL" className="bg-transparent border-none focus:outline-none text-xs text-white w-full" />
                  </div>
                  <div className="flex items-center gap-4 bg-zinc-950 border border-zinc-800 p-4">
                    <Twitter size={18} className="text-zinc-600" />
                    <input value={twitter} onChange={(e) => setTwitter(e.target.value)} type="text" placeholder="X / Twitter URL" className="bg-transparent border-none focus:outline-none text-xs text-white w-full" />
                  </div>
               </div>
               <div className="space-y-4">
                  <div className="flex items-center gap-4 bg-zinc-950 border border-zinc-800 p-4">
                    <Music2 size={18} className="text-zinc-600" />
                    <input value={spotify} onChange={(e) => setSpotify(e.target.value)} type="text" placeholder="Spotify URL" className="bg-transparent border-none focus:outline-none text-xs text-white w-full" />
                  </div>
                  <div className="flex items-center gap-4 bg-zinc-950 border border-zinc-800 p-4">
                    <Globe size={18} className="text-zinc-600" />
                    <input value={website} onChange={(e) => setWebsite(e.target.value)} type="text" placeholder="Official Website" className="bg-transparent border-none focus:outline-none text-xs text-white w-full" />
                  </div>
               </div>
            </div>
          </section>

          <div className="flex justify-end items-center gap-6 pt-10">
             <button 
              type="button" 
              onClick={() => navigate('/admin/artists')} 
              disabled={isSaving}
              className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 hover:text-white transition-colors disabled:opacity-30"
             >
              Discard Draft
             </button>
             <button 
              disabled={isSaving}
              className={cn(
                "luxury-button px-12 py-4 flex items-center gap-3 transition-all duration-500 min-w-[200px] justify-center",
                saveSuccess ? "bg-green-500 text-black border-green-500" : "bg-gold-500 text-black border-gold-500",
                isSaving && "opacity-70 cursor-not-allowed"
              )}
             >
                {isSaving ? (
                  <div className="h-4 w-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : saveSuccess ? (
                  <><Check size={18} /> Artist Signed</>
                ) : (
                  <><Save size={18} /> Sign Artist</>
                )}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}
