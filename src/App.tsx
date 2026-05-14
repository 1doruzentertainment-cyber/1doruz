/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  User,
  ArrowRight, 
  ArrowLeft, 
  Play, 
  Instagram, 
  Twitter, 
  Youtube,
  Plus,
  Minus,
  Check,
  LogIn,
  LogOut,
  Settings,
  CreditCard,
  Truck,
  Package,
  LayoutDashboard,
  Save
} from 'lucide-react';
import { ARTISTS, PRODUCTS, VIDEOS, Product, Artist, Video } from './constants';

type Page = 'home' | 'artists' | 'videos' | 'shop' | 'artist-detail' | 'product-detail' | 'album-links' | 'subscribe' | 'account' | 'admin' | 'checkout';

interface CartItem extends Product {
  qty: number;
  size?: string;
}

interface UserProfile {
  email: string;
  name: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  isAdmin?: boolean;
}

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [adminTab, setAdminTab] = useState('dashboard');
  const [prevPage, setPrevPage] = useState<Page | null>(null);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('doruz_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);

  // Persistence
  useEffect(() => {
    localStorage.setItem('doruz_cart', JSON.stringify(cart));
  }, [cart]);

  // Simulated User State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [news, setNews] = useState([
    { id: 1, title: "RIDEREZZY LONDON TOUR", date: "AUG 2024", image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=800&auto=format&fit=crop" },
    { id: 2, title: "STATE OF GRACE OUT NOW", date: "SEP 2024", image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=800&auto=format&fit=crop" }
  ]);

  // Auto-scroll hero
  useEffect(() => {
    if (page !== 'home') return;
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % ARTISTS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [page]);

  // Notifications logic
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      if (permission === 'granted') {
        new Notification('1DORUZ RECORDS', {
          body: 'You are now registered for official updates!',
          icon: '/logo.png'
        });
      }
    }
  };

  const sendLocalNotification = (title: string, body: string) => {
    if (notificationPermission === 'granted') {
      new Notification(title, { body, icon: '/logo.png' });
    }
  };

  const navigate = (nextPage: Page, params?: any) => {
    setPrevPage(page);
    if (nextPage === 'artist-detail') setSelectedArtist(params);
    if (nextPage === 'product-detail') setSelectedProduct(params);
    if (nextPage === 'admin' && typeof params === 'string') setAdminTab(params);
    setPage(nextPage);
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
  };

  const addToCart = (product: Product, qty: number = 1, size?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.size === size 
            ? { ...item, qty: item.qty + qty } 
            : item
        );
      }
      return [...prev, { ...product, qty, size }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const cartTotal = useMemo(() => 
    cart.reduce((sum, item) => sum + (item.price * item.qty), 0),
  [cart]);

  const cartCount = useMemo(() => 
    cart.reduce((sum, item) => sum + item.qty, 0),
  [cart]);

  return (
    <div className="min-h-screen selection:bg-doruz-gold selection:text-black font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-8 py-6">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div 
            className="flex items-center gap-2 md:gap-4 cursor-pointer group" 
            onClick={() => navigate('home')}
          >
            <img 
              src="/logo.png" 
              alt="1DORUZ RECORDS" 
              className="h-10 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                // Fallback if image is not yet uploaded
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="hidden flex items-center gap-2">
              <div className="w-8 h-8 bg-doruz-gold rounded-full flex items-center justify-center font-display font-black text-black text-xl italic">
                D
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-lg tracking-tighter">1DORUZ</span>
                <span className="text-[8px] font-black tracking-[0.3em] opacity-60">RECORDS</span>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-12 uppercase tracking-[0.15em] text-[10px] font-black">
            <button onClick={() => navigate('artists')} className="hover:text-doruz-gold transition-colors">Artists</button>
            <button onClick={() => navigate('videos')} className="hover:text-doruz-gold transition-colors">Videos</button>
            <button onClick={() => navigate('shop')} className="hover:text-doruz-gold transition-colors">Shop</button>
            <button onClick={() => navigate('subscribe')} className="hover:text-doruz-gold transition-colors">Join</button>
            <button onClick={() => setIsSearchOpen(true)} className="hover:text-doruz-gold transition-colors">
              <Search size={18} strokeWidth={3} />
            </button>
            <button 
              onClick={() => ['shop', 'product-detail', 'checkout'].includes(page) ? setIsCartOpen(true) : navigate('account')} 
              className="hover:text-doruz-gold transition-colors relative"
            >
              {['shop', 'product-detail', 'checkout'].includes(page) ? (
                <>
                  <ShoppingBag size={18} strokeWidth={3} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-white text-black text-[7px] font-black rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </>
              ) : (
                <User size={18} strokeWidth={3} />
              )}
            </button>
          </div>

          <button 
            className="md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile / Global Overlay Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-2xl flex flex-col pt-32 px-12 pb-12 overflow-y-auto"
          >
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-8 right-8 text-white hover:rotate-90 transition-transform p-2 border border-white/10 rounded-full"
            >
              <X size={32} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-7xl mx-auto w-full">
              <div className="space-y-8">
                <p className="text-[10px] font-black text-doruz-gold uppercase tracking-[0.4em] mb-4">Main Menu</p>
                <div className="flex flex-col gap-4 text-4xl md:text-6xl font-heavy font-black uppercase tracking-tighter italic">
                  <button onClick={() => navigate('home')} className="hover:text-doruz-gold text-left transition-all hover:translate-x-4">Home</button>
                  <button onClick={() => navigate('artists')} className="hover:text-doruz-gold text-left transition-all hover:translate-x-4">Artists</button>
                  <button onClick={() => navigate('videos')} className="hover:text-doruz-gold text-left transition-all hover:translate-x-4">Videos</button>
                  <button onClick={() => navigate('shop')} className="hover:text-doruz-gold text-left transition-all hover:translate-x-4">Shop</button>
                  <button onClick={() => navigate('subscribe')} className="hover:text-doruz-gold text-left transition-all hover:translate-x-4 text-white/30 text-2xl md:text-3xl">Subscribe</button>
                </div>
              </div>

              {currentUser?.isAdmin && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-12 duration-700">
                  <p className="text-[10px] font-black text-doruz-gold/60 uppercase tracking-[0.4em] mb-4">Admin Controls</p>
                  <div className="flex flex-col gap-4 text-3xl md:text-5xl font-heavy font-black uppercase tracking-tighter italic text-white/50">
                    <button onClick={() => navigate('admin', 'dashboard')} className="hover:text-white text-left transition-all hover:translate-x-4 flex items-center gap-4">
                      <LayoutDashboard size={32} /> Dashboard
                    </button>
                    <button onClick={() => navigate('admin', 'content')} className="hover:text-white text-left transition-all hover:translate-x-4 flex items-center gap-4">
                      <Save size={32} /> News manager
                    </button>
                    <button onClick={() => navigate('admin', 'sales')} className="hover:text-white text-left transition-all hover:translate-x-4 flex items-center gap-4">
                      <ShoppingBag size={32} /> Sales History
                    </button>
                    <button onClick={() => navigate('admin', 'users')} className="hover:text-white text-left transition-all hover:translate-x-4 flex items-center gap-4">
                      <User size={32} /> Fan Database
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-auto pt-16 flex flex-col md:flex-row justify-between items-center border-t border-white/5 max-w-7xl mx-auto w-full gap-8">
              <div className="flex gap-8">
                <Instagram size={20} className="text-white/40 hover:text-white cursor-pointer" />
                <Twitter size={20} className="text-white/40 hover:text-white cursor-pointer" />
                <Youtube size={20} className="text-white/40 hover:text-white cursor-pointer" />
              </div>
              <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">© 2024 1DORUZ RECORDS ALL RIGHTS RESERVED</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-16">
        <AnimatePresence mode="wait">
          {page === 'home' && <Home key="home" navigate={navigate} heroIndex={heroIndex} setHeroIndex={setHeroIndex} addToCart={addToCart} news={news} />}
          {page === 'artists' && <Artists key="artists" navigate={navigate} />}
          {page === 'artist-detail' && <ArtistDetail key="artist-detail" artist={selectedArtist!} navigate={navigate} />}
          {page === 'videos' && <Videos key="videos" />}
          {page === 'shop' && <Shop key="shop" navigate={navigate} addToCart={addToCart} />}
          {page === 'product-detail' && <ProductDetail key="product-detail" product={selectedProduct!} navigate={navigate} addToCart={addToCart} setIsSearchOpen={setIsSearchOpen} setIsCartOpen={setIsCartOpen} cartCount={cartCount} />}
          {page === 'album-links' && <AlbumLinks key="album-links" navigate={navigate} />}
          {page === 'subscribe' && <Subscribe key="subscribe" />}
          {page === 'account' && <Account key="account" user={currentUser} setUser={setCurrentUser} navigate={navigate} />}
          {page === 'admin' && <Admin key="admin" news={news} setNews={setNews} navigate={navigate} activeTab={adminTab} setActiveTab={setAdminTab} />}
          {page === 'checkout' && <Checkout key="checkout" cart={cart} total={cartTotal} navigate={navigate} user={currentUser} />}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <span className="font-display text-4xl font-bold tracking-tighter text-white mb-4 block">1DORUZ</span>
            <p className="text-gray-500 text-sm leading-relaxed">
              Global distribution and brand development for the visionaries of tomorrow. Redefining the frequency of cultural sound.
            </p>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-doruz-gold">Explore</h4>
            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <button onClick={() => navigate('artists')} className="hover:text-white text-left">Artists</button>
              <button onClick={() => navigate('videos')} className="hover:text-white text-left">Videos</button>
              <button onClick={() => navigate('shop')} className="hover:text-white text-left">Merchandise</button>
              <button className="hover:text-white text-left">Tour Dates</button>
            </div>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-doruz-gold">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <p>General: info@1doruz.com</p>
              <p>Booking: talent@1doruz.com</p>
              <p>Press: media@1doruz.com</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-doruz-gold">Social</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-500 hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors"><Youtube size={20} /></a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-gray-600 text-[10px] tracking-[0.2em] font-bold uppercase">
          © 2026 1DORUZ RECORDS. ALL RIGHTSRESERVED.
        </div>
      </footer>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-[70] w-full max-w-md bg-doruz-bg shadow-2xl flex flex-col border-l border-doruz-gold/20"
            >
              <div className="p-8 border-b border-doruz-gold/20 flex justify-between items-center">
                <div>
                  <h2 className="text-4xl font-heavy font-bold tracking-tight text-doruz-gold uppercase">Your cart</h2>
                  <p className="text-xl font-display text-white opacity-80">{cartCount} items</p>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="text-doruz-gold hover:text-white p-2">
                  <X size={32} strokeWidth={3} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-4">
                    <ShoppingBag size={48} strokeWidth={1} />
                    <p className="font-medium font-display uppercase tracking-widest">Your cart is empty</p>
                    <button 
                      onClick={() => { setIsCartOpen(false); navigate('shop'); }}
                      className="text-doruz-gold text-sm font-black uppercase tracking-[0.3em] hover:underline"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  cart.map((item, index) => (
                    <motion.div 
                      key={`${item.id}-${item.size}-${index}`}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex gap-6 group"
                    >
                      <div className="w-24 h-24 bg-white/5 border border-white/10 flex-shrink-0">
                        <img src={item.image} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="flex justify-between items-start">
                          <h4 className="font-display font-medium text-white group-hover:text-doruz-gold transition-colors">{item.name}</h4>
                          <button onClick={() => removeFromCart(index)} className="text-white/40 hover:text-doruz-gold transition-colors">
                            <X size={16} />
                          </button>
                        </div>
                        {item.size && <p className="text-[10px] uppercase font-black tracking-widest text-doruz-gold mt-1">SIZE {item.size}</p>}
                        <p className="text-[10px] uppercase font-bold text-white/60 mt-1 tracking-widest">Quantity</p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-sm font-display text-doruz-gold">- {item.qty} +</span>
                          <span className="font-display font-bold text-lg">{(item.price * item.qty).toLocaleString()}.00</span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
              {cart.length > 0 && (
                <div className="p-8 border-t border-doruz-gold/20 bg-black/20">
                  <div className="flex justify-between mb-2 text-xl font-display">
                    <span className="text-white font-medium uppercase text-sm tracking-widest">Subtotal :</span>
                    <span className="text-doruz-gold font-bold">{cartTotal.toLocaleString()}.00</span>
                  </div>
                  <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-6">Shipping and taxes calculated at checkout</p>
                  <button 
                    onClick={() => { setIsCartOpen(false); navigate('checkout'); }}
                    className="w-full border-2 border-doruz-gold bg-transparent text-doruz-gold hover:bg-doruz-gold hover:text-black font-black py-4 transition-all uppercase tracking-[0.3em] text-[10px]"
                  >
                    CHECK OUT
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-doruz-dark/95 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-8 right-8 text-white hover:text-doruz-gold transition-colors"
            >
              <X size={32} />
            </button>
            <div className="w-full max-w-3xl">
              <input 
                autoFocus
                type="text" 
                placeholder="Search artists, music, merch..." 
                className="w-full bg-transparent border-b-2 border-doruz-gold text-4xl md:text-6xl font-display font-medium text-white py-6 focus:outline-none placeholder-white/20"
              />
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 px-2">
                <div>
                  <h4 className="text-doruz-gold font-bold mb-4 uppercase text-xs tracking-[0.3em]">Trending Now</h4>
                  <div className="flex flex-wrap gap-2">
                    {['State of Grace', 'Riderizzy Tour', 'Winter Drop', 'Mary Live'].map(tag => (
                      <button key={tag} className="text-sm font-bold bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full transition-colors">
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Page Components */

function Home({ navigate, heroIndex, setHeroIndex, news }: any) {
  const currentArtist = ARTISTS[heroIndex];

  return (
    <div className="bg-doruz-bg">
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative h-screen w-full overflow-hidden flex items-center justify-center pt-16"
      >
        {/* Background Graphic elements if needed / Layering */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#2b0505_100%)] opacity-40" />

        {/* Hero Content Wrapper */}
        <div className="relative w-full max-w-[1600px] h-full flex items-center justify-center px-8 sm:px-12">
          
          {/* Left Card: Wicked 2023 */}
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="hidden lg:block absolute left-12 top-1/2 -translate-y-1/2 z-20 group cursor-pointer"
            onClick={() => navigate('album-links')}
          >
            <div className="w-48 aspect-square mb-4 overflow-hidden border border-white/10 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-110" />
            </div>
            <h3 className="font-display font-bold text-2xl tracking-tighter leading-none mb-1">WICKED</h3>
            <p className="font-display font-medium text-2xl tracking-tighter leading-none text-white/40">2023</p>
          </motion.div>

          {/* Central Artist Portrait (Layered) */}
          <div className="relative z-10 w-full max-w-4xl h-full flex items-center justify-center pointer-events-none">
            <motion.div
              key={heroIndex}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative h-full w-full flex items-center justify-center p-8 md:p-0"
            >
              <img 
                src={currentArtist.image} 
                className="h-[85vh] w-auto object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.8)] filter brightness-110" 
              />
              {/* Flames overlay (CSS based) */}
              <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-40">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle,_#fde047_0%,_transparent_60%)] animate-pulse blur-3xl opacity-20" />
              </div>
            </motion.div>
          </div>

          {/* Large Typography: MARY (Background) */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-0 pointer-events-none select-none">
            <motion.h1 
              key={heroIndex}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 1, ease: "circOut" }}
              className="font-heavy text-[22vw] leading-none text-doruz-gold tracking-tighter whitespace-nowrap italic"
            >
              {currentArtist.name}
            </motion.h1>
          </div>

          {/* Right Content */}
          <div className="hidden lg:flex absolute right-12 inset-y-0 z-20 flex-col justify-center gap-16 w-80">
            
            {/* Poem/Text */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-right"
            >
              <p className="font-black uppercase tracking-[0.2em] text-[10px] leading-relaxed text-doruz-gold">
                TOGETHER WE RISE, WE'RE<br/>
                SOARING HIGH,<br/>
                BREAKING THE LIMITS,<br/>
                REACHING THE SKY,<br/>
                AI, MY DIGITAL FRIEND,
              </p>
            </motion.div>

            {/* Music Video Preview */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="group cursor-pointer self-end"
              onClick={() => navigate('videos')}
            >
              <span className="block text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-white/60">SHE MUSIC VIDEO</span>
              <div className="w-52 aspect-video bg-black relative border border-white/10 group-hover:border-doruz-gold transition-colors">
                <img src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play size={20} fill="#fde047" className="text-doruz-gold" />
                </div>
                <div className="absolute bottom-1 left-2">
                  <span className="text-[8px] font-black tracking-widest text-white/50 italic uppercase">VEVO</span>
                </div>
              </div>
            </motion.div>

            {/* Calendar / Ticket */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-doruz-burgundy p-6 border border-white/5 shadow-2xl relative overflow-hidden"
            >
              <h4 className="font-black uppercase tracking-[0.2em] text-[10px] mb-4 text-white/80 flex items-center gap-2">
                <span className="w-1 h-1 bg-doruz-gold rounded-full" /> SEP 21 — WARRI
              </h4>
              <div className="mb-4">
                <p className="font-display font-medium text-lg leading-none tracking-tighter">WARRI AGAIN 2024</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mt-1 flex items-center gap-1">
                  GARDEN CITY, OH
                </p>
              </div>
              <div className="text-right">
                <button className="text-[9px] font-black uppercase tracking-[0.2em] hover:text-doruz-gold transition-colors">Calendar</button>
              </div>
              
              {/* Decorative pattern for the ticker card */}
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-doruz-gold/5 rounded-full blur-xl" />
            </motion.div>

          </div>

          {/* Hero Index Indicator (Bottom Left) */}
          <div className="absolute bottom-8 left-12 z-30 flex items-center gap-6">
            <div className="flex gap-2">
              {ARTISTS.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setHeroIndex(i)}
                  className={`h-0.5 transition-all duration-700 ${i === heroIndex ? 'w-16 bg-doruz-gold' : 'w-4 bg-white/10 hover:bg-white/30'}`}
                />
              ))}
            </div>
            <span className="font-display font-bold text-xs tracking-widest text-white/40">0{heroIndex + 1} / 0{ARTISTS.length}</span>
          </div>

        </div>

        {/* Floating Call to Action in Mobile */}
        <div className="lg:hidden absolute bottom-12 left-0 w-full px-8 z-30">
          <button 
            onClick={() => navigate('shop')}
            className="w-full bg-doruz-gold text-doruz-dark py-4 font-black uppercase tracking-[0.3em] text-xs"
          >
            Exclusive Entry
          </button>
        </div>
      </motion.section>

      {/* News & Events Section */}
      <section className="py-32 px-8 max-w-[1600px] mx-auto border-t border-white/5">
        <div className="flex justify-between items-end mb-16">
          <h2 className="font-heavy text-4xl md:text-7xl font-black text-doruz-gold uppercase tracking-tighter italic leading-none">
            CURRENT<br/>EVENTS
          </h2>
          <button onClick={() => navigate('subscribe')} className="text-sm font-black uppercase tracking-[0.3em] text-white/40 hover:text-doruz-gold transition-colors pb-2 border-b border-white/10 hover:border-doruz-gold">
            Stay Updated
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {news.map((item: any) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/9] bg-black overflow-hidden border border-white/10 mb-6">
                <img src={item.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <p className="text-doruz-gold font-black text-[10px] tracking-[0.3em] mb-2">{item.date}</p>
              <h3 className="text-white font-heavy text-3xl md:text-4xl uppercase tracking-tighter group-hover:text-doruz-gold transition-colors">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Artists({ navigate }: any) {
  const socials = [
    { icon: <Instagram size={14} />, name: 'instagram' },
    { icon: <Twitter size={14} />, name: 'twitter' },
    { icon: <Youtube size={14} />, name: 'youtube' },
    // Mocking TikTok and FB as icons for visual parity
    { icon: <span className="text-[10px] font-black italic">f</span>, name: 'facebook' },
    { icon: <span className="text-[10px] font-black italic">t</span>, name: 'tiktok' },
  ];

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-doruz-bg pt-20"
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="py-44 text-center">
          <h1 className="font-heavy text-7xl md:text-[14rem] font-bold leading-none tracking-tighter text-doruz-gold uppercase select-none">
            ARTISTS
          </h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {ARTISTS.map((artist, idx) => (
            <motion.div 
              key={artist.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group relative aspect-[3/4] overflow-hidden cursor-pointer bg-black border-r border-b border-white/5"
              onClick={() => navigate('artist-detail', artist)}
            >
              <img 
                src={artist.image} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                alt={artist.name} 
              />
              
              {/* Overlay Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white opacity-80 group-hover:opacity-100 transition-opacity">VIEW WEBSITE</span>
                  <div className="flex gap-3 text-white/60">
                    <button className="hover:text-doruz-gold transition-colors"><Instagram size={14} /></button>
                    <button className="hover:text-doruz-gold transition-colors"><Twitter size={14} /></button>
                    <button className="hover:text-doruz-gold transition-colors"><Youtube size={14} /></button>
                    <button className="hover:text-doruz-gold transition-colors text-xs font-black italic">f</button>
                    <button className="hover:text-doruz-gold transition-colors text-xs font-black italic">J</button>
                  </div>
                </div>

                <div>
                   <h2 className={`font-heavy text-6xl md:text-7xl font-bold uppercase tracking-tighter transition-colors ${(idx % 3 === 2 || (idx % 3 === 1 && idx > 2)) ? 'text-doruz-gold' : 'text-white'}`}>
                    {artist.name}
                  </h2>
                </div>
              </div>

              {/* Hover highlight */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function ArtistDetail({ artist, navigate }: any) {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-doruz-dark min-h-screen"
    >
      <div className="relative h-[70vh] w-full">
        <img src={artist.image} className="w-full h-full object-cover grayscale opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-doruz-dark via-doruz-dark/50 to-transparent" />
        <div className="absolute bottom-20 left-0 p-8 md:p-20">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="font-display text-8xl md:text-[12rem] font-bold text-white mb-6 leading-none tracking-tighter uppercase">{artist.name}</h1>
            <div className="flex gap-6">
              <button className="bg-doruz-gold text-doruz-dark px-10 py-4 font-bold uppercase text-xs tracking-widest hover:bg-white transition-colors">Listen Now</button>
              <button className="border border-white/30 text-white px-10 py-4 font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-doruz-dark transition-colors">Follow Collective</button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-24 px-6 grid grid-cols-1 md:grid-cols-3 gap-20">
        <div className="col-span-2">
          <h2 className="text-doruz-gold font-bold uppercase tracking-[0.3em] text-xs mb-8">Creative Narrative</h2>
          <p className="text-2xl md:text-3xl font-light text-gray-300 leading-relaxed mb-12">
            {artist.bio}
          </p>
          
          <h2 className="text-doruz-gold font-bold uppercase tracking-[0.3em] text-xs mb-8">Selected Discography</h2>
          <div className="space-y-4">
            {[
              { title: 'State of Grace', year: '2024', type: 'Album' },
              { title: 'Midnight Run', year: '2023', type: 'EP' },
              { title: 'Echoes of Now', year: '2023', type: 'Single' }
            ].map((work, idx) => (
              <div key={idx} className="flex items-center justify-between p-6 bg-white/5 border border-white/5 hover:border-doruz-gold/50 transition-all cursor-pointer group">
                <div className="flex items-center gap-6">
                  <span className="font-display text-xl text-gray-700">0{idx + 1}</span>
                  <div>
                    <h3 className="font-bold group-hover:text-doruz-gold transition-colors">{work.title}</h3>
                    <p className="text-[10px] uppercase font-bold text-gray-500 mt-1">{work.type} • {work.year}</p>
                  </div>
                </div>
                <Play size={18} className="text-gray-500 group-hover:text-doruz-gold" />
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-1">
          <div className="bg-doruz-red/20 border border-white/5 p-8">
            <h3 className="font-bold uppercase tracking-widest text-[10px] text-doruz-gold mb-6">Upcoming Gigs</h3>
            <div className="space-y-6">
              {[
                { date: 'MAY 24', city: 'London', venue: 'KOKO' },
                { date: 'JUN 02', city: 'Paris', venue: 'La Gaîté Lyrique' },
                { date: 'JUN 15', city: 'Berlin', venue: 'Berghain / Panorama Bar' }
              ].map((gig, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center justify-center p-2 border border-doruz-gold/30 text-doruz-gold min-w-[60px]">
                    <span className="text-[10px] font-bold">{gig.date.split(' ')[0]}</span>
                    <span className="text-lg font-bold">{gig.date.split(' ')[1]}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{gig.city}</h4>
                    <p className="text-xs text-gray-500 uppercase font-black">{gig.venue}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 border border-white/10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-doruz-dark transition-all">
              View All Dates
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function Videos() {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-doruz-bg pt-20"
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="py-20 md:py-44 text-center px-4">
          <h1 className="font-heavy text-5xl md:text-7xl lg:text-[14rem] font-bold leading-none tracking-tighter text-doruz-gold uppercase select-none italic">
            VIDEOS
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-0">
          {VIDEOS.map((video, idx) => (
            <motion.div 
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group relative aspect-video overflow-hidden cursor-pointer bg-black border border-white/5"
              onClick={() => alert(`Playing ${video.artist} - ${video.title}`)}
            >
              <img 
                src={video.image} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60 group-hover:opacity-100" 
                alt={video.artist} 
              />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-doruz-gold flex items-center justify-center backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:bg-doruz-gold/20">
                  <Play size={32} fill="#fde047" className="text-doruz-gold ml-1" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/80 to-transparent">
                 <p className="text-doruz-gold font-black text-[10px] tracking-[0.4em] mb-1 uppercase">Official Visual</p>
                 <h3 className="font-heavy text-3xl md:text-5xl font-bold uppercase tracking-tighter text-white">
                    {video.artist} — {video.title}
                  </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function Shop({ navigate, addToCart }: any) {
  const musicProducts = PRODUCTS.filter(p => p.category === 'Music');
  const merchProducts = PRODUCTS.filter(p => p.category === 'Merch');

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-doruz-bg pt-20"
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="py-44 text-center">
          <h1 className="font-heavy text-7xl md:text-[14rem] font-bold leading-none tracking-tighter text-doruz-gold uppercase select-none">
            SHOP
          </h1>
        </div>

        {/* 1 DORUZ PICK'S Section */}
        <div className="px-8 mb-32">
          <h2 className="font-heavy text-4xl md:text-5xl font-bold tracking-tight text-doruz-gold uppercase mb-12 italic">1 DORUZ PICK'S</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {musicProducts.map((p, idx) => (
              <motion.div 
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative cursor-pointer"
                onClick={() => navigate('product-detail', p)}
              >
                {/* Vinyl Card Effect */}
                <div className="relative aspect-square flex items-center justify-center">
                  {/* The actual record peeking out */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-black rounded-full shadow-[0_0_30px_rgba(0,0,0,0.5)] border-4 border-white/5 group-hover:right-[-15%] transition-all duration-700">
                    <div className="absolute inset-[40%] rounded-full border border-white/10 flex items-center justify-center">
                      <div className="w-4 h-4 bg-doruz-bg rounded-full border border-white/20" />
                    </div>
                  </div>
                  {/* The cover */}
                  <div className="absolute inset-0 bg-doruz-dark shadow-2xl z-10 border border-white/5 overflow-hidden">
                    <img src={p.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    {/* State of Grace text badge */}
                    {p.name === 'STATE OF GRACE' && (
                       <div className="absolute inset-0 flex items-center justify-center pointer-events-none rotate-[-45deg]">
                         <span className="font-heavy text-3xl md:text-5xl text-white whitespace-nowrap bg-black/20 px-10 py-4 backdrop-blur-sm border-y border-white/20">STATE OF GRACE</span>
                       </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <button className="bg-doruz-gold text-black font-black uppercase tracking-[0.3em] text-[10px] px-10 py-3 hover:bg-white transition-colors">
              SHOP NEW ARRIVALS
            </button>
          </div>
        </div>

        {/* MERCH Section */}
        <div className="px-8">
          <h2 className="font-heavy text-4xl md:text-5xl font-bold tracking-tight text-doruz-gold uppercase mb-12 italic">MERCH</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
             {merchProducts.map((p, idx) => (
                <motion.div 
                  key={p.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="aspect-square bg-white group cursor-pointer border border-black/5 overflow-hidden relative"
                  onClick={() => navigate('product-detail', p)}
                >
                  <img src={p.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                     <span className="text-black font-heavy text-2xl uppercase tracking-tighter">{p.name}</span>
                     <span className="text-black/60 font-display font-bold">₦{p.price.toLocaleString()}</span>
                  </div>
                </motion.div>
             ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function AlbumLinks({ navigate }: any) {
  const services = [
    { name: 'OFFICIAL STORE', action: 'Shop' },
    { name: 'Spotify', action: 'Play', icon: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg' },
    { name: 'Apple Music', action: 'Play', icon: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { name: 'Amazon Music', action: 'Play' },
    { name: 'Pandora', action: 'Play' },
    { name: 'YouTube Music', action: 'Play' },
    { name: 'Tickets', action: 'Go To' },
    { name: 'TIDAL', action: 'Play' },
    { name: 'DEEZER', action: 'Play' },
    { name: 'Amazon Music', action: 'Go To' },
  ];

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-doruz-bg min-h-screen pt-32 pb-20 px-8 flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32"
    >
      {/* Left side: Album Cover */}
      <div className="flex flex-col items-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-[400px] aspect-square rounded-[3rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)] border border-white/5"
        >
          <img 
            src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=800&auto=format&fit=crop" 
            className="w-full h-full object-cover" 
            alt="Wicked Album Cover"
          />
        </motion.div>
        <div className="mt-12 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-1">MARV</p>
          <p className="text-sm font-black uppercase tracking-[0.3em] text-white">WICKED</p>
        </div>
      </div>

      {/* Right side: Links */}
      <div className="w-full max-w-xl">
        <div className="text-center mb-10">
          <p className="font-display text-doruz-gold text-lg tracking-widest uppercase">Choose music service</p>
        </div>

        <div className="space-y-0.5 border-t border-doruz-gold/20">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-center justify-between py-5 border-b border-doruz-gold/20 group cursor-pointer hover:bg-white/5 px-4 transition-colors"
            >
              <div className="flex items-center gap-4">
                {service.icon && <img src={service.icon} className="w-6 h-6 object-contain grayscale invert group-hover:grayscale-0 group-hover:invert-0 transition-all" />}
                <span className={`font-display font-bold text-xl tracking-tighter uppercase ${service.name === 'Spotify' ? 'text-green-500' : ''}`}>
                  {service.name}
                </span>
              </div>
              <button 
                className="bg-doruz-gold text-black font-black uppercase tracking-[0.2em] text-[10px] items-center px-6 py-2 transition-transform active:scale-95 group-hover:bg-white"
              >
                {service.action}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function Subscribe({ requestPermission, permission }: any) {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: any) => {
    e.preventDefault();
    requestPermission();
    setSubscribed(true);
  };

  if (subscribed) {
    return (
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-doruz-bg min-h-screen flex flex-col items-center justify-center p-8 text-center"
      >
        <div className="w-24 h-24 bg-doruz-gold rounded-full flex items-center justify-center mb-10 text-black shadow-[0_0_50px_rgba(253,224,71,0.3)]">
          <Check size={48} strokeWidth={4} />
        </div>
        <h1 className="font-heavy text-5xl md:text-7xl text-doruz-gold uppercase italic tracking-tighter mb-4">YOU'RE IN.</h1>
        <p className="text-white/60 font-display text-xl max-w-md">Welcome to the inner circle. Updates from 1DORUZ will now arrive at your frequency.</p>
        <div className="mt-12 p-6 border border-white/10 rounded-xl bg-white/5 backdrop-blur-md">
           <p className="text-[10px] font-black text-doruz-gold uppercase tracking-[0.2em]">Notification Status</p>
           <p className="text-white font-heavy text-2xl uppercase mt-2 tracking-tighter italic">{permission === 'granted' ? 'CONNECTED' : 'PENDING'}</p>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-doruz-bg min-h-screen mobile-py px-6 flex flex-col items-center justify-center"
    >
      <div className="w-full max-w-4xl text-center">
        <h1 className="font-heavy text-5xl md:text-8xl lg:text-[10rem] font-black text-doruz-gold uppercase mb-12 md:mb-20 leading-none tracking-tighter italic">
          SIGN UP FOR<br/>1DORUZ UPDATES
        </h1>

        <form onSubmit={handleSubscribe} className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 text-left mb-20 px-4">
          <div className="flex flex-col border-b border-doruz-gold pb-2 group">
            <label className="text-[10px] font-black text-doruz-gold uppercase mb-4 tracking-[0.3em]">EMAIL</label>
            <div className="flex justify-between items-center">
              <input 
                required
                type="email" 
                placeholder="USERNAME@GMAIL.COM" 
                className="bg-transparent border-none focus:outline-none text-white font-heavy text-2xl md:text-3xl uppercase placeholder-white/10 w-full"
              />
              <span className="text-doruz-gold font-bold ml-2">*</span>
            </div>
          </div>

          <div className="flex flex-col border-b border-doruz-gold pb-2 group">
            <label className="text-[10px] font-black text-doruz-gold uppercase mb-4 tracking-[0.3em]">COUNTRY</label>
            <div className="flex justify-between items-center relative cursor-pointer">
              <select required className="bg-transparent border-none focus:outline-none text-white font-heavy text-2xl md:text-3xl uppercase w-full appearance-none pr-8 cursor-pointer">
                <option value="" className="bg-doruz-bg uppercase">SELECT....</option>
                <option value="NG" className="bg-doruz-bg uppercase">Nigeria</option>
                <option value="US" className="bg-doruz-bg uppercase">United States</option>
                <option value="UK" className="bg-doruz-bg uppercase">United Kingdom</option>
                <option value="CA" className="bg-doruz-bg uppercase">Canada</option>
              </select>
              <div className="absolute right-0 pointer-events-none">
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-doruz-gold"></div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 flex items-center justify-center gap-6 mt-8">
            <label className="relative flex items-center cursor-pointer group">
              <input type="checkbox" required className="sr-only peer" />
              <div className="w-10 h-10 border-2 border-doruz-gold flex items-center justify-center transition-all peer-checked:bg-doruz-gold">
                <Check size={24} strokeWidth={4} className="text-black" />
              </div>
            </label>
            <span className="font-heavy text-2xl md:text-5xl font-black text-doruz-gold uppercase tracking-tighter italic">I AGREE TO TERMS</span>
          </div>

          <button 
            type="submit"
            className="md:col-span-2 mx-auto inline-block border-2 border-doruz-gold rounded-full px-16 py-6 font-heavy text-2xl md:text-6xl text-doruz-gold hover:bg-doruz-gold hover:text-black transition-all active:scale-95 uppercase tracking-tighter italic"
          >
            SUBMIT
          </button>
        </form>

        <div className="max-w-2xl mx-auto px-6">
          <p className="font-heavy text-[10px] text-white/20 uppercase leading-relaxed tracking-[0.2em]">
            EMAILS WILL BE SENT BY OR ON BEHALF OF 1DORUZ RECORDS. YOU MAY WITHDRAW YOUR CONSENT AT ANY TIME. BY SUBMITTING THIS FORM YOU AGREE TO RECEIVE WEB NOTIFICATIONS.
          </p>
        </div>
      </div>
    </motion.section>
  );
}


function Account({ user, setUser, navigate }: any) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    address: '',
    city: '',
    country: 'Nigeria',
    postalCode: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleLogin(form);
  };

  const handleLogin = (userData: typeof form) => {
    // Simulation: Admin check
    const isAdmin = userData.email === 'admin@1doruz.com';
    setUser({
      ...userData,
      name: userData.name || 'DORUZ FAN',
      isAdmin
    });
  };

  const handleGoogleSignIn = () => {
    // Simulated Google Login Delay
    const btn = document.getElementById('google-btn');
    if (btn) btn.innerText = 'AUTHENTICATING...';
    
    setTimeout(() => {
      handleLogin({
        ...form,
        email: 'user@google.demo',
        name: 'GOOGLE GUEST',
        address: '123 Pixel Blvd',
        city: 'Digital City',
        postalCode: '101010',
        country: 'Nigeria'
      });
    }, 1500);
  };

  if (user) {
    return (
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="bg-doruz-bg min-h-screen py-32 px-8"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
            <div>
              <h1 className="font-heavy text-5xl md:text-7xl font-black text-doruz-gold uppercase leading-none tracking-tighter">
                {user.name}'S PROFILE
              </h1>
              <div className="mt-4 inline-flex items-center gap-2 bg-doruz-gold px-4 py-1 rounded-full text-black font-black text-[10px] uppercase tracking-widest">
                <Check size={12} strokeWidth={4} /> OFFICIAL FAN
              </div>
            </div>
            <div className="flex gap-4">
              {user.isAdmin && (
                <button 
                  onClick={() => navigate('admin')}
                  className="bg-white text-black px-6 py-2 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-doruz-gold transition-colors"
                >
                  <LayoutDashboard size={14} /> Admin Panel
                </button>
              )}
              <button 
                onClick={() => setUser(null)}
                className="border border-doruz-gold text-doruz-gold px-6 py-2 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-doruz-gold hover:text-black transition-colors"
              >
                <LogOut size={14} /> Logout
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="bg-white/5 border border-white/10 p-8">
                <h3 className="font-heavy text-doruz-gold text-2xl mb-6 uppercase italic flex items-center gap-3">
                  <User size={20} /> Personal Info
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block mb-1">Full Name</label>
                    <p className="text-xl font-display text-white">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block mb-1">Email</label>
                    <p className="text-xl font-display text-white">{user.email}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-8">
                <h3 className="font-heavy text-doruz-gold text-2xl mb-6 uppercase italic flex items-center gap-3">
                  <Truck size={20} /> Delivery Address
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block mb-1">Street Address</label>
                    <p className="text-xl font-display text-white">{user.address || 'Not provided'}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block mb-1">City</label>
                      <p className="text-lg font-display text-white">{user.city || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block mb-1">Postal Code</label>
                      <p className="text-lg font-display text-white">{user.postalCode || 'Not provided'}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block mb-1">Country</label>
                    <p className="text-lg font-display text-white">{user.country}</p>
                  </div>
                </div>
                <button className="mt-8 text-[10px] font-black text-doruz-gold uppercase tracking-[0.2em] flex items-center gap-2 hover:text-white transition-colors">
                  <Settings size={14} /> Update Shipping Info
                </button>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white/5 border border-white/10 p-8 h-full">
                <h3 className="font-heavy text-doruz-gold text-2xl mb-6 uppercase italic flex items-center gap-3">
                  <Package size={20} /> Recent Orders
                </h3>
                <div className="flex flex-col items-center justify-center h-[200px] text-white/20">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p className="mt-4 font-display font-medium uppercase tracking-widest text-xs">No orders yet</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-doruz-bg min-h-screen py-32 px-8 flex items-center justify-center"
    >
      <div className="w-full max-w-md bg-white/5 border border-white/10 p-12 shadow-2xl">
        <div className="text-center mb-12">
          <h1 className="font-heavy text-5xl font-black text-doruz-gold uppercase tracking-tighter mb-4 italic">
            {isLogin ? 'WELCOME BACK' : 'JOIN THE CREW'}
          </h1>
          <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">
            {isLogin ? 'Unlock your fan status' : 'Create an account to be a fan'}
          </p>
          {isLogin && (
            <p className="text-[8px] font-bold text-doruz-gold/20 uppercase tracking-widest mt-2">
              Admin: admin@1doruz.com | Pass: admin
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-[10px] font-black text-doruz-gold uppercase tracking-widest">Full Name</label>
              <input 
                required
                type="text" 
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
                className="w-full bg-black/40 border border-white/10 p-4 text-white font-display focus:outline-none focus:border-doruz-gold transition-colors"
                placeholder="JOHN DOE"
              />
            </div>
          )}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-doruz-gold uppercase tracking-widest">Email Address</label>
            <input 
              required
              type="email" 
              value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value})}
              className="w-full bg-black/40 border border-white/10 p-4 text-white font-display focus:outline-none focus:border-doruz-gold transition-colors"
              placeholder="FAN@1DORUZ.COM"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-doruz-gold uppercase tracking-widest">Password</label>
            <input 
              required
              type="password" 
              value={form.password}
              onChange={(e) => setForm({...form, password: e.target.value})}
              className="w-full bg-black/40 border border-white/10 p-4 text-white font-display focus:outline-none focus:border-doruz-gold transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-doruz-gold text-black font-black py-4 uppercase tracking-[0.3em] text-[10px] hover:bg-white transition-all active:scale-95"
          >
            {isLogin ? 'LOG IN' : 'CREATE ACCOUNT'}
          </button>
        </form>

        <div className="mt-8 flex items-center gap-4">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">OR CONTINUE WITH</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <button 
          id="google-btn"
          onClick={handleGoogleSignIn}
          className="mt-6 w-full bg-white text-black font-black py-4 uppercase tracking-[0.3em] text-[10px] hover:bg-doruz-gold transition-all flex items-center justify-center gap-3 active:scale-95 transition-all"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Google Identity
        </button>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] hover:text-doruz-gold transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
          </button>
        </div>
      </div>
    </motion.section>
  );
}

function Admin({ news, setNews, navigate, activeTab, setActiveTab }: any) {
  const [newPost, setNewPost] = useState({ title: '', date: '', image: '' });

  const stats = [
    { label: 'Total Revenue', value: 'N 4,250,000', icon: CreditCard, color: 'text-green-500' },
    { label: 'Total Fans', value: '1,284', icon: User, color: 'text-doruz-gold' },
    { label: 'Pending Orders', value: '12', icon: Package, color: 'text-orange-500' },
    { label: 'Site Visits', value: '45.2K', icon: LayoutDashboard, color: 'text-blue-500' },
  ];

  const recentSales = [
    { id: '#8821', user: 'Blessing Okon', item: 'Doruz Varsity Jacket', price: 'N 85,000', date: '2 Mins Ago' },
    { id: '#8820', user: 'David Chuks', item: 'Vinyl Record - Wicked', price: 'N 45,000', date: '15 Mins Ago' },
    { id: '#8819', user: 'Sarah Amadi', item: 'Classic Tee Black', price: 'N 25,000', date: '1 Hour Ago' },
  ];

  const addPost = () => {
    if (!newPost.title || !newPost.date) return;
    setNews([{ ...newPost, id: Date.now() }, ...news]);
    setNewPost({ title: '', date: '', image: '' });
    setActiveTab('content');
  };

  const removePost = (id: number) => {
    setNews(news.filter((post: any) => post.id !== id));
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-doruz-bg min-h-screen py-32 px-8"
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
           <div>
             <h1 className="font-heavy text-5xl md:text-7xl font-black text-doruz-gold uppercase tracking-tighter italic leading-none">ADMIN PANEL</h1>
             <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mt-4 flex items-center gap-2">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Section: {activeTab}
             </p>
           </div>
           
           <div className="flex flex-wrap gap-4">
              {['dashboard', 'content', 'sales', 'users'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest border transition-all ${
                    activeTab === tab 
                    ? 'bg-doruz-gold border-doruz-gold text-black italic' 
                    : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
              <button 
                onClick={() => navigate('home')}
                className="px-6 py-2 text-[10px] font-black uppercase tracking-widest border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-all ml-4"
              >
                Logout
              </button>
           </div>
        </div>

        <div className="mt-16">
          {activeTab === 'dashboard' && (
            <div className="space-y-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-8 shadow-2xl group hover:border-doruz-gold/50 transition-colors">
                    <div className={`${stat.color} mb-4`}><stat.icon size={24} /></div>
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">{stat.label}</p>
                    <p className="text-3xl font-display font-bold text-white tracking-tight">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-12">
                <div className="bg-black/40 border border-white/10 p-8">
                  <h3 className="font-heavy text-doruz-gold text-2xl mb-8 uppercase italic flex justify-between items-center">
                    Recent Sales <ArrowRight size={18} />
                  </h3>
                  <div className="space-y-6">
                    {recentSales.map((sale) => (
                      <div key={sale.id} className="flex justify-between items-center py-4 border-b border-white/5 last:border-0 group">
                        <div className="flex gap-4 items-center">
                          <div className="w-10 h-10 bg-white/5 flex items-center justify-center text-[10px] font-black text-doruz-gold italic">#{sale.id.slice(1)}</div>
                          <div>
                            <p className="text-sm font-bold text-white uppercase tracking-tighter">{sale.user}</p>
                            <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">{sale.item}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-doruz-gold">{sale.price}</p>
                          <p className="text-[9px] text-white/20 font-black uppercase tracking-widest">{sale.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-12 flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-doruz-gold/10 rounded-full flex items-center justify-center mb-6 text-doruz-gold animate-pulse">
                    <Settings size={32} />
                  </div>
                  <h4 className="text-white font-heavy text-2xl uppercase tracking-tighter mb-2 italic">System Health</h4>
                  <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">All Systems Operational</p>
                  <div className="mt-8 flex gap-2">
                    <div className="w-1.5 h-6 bg-green-500 rounded-full" />
                    <div className="w-1.5 h-4 bg-green-500 rounded-full self-end" />
                    <div className="w-1.5 h-8 bg-green-500 rounded-full self-center" />
                    <div className="w-1.5 h-5 bg-green-500 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-1 space-y-8">
                  <div className="bg-white/5 border border-white/10 p-8 shadow-xl">
                    <h3 className="font-heavy text-doruz-gold text-3xl mb-8 uppercase italic flex items-center gap-3 leading-none">
                      <Plus size={24} /> Post Event
                    </h3>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Event Title</label>
                        <input 
                          type="text" 
                          value={newPost.title}
                          onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                          className="w-full bg-black/40 border border-white/10 p-4 font-display text-white focus:outline-none focus:border-doruz-gold transition-colors"
                          placeholder="WORLD TOUR 2024"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Date / Season</label>
                        <input 
                          type="text" 
                          value={newPost.date}
                          onChange={(e) => setNewPost({...newPost, date: e.target.value})}
                          className="w-full bg-black/40 border border-white/10 p-4 font-display text-white focus:outline-none focus:border-doruz-gold transition-colors"
                          placeholder="JULY 2024"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Image URL</label>
                        <input 
                          type="text" 
                          value={newPost.image}
                          onChange={(e) => setNewPost({...newPost, image: e.target.value})}
                          className="w-full bg-black/40 border border-white/10 p-4 font-display text-white focus:outline-none focus:border-doruz-gold transition-colors"
                          placeholder="https://images..."
                        />
                      </div>
                      <button 
                        onClick={addPost}
                        className="w-full bg-doruz-gold text-black font-black py-4 uppercase tracking-[0.3em] text-[10px] hover:bg-white transition-all flex items-center justify-center gap-2"
                      >
                        <Save size={16} /> Publish Release
                      </button>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-8">
                  <h3 className="font-heavy text-white/40 text-2xl uppercase tracking-widest italic mb-4">Current News & Events</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {news.map((item: any) => (
                      <div key={item.id} className="relative group aspect-[4/3] bg-black overflow-hidden border border-white/10">
                        <img src={item.image} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" title={item.title} />
                        <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent">
                          <p className="text-doruz-gold font-black text-[10px] tracking-[0.3em] mb-2">{item.date}</p>
                          <h4 className="text-white font-heavy text-3xl uppercase tracking-tighter leading-none mb-4">{item.title}</h4>
                          <button 
                            onClick={() => removePost(item.id)}
                            className="text-[10px] font-black text-red-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2"
                          >
                            <X size={14} /> Remove Post
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sales' && (
            <div className="space-y-12">
              <div className="bg-white/5 border border-white/10 overflow-hidden">
                 <table className="w-full text-left">
                    <thead className="bg-white/5 border-b border-white/10">
                      <tr>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Order ID</th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Customer</th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Status</th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {[1,2,3,4,5,6].map((i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors">
                          <td className="px-8 py-6 font-display font-medium text-doruz-gold italic">#88{21-i}</td>
                          <td className="px-8 py-6 font-display font-bold text-white uppercase">User {i}</td>
                          <td className="px-8 py-6">
                             <span className="text-[9px] font-black px-3 py-1 bg-green-500 text-black uppercase rounded-full">Shipped</span>
                          </td>
                          <td className="px-8 py-6 font-display font-bold text-white">N {(Math.random() * 100000).toLocaleString(undefined, {maximumFractionDigits: 0})}</td>
                        </tr>
                      ))}
                    </tbody>
                 </table>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1,2,3,4,5,6,7,8,9].map((i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-8 flex items-center gap-6">
                    <div className="w-16 h-16 bg-doruz-gold text-black flex items-center justify-center font-heavy text-2xl italic">U{i}</div>
                    <div>
                      <h4 className="text-white font-heavy text-xl uppercase italic leading-none">FAN_#{i}284</h4>
                      <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mt-2">Active Since 2024</p>
                      <p className="text-[10px] font-bold text-doruz-gold mt-1">Verified Resident</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}

function Checkout({ cart, total, navigate, user }: any) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: user?.address || '',
    city: user?.city || '',
    postalCode: user?.postalCode || '',
    country: user?.country || 'Nigeria'
  });

  const handlePlaceOrder = (e: FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-doruz-bg min-h-screen py-32 px-8 flex items-center justify-center text-center"
      >
        <div className="max-w-md">
          <div className="w-32 h-32 bg-doruz-gold rounded-full flex items-center justify-center mx-auto mb-10 text-black">
            <Check size={64} strokeWidth={3} />
          </div>
          <h1 className="font-heavy text-6xl font-black text-doruz-gold uppercase tracking-tighter italic mb-6">
            ORDER PLACED
          </h1>
          <p className="font-display text-white/60 text-xl md:text-2xl mb-12">
            Your vision is on the way. Check your email for shipping details.
          </p>
          <button 
            onClick={() => navigate('home')}
            className="bg-doruz-gold text-black font-black px-12 py-4 uppercase tracking-[0.3em] text-[10px] hover:bg-white transition-all"
          >
            Return Home
          </button>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-doruz-bg min-h-screen py-32 px-8"
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="space-y-12">
          <h1 className="font-heavy text-5xl font-black text-doruz-gold uppercase tracking-tighter italic leading-none">
            SHIPPING INFO
          </h1>
          
          <form onSubmit={handlePlaceOrder} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 p-5 text-white font-display focus:outline-none focus:border-doruz-gold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Email Address</label>
                <input 
                  required
                  type="email" 
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 p-5 text-white font-display focus:outline-none focus:border-doruz-gold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Street address</label>
              <input 
                required
                type="text" 
                value={form.address}
                onChange={(e) => setForm({...form, address: e.target.value})}
                className="w-full bg-white/5 border border-white/10 p-5 text-white font-display focus:outline-none focus:border-doruz-gold"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">City</label>
                <input 
                  required
                  type="text" 
                  value={form.city}
                  onChange={(e) => setForm({...form, city: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 p-5 text-white font-display focus:outline-none focus:border-doruz-gold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Postal Code</label>
                <input 
                  required
                  type="text" 
                  value={form.postalCode}
                  onChange={(e) => setForm({...form, postalCode: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 p-5 text-white font-display focus:outline-none focus:border-doruz-gold"
                />
              </div>
              <div className="col-span-2 md:col-span-1 space-y-2">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Country</label>
                <select 
                  className="w-full bg-white/5 border border-white/10 p-5 text-white font-display focus:outline-none focus:border-doruz-gold appearance-none"
                  value={form.country}
                  onChange={(e) => setForm({...form, country: e.target.value})}
                >
                  <option value="Nigeria" className="bg-doruz-dark">Nigeria</option>
                  <option value="USA" className="bg-doruz-dark">USA</option>
                  <option value="UK" className="bg-doruz-dark">UK</option>
                </select>
              </div>
            </div>

            <div className="pt-12 border-t border-white/10">
              <h3 className="font-heavy text-doruz-gold text-2xl mb-8 uppercase italic flex items-center gap-3">
                <CreditCard size={24} /> Payment Method
              </h3>
              <div className="bg-white/5 border border-doruz-gold p-6 flex justify-between items-center">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center font-black italic text-[10px]">VISA</div>
                   <span className="font-display text-white">Ending in 4242</span>
                </div>
                <span className="text-[10px] font-black text-doruz-gold uppercase tracking-widest">Simulated</span>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-doruz-gold text-black font-black py-6 uppercase tracking-[0.3em] text-xs hover:bg-white transition-all mt-12"
            >
              Confirm Purchase — N {total.toLocaleString()}
            </button>
          </form>
        </div>

        <div className="bg-white/5 border border-white/10 p-12 h-fit space-y-10">
          <h2 className="font-heavy text-white text-3xl uppercase tracking-tighter italic">Summary</h2>
          <div className="space-y-6">
            {cart.map((item: any) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-white/5 flex-shrink-0">
                    <img src={item.image} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-display font-medium text-white">{item.name}</p>
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Qty {item.qty} {item.size ? `• Size ${item.size}` : ''}</p>
                  </div>
                </div>
                <span className="font-display font-bold text-doruz-gold">N {(item.price * item.qty).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="pt-10 border-t border-white/10 space-y-4">
            <div className="flex justify-between text-white/60 font-display">
              <span className="uppercase text-[10px] font-black tracking-widest">Subtotal</span>
              <span className="font-bold text-lg">N {total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-white/60 font-display">
              <span className="uppercase text-[10px] font-black tracking-widest">Shipping</span>
              <span className="font-bold text-lg">FREE</span>
            </div>
            <div className="flex justify-between text-2xl font-display text-doruz-gold pt-4">
              <span className="font-heavy uppercase tracking-tighter italic text-3xl">Total</span>
              <span className="font-black">N {total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function ProductDetail({ product, navigate, addToCart, setIsSearchOpen, setIsCartOpen, cartCount }: any) {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState<string | null>(null);

  const sizes = product.category === 'Merch' ? ['S', 'M', 'L', 'XL'] : null;
  const isMusic = product.category === 'Music';

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-doruz-bg min-h-screen py-32 px-8"
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-12 flex justify-between items-center">
            <button 
              onClick={() => navigate('shop')}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-doruz-gold hover:text-white transition-colors"
            >
              <ArrowLeft size={14} strokeWidth={3} /> Back to Shop
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center">
          
          {/* Left: Product Visual */}
          <div className="relative flex items-center justify-center">
             {isMusic ? (
                <div className="relative w-full max-w-[300px] md:max-w-[500px] aspect-square">
                   {/* Disk - hidden on very small screens or moved */}
                   <div className="absolute right-[-10%] md:right-[-15%] top-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-black rounded-full shadow-2xl border-4 border-white/5">
                     <div className="absolute inset-[40%] rounded-full border border-white/10 flex items-center justify-center">
                       <div className="w-4 h-4 bg-doruz-bg rounded-full border border-white/20" />
                     </div>
                   </div>
                   {/* Cover */}
                   <div className="absolute inset-0 bg-doruz-dark shadow-2xl z-10 border border-white/5 overflow-hidden">
                      <img src={product.image} className="w-full h-full object-cover" />
                      {product.name === 'STATE OF GRACE' && (
                         <div className="absolute inset-0 flex items-center justify-center pointer-events-none rotate-[-45deg]">
                           <span className="font-heavy text-2xl md:text-6xl text-white whitespace-nowrap bg-black/10 px-4 md:px-10 py-2 md:py-4 backdrop-blur-sm border-y border-white/20">STATE OF GRACE</span>
                         </div>
                      )}
                   </div>
                </div>
             ) : (
                <div className="w-full max-w-[400px] md:max-w-[600px] aspect-[4/5] bg-white shadow-2xl border border-white/5 flex items-center justify-center overflow-hidden">
                   <img src={product.image} className="w-full h-full object-contain p-4" />
                </div>
             )}
          </div>


          {/* Right: Product Info */}
          <div className="flex flex-col text-white">
            <h1 className="font-heavy text-5xl md:text-6xl font-black uppercase text-doruz-gold tracking-tight mb-2">
              {product.name}
            </h1>
            <p className="font-heavy text-2xl md:text-3xl uppercase tracking-tighter text-white mb-8">
              BY RIDEREZZY
            </p>

            <p className="font-heavy text-4xl text-doruz-gold mb-8">
              N {product.price.toLocaleString()}
            </p>

            <div className="mb-10">
               <p className="font-display font-medium text-xl mb-2">Quantity</p>
               <div className="flex items-center gap-6 text-doruz-gold font-display text-2xl mb-8">
                 <button onClick={() => setQty(q => Math.max(1, q - 1))} className="hover:text-white transition-colors">-</button>
                 <span className="font-bold">{qty}</span>
                 <button onClick={() => setQty(q => q + 1)} className="hover:text-white transition-colors">+</button>
               </div>

               {sizes && (
                  <div className="mb-8">
                    <p className="font-display font-medium text-xl mb-4 uppercase">Select Size</p>
                    <div className="flex gap-4">
                      {sizes.map(s => (
                        <button 
                          key={s}
                          onClick={() => setSize(s)}
                          className={`w-14 h-14 border font-bold transition-all font-display ${size === s ? 'bg-doruz-gold text-black border-doruz-gold' : 'border-white/20 hover:border-doruz-gold text-white'}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

               <button 
                 onClick={() => {
                   if (sizes && !size) {
                     alert('Please select a size');
                     return;
                   }
                   addToCart(product, qty, size || undefined);
                 }}
                 className="inline-block border-2 border-doruz-gold px-12 py-3 font-display font-bold text-doruz-gold hover:bg-doruz-gold hover:text-black transition-all active:scale-95 text-lg uppercase tracking-widest"
               >
                 Add to cart
               </button>
            </div>

            <div className="space-y-6">
               <p className="font-display font-bold text-doruz-gold text-lg italic">Ships on: September 24, 2024</p>
               
               {isMusic && (
                 <div>
                   <h3 className="font-heavy text-3xl font-bold uppercase tracking-tight text-doruz-gold mb-6 italic underline underline-offset-8">Tracklist</h3>
                   <div className="space-y-3 font-display text-2xl text-doruz-gold">
                      <p>1. Open Up</p>
                      <p>2. Good Time</p>
                      <p>3. Perfume</p>
                      <p>4. Girls</p>
                      <p>5. I Destroyed Disco</p>
                      <p>6. You're Invited</p>
                   </div>
                 </div>
               )}

               <div className="mt-12 space-y-4">
                  <p className="font-display font-bold text-doruz-gold text-2xl">Limited to 4 per customer.</p>
                  <p className="font-display font-heavy text-doruz-gold text-3xl italic">Available GLOBALLY.</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}