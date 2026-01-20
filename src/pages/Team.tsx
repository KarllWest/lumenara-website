import { motion } from 'framer-motion';

const TEAM = [
  { name: "Alex V.", role: "Founder & Lead Designer", bio: "10+ years in game design. Creating worlds that matter.", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=60" },
  { name: "Sarah K.", role: "Lead Animator", bio: "Bringing characters to life with fluid, realistic motion.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60" },
  { name: "Mike R.", role: "Senior Scripter", bio: "The wizard behind the complex systems and backend logic.", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&auto=format&fit=crop&q=60" },
  { name: "Jessica T.", role: "Community Manager", bio: "Building the bridge between the studio and our players.", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=60" },
];

export default function Team() {
  return (
    <div className="min-h-screen pb-20 bg-mono-950">
      
      {/* HEADER */}
      <div className="pt-32 pb-16 px-4 text-center">
        <h1 className="text-5xl font-black text-white mb-4 uppercase tracking-tight">The Team</h1>
        <p className="text-mono-400 text-xl max-w-2xl mx-auto">The creative minds behind Lumenara.</p>
      </div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {TEAM.map((member, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="group bg-mono-900 p-6 rounded-2xl border border-mono-800 text-center hover:border-white/40 transition-colors duration-300"
          >
            {/* AVATAR */}
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-mono-800 group-hover:border-white transition-colors duration-300">
              <img 
                src={member.img} 
                alt={member.name} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
              />
            </div>
            
            {/* INFO */}
            <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
            <span className="text-mono-500 text-xs font-bold uppercase tracking-widest block mb-4 group-hover:text-white transition-colors">
              {member.role}
            </span>
            <p className="text-mono-400 text-sm leading-relaxed border-t border-mono-800 pt-4">
              {member.bio}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}