import { motion } from 'motion/react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Link } from 'react-router-dom';
import { ArrowRight, Instagram, Music2, Youtube, Disc } from 'lucide-react';

export default function Artists() {
  const artists = useQuery(api.artists.list);

  return (
    <div className="pb-32">
       <div className="mx-auto max-w-7xl px-6">
         <div className="mb-20">
           <span className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-gold-500">The 1DORUZ Family</span>
           <h1 className="mt-4 font-serif text-5xl sm:text-6xl md:text-8xl font-bold text-white">Our <span className="text-luxury italic">Artists</span></h1>
         </div>

         <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
           {(artists ?? []).map((artist, i) => (
             <motion.div
               key={artist._id}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               viewport={{ once: true }}
               className="group flex flex-col"
             >
               <Link to={`/artists/${artist._id}`} className="relative h-[500px] overflow-hidden rounded-sm">
                 <img
                   src={artist.imageUrl}
                   alt={artist.name}
                   className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
                 <div className="absolute bottom-6 left-6 right-6">
                   <div className="flex flex-wrap gap-2">
                     {artist.genres.map(g => (
                       <span key={g} className="bg-zinc-950/50 backdrop-blur-md border border-zinc-800 px-2 py-0.5 text-[10px] uppercase font-mono text-zinc-300">
                         {g}
                       </span>
                     ))}
                   </div>
                 </div>
               </Link>
               <div className="mt-6 flex flex-col gap-4">
                 <div className="flex items-center justify-between">
                   <h3 className="font-serif text-3xl font-bold text-white">{artist.name}</h3>
                   <Link 
                     to={`/artists/${artist._id}`}
                     className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-gold-500 hover:bg-gold-500 hover:text-zinc-950 transition-all font-bold"
                   >
                     <ArrowRight size={18} />
                   </Link>
                 </div>
                 <div className="flex gap-4">
                    {artist.socialLinks.instagram && (
                      <a href={artist.socialLinks.instagram} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-gold-500 transition-colors">
                        <Instagram size={16} />
                      </a>
                    )}
                    {artist.socialLinks.spotify && (
                      <a href={artist.socialLinks.spotify} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-gold-500 transition-colors">
                        <Music2 size={16} />
                      </a>
                    )}
                    {artist.socialLinks.soundcloud && (
                      <a href={artist.socialLinks.soundcloud} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-gold-500 transition-colors">
                        <Disc size={16} />
                      </a>
                    )}
                    {artist.socialLinks.youtube && (
                      <a href={artist.socialLinks.youtube} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-gold-500 transition-colors">
                        <Youtube size={16} />
                      </a>
                    )}
                 </div>
               </div>
             </motion.div>
           ))}
         </div>
       </div>
    </div>
  );
}
