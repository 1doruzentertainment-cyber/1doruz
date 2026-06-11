import { motion } from 'motion/react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Search, Filter, Play, Music2, Music, Disc, Radio, ExternalLink, Youtube } from 'lucide-react';

export default function Releases() {
  const releases = useQuery(api.releases.list);

  return (
    <div className="pb-32">
       <div className="mx-auto max-w-7xl px-6">
         <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
           <div>
             <span className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-gold-500">Global Catalog</span>
             <h1 className="mt-4 font-serif text-5xl sm:text-6xl md:text-8xl font-bold text-white">Latest <span className="text-luxury">Releases</span></h1>
           </div>
           <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
             <div className="relative w-full sm:w-auto">
               <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
               <input 
                 placeholder="Search catalog..." 
                 className="w-full bg-zinc-900 border border-zinc-800 pl-12 pr-6 py-3 text-sm focus:border-gold-500 focus:outline-none transition-colors rounded-full"
               />
             </div>
             <button className="flex items-center justify-center gap-2 rounded-full border border-zinc-800 px-6 py-3 text-sm text-zinc-400 hover:border-gold-500 hover:text-gold-500 transition-all font-bold">
               <Filter size={16} /> Filters
             </button>
           </div>
         </div>

         <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
           {(releases ?? []).map((release, i) => (
             <motion.div
               key={release._id}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.05 }}
               viewport={{ once: true }}
               className="group flex flex-col"
             >
               <div className="relative aspect-square overflow-hidden rounded-lg bg-zinc-900 shadow-2xl">
                 <img
                   src={release.coverArtUrl}
                   alt={release.title}
                   className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                 />
                 <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-zinc-950/80 opacity-0 transition-opacity group-hover:opacity-100 backdrop-blur-md">
                   <div className="flex items-center gap-4 mb-8">
                     <button className="rounded-full bg-gold-500 p-4 text-zinc-950 hover:bg-white transition-all shadow-xl">
                       <Play fill="currentColor" size={20} />
                     </button>
                   </div>
                   <div className="flex flex-wrap justify-center gap-3">
                     {Object.entries(release.streamingLinks).map(([platform, url]) => {
                       if (!url || url === '#') return null;
                       
                       const icons: Record<string, any> = {
                         spotify: <Music2 size={16} />,
                         appleMusic: <Music size={16} />,
                         soundcloud: <Disc size={16} />,
                         youtube: <Youtube size={16} />,
                         beatport: <Radio size={16} />,
                         bandcamp: <ExternalLink size={16} />,
                         tidal: <Radio size={16} />
                       };

                       return (
                         <a 
                           key={platform}
                           href={url}
                           target="_blank"
                           rel="noreferrer"
                           className="h-10 w-10 flex items-center justify-center rounded-lg border border-white/10 text-white hover:bg-gold-500 hover:text-black hover:border-gold-500 transition-all"
                           title={platform}
                         >
                           {icons[platform] || <ExternalLink size={16} />}
                         </a>
                       );
                     })}
                   </div>
                 </div>
               </div>
               <div className="mt-6">
                 <h3 className="font-serif text-xl font-bold text-white group-hover:text-gold-500 transition-colors uppercase tracking-tight">{release.title}</h3>
                 <p className="font-mono text-[10px] uppercase tracking-widest text-gold-500 mt-1">{release.artistName}</p>
                 <div className="mt-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                   <span>{release.type}</span>
                   <span>{new Date(release.releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</span>
                 </div>
               </div>
             </motion.div>
           ))}
         </div>
       </div>
    </div>
  );
}
