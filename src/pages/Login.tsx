import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Lock } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  // Якщо вже залогінений — не показуємо форму вдруге.
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate('/admin', { replace: true });
    });
  }, [navigate]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      // Успішний вхід -> перекидаємо в адмінку
      navigate('/admin', { replace: true });
    }
  }

  return (
    <div className="min-h-screen bg-mono-950 flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full bg-mono-900 p-8 rounded-2xl border border-mono-800 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-mono-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Studio Access</h1>
          <p className="text-mono-400 text-sm mt-2">Authorized personnel only.</p>
        </div>

        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm mb-6 text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="login-email" className="block text-sm font-bold text-mono-400 mb-2">Email</label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-mono-950 border border-mono-800 rounded-lg p-3 text-white focus:border-white outline-none transition-colors"
              placeholder="admin@lumenara.com"
              required
            />
          </div>

          <div>
            <label htmlFor="login-password" className="block text-sm font-bold text-mono-400 mb-2">Password</label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-mono-950 border border-mono-800 rounded-lg p-3 text-white focus:border-white outline-none transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white hover:bg-mono-200 text-black font-bold py-3 rounded-lg transition-all disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Enter Studio'}
          </button>
        </form>
      </div>
    </div>
  );
}
