import { useState, useEffect, useRef } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

type LogEntry = {
  id: string;
  conversation_id: string;
  session_id: string;
  question: string;
  response: string;
  response_time_ms: number;
  page_url: string;
  browser: string;
  device: string;
  is_success: boolean;
  error_message: string | null;
  created_at: string;
};

export default function ChatbotConversations() {
  const token = localStorage.getItem('admin_token');
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  // Logs list state
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'success' | 'failure'>('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sortBy, setSortBy] = useState<'created_at' | 'response_time_ms'>('created_at');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  // Conversation history modal
  const [viewHistoryId, setViewHistoryId] = useState<string | null>(null);
  const [historyLogs, setHistoryLogs] = useState<LogEntry[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Delete modal
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Real-time stream indicator
  const [realtimeStatus, setRealtimeStatus] = useState<'connected' | 'connecting' | 'disconnected'>('disconnected');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const LIMIT = 15;

  // Fetch paginated logs
  const fetchLogs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: LIMIT.toString(),
        search,
        status: statusFilter,
        startDate,
        endDate,
        sortBy,
        sortOrder,
      });
      const r = await fetch(`${API}/analytics/logs?${params.toString()}`, { headers });
      const d = await r.json();
      if (d.success) {
        setLogs(d.data.logs);
        setTotal(d.data.total);
      }
    } catch (err) {
      console.error('Error fetching logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [page, search, statusFilter, startDate, endDate, sortBy, sortOrder]);

  // Real-time updates subscription using Server-Sent Events (SSE)
  useEffect(() => {
    if (!token) return;
    setRealtimeStatus('connecting');
    const sseUrl = `${API}/analytics/realtime-stream?token=${encodeURIComponent(token)}`;
    const eventSource = new EventSource(sseUrl);

    eventSource.onopen = () => {
      setRealtimeStatus('connected');
    };

    eventSource.onmessage = (event) => {
      try {
        const newLog = JSON.parse(event.data) as LogEntry;
        // Verify if the new log matches the current filters before adding
        const matchSearch = !search || 
          newLog.question.toLowerCase().includes(search.toLowerCase()) || 
          newLog.response.toLowerCase().includes(search.toLowerCase()) || 
          newLog.session_id.toLowerCase().includes(search.toLowerCase());
          
        const matchStatus = statusFilter === 'all' || 
          (statusFilter === 'success' && newLog.is_success) || 
          (statusFilter === 'failure' && !newLog.is_success);

        if (matchSearch && matchStatus) {
          // Prepend new real-time message
          setLogs((prev) => [newLog, ...prev.slice(0, LIMIT - 1)]);
          setTotal((prev) => prev + 1);
        }

        // Show real-time browser notification toast
        setToastMessage(`💬 New message from session: ...${newLog.session_id.slice(-6)}`);
        setTimeout(() => setToastMessage(null), 4000);
      } catch (e) {
        console.error('SSE JSON parse error:', e);
      }
    };

    eventSource.onerror = (e) => {
      console.warn('SSE disconnected. Reconnecting...', e);
      setRealtimeStatus('disconnected');
    };

    return () => {
      eventSource.close();
    };
  }, [token, search, statusFilter]);

  // View whole turn-by-turn conversation sequence
  const handleViewHistory = async (id: string) => {
    setViewHistoryId(id);
    setLoadingHistory(true);
    try {
      const r = await fetch(`${API}/analytics/conversations/${id}/history`, { headers });
      const d = await r.json();
      if (d.success) {
        setHistoryLogs(d.data);
      }
    } catch (err) {
      console.error('Error fetching conversation history:', err);
    } finally {
      setLoadingHistory(false);
    }
  };

  // Delete all turns in a conversation
  const handleDeleteConversation = async () => {
    if (!deleteConfirmId) return;
    setDeleting(true);
    try {
      const r = await fetch(`${API}/analytics/conversations/${deleteConfirmId}`, { method: 'DELETE', headers });
      const d = await r.json();
      if (d.success) {
        setDeleteConfirmId(null);
        fetchLogs();
      }
    } finally {
      setDeleting(false);
    }
  };

  // CSV and Excel Export handlers
  const handleExport = (type: 'csv' | 'excel') => {
    const params = new URLSearchParams({
      search,
      status: statusFilter,
      startDate,
      endDate,
    });
    const url = `${API}/analytics/export/${type}?${params.toString()}`;
    const filename = `chatbot-conversations-${Date.now()}.${type === 'csv' ? 'csv' : 'xlsx'}`;

    fetch(url, { headers })
      .then(r => r.blob())
      .then(blob => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.setAttribute('download', filename);
        a.click();
      });
  };

  // PDF Transcript Export handler
  const handleDownloadPDF = (id: string) => {
    const url = `${API}/analytics/conversations/${id}/pdf`;
    const filename = `chatbot-conversation-${id.substring(0, 8)}.pdf`;

    fetch(url, { headers })
      .then(r => {
        if (!r.ok) throw new Error('Failed to generate PDF');
        return r.blob();
      })
      .then(blob => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.setAttribute('download', filename);
        a.click();
      })
      .catch(err => {
        console.error('Error downloading PDF:', err);
        alert('Failed to download PDF. Please verify your backend server is running.');
      });
  };

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <AdminLayout>
      <div className="text-white relative">
        {/* Real-time floating toast */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 bg-gradient-to-r from-cyan-600 to-blue-700 border border-cyan-400 text-white rounded-xl shadow-2xl px-5 py-3 z-50 animate-bounce flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
            <p className="font-semibold text-sm">{toastMessage}</p>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <i className="ri-chat-history-line text-cyan-400"></i> Chatbot Conversations
            </h1>
            <p className="text-white/60 text-sm mt-1">Review complete turn-by-turn visitor dialogues and session statistics in real-time.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {/* Realtime Status badge */}
            <span className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${
              realtimeStatus === 'connected' ? 'bg-green-500/10 text-green-400 border-green-500/30' :
              realtimeStatus === 'connecting' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' :
              'bg-red-500/10 text-red-400 border-red-500/30'
            }`}>
              <span className={`w-2 h-2 rounded-full ${
                realtimeStatus === 'connected' ? 'bg-green-400 animate-pulse' :
                realtimeStatus === 'connecting' ? 'bg-yellow-400 animate-pulse' : 'bg-red-400'
              }`} />
              {realtimeStatus === 'connected' ? 'SSE Real-time Active' : realtimeStatus === 'connecting' ? 'Connecting Stream...' : 'Stream Disconnected'}
            </span>

            {/* Export Buttons */}
            <button onClick={() => handleExport('csv')} className="flex items-center gap-1.5 px-3.5 py-2 bg-[#1a1a2e] hover:bg-cyan-500/10 border border-cyan-500/20 hover:border-cyan-500/40 text-cyan-400 rounded-lg text-sm transition-all">
              <i className="ri-file-text-line"></i> CSV
            </button>
            <button onClick={() => handleExport('excel')} className="flex items-center gap-1.5 px-3.5 py-2 bg-[#1a1a2e] hover:bg-green-500/10 border border-green-500/20 hover:border-green-500/40 text-green-400 rounded-lg text-sm transition-all">
              <i className="ri-file-excel-line"></i> Excel
            </button>
          </div>
        </div>

        {/* Search and Filters row */}
        <div className="bg-[#1a1a2e] border border-cyan-500/20 rounded-xl p-5 mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="md:col-span-2 relative">
              <input
                type="text"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (setSearch(searchInput), setPage(1))}
                placeholder="Search by session ID or keywords..."
                className="w-full bg-[#12122a] border border-cyan-500/30 text-white rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-cyan-400"
              />
              <i className="ri-search-line absolute left-3.5 top-2.5 text-white/40 text-lg"></i>
            </div>
            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={e => { setStatusFilter(e.target.value as any); setPage(1); }}
                className="w-full bg-[#12122a] border border-cyan-500/30 text-white rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:border-cyan-400"
              >
                <option value="all">All Statuses</option>
                <option value="success">Success (✓ OK)</option>
                <option value="failure">Failure (✗ Fail)</option>
              </select>
            </div>
            {/* Sort Selector */}
            <div>
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={e => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field as any);
                  setSortOrder(order as any);
                  setPage(1);
                }}
                className="w-full bg-[#12122a] border border-cyan-500/30 text-white rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:border-cyan-400"
              >
                <option value="created_at-desc">Newest First</option>
                <option value="created_at-asc">Oldest First</option>
                <option value="response_time_ms-desc">Response Time (Slowest)</option>
                <option value="response_time_ms-asc">Response Time (Fastest)</option>
              </select>
            </div>
          </div>

          {/* Date range filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-white/60 text-sm font-medium">Filter by Date:</span>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={startDate}
                onChange={e => { setStartDate(e.target.value); setPage(1); }}
                className="bg-[#12122a] border border-cyan-500/30 text-white rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-cyan-400"
              />
              <span className="text-white/40 text-xs">to</span>
              <input
                type="date"
                value={endDate}
                onChange={e => { setEndDate(e.target.value); setPage(1); }}
                className="bg-[#12122a] border border-cyan-500/30 text-white rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>
            {(startDate || endDate || search || statusFilter !== 'all') && (
              <button
                onClick={() => {
                  setStartDate('');
                  setEndDate('');
                  setSearch('');
                  setSearchInput('');
                  setStatusFilter('all');
                  setPage(1);
                }}
                className="text-xs text-red-400 hover:text-red-300 font-semibold"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Conversations Table */}
        <div className="bg-[#1a1a2e] border border-cyan-500/20 rounded-xl overflow-hidden shadow-xl">
          {loading ? (
            <div className="flex items-center justify-center h-48 text-white/50">
              <i className="ri-loader-4-line animate-spin mr-2 text-xl"></i> Loading conversation logs...
            </div>
          ) : logs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-white/40">
              <i className="ri-inbox-line text-4xl mb-2 text-cyan-500/40"></i>
              <p className="font-semibold text-sm">No matching logs found</p>
              <p className="text-xs mt-1">Try refining your search terms or filters.</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-cyan-500/20 text-left bg-cyan-950/20">
                  <th className="px-5 py-3.5 text-white/60 font-semibold">Date & Time</th>
                  <th className="px-5 py-3.5 text-white/60 font-semibold">Session ID</th>
                  <th className="px-5 py-3.5 text-white/60 font-semibold">User Question</th>
                  <th className="px-5 py-3.5 text-white/60 font-semibold">AI Response</th>
                  <th className="px-5 py-3.5 text-white/60 font-semibold">Response Time</th>
                  <th className="px-5 py-3.5 text-white/60 font-semibold">Status</th>
                  <th className="px-5 py-3.5 text-white/60 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, i) => (
                  <tr key={log.id} className={`border-b border-white/5 hover:bg-white/5 transition-colors ${i % 2 === 0 ? '' : 'bg-white/[0.01]'}`}>
                    <td className="px-5 py-3.5 text-white/50 text-xs">
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                    <td className="px-5 py-3.5 font-mono text-cyan-400/90 text-xs">
                      ...{log.session_id.slice(-8)}
                    </td>
                    <td className="px-5 py-3.5 text-white/80 max-w-xs truncate" title={log.question}>
                      {log.question}
                    </td>
                    <td className="px-5 py-3.5 text-white/70 max-w-xs truncate" title={log.response}>
                      {log.response}
                    </td>
                    <td className="px-5 py-3.5 text-white/50 text-xs">
                      {log.response_time_ms}ms
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        log.is_success ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                      }`}>
                        {log.is_success ? '✓ Success' : '✗ Failed'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 flex gap-1">
                      <button
                        onClick={() => handleViewHistory(log.conversation_id)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-white/50 hover:text-cyan-400 transition-colors"
                        title="View Full Dialog"
                      >
                        <i className="ri-eye-line text-sm"></i>
                      </button>
                      <button
                        onClick={() => handleDownloadPDF(log.conversation_id)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-blue-500/20 text-white/50 hover:text-blue-400 transition-colors"
                        title="Download PDF Transcript"
                      >
                        <i className="ri-file-pdf-line text-sm"></i>
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(log.conversation_id)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/50 hover:text-red-400 transition-colors"
                        title="Delete Conversation"
                      >
                        <i className="ri-delete-bin-line text-sm"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-6">
            <button
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="px-3 py-1.5 rounded-lg bg-[#1a1a2e] border border-cyan-500/20 text-white/60 hover:text-white disabled:opacity-40 transition-all text-sm"
            >
              ‹ Previous
            </button>
            <span className="text-white/60 text-sm font-semibold">Page {page} of {totalPages}</span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
              className="px-3 py-1.5 rounded-lg bg-[#1a1a2e] border border-cyan-500/20 text-white/60 hover:text-white disabled:opacity-40 transition-all text-sm"
            >
              Next ›
            </button>
          </div>
        )}

        {/* Chronological View Timeline Modal */}
        {viewHistoryId && (
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-[#1a1a2e] border border-cyan-500/30 rounded-2xl w-full max-w-3xl shadow-2xl flex flex-col max-h-[85vh]">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-5 border-b border-cyan-500/20">
                <div>
                  <h2 className="text-white font-bold text-lg flex items-center gap-2">
                    <i className="ri-message-3-line text-cyan-400"></i> Conversation History
                  </h2>
                  <p className="text-white/40 text-xs mt-0.5 font-mono">Session: {viewHistoryId}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleDownloadPDF(viewHistoryId)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg text-xs font-semibold transition-all"
                    title="Download Transcript as PDF"
                  >
                    <i className="ri-file-pdf-line"></i> Download PDF
                  </button>
                  <button onClick={() => setViewHistoryId(null)} className="text-white/40 hover:text-white transition-colors">
                    <i className="ri-close-line text-2xl"></i>
                  </button>
                </div>
              </div>

              {/* Modal Message List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#12122a]">
                {loadingHistory ? (
                  <div className="flex flex-col items-center justify-center py-20 text-white/40">
                    <i className="ri-loader-4-line animate-spin text-3xl mb-2 text-cyan-500"></i>
                    <p className="text-sm">Retrieving dialog timeline...</p>
                  </div>
                ) : historyLogs.length === 0 ? (
                  <p className="text-center text-white/40 py-10">No messages found in this session history.</p>
                ) : (
                  historyLogs.map((log) => (
                    <div key={log.id} className="space-y-2.5">
                      {/* User question bubble */}
                      <div className="flex justify-end">
                        <div className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white px-4 py-2.5 rounded-2xl rounded-tr-none max-w-[80%] shadow-md">
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{log.question}</p>
                          <span className="block text-right text-[10px] text-white/60 mt-1">
                            {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                      {/* AI response bubble */}
                      <div className="flex justify-start">
                        <div className="bg-[#1a1a2e] border border-cyan-500/10 text-white/90 px-4 py-2.5 rounded-2xl rounded-tl-none max-w-[80%] shadow-md">
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{log.response}</p>
                          <div className="flex items-center justify-between text-[10px] text-white/40 mt-1.5 gap-4">
                            <span>Latency: {log.response_time_ms}ms · browser: {log.browser}</span>
                            <span>{new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                        </div>
                      </div>
                      {/* Error details if any */}
                      {!log.is_success && log.error_message && (
                        <div className="mx-auto max-w-[80%] bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-lg p-2.5">
                          <strong>Error Alert:</strong> {log.error_message}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Modal footer / metadata */}
              {historyLogs.length > 0 && (
                <div className="p-4 border-t border-cyan-500/20 bg-cyan-950/20 text-xs text-white/50 flex flex-wrap justify-between gap-2">
                  <span>First active: {new Date(historyLogs[0].created_at).toLocaleString()}</span>
                  <span>Device: {historyLogs[0].device} · client URL: {historyLogs[0].page_url}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Delete confirmation modal */}
        {deleteConfirmId && (
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#1a1a2e] border border-red-500/30 rounded-2xl p-6 w-full max-w-md shadow-2xl">
              <h2 className="text-white font-bold text-lg mb-2">Delete Conversation</h2>
              <p className="text-white/60 text-sm mb-5">Are you sure you want to delete all log records sharing the conversation ID <code className="bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded font-mono text-xs">{deleteConfirmId.substring(0, 8)}...</code>? This operation cannot be undone.</p>
              <div className="flex gap-3 justify-end">
                <button onClick={() => setDeleteConfirmId(null)} className="px-4 py-2 text-white/60 hover:text-white transition-colors text-sm">
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConversation}
                  disabled={deleting}
                  className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white rounded-lg text-sm font-semibold transition-all disabled:opacity-60"
                >
                  {deleting ? 'Deleting...' : 'Delete Permanently'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
