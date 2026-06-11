import { motion } from 'motion/react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Maximize2, Play } from 'lucide-react';

export default function Gallery() {
  const gallery = useQuery(api.gallery.list);

  return (
    <div className="pb-32">
       <div className="mx-auto max-w-7xl px-6">
         <div className="mb-20 flex justify-between items-end">
           <div>
             <span className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-gold-500">Visual Archives</span>
             <h1 className="mt-4 font-serif text-5xl sm:text-6xl md:text-8xl font-bold text-white">Studio <span className="text-luxury italic">& Live</span></h1>
           </div>
         </div>

         <div className="columns-1 gap-8 sm:columns-2 lg:columns-3 xl:columns-4 space-y-8">
           {(gallery ?? []).map((item, i) => (
             <motion.div
               key={item._id}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               viewport={{ once: true }}
               className="group relative overflow-hidden break-inside-avoid rounded-2xl cursor-pointer"
             >
               <img
                 src={item.url}
                 alt={item.caption}
                 className="w-full transition-transform duration-700 group-hover:scale-105"
               />
               <div className="absolute inset-0 bg-zinc-950/60 opacity-0 transition-opacity group-hover:opacity-100 flex flex-col justify-end p-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-gold-500 p-2 rounded-lg text-zinc-950">
                      {item.type === 'video' ? <Play size={16} fill="currentColor" /> : <Maximize2 size={16} />}
                    </span>
                  </div>
                  <p className="font-serif text-lg font-bold text-white translate-y-4 transition-transform group-hover:translate-y-0 uppercase tracking-widest">{item.caption}</p>
               </div>
             </motion.div>
           ))}
         </div>
       </div>
    </div>
  );
}
