import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-mono-950 flex flex-col items-center justify-center px-4 text-center">
      <span className="text-8xl md:text-9xl font-black text-white tracking-tighter">404</span>
      <h1 className="text-2xl font-bold text-white mt-4 mb-3">This page went dark.</h1>
      <p className="text-mono-400 max-w-md mb-8">
        The page you're looking for doesn't exist, or it moved somewhere else.
      </p>
      <Link
        to="/"
        className="flex items-center gap-2 bg-white text-mono-950 px-6 py-3 rounded-full font-bold hover:bg-mono-200 transition-colors"
      >
        <Home className="w-4 h-4" /> Back to Home
      </Link>
    </div>
  );
}
