import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Trash2, Plus, Save, Pencil, X } from 'lucide-react';

const INITIAL_STATE = { title: '', genre: '', status: 'IN DEV', desc: '', image: '', link: '#' };

export default function AdminGames() {
  const [data, setData] = useState<any[]>([]);
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    const { data } = await supabase.from('games').select('*').order('id', { ascending: true });
    if (data) setData(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let statusStyle = "bg-black/40 backdrop-blur-md border border-white/20 text-white font-medium";
    if (formData.status === 'LIVE') statusStyle = "bg-white text-black font-bold border border-white";
    
    const payload = { ...formData, statusStyle };

    if (editingId) {
      await supabase.from('games').update(payload).eq('id', editingId);
    } else {
      await supabase.from('games').insert([payload]);
    }
    fetchData();
    resetForm();
  }

  function handleEdit(item: any) {
    setFormData(item);
    setEditingId(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function resetForm() {
    setFormData(INITIAL_STATE);
    setEditingId(null);
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this game?')) return;
    await supabase.from('games').delete().eq('id', id);
    fetchData();
  }

  return (
    <div className="space-y-12">
      <div className="bg-mono-900 p-8 rounded-2xl border border-mono-800 shadow-2xl relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
            {editingId ? <><Pencil className="w-6 h-6" /> Edit Game</> : <><Plus className="w-6 h-6" /> Add Game</>}
          </h2>
          {editingId && <button onClick={resetForm} className="text-mono-400 hover:text-white flex gap-1"><X className="w-4 h-4" /> Cancel</button>}
        </div>
        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-6">
            <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="bg-mono-950 border border-mono-800 rounded-lg p-3 text-white focus:border-white outline-none" placeholder="Title" required />
            <input value={formData.genre} onChange={e => setFormData({...formData, genre: e.target.value})} className="bg-mono-950 border border-mono-800 rounded-lg p-3 text-white focus:border-white outline-none" placeholder="Genre" required />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="bg-mono-950 border border-mono-800 rounded-lg p-3 text-white focus:border-white outline-none">
              <option value="IN DEV">IN DEV</option>
              <option value="LIVE">LIVE</option>
            </select>
            <input value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="bg-mono-950 border border-mono-800 rounded-lg p-3 text-white focus:border-white outline-none" placeholder="Image Path" />
          </div>
          <textarea value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} className="bg-mono-950 border border-mono-800 rounded-lg p-3 text-white focus:border-white outline-none" rows={3} placeholder="Description" required />
          <input value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} className="bg-mono-950 border border-mono-800 rounded-lg p-3 text-white focus:border-white outline-none" placeholder="Link URL" />
          <button type="submit" className="bg-white text-black font-bold py-3 rounded-lg hover:bg-mono-200 transition-colors flex justify-center gap-2"><Save className="w-5 h-5" /> Save</button>
        </form>
      </div>

      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.id} className="flex justify-between items-center bg-mono-900 p-4 rounded-xl border border-mono-800">
            <div className="flex items-center gap-4">
              <img src={item.image || '/favicon.svg'} className="w-12 h-12 rounded object-cover bg-mono-950" />
              <div><h3 className="font-bold text-white">{item.title}</h3><p className="text-xs text-mono-400">{item.status}</p></div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(item)} className="p-2 bg-mono-800 text-white rounded hover:bg-white hover:text-black"><Pencil className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(item.id)} className="p-2 bg-mono-800 text-red-500 rounded hover:bg-red-900/30"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}