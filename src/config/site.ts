// ЄДИНЕ МІСЦЕ для контактів, соцмереж і цифр студії.
// Коли зʼявляться реальні дані — міняти тільки тут, по сайту підхопиться саме.

export const CONTACT_EMAIL = 'ariel@femy-walsh.com';

/**
 * Соцмережі. Щоб додати посилання — встав URL у href.
 * Якщо href === null, іконка/рядок просто не показується.
 */
export interface SocialLink {
  id: 'twitter' | 'discord' | 'roblox' | 'youtube' | 'github';
  label: string;
  href: string | null;
}

export const SOCIALS: SocialLink[] = [
  { id: 'twitter', label: 'Twitter / X', href: null },
  { id: 'discord', label: 'Discord', href: null },
  { id: 'roblox', label: 'Roblox Group', href: null },
  { id: 'youtube', label: 'YouTube', href: null },
];

/**
 * Метрики студії на головній.
 * УВАГА: поки що це заглушки — замінити на реальні перед публічним запуском.
 * Якщо масив порожній, секція метрик на головній не рендериться взагалі.
 */
export interface StudioStat {
  id: string;
  label: string;
  value: string;
}

export const STUDIO_STATS: StudioStat[] = [
  { id: 'visits', label: 'Total Visits', value: '500M+' },
  { id: 'peak', label: 'Peak Players', value: '125K' },
  { id: 'rating', label: 'Avg Rating', value: '94%' },
  { id: 'community', label: 'Community', value: '2M+' },
];
