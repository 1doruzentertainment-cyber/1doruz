import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Disc, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const USER_LINKS = [
  { name: 'Artists', href: '/artists' },
  { name: 'Releases', href: '/releases' },
  { name: 'Events', href: '/events' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'News', href: '/news' },
  { name: 'Submit Demo', href: '/submit-demo' },
];

const ADMIN_LINKS = [
  { name: 'Overview', href: '/admin' },
  { name: 'Artists', href: '/admin/artists' },
  { name: 'Releases', href: '/admin/releases' },
  { name: 'News', href: '/admin/news' },
  { name: 'Demos', href: '/admin/demos' },
  { name: 'Team', href: '/admin/team' },
  { name: 'Settings', href: '/admin/settings' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('user'));
    const handleStorageChange = () => setIsLoggedIn(!!localStorage.getItem('user'));
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  const links = isAdminPath ? ADMIN_LINKS : USER_LINKS;

  const getAccountLink = () => {
    if (isAdminPath) return "/";
    if (isLoggedIn) return "/profile";
    return "/login";
  };

  const getAccountLabel = () => {
    if (isAdminPath) return "Exit Admin";
    if (isLoggedIn) return "Profile";
    return "Account";
  };

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-500 bg-[#0A0A0A] border-b border-[#C5A059]/20 py-4'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
        {/* Mobile Header Layout */}
        <div className="flex items-center justify-between w-full md:hidden">
          <button
            className="text-zinc-100 p-2 -ml-2 active:scale-95 transition-transform touch-manipulation"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
          
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <span className="font-serif text-[16px] font-bold tracking-[0.1em] text-white whitespace-nowrap uppercase">
              1DORUZ <span className="text-[#C5A059] font-light">RECORDS</span>
            </span>
          </Link>

          <Link
            to={getAccountLink()}
            className="p-2 -mr-2 text-[#C5A059] active:scale-95 transition-transform touch-manipulation"
          >
            <User size={20} />
          </Link>
        </div>

        {/* Desktop Logo Layout */}
        <Link to="/" className="hidden md:flex items-center gap-4 shrink-0 group">
          <div className="w-10 h-10 bg-[#C5A059] flex-shrink-0 flex items-center justify-center font-bold text-black text-xl font-sans group-hover:scale-105 transition-transform">1D</div>
          <span className="font-serif text-2xl font-bold tracking-[0.05em] text-white whitespace-nowrap">
            1DORUZ <span className="text-[#C5A059] font-light">RECORDS</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                'relative text-[11px] font-bold uppercase tracking-[0.2em] transition-colors hover:text-gold-500',
                location.pathname === link.href ? 'text-gold-500' : 'text-zinc-400'
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-4 w-[1px] bg-white/20 mx-2" />
          <Link
            to={getAccountLink()}
            className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C5A059] hover:text-white transition-colors flex items-center gap-2"
          >
            <User size={14} /> {getAccountLabel()}
          </Link>
        </div>
      </div>

      {/* Mobile Side Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm md:hidden"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-[70] w-[280px] bg-[#0A0A0A] border-r border-[#C5A059]/10 p-8 shadow-2xl md:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-12">
                  <span className="font-serif text-xl font-bold tracking-widest text-white">MENU</span>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 -mr-2 text-zinc-500 hover:text-white"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="flex flex-col gap-8">
                  {links.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'text-[14px] font-bold uppercase tracking-[0.2em] transition-colors',
                        location.pathname === link.href ? 'text-gold-500' : 'text-zinc-400'
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                <div className="mt-auto pt-10 border-t border-zinc-900">
                  <Link
                    to={getAccountLink()}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full border border-[#C5A059] px-6 py-4 text-xs font-bold uppercase tracking-widest text-[#C5A059] hover:bg-[#C5A059] hover:text-black transition-colors"
                  >
                    <User size={16} /> {getAccountLabel()}
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
