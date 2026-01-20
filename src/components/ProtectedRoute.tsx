import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function ProtectedRoute() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Перевіряємо, чи є активна сесія зараз
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // 2. Слухаємо зміни (наприклад, якщо вийшов з системи)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-mono-950 flex items-center justify-center text-white">Checking access...</div>;
  }

  // Якщо сесії немає — перекидаємо на логін
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // Якщо все ок — показуємо контент (Адмінку)
  return <Outlet />;
}