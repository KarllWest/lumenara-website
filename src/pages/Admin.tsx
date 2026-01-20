import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { LogOut, Gamepad2, Users, FileText } from 'lucide-react';

// Імпортуємо наші нові компоненти
import AdminGames from '../components/admin/AdminGames';
import AdminTeam from '../components/admin/AdminTeam';
import AdminBlog from '../components/admin/AdminBlog';

export default function Admin() {
  const [activeTab, setActiveTab] = useState<'games' | 'team' | 'blog'>('games');
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/login');
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 bg-mono-950 text-white">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <h1 className="text-4xl font-black tracking-tight">Studio Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-900/20 text-red-500 px-4 py-2 rounded-lg hover:bg-red-900/40 transition-colors font-bold text-sm"
          >
            <LogOut className="w-4 h-4" /> Log Out
          </button>
        </div>

        {/* НАВІГАЦІЯ ПО ВКЛАДКАХ */}
        <div className="flex gap-2 p-1 bg-mono-900/50 rounded-xl border border-mono-800 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('games')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-bold transition-all ${
              activeTab === 'games' ? 'bg-white text-black shadow-lg' : 'text-mono-400 hover:text-white hover:bg-mono-800'
            }`}
          >
            <Gamepad2 className="w-5 h-5" /> Games
          </button>
          
          <button
            onClick={() => setActiveTab('team')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-bold transition-all ${
              activeTab === 'team' ? 'bg-white text-black shadow-lg' : 'text-mono-400 hover:text-white hover:bg-mono-800'
            }`}
          >
            <Users className="w-5 h-5" /> Team
          </button>
          
          <button
            onClick={() => setActiveTab('blog')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-bold transition-all ${
              activeTab === 'blog' ? 'bg-white text-black shadow-lg' : 'text-mono-400 hover:text-white hover:bg-mono-800'
            }`}
          >
            <FileText className="w-5 h-5" /> Blog
          </button>
        </div>

        {/* КОНТЕНТ (РЕНДЕРИТЬСЯ ЗАЛЕЖНО ВІД ТАБУ) */}
        <div className="transition-all duration-300">
          {activeTab === 'games' && <AdminGames />}
          {activeTab === 'team' && <AdminTeam />}
          {activeTab === 'blog' && <AdminBlog />}
        </div>

      </div>
    </div>
  );
}