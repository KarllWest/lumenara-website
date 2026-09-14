import { useSupabaseList } from '../hooks/useSupabaseList';
import ContentState from '../components/ContentState';
import type { BlogPost } from '../types/content';

export default function Blog() {
  // Нові пости зверху.
  const { data: posts, loading, error } = useSupabaseList<BlogPost>('blog', { ascending: false });

  return (
    <div className="min-h-screen pb-20 bg-mono-950">

      {/* HEADER */}
      <div className="pt-32 pb-16 px-4 text-center">
        <h1 className="text-5xl font-black text-white mb-4 uppercase tracking-tight">Studio Blog</h1>
        <p className="text-mono-400 text-xl">Insights, updates, and stories from development.</p>
      </div>

      <ContentState
        loading={loading}
        error={error}
        isEmpty={posts.length === 0}
        emptyText="No posts published yet."
      />

      {/* POSTS LIST */}
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        {posts.map((post) => {
          const hasArticle = Boolean(post.link) && post.link !== '#';

          return (
            <article
              key={post.id}
              className="group bg-mono-900 p-8 rounded-2xl border border-mono-800 hover:border-white/40 transition-all duration-300"
            >
              {/* META INFO */}
              <div className="flex items-center gap-4 text-sm mb-4">
                <span className="text-white font-bold uppercase tracking-wider">{post.cat}</span>
                <span className="text-mono-600">•</span>
                <span className="text-mono-500">{post.date}</span>
              </div>

              {/* CONTENT */}
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-mono-300 transition-colors">
                {post.title}
              </h3>
              <p className="text-mono-400 leading-relaxed">{post.summary}</p>

              {/* LINK — показуємо тільки якщо пост справді кудись веде */}
              {hasArticle && (
                <a
                  href={post.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-6 text-white font-bold border-b border-white pb-0.5 hover:text-mono-300 hover:border-mono-300 transition-colors"
                >
                  Read Article
                </a>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
