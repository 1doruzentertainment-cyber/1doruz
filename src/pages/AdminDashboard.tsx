import { motion } from 'motion/react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { 
  Users, 
  Disc, 
  Calendar, 
  Plus, 
  TrendingUp,
  Globe,
  Radio
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const artists = useQuery(api.artists.list);
  const releases = useQuery(api.releases.list);
  const events = useQuery(api.events.list);

  const STATS = [
    { label: 'Total Artists', value: (artists ?? []).length, icon: Users, color: 'text-blue-500' },
    { label: 'Catalog Size', value: (releases ?? []).length, icon: Disc, color: 'text-gold-500' },
    { label: 'Global Reaches', value: '1.2B', icon: Globe, color: 'text-green-500' },
    { label: 'Live Events', value: (events ?? []).length, icon: Calendar, color: 'text-purple-500' }
  ];

  return (
    <div className="min-h-screen bg-page pb-24">
      {/* Content Area */}
      <main className="p-4 sm:p-8 lg:p-12">
        <div className="max-w-7xl mx-auto">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold-500 mb-2 block">Executive Control</span>
              <h1 className="font-serif text-[28px] sm:text-5xl font-bold text-white leading-tight">Label Overview</h1>
              <p className="text-zinc-500 text-sm mt-1 uppercase tracking-widest font-mono">Real-time performance & management</p>
            </div>
            <div className="flex gap-4">
              <Link to="/admin/assets/new" className="flex items-center justify-center gap-2 bg-white text-black w-full md:w-auto px-8 py-4 md:py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-gold-500 transition-colors min-h-[44px]">
                <Plus size={16} /> New Asset
              </Link>
            </div>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 mb-12 sm:mb-16">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="luxury-card p-6 sm:p-8 group hover:border-gold-500/40 transition-all"
              >
                <div className="flex justify-between items-start mb-4 sm:mb-6">
                  <div className={cn("p-3 bg-zinc-900 rounded-lg", stat.color)}>
                    <stat.icon size={20} />
                  </div>
                  <TrendingUp size={16} className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-white mb-1 italic">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Recent Artists */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                <h3 className="font-serif text-[22px] sm:text-2xl font-bold text-white">Active Roster</h3>
                <Link to="/admin/artists" className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-500">Manage All</Link>
              </div>
              
              {/* Desktop Table View */}
              <div className="hidden md:block bg-zinc-900/30 border border-zinc-800 backdrop-blur-md">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-zinc-800 bg-zinc-900/50">
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Artist</th>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Status</th>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500 text-right">Activity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800 text-zinc-300">
                    {(artists ?? []).slice(0, 4).map(artist => (
                      <tr key={artist._id} className="group hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <img src={artist.imageUrl} alt="" className="h-12 w-12 grayscale group-hover:grayscale-0 transition-all object-cover" />
                            <div>
                              <div className="font-bold text-white text-sm uppercase tracking-tight">{artist.name}</div>
                              <div className="text-[10px] text-zinc-500 uppercase tracking-widest">{artist.genres[0]}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className="inline-flex items-center gap-1.5 bg-green-500/10 text-green-500 px-3 py-1 text-[9px] font-bold uppercase tracking-widest">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-5 text-right font-mono">
                          <button className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-gold-500">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {(artists ?? []).slice(0, 4).map(artist => (
                  <div key={artist._id} className="luxury-card p-5 space-y-4 bg-zinc-950">
                    <div className="flex items-center gap-4">
                      <img src={artist.imageUrl} alt="" className="h-16 w-16 grayscale transition-all object-cover rounded-sm" />
                      <div>
                        <h4 className="font-bold text-white text-[16px] uppercase tracking-tight">{artist.name}</h4>
                        <p className="text-zinc-500 text-[14px] uppercase tracking-widest">{artist.genres[0]}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-zinc-900">
                      <span className="inline-flex items-center gap-1.5 bg-green-500/10 text-green-500 px-3 py-1 text-[9px] font-bold uppercase tracking-widest">
                        Active
                      </span>
                      <button className="text-[10px] font-bold uppercase tracking-widest text-gold-500 hover:text-white px-4 py-2 border border-gold-500/20 rounded-sm">Edit</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Demos / Sidebar for Admin */}
            <div className="space-y-6 sm:space-y-8 pt-4 lg:pt-0">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                <h3 className="font-serif text-[22px] sm:text-2xl font-bold text-white">Pending Demos</h3>
                <Link to="/admin/demos" className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-500">View Inbox</Link>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="luxury-card p-6 flex flex-col gap-6 border-l-4 border-l-gold-500 bg-zinc-950">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-white text-[16px] uppercase tracking-tight">Sonic Phantom</h4>
                        <p className="text-zinc-500 text-[14px] uppercase tracking-widest mb-1 italic">Experimental Techno</p>
                      </div>
                      <Radio size={14} className="text-gold-500 animate-pulse" />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button className="flex-1 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-widest py-3 hover:bg-zinc-800 transition-colors border border-zinc-800 min-h-[44px]">Listen</button>
                      <button className="flex-1 bg-gold-500 text-black text-[10px] font-bold uppercase tracking-widest py-3 hover:bg-white transition-colors min-h-[44px]">Shortlist</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
