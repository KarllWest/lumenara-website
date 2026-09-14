import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Trash2, Plus, Save, Pencil, X } from 'lucide-react';
import type { BlogPost } from '../../types/content';
import { useSupabaseList } from '../../hooks/useSupabaseList';

type BlogForm = Omit<BlogPost, 'id'>;

const INITIAL_STATE: BlogForm = { title: '', date: '', cat: '', summary: '', link: '#' };

export default function AdminBlog() {
  const { data, reload, error: loadError } = useSupabaseList<BlogPost>('blog', { ascending: false });
  const [formData, setFormData] = useState<BlogForm>(INITIAL_STATE);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaveError(null);

    const { error: err } = editingId
      ? await supabase.from('blog').update(formData).eq('id', editingId)
      : await supabase.from('blog').insert([formData]);

    setSaving(false);
    if (err) { setSaveError(err.message); return; }

    await reload();
    resetForm();
  }

  function handleEdit(item: BlogPost) {
    setFormData({ title: item.title, date: item.date, cat: item.cat, summary: item.summary, link: item.link });
    setEditingId(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function resetForm() {
    setFormData(INITIAL_STATE);
    setEditingId(null);
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this post?')) return;
    const { error: err } = await supabase.from('blog').delete().eq('id', id);
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
            {editingId ? <><Pencil /> Edit Post</> : <><Plus /> Add Post</>}
          </h2>
          {editingId && <button onClick={resetForm} aria-label="Cancel editing" className="text-mono-400 hover:text-white"><X /></button>}
        </div>

        {(saveError || loadError) && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm mb-6">{saveError || loadError}</div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-6">
          <input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className={inputClass} placeholder="Title" required />
          <div className="grid md:grid-cols-2 gap-6">
            <input value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className={inputClass} placeholder="Date (e.g. Jan 15, 2026)" required />
            <input value={formData.cat} onChange={e => setFormData({ ...formData, cat: e.target.value })} className={inputClass} placeholder="Category (e.g. UPDATE)" required />
          </div>
          <textarea value={formData.summary} onChange={e => setFormData({ ...formData, summary: e.target.value })} className={inputClass} rows={3} placeholder="Summary" required />
          <input value={formData.link} onChange={e => setFormData({ ...formData, link: e.target.value })} className={inputClass} placeholder="Article URL (leave # if none)" />
          <button type="submit" disabled={saving} className="bg-white text-black font-bold py-3 rounded-lg hover:bg-mono-200 flex justify-center gap-2 disabled:opacity-50">
            <Save className="w-5 h-5" /> {saving ? 'Saving...' : 'Save Post'}
          </button>
        </form>
      </div>

      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.id} className="flex justify-between items-center bg-mono-900 p-4 rounded-xl border border-mono-800">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xs font-bold bg-mono-800 px-2 py-1 rounded text-white">{item.cat}</span>
                <span className="text-xs text-mono-500">{item.date}</span>
              </div>
              <h3 className="font-bold text-white">{item.title}</h3>
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
