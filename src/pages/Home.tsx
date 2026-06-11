import { motion } from 'motion/react';
import Hero from '../components/Hero';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Music2, Ticket } from 'lucide-react';
import { formatDate } from '../lib/utils';

const LABEL_STATS = [
  { label: 'Artists', value: '15+' },
  { label: 'Releases', value: '250+' },
  { label: 'Monthly Listeners', value: '12M' },
  { label: 'Countries', value: '45' }
];

export default function Home() {
  const featuredArtists = useQuery(api.artists.getFeatured);
  const releases = useQuery(api.releases.list);
  const news = useQuery(api.news.list);
  const events = useQuery(api.events.getUpcoming);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-32 pb-32"
    >
      <Hero />

      {/* Stats Section */}
      <section className="mx-auto max-w-7xl border-y border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {LABEL_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="border-r last:border-r-0 border-white/10 px-6 py-12 text-center"
            >
              <div className="mb-2 text-4xl font-serif font-bold text-gold-500 italic">{stat.value}</div>
              <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Artists & Releases Grid Section (Geometric Balance Pattern) */}
      <section className="mx-auto max-w-7xl px-0">
        <div className="grid grid-cols-1 md:grid-cols-12 border-b border-white/10">
          {/* Featured Sections Title */}
          <div className="col-span-12 md:col-span-3 border-r border-white/10 p-10 flex flex-col justify-between bg-[#0A0A0A]">
             <div>
               <span className="text-gold-500 text-[10px] uppercase tracking-widest font-bold">In Focus</span>
               <h2 className="mt-4 font-serif text-4xl font-bold leading-none text-white italic">Curated <br/>Talent</h2>
             </div>
             <Link to="/artists" className="group/link inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-gold-500 hover:text-white transition-colors duration-500">
               Full Roster 
               <div className="p-1 border border-gold-500/30 rounded-full group-hover/link:border-white transition-all duration-500">
                 <ArrowUpRight size={12} />
               </div>
             </Link>
          </div>

          <div className="col-span-12 md:col-span-9 grid grid-cols-1 sm:grid-cols-2">
            {(featuredArtists ?? []).map((artist, i) => (
              <motion.div
                key={artist._id}
                className="border-r last:border-r-0 border-white/10 p-10 group cursor-pointer hover:bg-white/[0.02] transition-colors"
                onClick={() => window.location.href = `/artists/${artist._id}`}
              >
                <div className="aspect-[4/5] overflow-hidden transition-all duration-700">
                  <img src={artist.imageUrl} alt={artist.name} className="h-full w-full object-cover" />
                </div>
                <div className="mt-8">
                   <span className="text-[10px] text-gold-500 uppercase tracking-tighter">Featured Artist</span>
                   <h3 className="mt-2 text-3xl font-serif italic text-white group-hover:text-gold-500 transition-colors uppercase">{artist.name}</h3>
                   <p className="mt-1 text-xs text-gray-500 uppercase tracking-widest">{artist.genres.slice(0, 2).join(' / ')}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Releases Grid */}
      <section className="mx-auto max-w-7xl border-b border-white/10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          <div className="p-10 bg-[#0A0A0A] border-r border-white/10 flex flex-col justify-between">
            <div>
              <span className="text-gold-500 text-[10px] uppercase tracking-widest font-bold">Catalog</span>
              <h2 className="mt-4 font-serif text-4xl font-bold leading-none text-white italic">New <br/>Sounds</h2>
            </div>
            <Link to="/releases" className="group/link inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-gold-500 hover:text-white transition-colors duration-500">
              Explore All 
              <div className="p-1 border border-gold-500/30 rounded-full group-hover/link:border-white transition-all duration-500">
                <ArrowUpRight size={12} />
              </div>
            </Link>
          </div>
          {(releases ?? []).slice(0, 3).map((release) => (
            <div key={release._id} className="p-8 border-r last:border-r-0 border-white/10 group cursor-pointer hover:bg-white/5 transition-colors">
              <div className="relative aspect-square bg-[#1A1A1A] transition-all">
                 <img src={release.coverArtUrl} alt={release.title} className="h-full w-full object-cover" />
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                   <div className="bg-gold-500 p-4 text-black"><Music2 size={24} /></div>
                 </div>
              </div>
              <div className="mt-6">
                 <h4 className="text-sm font-bold uppercase tracking-wide text-white">{release.title}</h4>
                 <p className="text-[10px] text-gold-500/80 uppercase tracking-widest mt-1 italic">{release.artistName}</p>
                 <p className="text-[10px] text-zinc-600 uppercase tracking-widest mt-2">Release Date: {formatDate(release.releaseDate)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ticker-like section for news/events */}
      <section className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-12 border-b border-white/10">
        <div className="md:col-span-8 p-10 border-r border-white/10">
          <span className="text-gold-500 text-[10px] uppercase tracking-widest font-bold mb-8 block">Latest Updates</span>
          <div className="space-y-12">
            {(news ?? []).slice(0, 2).map(article => (
              <div key={article._id} className="group cursor-pointer flex flex-col sm:flex-row gap-8 items-center">
                <div className="h-32 w-full sm:w-48 overflow-hidden transition-all flex-shrink-0">
                  <img src={article.imageUrl} alt="" className="h-full w-full object-cover" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif italic text-white group-hover:text-gold-500 transition-colors uppercase leading-none">{article.title}</h3>
                  <p className="mt-3 text-zinc-500 text-xs font-light max-w-md">{article.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="md:col-span-4 p-10 bg-[#0A0A0A] flex flex-col justify-between">
           <span className="text-[10px] text-[#C5A059] uppercase tracking-widest font-bold">Upcoming World Tour</span>
           <div className="space-y-6 mt-8">
             {(events ?? []).map(event => (
               <div key={event._id} className="flex justify-between items-center group">
                 <div className="flex flex-col">
                   <span className="text-sm text-white uppercase font-bold tracking-tight group-hover:text-gold-500 transition-colors">{event.location.split(',')[0]}</span>
                   <span className="text-[10px] text-zinc-500 uppercase tracking-widest">{event.venue}</span>
                   <span className="text-[10px] font-mono text-gold-500 mt-1">{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()}</span>
                 </div>
                 <a 
                   href={event.ticketLink}
                   className="p-2 border border-zinc-800 text-zinc-500 hover:text-gold-500 hover:border-gold-500 transition-all rounded-full"
                   title="Get Tickets"
                 >
                   <Ticket size={14} />
                 </a>
               </div>
             ))}
           </div>
           <Link to="/events" className="mt-12 text-[10px] font-bold uppercase tracking-widest text-[#C5A059] underline underline-offset-4">
             See Full Schedule
           </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden bg-gold-600/10 border border-gold-500/20 px-6 sm:px-12 py-16 sm:py-24 text-center rounded-3xl">
          <div className="relative z-10">
            <h2 className="mb-6 font-serif text-4xl font-bold text-white">Join the Movement</h2>
            <p className="mx-auto mb-10 max-w-2xl text-zinc-400">
              Are you an artist pushing the limits of sound? We are always looking for visionary creators.
              Submit your demo for consideration and join the 1DORUZ family.
            </p>
            <Link 
              to="/submit-demo" 
              className="luxury-button inline-block bg-white text-zinc-950 px-16 py-5 font-bold uppercase tracking-[0.3em] text-xs hover:bg-gold-500 transition-all duration-500 shadow-2xl"
            >
              Submit Your Demo
            </Link>
          </div>
          {/* Abstract circles */}
          <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full border border-gold-500/20" />
          <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full border border-gold-500/20" />
        </div>
      </section>
    </motion.div>
  );
}
