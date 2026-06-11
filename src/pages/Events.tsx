import { motion } from 'motion/react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { MapPin, Calendar, Clock, Ticket } from 'lucide-react';

export default function Events() {
  const events = useQuery(api.events.list);

  return (
    <div className="pb-32">
       <div className="mx-auto max-w-7xl px-6">
         <div className="mb-20 text-center">
           <span className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-gold-500">Live Experiences</span>
           <h1 className="mt-4 font-serif text-5xl sm:text-6xl md:text-8xl font-bold text-white">World <span className="text-luxury">Tour</span></h1>
           <p className="mt-6 text-zinc-400 max-w-2xl mx-auto text-lg">
             Catch the 1DORUZ sound live. From intimate club showcases to global festival stages.
           </p>
         </div>

         <div className="space-y-6">
           {(events ?? []).map((event, i) => (
             <motion.div
               key={event._id}
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ delay: i * 0.1 }}
               viewport={{ once: true }}
               className="group luxury-card grid items-center gap-8 p-6 lg:grid-cols-[200px_1fr_250px_200px] text-center lg:text-left"
             >
               <div className="h-40 overflow-hidden rounded-xl">
                 <img src={event.imageUrl} alt={event.title} className="h-full w-full object-cover transition-transform group-hover:scale-110" />
               </div>
               
               <div>
                 <h3 className="font-serif text-2xl font-bold text-white group-hover:text-gold-500 transition-colors">{event.title}</h3>
                 <div className="mt-3 flex flex-wrap gap-6 text-sm text-zinc-400">
                   <div className="flex items-center gap-2"><MapPin size={16} className="text-gold-500" /> {event.venue}, {event.location}</div>
                 </div>
               </div>

               <div className="flex flex-col gap-2">
                 <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-400">
                   <Calendar size={14} className="text-gold-500" /> {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                 </div>
                 <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-400">
                   <Clock size={14} className="text-gold-500" /> Doors: 8:00 PM
                 </div>
               </div>

               <div className="flex justify-center lg:justify-end">
                 <a 
                   href={event.ticketLink} 
                   className="luxury-button w-full sm:w-auto px-10 py-4 bg-white text-zinc-950 font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-gold-500 hover:tracking-[0.3em] transition-all duration-500 flex items-center justify-center gap-3 group/ticket"
                 >
                   Get Tickets <Ticket size={14} className="text-zinc-400 group-hover/ticket:text-zinc-950" />
                 </a>
               </div>
             </motion.div>
           ))}
         </div>
       </div>
    </div>
  );
}
