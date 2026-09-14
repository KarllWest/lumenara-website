import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Twitter, MessageSquare, Youtube, Gamepad2, Mail } from 'lucide-react';
import { CONTACT_EMAIL, SOCIALS } from '../config/site';
import CookieConsent from './CookieConsent';
import { openConsentSettings } from '../lib/consent';

const SOCIAL_ICONS = {
  twitter: Twitter,
  discord: MessageSquare,
  roblox: Gamepad2,
  youtube: Youtube,
  github: Gamepad2,
} as const;

const NAVIGATION = [
  { name: 'HOME', href: '/' },
  { name: 'GAMES', href: '/games' },
  { name: 'BLOG', href: '/blog' },
  { name: 'TEAM', href: '/team' },
  { name: 'CONTACT', href: '/contact' },
];

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-mono-950 text-mono-300 font-sans selection:bg-mono-100 selection:text-mono-950 flex flex-col">
      
      {/* NAVBAR */}
      <nav className="fixed w-full z-50 bg-mono-950/90 backdrop-blur-lg border-b border-mono-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24"> 
            <Link to="/" className="flex items-center cursor-pointer">
              <img 
                src="/images/image_7.png" 
                alt="Lumenara Logo" 
                className="h-16 w-auto transition-transform hover:scale-105" 
              />
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              {NAVIGATION.map((item) => (
                <Link 
                  key={item.name} 
                  to={item.href} 
                  className={`text-sm font-bold tracking-wider transition-colors ${isActive(item.href) ? 'text-white' : 'hover:text-white text-mono-400'}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <button
              className="md:hidden text-white p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden bg-mono-900 border-b border-mono-800"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {NAVIGATION.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-3 text-lg font-bold border-b border-mono-800/50 transition-colors ${isActive(item.href) ? 'text-white' : 'text-mono-400 hover:text-white'}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* CONTENT */}
      <main className="flex-grow pt-24">
        <Outlet /> 
      </main>

      {/* FOOTER */}
      <footer className="bg-mono-900 pt-16 pb-8 border-t border-mono-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
            <div className="flex items-center">
              <img 
                src="/images/image_7.png" 
                alt="Lumenara" 
                className="h-12 w-auto" 
              />
            </div>
            
            {/* Показуємо тільки ті соцмережі, у яких реально є посилання (див. config/site.ts) */}
            <div className="flex gap-6">
              {SOCIALS.filter((social) => social.href).map((social) => {
                const Icon = SOCIAL_ICONS[social.id];
                return (
                  <a
                    key={social.id}
                    href={social.href!}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="text-mono-400 hover:text-white transition-colors"
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                );
              })}
              <a href={`mailto:${CONTACT_EMAIL}`} aria-label="Email Lumenara" className="text-mono-400 hover:text-white transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-8 text-sm text-mono-500 border-t border-mono-800 pt-8">
            <span>© {new Date().getFullYear()} Lumenara. All rights reserved.</span>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
              <button onClick={openConsentSettings} className="hover:text-white transition-colors">Cookie Settings</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Банер згоди на cookies (GDPR) */}
      <CookieConsent />
    </div>
  );
}