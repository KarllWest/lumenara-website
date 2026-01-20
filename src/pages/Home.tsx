import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Gamepad2, ChevronRight, Users, Disc } from 'lucide-react';

const GAMES = [
  {
    title: "Project: Aether",
    genre: "Open World RPG",
    status: "Beta",
    desc: "An immersive fantasy world with complex combat systems and deep lore. Experience Roblox like never before.",
    image: "/game1.jpg"
  },
  {
    title: "Neon Rivals",
    genre: "Competitive Shooter",
    status: "In Development",
    desc: "Fast-paced, high-fidelity arena shooter focusing on e-sports mechanics and smooth movement.",
    image: "/game2.jpg"
  }
];

const FEATURES = [
  { title: "Advanced Combat", desc: "Proprietary hit-detection and animation blending systems for fluid PvP encounters." },
  { title: "Visual Fidelity", desc: "Pushing the Roblox engine to its limits with custom VFX, lighting, and environmental design." },
  { title: "Scalable Architecture", desc: "Robust backend infrastructure ensuring lag-free gameplay for thousands of concurrent users." }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-lumen-500 selection:text-white">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* ABSTRACT BACKGROUND */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/0 via-[#020617]/80 to-[#020617]" />
        
        <div className="relative max-w-7xl mx-auto px-4 text-center z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-md mb-8">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-semibold tracking-wide uppercase text-slate-300">Accepting Commissions & Partnerships</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight leading-tight mb-8">
              Forging Worlds <br />
              <span className="bg-gradient-to-r from-lumen-400 via-lumen-500 to-accent-purple bg-clip-text text-transparent">
                Beyond Boundaries
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              Lumenara is a premier Roblox development studio. We fuse cinematic visuals, complex systems, and immersive storytelling to create the next generation of experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/games" className="group flex items-center justify-center gap-3 bg-lumen-600 hover:bg-lumen-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]">
                Play Our Games 
                <Gamepad2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </Link>
              <a href="#about" className="flex items-center justify-center gap-3 bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-full font-bold text-lg border border-slate-700 transition-all">
                Studio Vision
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- ABOUT / METRICS --- */}
      <section id="about" className="py-24 bg-slate-900/30 border-y border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-lumen-400 font-bold tracking-wider uppercase mb-4">Who We Are</h3>
              <h2 className="text-4xl font-bold text-white mb-6">Not Just Builders. <br />We Are Architects of Fun.</h2>
              <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                Founded with a mission to elevate the Roblox platform, Lumenara bridges the gap between casual UGC and professional game development. We don't just ship games; we build communities and lasting digital experiences.
              </p>
              <ul className="space-y-4">
                {['Player-First Philosophy', 'High-Fidelity Animation', 'Long-Term Support'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-300">
                    <div className="bg-lumen-500/20 p-1 rounded-full"><ChevronRight className="w-4 h-4 text-lumen-400" /></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Visits', val: '50M+' },
                { label: 'Community', val: '120k+' },
                { label: 'Team Members', val: '15' },
                { label: 'Projects', val: '4' }
              ].map((stat) => (
                <div key={stat.label} className="bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center hover:border-lumen-500/30 transition-colors shadow-lg shadow-slate-950/50">
                  <div className="text-4xl font-bold text-white mb-2">{stat.val}</div>
                  <div className="text-sm text-slate-500 font-medium uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- GAMES SECTION --- */}
      <section id="games" className="py-32 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-lumen-900/20 via-[#020617] to-[#020617] -z-10" />
        <div className="text-center mb-16 px-4">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lumen-400 font-semibold tracking-wider uppercase text-sm"
          >
            Explore The Universe
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mt-2 text-white"
          >
            Our Flagship Projects
          </motion.h2>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          {GAMES.map((game, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl shadow-slate-950/50"
            >
              {/* SECTION IMAGE */}
              <div className="h-64 w-full overflow-hidden relative">
                <div className="absolute inset-0 bg-slate-900/40 z-10 group-hover:bg-transparent transition-colors duration-500" />
                <img 
                  src={game.image} 
                  alt={game.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out" 
                />
              </div>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-20 pointer-events-none">
                <div className="flex items-center justify-between mb-4 pointer-events-auto">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold bg-white/10 border border-white/10 text-white backdrop-blur-sm`}>
                    {game.status}
                  </span>
                  <span className="text-slate-300 text-sm font-medium drop-shadow-md">{game.genre}</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">{game.title}</h3>
                <p className="text-slate-200 mb-6 max-w-md drop-shadow-md">{game.desc}</p>
                <button className="w-fit flex items-center gap-2 text-white font-bold hover:text-lumen-400 transition-colors pointer-events-auto">
                  View Project Details <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- CAPABILITIES --- */}
      <section id="features" className="py-24 bg-slate-950">
        <div className="text-center mb-16 px-4">
          <span className="text-lumen-400 font-semibold tracking-wider uppercase text-sm">Under The Hood</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2 text-white">Studio Capabilities</h2>
        </div>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6">
          {FEATURES.map((feat, idx) => (
            <div key={idx} className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:bg-slate-900 hover:border-lumen-500/50 transition-all group shadow-lg shadow-slate-950/30">
              <h4 className="text-xl font-bold text-white mb-3">{feat.title}</h4>
              <p className="text-slate-400 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- CAREERS & COMMUNITY (Split) --- */}
      <section id="careers" className="py-24">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12">
          
          {/* Careers Box */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-10 rounded-3xl border border-slate-800 relative overflow-hidden shadow-xl shadow-slate-950/50">
            <div className="absolute top-0 right-0 p-8 opacity-10"><Users className="w-32 h-32" /></div>
            <h3 className="text-3xl font-bold text-white mb-4">Join the Vanguard</h3>
            <p className="text-slate-400 mb-8 max-w-md">
              We are always looking for talented Scripters, 3D Modelers, and VFX Artists to push the boundaries of Roblox.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-3 border-b border-slate-800">
                <span className="text-slate-200 font-medium">Senior Lua Scripter</span>
                <span className="text-xs bg-lumen-900 text-lumen-200 px-2 py-1 rounded">Remote</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-800">
                <span className="text-slate-200 font-medium">3D Environment Artist</span>
                <span className="text-xs bg-lumen-900 text-lumen-200 px-2 py-1 rounded">Remote</span>
              </div>
            </div>
            <Link to="/careers" className="bg-white text-slate-950 px-6 py-3 rounded-full font-bold hover:bg-lumen-400 transition-colors w-full sm:w-auto inline-block text-center">
              View All Positions
            </Link>
          </div>

          {/* Community Box */}
          <div className="bg-lumen-600 p-10 rounded-3xl relative overflow-hidden flex flex-col justify-center text-center items-center shadow-[0_0_40px_rgba(14,165,233,0.3)]">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            <div className="relative z-10">
              <Disc className="w-16 h-16 text-white mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-white mb-4">Join Our Discord</h3>
              <p className="text-lumen-100 mb-8 max-w-md">
                Get exclusive sneak peeks, participate in beta testing, and chat with the developers. Our community is waiting for you.
              </p>
              <button className="bg-white text-lumen-700 px-8 py-4 rounded-full font-bold hover:bg-slate-100 transition-colors shadow-lg">
                Join Server
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}