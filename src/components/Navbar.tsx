import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import ThemeToggle from './ThemeToggle';
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
  const siteConfig = useQuery(api.config.get);

  const primaryColor = siteConfig?.primaryColor || '#C5A059';
  const brandName = siteConfig?.logoText || '1DORUZ';
  const tagLine = 'RECORDS';
  const logoUrl = siteConfig?.logoUrl;

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('user'));
    const handleStorageChange = () => setIsLoggedIn(!!localStorage.getItem('user'));
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    if (siteConfig?.primaryColor) {
      document.documentElement.style.setProperty('--accent-color', siteConfig.primaryColor);
    }
  }, [siteConfig?.primaryColor]);

  useEffect(() => setIsOpen(false), [location]);

  const accentStyle = { color: primaryColor };
  const borderAccentStyle = { borderColor: `${primaryColor}33` };

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
      className="sticky top-0 z-50 w-full transition-all duration-500 bg-card py-4"
      style={borderAccentStyle}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
        <div className="flex items-center justify-between w-full md:hidden">
          <button
            className="text-zinc-100 p-2 -ml-2 active:scale-95 transition-transform touch-manipulation"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
          
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            {logoUrl ? (
              <img src={logoUrl} alt={brandName} className="h-6 object-contain" />
            ) : (
              <span className="font-serif text-[16px] font-bold tracking-[0.1em] text-white whitespace-nowrap uppercase">
                {brandName} <span className="font-light" style={accentStyle}>{tagLine}</span>
              </span>
            )}
          </Link>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Link
              to={getAccountLink()}
              className="p-2 -mr-2 active:scale-95 transition-transform touch-manipulation"
              style={accentStyle}
            >
              <User size={20} />
            </Link>
          </div>
        </div>

        <Link to="/" className="hidden md:flex items-center gap-4 shrink-0 group">
          {logoUrl ? (
            <img src={logoUrl} alt={brandName} className="h-10 object-contain" />
          ) : (
            <>
              <div
                className="w-10 h-10 flex-shrink-0 flex items-center justify-center font-bold text-black text-xl font-sans group-hover:scale-105 transition-transform"
                style={{ backgroundColor: primaryColor }}
              >
                {brandName.charAt(0)}
              </div>
              <span className="font-serif text-2xl font-bold tracking-[0.05em] text-white whitespace-nowrap">
                {brandName} <span className="font-light" style={accentStyle}>{tagLine}</span>
              </span>
            </>
          )}
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                'relative text-[11px] font-bold uppercase tracking-[0.2em] transition-colors hover:text-gold-500',
                location.pathname === link.href ? 'text-gold-500' : 'text-muted'
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-4 w-[1px] bg-white/20 mx-2" />
          <ThemeToggle />
          <Link
            to={getAccountLink()}
            className="text-[11px] font-bold uppercase tracking-[0.2em] transition-colors flex items-center gap-2"
            style={accentStyle}
          >
            <User size={14} /> {getAccountLabel()}
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm md:hidden"
            />
            
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-[70] w-[280px] bg-card border-r p-8 shadow-2xl md:hidden"
              style={{ borderColor: `${primaryColor}1a` }}
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
                    className="flex items-center justify-center gap-2 w-full border px-6 py-4 text-xs font-bold uppercase tracking-widest transition-colors"
                    style={{ borderColor: primaryColor, color: primaryColor }}
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
