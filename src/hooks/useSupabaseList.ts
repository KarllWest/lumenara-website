import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Options {
  /** Колонка сортування (за замовчуванням 'id'). */
  orderBy?: string;
  ascending?: boolean;
}

interface Result<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
}

/**
 * Завантажує таблицю з Supabase з коректною обробкою помилок.
 * Використовується і на публічних сторінках, і в адмінці.
 */
export function useSupabaseList<T>(table: string, options: Options = {}): Result<T> {
  const { orderBy = 'id', ascending = true } = options;

  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data: rows, error: err } = await supabase
      .from(table)
      .select('*')
      .order(orderBy, { ascending });

    if (err) {
      setError(err.message);
      setData([]);
    } else {
      setError(null);
      setData((rows ?? []) as T[]);
    }
    setLoading(false);
  }

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { data: rows, error: err } = await supabase
        .from(table)
        .select('*')
        .order(orderBy, { ascending });

      if (cancelled) return;

      if (err) {
        setError(err.message);
        setData([]);
      } else {
        setError(null);
        setData((rows ?? []) as T[]);
      }
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [table, orderBy, ascending]);

  return { data, loading, error, reload: load };
}
