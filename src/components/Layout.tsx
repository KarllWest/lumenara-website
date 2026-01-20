import  { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Menu, X, Twitter, Github, MonitorPlay } from 'lucide-react';

const NAVIGATION = [
  { name: 'Studio', href: '/' },
  { name: 'Games', href: '/games' },
  { name: 'Careers', href: '/careers' },
];

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Функція для перевірки активного посилання
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-lumen-500 selection:text-white flex flex-col">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed w-full z-50 bg-[#020617]/80 backdrop-blur-lg border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-2 cursor-pointer">
              <div className="bg-lumen-500/10 p-2 rounded-lg border border-lumen-500/20">
                <Sparkles className="h-6 w-6 text-lumen-400" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">Lumenara</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              {NAVIGATION.map((item) => (
                <Link 
                  key={item.name} 
                  to={item.href} 
                  className={`text-sm font-medium transition-colors ${isActive(item.href) ? 'text-lumen-400' : 'hover:text-lumen-400'}`}
                >
                  {item.name}
                </Link>
              ))}
              <Link to="/contact" className="bg-white text-slate-950 px-5 py-2.5 rounded-full font-bold text-sm hover:bg-lumen-400 transition-all">
                Let's Talk
              </Link>
            </div>

            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden bg-slate-900 border-b border-slate-800"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {NAVIGATION.map((item) => (
                <Link key={item.name} to={item.href} onClick={() => setIsMenuOpen(false)} className="block py-3 text-lg font-medium text-slate-300 hover:text-white border-b border-slate-800/50">
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* --- PAGE CONTENT --- */}
      <main className="flex-grow pt-20">
        <Outlet /> 
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-950 pt-20 pb-10 border-t border-slate-900 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Sparkles className="h-6 w-6 text-lumen-400" />
            <span className="text-2xl font-bold text-white">Lumenara</span>
          </div>
          <p className="text-slate-500 text-sm mb-8">© 2024 Lumenara Studios. All rights reserved.</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="p-3 rounded-full bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-all"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="p-3 rounded-full bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-all"><Github className="w-5 h-5" /></a>
            <a href="#" className="p-3 rounded-full bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-all"><MonitorPlay className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}