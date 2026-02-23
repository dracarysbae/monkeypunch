import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Info, Heart, MapPin, Video, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ScrollingMonkey from './ScrollingMonkey';
import { useMemo, useState, useEffect } from 'react';

export default function Layout() {
  const location = useLocation();
  const { t, language, setLanguage } = useLanguage();
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 768); // md breakpoint
    };
    
    // Initial check
    checkScreenSize();
    
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const navItems = [
    { path: '/', label: t('nav.daily'), icon: Home },
    { path: '/hakkinda', label: t('nav.about'), icon: Info },
    { path: '/harita', label: t('nav.map'), icon: MapPin },
    { path: '/canli-yayin', label: t('nav.live'), icon: Video },
  ];

  // Generate random leaves for background - Memoized to prevent re-calculation on every render
  const leaves = useMemo(() => Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDuration: `${15 + Math.random() * 20}s`,
    animationDelay: `${Math.random() * 10}s`,
    scale: 0.5 + Math.random() * 1,
    color: ['text-emerald-600/20', 'text-amber-600/20', 'text-lime-600/20', 'text-teal-600/20'][Math.floor(Math.random() * 4)]
  })), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-stone-50 to-amber-50 text-stone-900 font-sans selection:bg-emerald-200 relative overflow-hidden">
      
      {/* Animated Background Leaves */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {leaves.map(leaf => (
          <div 
            key={leaf.id}
            className={`leaf ${leaf.color} absolute`}
            style={{
              left: leaf.left,
              animationDuration: leaf.animationDuration,
              animationDelay: leaf.animationDelay,
              transform: `scale(${leaf.scale})`
            }}
          >
            🌿
          </div>
        ))}
      </div>

      {isLargeScreen && <ScrollingMonkey />}
      
      {/* Floating Header */}
      <header className="sticky top-4 z-50 px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-5xl mx-auto glass-pill rounded-full px-4 py-2 transition-all duration-300">
          <div className="flex justify-between items-center h-12">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-100 p-2 rounded-full text-emerald-700 animate-float">
                <Heart className="w-4 h-4 fill-emerald-500" />
              </div>
              <span className="font-bold text-lg tracking-tight text-stone-800">Punch-kun</span>
            </div>
            
            <div className="flex items-center gap-4">
              <nav className="hidden md:flex space-x-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`relative px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                        isActive ? 'text-emerald-800' : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/50'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 z-10 relative">
                        <Icon className="w-4 h-4" />
                        {item.label}
                      </div>
                      {isActive && (
                        <motion.div
                          layoutId="nav-indicator"
                          className="absolute inset-0 bg-emerald-100 rounded-full z-0"
                          initial={false}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Language Selector */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-sm font-medium text-stone-600 hover:text-stone-900 bg-stone-100/50 hover:bg-stone-200/50 px-3 py-1.5 rounded-full transition-colors">
                  <Globe className="w-4 h-4" />
                  {language.toUpperCase()}
                </button>
                <div className="absolute right-0 mt-2 w-24 bg-white/90 backdrop-blur-md border border-stone-200/50 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100 overflow-hidden">
                  {[
                    { code: 'tr', label: 'TR' },
                    { code: 'en', label: 'EN' },
                    { code: 'de', label: 'DE' },
                    { code: 'fr', label: 'FR' },
                    { code: 'ru', label: 'RU' },
                    { code: 'ja', label: 'JA' },
                    { code: 'zh', label: 'ZH' },
                  ].map((lang) => (
                    <button 
                      key={lang.code}
                      onClick={() => setLanguage(lang.code as any)}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-stone-50 transition-colors ${language === lang.code ? 'font-bold text-emerald-600' : 'text-stone-700'}`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-50 glass-pill rounded-3xl overflow-hidden shadow-2xl">
        <nav className="flex justify-around p-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center p-2 rounded-2xl text-[10px] font-medium transition-all duration-300 ${
                  isActive ? 'text-emerald-700 bg-emerald-50' : 'text-stone-500 hover:bg-stone-50'
                }`}
              >
                <motion.div whileTap={{ scale: 0.9 }}>
                  <Icon className={`w-5 h-5 mb-1 ${isActive ? 'fill-emerald-200' : ''}`} />
                </motion.div>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content with Page Transitions */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8 pb-32 md:pb-12 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-stone-900/95 backdrop-blur-md text-stone-400 py-12 mt-auto relative z-10 rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <p className="text-sm font-medium">
            © {new Date().getFullYear()} Punch-kun. {t('footer.rights')}
          </p>
          <p className="text-xs opacity-60 flex items-center justify-center gap-1">
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            {t('footer.dedication')}
          </p>
          <div className="pt-4 border-t border-stone-800/50 text-xs opacity-70 space-y-2">
            <p>{t('footer.developer')}</p>
            <p>
              {t('footer.contact')}
              <a href="mailto:ozc024@gmail.com" className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium ml-1">
                ozc024@gmail.com
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
