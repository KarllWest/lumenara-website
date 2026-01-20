import { motion } from 'framer-motion';

const GAMES = [
  {
    title: "Project: Aether",
    genre: "Open World RPG",
    status: "Beta",
    desc: "An immersive fantasy world with complex combat systems and deep lore.",
    image: "/game1.jpg" 
  },
  {
    title: "Neon Rivals",
    genre: "Competitive Shooter",
    status: "In Development",
    desc: "Fast-paced, high-fidelity arena shooter focusing on e-sports mechanics.",
    image: "/game2.jpg" 
  },
  // Можна додати третю гру для прикладу
  {
    title: "Void Runners",
    genre: "Obby / Speedrun",
    status: "Concept",
    desc: "A gravity-defying parkour experience set in deep space.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000" 
  }
];

export default function Games() {
  return (
    <div className="pb-20">
      {/* Header */}
      <div className="pt-32 pb-16 px-4 text-center bg-gradient-to-b from-slate-900/50 to-[#020617]">
        <h1 className="text-5xl font-bold text-white mb-4">Our Projects</h1>
        <p className="text-slate-400 text-xl max-w-2xl mx-auto">Explore the universes we are building on Roblox.</p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {GAMES.map((game, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-lumen-500/50 transition-all"
          >
            <div className="h-56 overflow-hidden relative">
              <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent z-10 transition-colors" />
              <img src={game.image} alt={game.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-white">{game.title}</h3>
                <span className="bg-slate-800 text-xs px-2 py-1 rounded border border-slate-700 text-lumen-300">{game.status}</span>
              </div>
              <p className="text-slate-400 mb-6">{game.desc}</p>
              <button className="w-full py-3 rounded-lg bg-slate-800 hover:bg-lumen-600 text-white font-bold transition-colors">
                Play on Roblox
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}