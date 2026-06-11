import { motion } from 'motion/react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Music4, Trash2, Radio, User, Calendar } from 'lucide-react';

export default function AdminDemos() {
  const demos = useQuery(api.demos.list);

  return (
    <div className="min-h-screen bg-[#050505] p-4 sm:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 sm:mb-16">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold-500 mb-2 block">A&R Internal</span>
            <h1 className="font-serif text-[28px] sm:text-5xl font-bold text-white italic leading-tight">Submission <span className="text-luxury">Vault</span></h1>
            <p className="text-zinc-500 text-sm mt-1 uppercase tracking-widest font-mono">Reviewing unreleased talent</p>
          </div>
          <div className="flex gap-4">
             <div className="luxury-card px-8 py-3 flex items-center gap-3 bg-zinc-950 border-gold-500/20">
                <Radio className="text-gold-500 animate-pulse" size={16} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Live Feed</span>
             </div>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
          <div className="space-y-4 sm:space-y-6">
            {(demos ?? []).length === 0 && (
              <div className="p-16 text-center border border-dashed border-zinc-800">
                <Music4 size={32} className="mx-auto text-zinc-700 mb-4" />
                <p className="text-zinc-500 text-sm">No submissions yet.</p>
                <p className="text-[10px] text-zinc-700 uppercase tracking-widest mt-1">Pending demos will appear here</p>
              </div>
            )}
            {(demos ?? []).map((demo, i) => (
              <motion.div
                key={demo._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="luxury-card p-5 sm:p-8 flex flex-col md:flex-row md:items-center justify-between group gap-6 bg-zinc-950"
              >
                <div className="flex items-center gap-5 sm:gap-8">
                  <div className="h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 bg-zinc-900 border border-zinc-800 flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-black transition-all cursor-pointer rounded-sm">
                    <Music4 size={24} />
                  </div>
                  <div>
                    <h3 className="text-[18px] sm:text-xl font-bold text-white uppercase tracking-tight">{demo.artistName}</h3>
                    <p className="text-[12px] text-zinc-500 uppercase tracking-widest font-mono font-bold mb-2 italic">{demo.bio}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-[10px] text-zinc-600 font-bold tracking-widest uppercase">
                       <span className="flex items-center gap-1.5"><User size={10} className="text-zinc-700" /> {demo.email}</span>
                       <span className="flex items-center gap-1.5"><Calendar size={10} className="text-zinc-700" /> {new Date(demo._creationTime).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto pt-6 md:pt-0 border-t border-zinc-900 md:border-none">
                  <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 md:py-2.5 bg-zinc-900 text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors border border-zinc-800 min-h-[44px]">Listen</button>
                  <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 md:py-2.5 bg-gold-500 text-black text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors min-h-[44px]">Recruit</button>
                  <button className="p-3 text-zinc-700 hover:text-red-500 transition-colors active:scale-95 touch-manipulation">
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <aside className="space-y-6 sm:space-y-12">
            <div className="luxury-card p-8 sm:p-10 bg-zinc-950">
               <h4 className="font-serif text-[22px] font-bold text-white mb-8 italic border-b border-zinc-900 pb-4">Submission Metrics</h4>
               <div className="space-y-8">
                 <div>
                   <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold mb-3">
                     <span className="text-zinc-500">Total Submissions</span>
                     <span className="text-gold-500">{(demos ?? []).length}</span>
                   </div>
                   <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden">
                     <div className="bg-gold-500 h-full w-[100%]" />
                   </div>
                 </div>
                 <div>
                   <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold mb-3">
                     <span className="text-zinc-500">Pending Review</span>
                     <span className="text-white">{(demos ?? []).filter(d => d.status === 'pending').length}</span>
                   </div>
                   <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden">
                     <div className="bg-white h-full" style={{ width: `${(demos ?? []).filter(d => d.status === 'pending').length > 0 ? 100 : 0}%` }} />
                   </div>
                 </div>
               </div>
            </div>

            <div className="luxury-card p-8 sm:p-10 bg-gold-500/5 backdrop-blur-md">
              <h4 className="font-serif text-[20px] font-bold text-white mb-6 uppercase tracking-tight">Label Reminders</h4>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="mt-1 h-2 w-2 rounded-full bg-gold-500 shadow-[0_0_10px_rgba(197,160,89,0.5)]" />
                  <span className="text-xs text-zinc-400 leading-relaxed uppercase tracking-widest">Review new submissions in the vault.</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 h-2 w-2 rounded-full bg-gold-500 shadow-[0_0_10px_rgba(197,160,89,0.5)]" />
                  <span className="text-xs text-zinc-400 leading-relaxed uppercase tracking-widest">A&R Meeting @ 15:00 GMT.</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}