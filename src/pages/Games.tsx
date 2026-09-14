import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useSupabaseList } from '../hooks/useSupabaseList';
import ContentState from '../components/ContentState';
import { statusStyleFor, type Game } from '../types/content';

type Filter = 'ALL' | 'LIVE' | 'IN DEV';
const FILTERS: Filter[] = ['ALL', 'LIVE', 'IN DEV'];

export default function Games() {
  const { data: games, loading, error } = useSupabaseList<Game>('games');
  const [filter, setFilter] = useState<Filter>('ALL');

  const visibleGames = useMemo(
    () => (filter === 'ALL' ? games : games.filter((g) => g.status === filter)),
    [games, filter],
  );

  // Показуємо фільтр, лише коли справді є з-поміж чого вибирати.
  const showFilters = games.length > 0 && new Set(games.map((g) => g.status)).size > 1;

  return (
    <div className="min-h-screen pb-20 bg-mono-950 text-white selection:bg-white selection:text-black">

      {/* HEADER SECTION */}
      <div className="pt-40 pb-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter uppercase">
            Our Games
          </h1>
          <p className="text-mono-400 text-xl max-w-2xl mx-auto leading-relaxed">
            We build immersive, physics-based experiences played by millions.
            <br />Explore the library below.
          </p>
        </motion.div>
      </div>

      <ContentState
        loading={loading}
        error={error}
        isEmpty={games.length === 0}
        emptyText="No games published yet. Check back soon."
      />

      {/* FILTER TABS */}
      {showFilters && (
        <div className="max-w-7xl mx-auto px-4 mb-10 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-colors border ${
                filter === f
                  ? 'bg-white text-mono-950 border-white'
                  : 'bg-transparent text-mono-400 border-mono-800 hover:text-white hover:border-mono-600'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      {/* GAMES GRID */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        {visibleGames.map((game, idx) => {
          const isPlayable = Boolean(game.link) && game.link !== '#';

          return (
            <motion.a
              href={isPlayable ? game.link : undefined}
              target={isPlayable ? '_blank' : undefined}
              rel="noreferrer"
              key={game.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`group relative block bg-mono-900 rounded-3xl overflow-hidden border border-mono-800 transition-all duration-500 shadow-xl ${
                isPlayable ? 'hover:border-white hover:shadow-2xl' : 'cursor-default'
              }`}
            >
              {/* IMAGE CONTAINER */}
              <div className="h-[450px] overflow-hidden relative">
                <div className="absolute top-6 left-6 z-30">
                  <span className={`px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg ${game.statusStyle || statusStyleFor(game.status)}`}>
                    {game.status}
                  </span>
                </div>

                <img
                  src={game.image}
                  alt={game.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                />

                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90 z-20" />
              </div>

              {/* TEXT CONTENT */}
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 z-30">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <span className="text-mono-300 text-sm font-bold tracking-widest uppercase block mb-2 drop-shadow-md">
                      {game.genre}
                    </span>
                    <h3 className={`text-4xl font-black text-white drop-shadow-xl ${isPlayable ? 'group-hover:underline decoration-2 underline-offset-8' : ''}`}>
                      {game.title}
                    </h3>
                  </div>

                  {isPlayable && (
                    <div className="bg-white text-black p-3 rounded-full opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                      <ArrowUpRight className="w-6 h-6" />
                    </div>
                  )}
                </div>

                <p className="text-mono-200 text-lg leading-relaxed max-w-xl drop-shadow-md font-medium">
                  {game.desc}
                </p>
              </div>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
