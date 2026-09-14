import { Loader2, AlertTriangle, Inbox } from 'lucide-react';

interface Props {
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
  emptyText?: string;
}

/**
 * Один вигляд для трьох станів списку: завантаження, помилка, порожньо.
 * Повертає null, коли є що показувати — тоді сторінка рендерить свій контент.
 */
export default function ContentState({ loading, error, isEmpty, emptyText = 'Nothing here yet.' }: Props) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-mono-400">
        <Loader2 className="w-8 h-8 animate-spin mb-4" />
        <span className="text-sm uppercase tracking-widest font-bold">Loading</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto text-center py-24">
        <AlertTriangle className="w-8 h-8 text-mono-400 mx-auto mb-4" />
        <h3 className="text-white font-bold mb-2">Couldn't load this content</h3>
        <p className="text-mono-500 text-sm">{error}</p>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="max-w-md mx-auto text-center py-24">
        <Inbox className="w-8 h-8 text-mono-500 mx-auto mb-4" />
        <p className="text-mono-400">{emptyText}</p>
      </div>
    );
  }

  return null;
}
