import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

type UnresolvedQuestion = {
  id: string;
  question: string;
  asked_count: number;
  resolved: boolean;
  resolved_at: string | null;
  resolution_kb_entry_id: string | null;
  created_at: string;
};

export default function KnowledgeReview() {
  const token = localStorage.getItem('admin_token');
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  const [questions, setQuestions] = useState<UnresolvedQuestion[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<'all' | 'unresolved' | 'resolved'>('unresolved');
  const [loading, setLoading] = useState(true);
  const [resolveModal, setResolveModal] = useState<UnresolvedQuestion | null>(null);
  const [resolutionContent, setResolutionContent] = useState('');
  const [resolutionTitle, setResolutionTitle] = useState('');
  const [resolutionCategory, setResolutionCategory] = useState('general');
  const [saving, setSaving] = useState(false);
  const LIMIT = 20;

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const resolvedParam = filter === 'all' ? '' : `&resolved=${filter === 'resolved'}`;
      const r = await fetch(`${API}/knowledge/unanswered?page=${page}&limit=${LIMIT}${resolvedParam}`, { headers });
      const d = await r.json();
      if (d.success) { setQuestions(d.data.questions); setTotal(d.data.total); }
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchQuestions(); }, [page, filter]);

  const handleOpenResolve = (q: UnresolvedQuestion) => {
    setResolveModal(q);
    setResolutionTitle(`Answer to: ${q.question.substring(0, 50)}`);
    setResolutionContent('');
    setResolutionCategory('general');
  };

  const handleResolve = async () => {
    if (!resolveModal || !resolutionContent.trim()) return;
    setSaving(true);
    try {
      const r = await fetch(`${API}/knowledge/unanswered/${resolveModal.id}/resolve`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          title: resolutionTitle,
          content: resolutionContent,
          category: resolutionCategory,
        }),
      });
      const d = await r.json();
      if (d.success) {
        setResolveModal(null);
        fetchQuestions();
      }
    } finally { setSaving(false); }
  };

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <AdminLayout>
      <div className="text-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <i className="ri-question-line text-orange-400"></i> Knowledge Review
            </h1>
            <p className="text-white/60 text-sm mt-1">Review questions the chatbot couldn't answer and add knowledge to resolve them.</p>
          </div>
          <div className="flex items-center gap-2 bg-[#1a1a2e] border border-orange-500/20 rounded-lg p-1">
            {(['unresolved', 'resolved', 'all'] as const).map(f => (
              <button key={f} onClick={() => { setFilter(f); setPage(1); }}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all capitalize ${filter === f ? 'bg-orange-500/20 text-orange-400' : 'text-white/50 hover:text-white'}`}
              >{f}</button>
            ))}
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl px-5 py-4 mb-6 flex items-start gap-3">
          <i className="ri-information-line text-orange-400 text-xl mt-0.5 shrink-0"></i>
          <div>
            <p className="text-orange-300 font-medium text-sm">How this works</p>
            <p className="text-white/60 text-sm mt-1">When users ask questions the chatbot can't match with sufficient confidence, they are logged here. Add knowledge entries to resolve them — the chatbot will immediately learn from your additions.</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#1a1a2e] border border-orange-500/20 rounded-xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-32 text-white/40"><i className="ri-loader-4-line animate-spin mr-2"></i>Loading...</div>
          ) : questions.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-white/40">
              <i className="ri-check-double-line text-5xl mb-3 text-green-400"></i>
              <p className="font-medium text-green-400">All caught up!</p>
              <p className="text-sm mt-1">No {filter !== 'all' ? filter : ''} questions found.</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead><tr className="border-b border-orange-500/20 text-left">
                <th className="px-4 py-3 text-white/50 font-semibold">Question</th>
                <th className="px-4 py-3 text-white/50 font-semibold">Asked</th>
                <th className="px-4 py-3 text-white/50 font-semibold">First Seen</th>
                <th className="px-4 py-3 text-white/50 font-semibold">Status</th>
                <th className="px-4 py-3 text-white/50 font-semibold">Action</th>
              </tr></thead>
              <tbody>
                {questions.map((q, i) => (
                  <tr key={q.id} className={`border-b border-white/5 hover:bg-white/5 ${i % 2 === 0 ? '' : 'bg-white/[0.02]'}`}>
                    <td className="px-4 py-3 text-white/80 max-w-sm">{q.question}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${q.asked_count >= 5 ? 'bg-red-500/20 text-red-400' : q.asked_count >= 2 ? 'bg-orange-500/20 text-orange-400' : 'bg-white/10 text-white/60'}`}>
                        {q.asked_count}×
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white/50 text-xs">{new Date(q.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      {q.resolved ? (
                        <span className="px-2 py-0.5 bg-green-500/10 text-green-400 rounded-full text-xs font-medium">✓ Resolved</span>
                      ) : (
                        <span className="px-2 py-0.5 bg-orange-500/10 text-orange-400 rounded-full text-xs font-medium animate-pulse">⚠ Pending</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {!q.resolved && (
                        <button
                          onClick={() => handleOpenResolve(q)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-orange-500/20 text-orange-400 border border-orange-500/30 hover:bg-orange-500/30 rounded-lg text-xs font-medium transition-all"
                        >
                          <i className="ri-add-circle-line"></i> Add Answer
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 p-4 border-t border-orange-500/10">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1 rounded bg-[#12122a] text-white/60 hover:text-white disabled:opacity-40">‹</button>
              <span className="px-3 py-1 text-white/60 text-sm">Page {page} / {totalPages}</span>
              <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="px-3 py-1 rounded bg-[#12122a] text-white/60 hover:text-white disabled:opacity-40">›</button>
            </div>
          )}
        </div>

        {/* Resolve Modal */}
        {resolveModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#1a1a2e] border border-orange-500/30 rounded-2xl p-6 w-full max-w-lg shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-bold text-lg">Resolve Question</h2>
                <button onClick={() => setResolveModal(null)} className="text-white/50 hover:text-white"><i className="ri-close-line text-xl"></i></button>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 mb-4">
                <p className="text-white/50 text-xs mb-1">User's question:</p>
                <p className="text-orange-300 text-sm">"{resolveModal.question}"</p>
              </div>
              <p className="text-white/60 text-xs mb-4">Adding this knowledge will immediately allow the chatbot to answer this type of question.</p>
              <div className="space-y-3">
                <div>
                  <label className="text-white/70 text-sm block mb-1">Entry Title *</label>
                  <input value={resolutionTitle} onChange={e => setResolutionTitle(e.target.value)} className="w-full bg-[#12122a] border border-orange-500/30 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400" />
                </div>
                <div>
                  <label className="text-white/70 text-sm block mb-1">Category</label>
                  <select value={resolutionCategory} onChange={e => setResolutionCategory(e.target.value)} className="w-full bg-[#12122a] border border-orange-500/30 text-white rounded-lg px-3 py-2 text-sm">
                    {['general','faq','about_us','founder','team','product','service','contact','policy','note'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-white/70 text-sm block mb-1">Answer / Knowledge Content *</label>
                  <textarea value={resolutionContent} onChange={e => setResolutionContent(e.target.value)} rows={5} placeholder="Write the answer the chatbot should use..." className="w-full bg-[#12122a] border border-orange-500/30 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400 resize-none" />
                </div>
                <div className="flex gap-3 justify-end pt-2">
                  <button onClick={() => setResolveModal(null)} className="px-4 py-2 text-white/60 hover:text-white transition-colors">Cancel</button>
                  <button onClick={handleResolve} disabled={saving || !resolutionContent.trim()} className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white rounded-lg font-medium transition-all disabled:opacity-60">
                    {saving ? 'Saving...' : 'Add & Resolve'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
