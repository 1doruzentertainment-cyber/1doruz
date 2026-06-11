import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube, Disc, Mail, Music } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-card bg-card pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-6 max-w-sm">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gold-500 flex items-center justify-center font-bold text-black text-lg">1D</div>
              <span className="font-serif text-xl font-bold tracking-[0.1em] text-white">
                1DORUZ <span className="text-gold-500 font-light">RECORDS</span>
              </span>
            </Link>
            <p className="text-muted text-sm leading-relaxed font-light uppercase tracking-tight">
              Creating sounds that move the world. Uncompromising artistry for a global audience.
            </p>
          </div>

          <div className="flex flex-wrap gap-12 md:gap-24">
            <div>
              <h4 className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-500">Navigation</h4>
              <ul className="space-y-4 text-[11px] uppercase tracking-[0.1em] text-muted">
                <li><Link to="/artists" className="hover:text-gold-500 transition-colors">Artists</Link></li>
                <li><Link to="/releases" className="hover:text-gold-500 transition-colors">Releases</Link></li>
                <li><Link to="/events" className="hover:text-gold-500 transition-colors">Events</Link></li>
                <li><Link to="/news" className="hover:text-gold-500 transition-colors">News</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-500">Connect</h4>
              <ul className="space-y-4 text-[11px] uppercase tracking-[0.1em] text-muted font-medium">
                <li>
                  <a href="https://instagram.com/1doruzrecords" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-gold-500 transition-colors group">
                    <Instagram size={14} className="group-hover:text-gold-500 transition-colors" /> Instagram
                  </a>
                </li>
                <li>
                  <a href="https://open.spotify.com/user/1doruz" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-gold-500 transition-colors group">
                    <Music size={14} className="group-hover:text-gold-500 transition-colors" /> Spotify
                  </a>
                </li>
                <li>
                  <a href="https://soundcloud.com/1doruz" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-gold-500 transition-colors group">
                    <Disc size={14} className="group-hover:text-gold-500 transition-colors" /> SoundCloud
                  </a>
                </li>
                <li>
                  <a href="https://youtube.com/c/1doruz" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-gold-500 transition-colors group">
                    <Youtube size={14} className="group-hover:text-gold-500 transition-colors" /> YouTube
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-500">Legal</h4>
              <ul className="space-y-4 text-[11px] uppercase tracking-[0.1em] text-muted">
                <li><a href="#" className="hover:text-gold-500 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-gold-500 transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col md:flex-row justify-between items-center gap-6 border-t pt-10 border-card">
          <div className="text-[9px] uppercase tracking-[0.2em] text-muted">
            © {new Date().getFullYear()} 1DORUZ RECORDS. All Rights Reserved.
          </div>
          <div className="text-gold-500 text-[9px] font-bold uppercase tracking-[0.3em]">
            Built for the future of sound.
          </div>
        </div>
      </div>
    </footer>
  );
}
