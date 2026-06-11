import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { 
  Instagram, 
  Twitter, 
  Music2, 
  Youtube, 
  ArrowLeft, 
  Disc, 
  Facebook, 
  MessageCircle, 
  Radio, 
  Music,
  ExternalLink
} from 'lucide-react';

export default function ArtistProfile() {
  const { id } = useParams();
  const artist = useQuery(api.artists.getById, { id: id as any });
  const artistReleases = useQuery(api.releases.getByArtist, { artistId: id as any });

  if (!id) return <div className="pt-40 text-center">Artist not found</div>;
  if (!artist) return <div className="pt-40 text-center">Artist not found</div>;

  return (
    <div className="pb-32">
      {/* Header Section */}
      <div className="relative h-[60vh] min-h-[500px] w-full">
        <img
          src={artist.imageUrl}
          alt={artist.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
        <Link to="/artists" className="absolute top-12 left-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-gold-500 transition-colors">
          <ArrowLeft size={16} /> All Artists
        </Link>
        <div className="absolute bottom-12 left-0 w-full px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="font-serif text-6xl font-bold text-white md:text-8xl">{artist.name}</h1>
              <div className="mt-4 flex flex-wrap gap-3">
                {artist.genres.map(g => (
                  <span key={g} className="rounded-full bg-gold-500/10 border border-gold-500/30 px-4 py-1.5 text-[10px] uppercase font-bold tracking-widest text-gold-500">
                    {g}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-8 mt-20">
        <div className="grid gap-20 lg:grid-cols-[1fr_350px]">
          {/* Main Content */}
          <div className="space-y-20">
            <section>
              <h2 className="mb-8 font-serif text-3xl font-bold text-white">The Journey</h2>
              <p className="text-xl leading-relaxed text-zinc-400 font-light italic">
                {artist.bio}
              </p>
              <p className="mt-8 text-zinc-400 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </section>

            <section>
              <h2 className="mb-12 font-serif text-3xl font-bold text-white">Discography</h2>
              <div className="grid gap-8 sm:grid-cols-2">
                {(artistReleases ?? []).map(release => (
                  <div key={release._id} className="luxury-card flex gap-6 p-6">
                    <img src={release.coverArtUrl} alt={release.title} className="h-32 w-32 rounded-lg object-cover" />
                    <div className="flex flex-col justify-center">
                      <h3 className="font-serif text-xl font-bold text-white">{release.title}</h3>
                      <p className="text-xs uppercase tracking-widest text-zinc-500 mt-1">{release.type} | {new Date(release.releaseDate).getFullYear()}</p>
                      <div className="mt-4 flex flex-wrap gap-4">
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
                              className="text-zinc-500 hover:text-gold-500 transition-all flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest bg-zinc-950/50 px-2 py-1 border border-zinc-800/50 hover:border-gold-500/50"
                              title={platform}
                            >
                              {icons[platform] || <ExternalLink size={14} />}
                              <span className="hidden sm:inline">{platform}</span>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-12">
            <div className="luxury-card p-8 rounded-2xl">
              <h4 className="mb-6 font-serif text-xl font-bold text-white">Connect</h4>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(artist.socialLinks).map(([platform, url]) => {
                  if (!url || url === '#') return null;

                  const icons: Record<string, any> = {
                    instagram: <Instagram size={18} />,
                    twitter: <Twitter size={18} />,
                    spotify: <Music2 size={18} />,
                    youtube: <Youtube size={18} />,
                    tiktok: <MessageCircle size={18} />,
                    facebook: <Facebook size={18} />,
                    soundcloud: <Disc size={18} />
                  };

                  return (
                    <a 
                      key={platform}
                      href={url} 
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 hover:text-gold-500 hover:border-gold-500 transition-all group"
                    >
                      <div className="transition-transform group-hover:scale-110">
                        {icons[platform] || <ExternalLink size={18} />}
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-widest">{platform}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="luxury-card p-8 rounded-2xl border-gold-500/20">
              <h4 className="mb-6 font-serif text-xl font-bold text-white">Book Artist</h4>
              <p className="mb-8 text-sm text-zinc-400">For world tour bookings, collaborations, or private inquiries.</p>
              <a 
                href={`mailto:${artist.bookingEmail}`}
                className="luxury-button inline-block w-full text-center bg-gold-500 text-zinc-950 font-bold uppercase tracking-widest text-xs"
              >
                Inquire Now
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
