import { Link } from 'react-router-dom';

const POSTS = [
  { title: "DevLog #12: Optimizing Physics", date: "Jan 15, 2026", cat: "Engineering", summary: "How we achieved zero-latency ball physics in our latest update." },
  { title: "Partnership Announcement", date: "Jan 10, 2026", cat: "Studio News", summary: "We are excited to announce our collaboration with BigBrand Co." },
  { title: "Patch Notes v2.1.0", date: "Dec 22, 2025", cat: "Update", summary: "Winter event is live! Check out the new skins and maps." },
];

export default function Blog() {
  return (
    <div className="min-h-screen pb-20 bg-mono-950">
      
      {/* HEADER */}
      <div className="pt-32 pb-16 px-4 text-center">
        <h1 className="text-5xl font-black text-white mb-4 uppercase tracking-tight">Studio Blog</h1>
        <p className="text-mono-400 text-xl">Insights, updates, and stories from development.</p>
      </div>

      {/* POSTS LIST */}
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        {POSTS.map((post, idx) => (
          <div key={idx} className="group bg-mono-900 p-8 rounded-2xl border border-mono-800 hover:border-white/40 transition-all duration-300">
            
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
            <p className="text-mono-400 mb-6 leading-relaxed">{post.summary}</p>
            
            {/* LINK */}
            <Link to="#" className="text-white font-bold border-b border-white pb-0.5 hover:text-mono-300 hover:border-mono-300 transition-colors">
              Read Article
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}