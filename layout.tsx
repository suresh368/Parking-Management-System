import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  Car,
  LogOut as LogOutIcon,
  ParkingSquare,
  FileText,
  Moon,
  Sun,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParking } from './context/parkingcontext.tsx';
import { useTheme } from './context/themecontext.tsx';
import Logo from './ui/logo';

export default function Layout() {
  const { isAuthenticated, logout } = useParking();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'DASHBOARD' },
    { path: '/vehicle-entry', icon: Car, label: 'ENTRY' },
    { path: '/vehicle-exit', icon: LogOutIcon, label: 'EXIT' },
    { path: '/slot-management', icon: ParkingSquare, label: 'SLOTS' },
    { path: '/reports', icon: FileText, label: 'REPORTS' },
  ];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground font-sans selection:bg-foreground selection:text-background transition-colors duration-500">
      {/* Video Background Section */}
      <div className="video-container">
        <video autoPlay muted loop playsInline className="opacity-40 scale-105 blur-[1px]">
          <source src="/video/Video_Enhancement_Car_Drifting_Effect.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay" />
      </div>

      {/* Header */}
      <header className="glass-morphism sticky top-0 z-50 border-b border-foreground/10 h-20 relative">
        <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
          <motion.div 
            className="flex items-center gap-4 group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          >
            <motion.div 
              className="w-10 h-10 bg-accent flex items-center justify-center ultra-smooth"
              whileHover={{ rotate: 90, scale: 1.1 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              <Logo className="w-6 h-6 text-white" />
            </motion.div>
            <motion.h1 
              className="text-xl font-display font-bold tracking-tighter text-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              PITSTOP
            </motion.h1>
          </motion.div>

          <div className="flex items-center gap-6 font-mono text-xs">
            <motion.button
              onClick={toggleTheme}
              className="p-2 text-foreground/40 hover:text-foreground ultra-smooth uline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              {theme === 'light' ? 'NIGHT_MODE' : 'DAY_LIGHT'}
            </motion.button>

            <motion.button
              onClick={handleLogout}
              className="hidden sm:flex items-center gap-2 px-4 py-2 border border-accent/20 hover:border-accent text-accent ultra-smooth hover:bg-accent hover:text-white hover-glow"
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.6 }}
            >
              <LogOutIcon className="w-4 h-4" />
              TERMINATE_SESSION
            </motion.button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 text-foreground hover:text-accent"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0, y: -20 }}
              animate={{ height: 'auto', opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="sm:hidden glass-morphism border-t border-foreground/10 overflow-hidden"
            >
              <nav className="p-6 space-y-4">
                {navItems.map(item => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between p-4 font-mono text-sm tracking-widest transition-all ${isActive
                          ? 'bg-accent text-white'
                          : 'text-foreground/60 hover:text-foreground hover:translate-x-2'
                        }`}
                    >
                      <div className="flex items-center gap-4">
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'rotate-90' : ''}`} />
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div className="relative z-10 flex flex-col sm:flex-row max-w-7xl mx-auto px-6 gap-8 py-8">
        {/* Desktop Sidebar Navigation */}
        <nav className="hidden sm:flex flex-col w-64 gap-2 shrink-0">
          <div className="font-mono text-[10px] text-foreground/20 tracking-[0.3em] mb-4 uppercase">
            Navigation Console
          </div>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <motion.div
                key={item.path}
                whileHover={{ x: 8 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center justify-between px-4 py-4 font-mono text-xs tracking-widest ultra-smooth group ${isActive
                      ? 'bg-foreground text-background font-bold'
                      : 'text-foreground/40 hover:text-foreground hover:bg-foreground/5'
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-accent' : 'group-hover:text-accent'} ultra-smooth`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <motion.div layoutId="nav-active" className="w-1 h-4 bg-accent" transition={{ duration: 0.5 }} />}
                </Link>
              </motion.div>
            );
          })}

          <div className="mt-12 p-6 border border-foreground/5 bg-foreground/[0.02]">
            <div className="font-mono text-[9px] text-foreground/30 uppercase leading-relaxed">
              System protocol active. <br />
              All nodes operating at <br />
              peak efficiency.
            </div>
            <div className="mt-4 flex items-center gap-2">
              <div className="w-1 h-1 bg-accent rounded-full animate-ping" />
              <span className="font-mono text-[9px] text-accent uppercase">Live Link</span>
            </div>
          </div>
        </nav>

        {/* Main Content Area with Transitions */}
        <main className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -40, scale: 0.95 }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <footer className="relative z-10 max-w-7xl mx-auto px-6 py-12 border-t border-foreground/5 mt-12 flex justify-between items-center opacity-30 font-mono text-[10px] tracking-widest uppercase">
        <span>© 2026 PITSTOP ARCHITECTURE</span>
        <div className="flex gap-8">
          <span className="uline">TERMS_OF_USE</span>
          <span className="uline">SYSTEM_PRIVACY</span>
        </div>
      </footer>
    </div>
  );
}
