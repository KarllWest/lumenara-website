import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Trash2, Plus, Save, Pencil, X } from 'lucide-react';
import type { TeamMember } from '../../types/content';
import { useSupabaseList } from '../../hooks/useSupabaseList';

type TeamForm = Omit<TeamMember, 'id'>;

const INITIAL_STATE: TeamForm = { name: '', role: '', bio: '', img: '' };

export default function AdminTeam() {
  const { data, reload, error: loadError } = useSupabaseList<TeamMember>('team');
  const [formData, setFormData] = useState<TeamForm>(INITIAL_STATE);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaveError(null);

    const { error: err } = editingId
      ? await supabase.from('team').update(formData).eq('id', editingId)
      : await supabase.from('team').insert([formData]);

    setSaving(false);
    if (err) { setSaveError(err.message); return; }

    await reload();
    resetForm();
  }

  function handleEdit(item: TeamMember) {
    setFormData({ name: item.name, role: item.role, bio: item.bio, img: item.img });
    setEditingId(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function resetForm() {
    setFormData(INITIAL_STATE);
    setEditingId(null);
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this team member?')) return;
    const { error: err } = await supabase.from('team').delete().eq('id', id);
    if (err) { setSaveError(err.message); return; }
    if (editingId === id) resetForm();
    await reload();
  }

  const inputClass = 'bg-mono-950 border border-mono-800 rounded-lg p-3 text-white focus:border-white outline-none';

  return (
    <div className="space-y-12">
      <div className="bg-mono-900 p-8 rounded-2xl border border-mono-800 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white flex gap-2">
            {editingId ? <><Pencil /> Edit Member</> : <><Plus /> Add Member</>}
          </h2>
          {editingId && <button onClick={resetForm} aria-label="Cancel editing" className="text-mono-400 hover:text-white"><X /></button>}
        </div>

        {(saveError || loadError) && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm mb-6">{saveError || loadError}</div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-6">
            <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className={inputClass} placeholder="Name (e.g. Alex V.)" required />
            <input value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} className={inputClass} placeholder="Role (e.g. Lead Animator)" required />
          </div>
          <input value={formData.img} onChange={e => setFormData({ ...formData, img: e.target.value })} className={inputClass} placeholder="Image URL" />
          <textarea value={formData.bio} onChange={e => setFormData({ ...formData, bio: e.target.value })} className={inputClass} rows={2} placeholder="Bio" required />
          <button type="submit" disabled={saving} className="bg-white text-black font-bold py-3 rounded-lg hover:bg-mono-200 flex justify-center gap-2 disabled:opacity-50">
            <Save className="w-5 h-5" /> {saving ? 'Saving...' : 'Save Member'}
          </button>
        </form>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {data.map((item) => (
          <div key={item.id} className="flex items-center gap-4 bg-mono-900 p-4 rounded-xl border border-mono-800">
            <img src={item.img || '/favicon.svg'} alt="" className="w-16 h-16 rounded-full object-cover border border-mono-700" />
            <div className="flex-grow">
              <h3 className="font-bold text-white">{item.name}</h3>
              <p className="text-xs text-mono-400 uppercase">{item.role}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(item)} aria-label={`Edit ${item.name}`} className="p-2 bg-mono-800 text-white rounded hover:bg-white hover:text-black"><Pencil className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(item.id)} aria-label={`Delete ${item.name}`} className="p-2 bg-mono-800 text-red-500 rounded hover:bg-red-900/30"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
