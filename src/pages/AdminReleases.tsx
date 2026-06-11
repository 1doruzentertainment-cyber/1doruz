import { motion } from 'motion/react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Plus, Play, Edit, Trash2, ShoppingBag } from 'lucide-react';
import { formatDate } from '../lib/utils';

import { Link } from 'react-router-dom';

export default function AdminReleases() {
  const releases = useQuery(api.releases.list);
  return (
    <div className="min-h-screen bg-page p-4 sm:p-8 lg:p-12 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 sm:mb-16">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold-500 mb-2 block">Catalog Operations</span>
            <h1 className="font-serif text-[28px] sm:text-5xl font-bold text-white leading-tight">Master <span className="text-luxury">Inventory</span></h1>
            <p className="text-zinc-500 text-sm mt-1 uppercase tracking-widest font-mono italic">Releases, EPs, and Singles</p>
          </div>
          <div className="flex gap-4">
             <Link to="/admin/releases/new" className="w-full md:w-auto bg-gold-500 text-black px-8 py-4 md:py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2 min-h-[44px] shadow-lg shadow-gold-500/10">
               <Plus size={16} /> New Release
             </Link>
          </div>
        </header>

        <div className="bg-zinc-950/50 border border-zinc-900 shadow-2xl backdrop-blur-md">
          <div className="p-5 sm:p-8 border-b border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex gap-3 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
               <button className="flex-shrink-0 px-5 py-3 border border-zinc-800 text-[10px] font-bold uppercase tracking-widest hover:border-gold-500 transition-colors bg-zinc-900/50 min-h-[44px] touch-manipulation">Filter By Artist</button>
               <button className="flex-shrink-0 px-5 py-3 border border-zinc-800 text-[10px] font-bold uppercase tracking-widest hover:border-gold-500 transition-colors bg-zinc-900/50 min-h-[44px] touch-manipulation">Filter By Genre</button>
            </div>
            <div className="text-[10px] uppercase font-bold text-zinc-600 tracking-[0.2em]">{(releases ?? []).length} Records in Database</div>
          </div>
          
          <div className="grid divide-y divide-zinc-900">
            {(releases ?? []).map((release, i) => (
              <motion.div 
                key={release._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-5 sm:p-8 flex flex-col md:flex-row items-center gap-6 sm:gap-8 group hover:bg-white/[0.02] transition-colors"
              >
                <div className="h-24 w-24 sm:h-32 sm:w-32 relative flex-shrink-0 rounded-sm overflow-hidden border border-white/5">
                  <img src={release.coverArtUrl} alt="" className="h-full w-full object-cover shadow-2xl transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play size={24} className="text-white" fill="currentColor" />
                  </div>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2 sm:gap-4 mb-3">
                    <h3 className="text-[18px] sm:text-xl font-bold text-white uppercase tracking-tight">{release.title}</h3>
                    <span className="text-[9px] bg-zinc-900 px-3 py-1 rounded-sm text-gold-500 font-mono tracking-widest uppercase border border-gold-500/20">{release.type}</span>
                  </div>
                  <p className="text-zinc-400 text-[14px] tracking-[0.2em] font-bold uppercase italic">{release.artistName}</p>
                </div>

                <div className="flex flex-col items-center md:items-end gap-6 w-full md:w-auto pt-6 md:pt-0 border-t border-zinc-900 md:border-none">
                   <div className="text-[10px] text-zinc-600 uppercase tracking-widest font-mono">Published {formatDate(release.releaseDate)}</div>
                   <div className="flex items-center gap-3 justify-center md:justify-end text-zinc-500">
                      <button className="p-3 bg-zinc-900 border border-zinc-800 hover:text-gold-500 transition-colors touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center">
                        <ShoppingBag size={18} />
                      </button>
                      <button className="p-3 bg-zinc-900 border border-zinc-800 hover:text-white transition-colors touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center">
                        <Edit size={18} />
                      </button>
                      <button className="p-3 bg-zinc-900 border border-zinc-800 hover:text-red-500 transition-colors touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center">
                        <Trash2 size={18} />
                      </button>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
