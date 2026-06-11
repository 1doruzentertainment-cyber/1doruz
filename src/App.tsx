import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Artists from './pages/Artists';
import ArtistProfile from './pages/ArtistProfile';
import Releases from './pages/Releases';
import DemoSubmission from './pages/DemoSubmission';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import News from './pages/News';
import Contact from './pages/Contact';
import AdminGuard from './components/AdminGuard';
import AdminDashboard from './pages/AdminDashboard';
import AdminArtists from './pages/AdminArtists';
import AdminReleases from './pages/AdminReleases';
import AdminNews from './pages/AdminNews';
import AdminDemos from './pages/AdminDemos';
import AdminSettings from './pages/AdminSettings';
import AdminAddArtist from './pages/AdminAddArtist';
import AdminAddRelease from './pages/AdminAddRelease';
import AdminWriteArticle from './pages/AdminWriteArticle';
import AdminNewAsset from './pages/AdminNewAsset';
import AdminTeam from './pages/AdminTeam';
import UserProfile from './pages/UserProfile';
import Login from './pages/Login';
import CompleteProfile from './pages/CompleteProfile';
import ScrollToTop from './components/ScrollToTop';
import { AnimatePresence } from 'motion/react';

const SESSION_DURATION_MS = 14 * 24 * 60 * 60 * 1000;

function SessionGuard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) return;
    try {
      const user = JSON.parse(stored);
      if (user.loginAt && Date.now() - user.loginAt > SESSION_DURATION_MS) {
        localStorage.removeItem('user');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('pendingUserId');
        navigate('/login');
      }
    } catch {
      localStorage.removeItem('user');
    }
  }, [navigate]);

  return <>{children}</>;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <SessionGuard>
        <div className="flex min-h-screen flex-col bg-[#050505]">
          <Navbar />
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/artists" element={<Artists />} />
                <Route path="/artists/:id" element={<ArtistProfile />} />
                <Route path="/releases" element={<Releases />} />
                <Route path="/submit-demo" element={<DemoSubmission />} />
                <Route path="/events" element={<Events />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/news" element={<News />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
              <Route path="/admin/artists" element={<AdminGuard><AdminArtists /></AdminGuard>} />
              <Route path="/admin/releases" element={<AdminGuard><AdminReleases /></AdminGuard>} />
              <Route path="/admin/news" element={<AdminGuard><AdminNews /></AdminGuard>} />
              <Route path="/admin/demos" element={<AdminGuard><AdminDemos /></AdminGuard>} />
              <Route path="/admin/settings" element={<AdminGuard><AdminSettings /></AdminGuard>} />
              <Route path="/admin/artists/new" element={<AdminGuard><AdminAddArtist /></AdminGuard>} />
              <Route path="/admin/releases/new" element={<AdminGuard><AdminAddRelease /></AdminGuard>} />
              <Route path="/admin/news/new" element={<AdminGuard><AdminWriteArticle /></AdminGuard>} />
              <Route path="/admin/assets/new" element={<AdminGuard><AdminNewAsset /></AdminGuard>} />
              <Route path="/admin/team" element={<AdminGuard><AdminTeam /></AdminGuard>} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/complete-profile" element={<CompleteProfile />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </SessionGuard>
    </Router>
  );
}
