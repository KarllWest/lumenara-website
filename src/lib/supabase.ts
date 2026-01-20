// Файл: src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// Читаємо змінні з .env файлу
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Перевірка, чи ключі існують (щоб не шукати помилку годинами, якщо забув створити .env)
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables! Check your .env file.');
}

// Створюємо та експортуємо клієнт, який будемо використовувати на інших сторінках
export const supabase = createClient(supabaseUrl, supabaseKey);