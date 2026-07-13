import { useState, useEffect, useRef } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const CATEGORIES = [
  { value: 'general', label: 'General' },
  { value: 'faq', label: 'FAQ' },
  { value: 'about_us', label: 'About Us' },
  { value: 'founder', label: 'Founder Information' },
  { value: 'team', label: 'Team Information' },
  { value: 'product', label: 'Products' },
  { value: 'service', label: 'Services' },
  { value: 'contact', label: 'Contact Details' },
  { value: 'policy', label: 'Policies' },
  { value: 'note', label: 'Custom Notes' },
];

type Entry = {
  id: string;
  title: string;
  content: string;
  category: string;
  source_type: string;
  file_name: string | null;
  created_at: string;
};

function useAuth() {
  const token = localStorage.getItem('admin_token');
  return { token };
}

export default function KnowledgeBase() {
  const { token } = useAuth();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', content: '', category: 'general' });
  const [saving, setSaving] = useState(false);
  const [uploadCategory, setUploadCategory] = useState('general');
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [viewEntry, setViewEntry] = useState<Entry | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const LIMIT = 15;

  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const catParam = filterCategory !== 'all' ? `&category=${filterCategory}` : '';
      const r = await fetch(`${API}/knowledge/entries?page=${page}&limit=${LIMIT}${catParam}`, { headers });
      const d = await r.json();
      if (d.success) { setEntries(d.data.entries); setTotal(d.data.total); }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEntries(); }, [page, filterCategory]);

  const handleCreate = async () => {
    if (!form.title.trim() || !form.content.trim()) return;
    setSaving(true);
    try {
      const r = await fetch(`${API}/knowledge/entries`, {
        method: 'POST', headers, body: JSON.stringify(form)
      });
      const d = await r.json();
      if (d.success) { setShowForm(false); setForm({ title: '', content: '', category: 'general' }); fetchEntries(); }
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    await fetch(`${API}/knowledge/entries/${id}`, { method: 'DELETE', headers });
    setDeleteId(null);
    fetchEntries();
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadStatus(null);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('category', uploadCategory);
      const r = await fetch(`${API}/knowledge/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd
      });
      const d = await r.json();
      if (d.success) {
        setUploadStatus({ type: 'success', msg: d.message });
        fetchEntries();
      } else {
        setUploadStatus({ type: 'error', msg: d.error || 'Upload failed.' });
      }
    } catch (err) {
      setUploadStatus({ type: 'error', msg: 'Network error during upload.' });
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <AdminLayout>
      <div className="text-white">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <i className="ri-brain-line text-cyan-400"></i> AI Knowledge Base
            </h1>
            <p className="text-white/60 mt-1 text-sm">Manage documents, FAQs, and company knowledge used by the AI chatbot.</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-lg font-medium transition-all"
          >
            <i className="ri-add-line"></i> Add Knowledge
          </button>
        </div>

        {/* Upload Section */}
        <div className="bg-[#1a1a2e] border border-cyan-500/20 rounded-xl p-5 mb-6">
          <h2 className="text-white font-semibold mb-3 flex items-center gap-2">
            <i className="ri-upload-cloud-line text-cyan-400"></i> Upload Document
          </h2>
          <p className="text-white/50 text-sm mb-4">Supported: PDF, DOCX, TXT, CSV, XLSX, MD (max 15MB)</p>
          <div className="flex flex-wrap gap-3 items-center">
            <select
              value={uploadCategory}
              onChange={e => setUploadCategory(e.target.value)}
              className="bg-[#12122a] border border-cyan-500/30 text-white rounded-lg px-3 py-2 text-sm"
            >
              {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
            <label className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-all ${uploading ? 'opacity-60 cursor-not-allowed border-gray-600 text-gray-400' : 'border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10'}`}>
              {uploading ? <><i className="ri-loader-4-line animate-spin"></i> Uploading...</> : <><i className="ri-file-upload-line"></i> Choose File</>}
              <input ref={fileRef} type="file" className="hidden" accept=".pdf,.docx,.txt,.csv,.xlsx,.xls,.md" onChange={handleUpload} disabled={uploading} />
            </label>
          </div>
          {uploadStatus && (
            <div className={`mt-3 text-sm px-3 py-2 rounded-lg ${uploadStatus.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/30' : 'bg-red-500/10 text-red-400 border border-red-500/30'}`}>
              {uploadStatus.type === 'success' ? '✅' : '❌'} {uploadStatus.msg}
            </div>
          )}
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[{ value: 'all', label: 'All' }, ...CATEGORIES].map(c => (
            <button
              key={c.value}
              onClick={() => { setFilterCategory(c.value); setPage(1); }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${filterCategory === c.value ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' : 'bg-[#1a1a2e] text-white/60 border border-white/10 hover:text-white'}`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-[#1a1a2e] border border-cyan-500/20 rounded-xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-40 text-white/50"><i className="ri-loader-4-line animate-spin mr-2"></i>Loading entries...</div>
          ) : entries.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-white/50">
              <i className="ri-book-line text-4xl mb-2"></i>
              <p>No knowledge entries yet. Add your first entry above.</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead><tr className="border-b border-cyan-500/20 text-left">
                <th className="px-4 py-3 text-white/60 font-semibold">Title</th>
                <th className="px-4 py-3 text-white/60 font-semibold">Category</th>
                <th className="px-4 py-3 text-white/60 font-semibold">Type</th>
                <th className="px-4 py-3 text-white/60 font-semibold">Added</th>
                <th className="px-4 py-3 text-white/60 font-semibold">Actions</th>
              </tr></thead>
              <tbody>
                {entries.map((entry, i) => (
                  <tr key={entry.id} className={`border-b border-white/5 hover:bg-white/5 transition-colors ${i % 2 === 0 ? '' : 'bg-white/[0.02]'}`}>
                    <td className="px-4 py-3 text-white font-medium max-w-xs truncate">{entry.title}</td>
                    <td className="px-4 py-3"><span className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded-full text-xs">{entry.category}</span></td>
                    <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs ${entry.source_type === 'file' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'}`}>{entry.source_type === 'file' ? '📄 File' : '✏️ Manual'}</span></td>
                    <td className="px-4 py-3 text-white/50">{new Date(entry.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3 flex gap-2">
                      <button onClick={() => setViewEntry(entry)} className="p-1.5 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-white/60 hover:text-cyan-400 transition-colors"><i className="ri-eye-line"></i></button>
                      <button onClick={() => setDeleteId(entry.id)} className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-colors"><i className="ri-delete-bin-line"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${page === p ? 'bg-cyan-500 text-white' : 'bg-[#1a1a2e] text-white/60 hover:text-white'}`}
              >{p}</button>
            ))}
          </div>
        )}

        {/* Add Entry Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#1a1a2e] border border-cyan-500/30 rounded-2xl p-6 w-full max-w-lg shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-bold text-lg">Add Knowledge Entry</h2>
                <button onClick={() => setShowForm(false)} className="text-white/50 hover:text-white"><i className="ri-close-line text-xl"></i></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-white/70 text-sm block mb-1">Title *</label>
                  <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Company Overview" className="w-full bg-[#12122a] border border-cyan-500/30 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-400" />
                </div>
                <div>
                  <label className="text-white/70 text-sm block mb-1">Category *</label>
                  <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="w-full bg-[#12122a] border border-cyan-500/30 text-white rounded-lg px-3 py-2 text-sm">
                    {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-white/70 text-sm block mb-1">Content *</label>
                  <textarea value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} rows={6} placeholder="Enter knowledge content..." className="w-full bg-[#12122a] border border-cyan-500/30 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-400 resize-none" />
                </div>
                <div className="flex gap-3 justify-end pt-2">
                  <button onClick={() => setShowForm(false)} className="px-4 py-2 text-white/60 hover:text-white transition-colors">Cancel</button>
                  <button onClick={handleCreate} disabled={saving} className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-lg font-medium transition-all disabled:opacity-60">
                    {saving ? 'Saving...' : 'Save Entry'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View Entry Modal */}
        {viewEntry && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#1a1a2e] border border-cyan-500/30 rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[80vh] flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-bold text-lg truncate">{viewEntry.title}</h2>
                <button onClick={() => setViewEntry(null)} className="text-white/50 hover:text-white ml-2"><i className="ri-close-line text-xl"></i></button>
              </div>
              <div className="flex gap-2 mb-3">
                <span className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded-full text-xs">{viewEntry.category}</span>
                <span className="px-2 py-0.5 bg-purple-500/10 text-purple-400 rounded-full text-xs">{viewEntry.source_type}</span>
              </div>
              <div className="flex-1 overflow-y-auto bg-[#12122a] rounded-lg p-4 text-white/80 text-sm leading-relaxed whitespace-pre-wrap">
                {viewEntry.content}
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirm Modal */}
        {deleteId && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#1a1a2e] border border-red-500/30 rounded-2xl p-6 w-full max-w-md shadow-2xl">
              <h2 className="text-white font-bold text-lg mb-2">Confirm Delete</h2>
              <p className="text-white/60 text-sm mb-5">This will permanently remove this knowledge entry and its embedding. The chatbot will no longer use this information.</p>
              <div className="flex gap-3 justify-end">
                <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-white/60 hover:text-white transition-colors">Cancel</button>
                <button onClick={() => handleDelete(deleteId)} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all">Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
