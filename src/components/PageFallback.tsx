import { Loader2 } from 'lucide-react';

/** Показується, поки вантажиться lazy-чанк сторінки. */
export default function PageFallback() {
  return (
    <div className="min-h-screen bg-mono-950 flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-mono-500" />
    </div>
  );
}
