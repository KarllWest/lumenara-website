import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Trash2, Plus, Save, Pencil, X } from 'lucide-react';

const INITIAL_STATE = { title: '', date: '', cat: '', summary: '', link: '#' };

export default function AdminBlog() {
  const [data, setData] = useState<any[]>([]);
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    const { data } = await supabase.from('blog').select('*').order('id', { ascending: false }); // Нові пости зверху
    if (data) setData(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editingId) await supabase.from('blog').update(formData).eq('id', editingId);
    else await supabase.from('blog').insert([formData]);
    fetchData(); resetForm();
  }

  function handleEdit(item: any) { setFormData(item); setEditingId(item.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  function resetForm() { setFormData(INITIAL_STATE); setEditingId(null); }
  async function handleDelete(id: number) { if (confirm('Delete?')) { await supabase.from('blog').delete().eq('id', id); fetchData(); } }

  return (
    <div className="space-y-12">
      <div className="bg-mono-900 p-8 rounded-2xl border border-mono-800 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white flex gap-2">{editingId ? <><Pencil/> Edit Post</> : <><Plus/> Add Post</>}</h2>
          {editingId && <button onClick={resetForm} className="text-mono-400"><X/></button>}
        </div>
        <form onSubmit={handleSubmit} className="grid gap-6">
          <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="bg-mono-950 border border-mono-800 rounded-lg p-3 text-white focus:border-white outline-none" placeholder="Title" required />
          <div className="grid md:grid-cols-2 gap-6">
            <input value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="bg-mono-950 border border-mono-800 rounded-lg p-3 text-white focus:border-white outline-none" placeholder="Date (e.g. Jan 15, 2026)" required />
            <input value={formData.cat} onChange={e => setFormData({...formData, cat: e.target.value})} className="bg-mono-950 border border-mono-800 rounded-lg p-3 text-white focus:border-white outline-none" placeholder="Category (e.g. UPDATE)" required />
          </div>
          <textarea value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} className="bg-mono-950 border border-mono-800 rounded-lg p-3 text-white focus:border-white outline-none" rows={3} placeholder="Summary" required />
          <button type="submit" className="bg-white text-black font-bold py-3 rounded-lg hover:bg-mono-200 flex justify-center gap-2"><Save className="w-5 h-5"/> Save Post</button>
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
              <button onClick={() => handleEdit(item)} className="p-2 bg-mono-800 text-white rounded hover:bg-white hover:text-black"><Pencil className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(item.id)} className="p-2 bg-mono-800 text-red-500 rounded hover:bg-red-900/30"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}