import { motion } from 'framer-motion';
import { useSupabaseList } from '../hooks/useSupabaseList';
import ContentState from '../components/ContentState';
import type { TeamMember } from '../types/content';

export default function Team() {
  const { data: team, loading, error } = useSupabaseList<TeamMember>('team');

  return (
    <div className="min-h-screen pb-20 bg-mono-950">

      {/* HEADER */}
      <div className="pt-32 pb-16 px-4 text-center">
        <h1 className="text-5xl font-black text-white mb-4 uppercase tracking-tight">The Team</h1>
        <p className="text-mono-400 text-xl max-w-2xl mx-auto">The creative minds behind Lumenara.</p>
      </div>

      <ContentState
        loading={loading}
        error={error}
        isEmpty={team.length === 0}
        emptyText="Team profiles are coming soon."
      />

      {/* GRID */}
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {team.map((member, idx) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group bg-mono-900 p-6 rounded-2xl border border-mono-800 text-center hover:border-white/40 transition-colors duration-300"
          >
            {/* AVATAR */}
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-mono-800 group-hover:border-white transition-colors duration-300 bg-mono-950">
              <img
                src={member.img}
                alt={member.name}
                loading="lazy"
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
