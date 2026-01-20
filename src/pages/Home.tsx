import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Trophy, Zap, ChevronRight, BarChart3, ShieldCheck, Heart, ArrowUpRight, Gamepad2 } from 'lucide-react';

// 1. ДАНІ ПРО ІГРИ (Ті самі, що і в Games.tsx)
const PREVIEW_GAMES = [
  {
    title: "One of Us",
    genre: "Sports / Physics",
    status: "LIVE",
    statusStyle: "bg-white text-black font-bold border border-white",
    desc: "One player is secretly the Killer. Blend in or strike when no one expects it.",
    image: "/images/one-of-us.png", 
    link: "https://www.roblox.com/games/79436299646095/One-of-Us#!/about" 
  },
  {
    title: "Jujutsu Cursed Genesis",
    genre: "Sports / Competitive",
    status: "IN DEV",
    statusStyle: "bg-black/40 backdrop-blur-md border border-white/20 text-white font-medium",
    desc: "Fast-paced combat with exaggerated physics. Dominate the arena in this high-fidelity experience.",
    image: "/images/jcg.png", 
    link: "#"
  },
  {
    title: "GreyBox",
    genre: "FPS / Strategy",
    status: "IN DEV",
    statusStyle: "bg-black/40 backdrop-blur-md border border-white/20 text-white font-medium",
    desc: "An upcoming tactical shooter pushing the boundaries of what's possible on the Roblox engine.",
    image: "/images/greybox.png", 
    link: "#"
  }
];

export default function Home() {
  return (
    <div className="overflow-hidden bg-mono-950 text-white selection:bg-white selection:text-black">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071')] bg-cover bg-center opacity-10 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-b from-mono-950/10 via-mono-950/80 to-mono-950" />
        
        <div className="relative max-w-7xl mx-auto px-4 text-center z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter">
              DESIGN WITH <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">A TWIST</span>
            </h1>
            <p className="text-xl md:text-2xl text-mono-400 max-w-2xl mx-auto mb-10">
              Forging immersive Roblox experiences that captivate players and amplify brands.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/games" className="bg-white hover:bg-mono-200 text-mono-950 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-white/25">
                Play Now
              </Link>
              <Link to="/contact" className="bg-mono-900 hover:bg-mono-800 text-white px-8 py-4 rounded-full font-bold text-lg border border-mono-800 transition-all">
                Partner With Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. STUDIO METRICS */}
      <section className="py-12 border-y border-mono-800 bg-mono-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Total Visits", val: "500M+", icon: <Users className="w-5 h-5 text-white" /> },
            { label: "Peak Players", val: "125K", icon: <Zap className="w-5 h-5 text-mono-300" /> },
            { label: "Avg Rating", val: "94%", icon: <Trophy className="w-5 h-5 text-mono-300" /> },
            { label: "Community", val: "2M+", icon: <Heart className="w-5 h-5 text-white" /> },
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-2 opacity-70">
                {stat.icon}
                <span className="text-sm font-bold uppercase tracking-widest text-mono-400">{stat.label}</span>
              </div>
              <span className="text-4xl md:text-5xl font-black text-white">{stat.val}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED GAME (Hero Product) */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-white font-bold tracking-widest uppercase mb-2 block">Featured Project</span>
              <h2 className="text-5xl font-bold text-white mb-6">One of Us</h2>
              <p className="text-mono-400 text-lg mb-8 leading-relaxed">
                One player is secretly the Killer, able to transform between human and monster form at will. Blend in with the group — or strike when no one expects it.
              </p>
              <ul className="space-y-4 mb-8">
                {['Social Deduction', 'Unique Abilities', 'High Fidelity Maps'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-mono-300">
                    <div className="w-2 h-2 bg-white rounded-full" /> {item}
                  </li>
                ))}
              </ul>
              <a href="https://www.roblox.com/games/79436299646095/One-of-Us#!/about" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-white text-mono-950 px-8 py-3 rounded-lg font-bold hover:bg-mono-200 transition-colors w-fit">
                <Gamepad2 className="w-5 h-5" /> Play Now on Roblox
              </a>
            </div>
            <div className="order-1 lg:order-2 relative group">
              <div className="absolute inset-0 bg-white/10 blur-3xl -z-10 rounded-full opacity-50 group-hover:opacity-70 transition-opacity" />
              <img 
                src="/images/one-of-us.png" 
                alt="One of Us" 
                className="rounded-2xl border border-mono-700 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 grayscale hover:grayscale-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. GAME LIBRARY PREVIEW (UPDATED SECTION) */}
      <section className="py-24 bg-mono-950 border-t border-mono-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">More from Lumenara</h2>
              <p className="text-mono-400">Pushing the boundaries of what's possible.</p>
            </div>
            <Link to="/games" className="text-white font-bold hover:text-mono-300 transition-colors flex items-center gap-1">
              View All Games <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {PREVIEW_GAMES.map((game, idx) => (
              <motion.a 
                key={idx}
                href={game.link}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -5 }}
                className="group relative bg-mono-900 rounded-xl overflow-hidden border border-mono-800 hover:border-white transition-colors duration-500 block"
              >
                {/* Image Section */}
                <div className="h-56 bg-mono-800 relative overflow-hidden">
                   {/* Status Badge */}
                   <div className="absolute top-4 left-4 z-30">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider shadow-lg ${game.statusStyle}`}>
                      {game.status}
                    </span>
                  </div>

                  <img 
                    src={game.image} 
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" 
                  />
                  
                  {/* Overlays for readability */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 z-20" />
                </div>

                {/* Content Section */}
                <div className="p-6 relative z-30 -mt-12"> 
                  {/* Title sits on top of the image gradient area */}
                  <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg group-hover:underline decoration-2 underline-offset-4">
                    {game.title}
                  </h3>
                  <p className="text-mono-300 text-xs leading-relaxed line-clamp-3">
                    {game.desc}
                  </p>
                  
                  <div className="mt-4 flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    View Project <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* 5. OUR STORY */}
      <section className="py-24 border-t border-mono-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Crafting Digital Worlds</h2>
          <p className="text-xl text-mono-300 leading-relaxed mb-6">
            Lumenara isn't just a game studio; we are a collective of dreamers and engineers dedicated to the Roblox platform. 
            Our mission is to bridge the gap between casual play and professional game design.
          </p>
          <Link to="/team" className="text-white border-b border-white pb-1 hover:text-mono-300 transition-colors">Meet the Team</Link>
        </div>
      </section>

      {/* 6. CAPABILITIES */}
      <section className="py-24 bg-mono-900/30">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div className="p-8 bg-mono-950 rounded-2xl border border-mono-800">
            <BarChart3 className="w-10 h-10 text-white mb-6" />
            <h3 className="text-xl font-bold text-white mb-3">Amplify your Brand</h3>
            <p className="text-mono-400">We turn brand values into playable moments, creating deep engagement rather than just impressions.</p>
          </div>
          <div className="p-8 bg-mono-950 rounded-2xl border border-mono-800">
            <ShieldCheck className="w-10 h-10 text-white mb-6" />
            <h3 className="text-xl font-bold text-white mb-3">Quality: Assured</h3>
            <p className="text-mono-400">Rigorous testing and professional pipelines ensure our games are polished, performant, and bug-free.</p>
          </div>
          <div className="p-8 bg-mono-950 rounded-2xl border border-mono-800">
            <Users className="w-10 h-10 text-white mb-6" />
            <h3 className="text-xl font-bold text-white mb-3">People, not Robots</h3>
            <p className="text-mono-400">We believe in craftsmanship. Every asset, script, and UI element is handmade with passion and intent.</p>
          </div>
        </div>
      </section>

    </div>
  );
}