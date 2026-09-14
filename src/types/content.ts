// Спільні типи для контенту, який редагується через адмінку (таблиці Supabase).

export type GameStatus = 'LIVE' | 'IN DEV';

export interface Game {
  id: number;
  title: string;
  genre: string;
  status: GameStatus | string;
  statusStyle: string;
  desc: string;
  image: string;
  link: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  img: string;
}

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  cat: string;
  summary: string;
  link: string;
}

// Стилі бейджа статусу гри тримаємо в одному місці,
// щоб адмінка і публічні сторінки не розходились.
export const STATUS_STYLES: Record<string, string> = {
  LIVE: 'bg-white text-black font-bold border border-white',
  'IN DEV': 'bg-black/40 backdrop-blur-md border border-white/20 text-white font-medium',
};

export function statusStyleFor(status: string): string {
  return STATUS_STYLES[status] ?? STATUS_STYLES['IN DEV'];
}
