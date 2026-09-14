import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Gamepad2, Film } from 'lucide-react';
import { supabase } from '../lib/supabase';
import ContentState from '../components/ContentState';
import { statusStyleFor, type Game } from '../types/content';
import { getYouTubeEmbedUrl } from '../lib/youtube';

export default function GameDetail() {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      const { data, error: err } = await supabase
        .from('games')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (cancelled) return;
      if (err) setError(err.message);
      else { setGame((data as Game) ?? null); setError(null); }
      setLoading(false);
    })();

    return () => { cancelled = true; };
  }, [id]);

  const embedUrl = game ? getYouTubeEmbedUrl(game.trailer) : null;
  const isPlayable = Boolean(game?.link) && game?.link !== '#';

  return (
    <div className="min-h-screen bg-mono-950 text-white pt-32 pb-24 px-4">
      <div className="max-w-5xl mx-auto">
        <Link to="/games" className="inline-flex items-center gap-2 text-mono-400 hover:text-white transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" /> Back to Games
        </Link>

        <ContentState
          loading={loading}
          error={error}
          isEmpty={!game}
          emptyText="This game doesn't exist or was removed."
        />

        {game && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* HEADER */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${game.statusStyle || statusStyleFor(game.status)}`}>
                {game.status}
              </span>
              {game.genre && (
                <span className="text-mono-400 text-sm font-bold uppercase tracking-widest">{game.genre}</span>
              )}
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-10">{game.title}</h1>

            {/* TRAILER or IMAGE */}
            {embedUrl ? (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-mono-800 bg-black mb-10">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={embedUrl}
                  title={`${game.title} trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            ) : (
              game.image && (
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-mono-800 mb-10">
                  <img src={game.image} alt={game.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              )
            )}

            {/* INFO */}
            <div className="grid md:grid-cols-3 gap-10">
              <div className="md:col-span-2">
                <h2 className="text-xl font-bold mb-4">About this game</h2>
                <p className="text-mono-300 text-lg leading-relaxed whitespace-pre-line">{game.desc}</p>
              </div>

              <aside className="space-y-4">
                {isPlayable && (
                  <a
                    href={game.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 bg-white text-mono-950 px-6 py-4 rounded-xl font-bold hover:bg-mono-200 transition-colors"
                  >
                    <Gamepad2 className="w-5 h-5" /> Play on Roblox
                  </a>
                )}
                {!embedUrl && (
                  <div className="flex items-center gap-2 text-mono-500 text-sm border border-mono-800 rounded-xl p-4">
                    <Film className="w-4 h-4 shrink-0" /> Trailer coming soon.
                  </div>
                )}
                {!isPlayable && (
                  <div className="text-mono-500 text-sm border border-mono-800 rounded-xl p-4">
                    In development — not yet playable.
                  </div>
                )}
              </aside>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
