import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';
import { Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ProtectedRoute() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Перевіряємо, чи є активна сесія зараз
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    // 2. Слухаємо зміни (наприклад, якщо вийшов з системи)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-mono-950 flex flex-col items-center justify-center text-mono-400">
        <Loader2 className="w-8 h-8 animate-spin mb-4" />
        <span className="text-sm uppercase tracking-widest font-bold">Checking access</span>
      </div>
    );
  }

  // Якщо сесії немає — перекидаємо на логін
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // Якщо все ок — показуємо контент (Адмінку)
  return <Outlet />;
}
