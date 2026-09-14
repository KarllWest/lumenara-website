import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Trash2, Plus, Save, Pencil, X } from 'lucide-react';
import { statusStyleFor, type Game } from '../../types/content';
import { useSupabaseList } from '../../hooks/useSupabaseList';

type GameForm = Omit<Game, 'id' | 'statusStyle'>;

const INITIAL_STATE: GameForm = { title: '', genre: '', status: 'IN DEV', desc: '', image: '', link: '#', trailer: '' };

export default function AdminGames() {
  const { data, reload, error: loadError } = useSupabaseList<Game>('games');
  const [formData, setFormData] = useState<GameForm>(INITIAL_STATE);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaveError(null);

    const payload = { ...formData, statusStyle: statusStyleFor(formData.status) };

    const { error: err } = editingId
      ? await supabase.from('games').update(payload).eq('id', editingId)
      : await supabase.from('games').insert([payload]);

    setSaving(false);
    if (err) { setSaveError(err.message); return; }

    await reload();
    resetForm();
  }

  function handleEdit(item: Game) {
    setFormData({
      title: item.title,
      genre: item.genre,
      status: item.status,
      desc: item.desc,
      image: item.image,
      link: item.link,
      trailer: item.trailer ?? '',
    });
    setEditingId(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function resetForm() {
    setFormData(INITIAL_STATE);
    setEditingId(null);
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this game?')) return;
    const { error: err } = await supabase.from('games').delete().eq('id', id);
    if (err) { setSaveError(err.message); return; }
    if (editingId === id) resetForm();
    await reload();
  }

  const inputClass = 'bg-mono-950 border border-mono-800 rounded-lg p-3 text-white focus:border-white outline-none';

  return (
    <div className="space-y-12">
      <div className="bg-mono-900 p-8 rounded-2xl border border-mono-800 shadow-2xl relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
            {editingId ? <><Pencil className="w-6 h-6" /> Edit Game</> : <><Plus className="w-6 h-6" /> Add Game</>}
          </h2>
          {editingId && <button onClick={resetForm} className="text-mono-400 hover:text-white flex gap-1"><X className="w-4 h-4" /> Cancel</button>}
        </div>

        {(saveError || loadError) && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm mb-6">{saveError || loadError}</div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-6">
            <input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className={inputClass} placeholder="Title" required />
            <input value={formData.genre} onChange={e => setFormData({ ...formData, genre: e.target.value })} className={inputClass} placeholder="Genre" required />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className={inputClass}>
              <option value="IN DEV">IN DEV</option>
              <option value="LIVE">LIVE</option>
            </select>
            <input value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className={inputClass} placeholder="Image Path (e.g. /images/greybox.png)" />
          </div>
          <textarea value={formData.desc} onChange={e => setFormData({ ...formData, desc: e.target.value })} className={inputClass} rows={3} placeholder="Description" required />
          <input value={formData.link} onChange={e => setFormData({ ...formData, link: e.target.value })} className={inputClass} placeholder="Roblox Link (leave # if not released)" />
          <input value={formData.trailer} onChange={e => setFormData({ ...formData, trailer: e.target.value })} className={inputClass} placeholder="Trailer — YouTube URL (optional)" />
          <button type="submit" disabled={saving} className="bg-white text-black font-bold py-3 rounded-lg hover:bg-mono-200 transition-colors flex justify-center gap-2 disabled:opacity-50">
            <Save className="w-5 h-5" /> {saving ? 'Saving...' : 'Save'}
          </button>
        </form>
      </div>

      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.id} className="flex justify-between items-center bg-mono-900 p-4 rounded-xl border border-mono-800">
            <div className="flex items-center gap-4">
              <img src={item.image || '/favicon.svg'} alt="" className="w-12 h-12 rounded object-cover bg-mono-950" />
              <div><h3 className="font-bold text-white">{item.title}</h3><p className="text-xs text-mono-400">{item.status}</p></div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(item)} aria-label={`Edit ${item.title}`} className="p-2 bg-mono-800 text-white rounded hover:bg-white hover:text-black"><Pencil className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(item.id)} aria-label={`Delete ${item.title}`} className="p-2 bg-mono-800 text-red-500 rounded hover:bg-red-900/30"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
