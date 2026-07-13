import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

type Stats = {
  totalConversations: number;
  totalQuestions: number;
  totalSessions: number;
  avgResponseTimeMs: number;
  failedReplies: number;
  unansweredQuestionsCount: number;
  todaysQuestions: number;
  weeklyQuestions: number;
  monthlyQuestions: number;
  trendingQuestions: Array<{ question: string; count: number }>;
  trendingTopics: Array<{ topic: string; count: number }>;
  dailyConversations: Array<{ label: string; count: number }>;
  weeklyConversations: Array<{ label: string; count: number }>;
  monthlyConversations: Array<{ label: string; count: number }>;
};

function StatCard({ icon, label, value, color = 'cyan', sub }: { icon: string; label: string; value: string | number; color?: string; sub?: string }) {
  const colorMap: Record<string, string> = {
    cyan: 'from-cyan-500/10 to-blue-600/10 border-cyan-500/20 text-cyan-400',
    green: 'from-green-500/10 to-emerald-600/10 border-green-500/20 text-green-400',
    red: 'from-red-500/10 to-rose-600/10 border-red-500/20 text-red-400',
    purple: 'from-purple-500/10 to-violet-600/10 border-purple-500/20 text-purple-400',
    orange: 'from-orange-500/10 to-amber-600/10 border-orange-500/20 text-orange-400',
  };
  return (
    <div className={`bg-gradient-to-br ${colorMap[color] || colorMap['cyan']} border rounded-xl p-5 shadow-lg`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-lg bg-white/5`}>
          <i className={`${icon} text-xl`}></i>
        </div>
        <span className="text-white/60 text-sm font-medium">{label}</span>
      </div>
      <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
      {sub && <p className="text-white/40 text-xs mt-1">{sub}</p>}
    </div>
  );
}

export default function ChatbotAnalytics() {
  const token = localStorage.getItem('admin_token');
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [chartTimeframe, setChartTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const fetchStats = async () => {
    setLoading(true);
    try {
      const r = await fetch(`${API}/analytics/stats`, { headers });
      const d = await r.json();
      if (d.success) {
        setStats(d.data);
      }
    } catch (err) {
      console.error('Error fetching analytics stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Format active chart data
  const getChartData = () => {
    if (!stats) return [];
    if (chartTimeframe === 'weekly') return stats.weeklyConversations;
    if (chartTimeframe === 'monthly') return stats.monthlyConversations;
    return stats.dailyConversations;
  };

  const chartData = getChartData();

  return (
    <AdminLayout>
      <div className="text-white">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <i className="ri-bar-chart-2-line text-cyan-400"></i> Chatbot Analytics
            </h1>
            <p className="text-white/60 text-sm mt-1">Real-time interaction insights, user questions, and response trends.</p>
          </div>
          <button onClick={fetchStats} className="p-2 bg-[#1a1a2e] hover:bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-lg transition-all" title="Refresh Dashboard">
            <i className="ri-refresh-line text-lg"></i>
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 text-white/50">
            <i className="ri-loader-4-line animate-spin text-3xl mb-2 text-cyan-500"></i>
            <p>Compiling analytics dashboard...</p>
          </div>
        ) : stats ? (
          <>
            {/* Stats Cards Row */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              <StatCard icon="ri-chat-3-line" label="Total Conversations" value={stats.totalConversations} color="cyan" />
              <StatCard icon="ri-question-mark" label="Total Questions" value={stats.totalQuestions} color="purple" />
              <StatCard icon="ri-timer-line" label="Avg Response Speed" value={`${stats.avgResponseTimeMs}ms`} color="orange" sub="From model completion" />
              <StatCard icon="ri-close-circle-line" label="Failed Responses" value={stats.failedReplies} color="red" />
              <StatCard icon="ri-question-answer-line" label="Unanswered Queries" value={stats.unansweredQuestionsCount} color="orange" sub="Review pending" />
            </div>

            {/* Timeframe Questions Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-[#1a1a2e] border border-cyan-500/15 rounded-xl p-5 shadow-lg flex items-center justify-between">
                <div>
                  <p className="text-white/50 text-xs font-semibold uppercase tracking-wider">Today's Questions</p>
                  <p className="text-3xl font-extrabold text-white mt-1.5">{stats.todaysQuestions}</p>
                </div>
                <div className="p-3 bg-cyan-500/10 rounded-full text-cyan-400 text-2xl">
                  <i className="ri-calendar-event-line"></i>
                </div>
              </div>
              <div className="bg-[#1a1a2e] border border-cyan-500/15 rounded-xl p-5 shadow-lg flex items-center justify-between">
                <div>
                  <p className="text-white/50 text-xs font-semibold uppercase tracking-wider">Weekly Questions</p>
                  <p className="text-3xl font-extrabold text-white mt-1.5">{stats.weeklyQuestions}</p>
                </div>
                <div className="p-3 bg-purple-500/10 rounded-full text-purple-400 text-2xl">
                  <i className="ri-calendar-todo-line"></i>
                </div>
              </div>
              <div className="bg-[#1a1a2e] border border-cyan-500/15 rounded-xl p-5 shadow-lg flex items-center justify-between">
                <div>
                  <p className="text-white/50 text-xs font-semibold uppercase tracking-wider">Monthly Questions</p>
                  <p className="text-3xl font-extrabold text-white mt-1.5">{stats.monthlyQuestions}</p>
                </div>
                <div className="p-3 bg-green-500/10 rounded-full text-green-400 text-2xl">
                  <i className="ri-calendar-2-line"></i>
                </div>
              </div>
            </div>

            {/* Main Chart Card */}
            <div className="bg-[#1a1a2e] border border-cyan-500/20 rounded-xl p-5 mb-6 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <h3 className="text-white font-bold text-base flex items-center gap-2">
                  <i className="ri-pulse-line text-cyan-400"></i> Usage Statistics
                </h3>
                <div className="flex bg-[#12122a] border border-cyan-500/20 rounded-lg p-1 text-xs">
                  {(['daily', 'weekly', 'monthly'] as const).map(tf => (
                    <button
                      key={tf}
                      onClick={() => setChartTimeframe(tf)}
                      className={`px-3 py-1.5 rounded-md font-semibold transition-all capitalize ${
                        chartTimeframe === tf ? 'bg-cyan-500/25 text-cyan-400 border border-cyan-500/30' : 'text-white/50 hover:text-white'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              {chartData.length === 0 ? (
                <div className="flex items-center justify-center h-64 text-white/30 text-sm">
                  No conversational traffic data compiled in this range.
                </div>
              ) : (
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#0891b2" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#22d3ee" opacity={0.08} />
                      <XAxis dataKey="label" stroke="#94a3b8" fontSize={11} />
                      <YAxis stroke="#94a3b8" fontSize={11} allowDecimals={false} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1a1a2e', borderColor: 'rgba(34,211,238,0.2)', borderRadius: '8px', color: '#fff' }}
                        labelStyle={{ color: '#22d3ee', fontWeight: 'bold' }}
                      />
                      <Area type="monotone" dataKey="count" stroke="#22d3ee" strokeWidth={2.5} fillOpacity={1} fill="url(#colorCount)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {/* Trending Topics & FAQs Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* FAQ */}
              <div className="bg-[#1a1a2e] border border-cyan-500/20 rounded-xl p-5 shadow-xl">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <i className="ri-question-answer-line text-cyan-400 animate-pulse"></i> Frequently Asked Questions
                </h3>
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                  {stats.trendingQuestions.length === 0 ? (
                    <p className="text-white/40 text-sm">No queries registered yet.</p>
                  ) : (
                    stats.trendingQuestions.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm py-2 px-3 bg-[#12122a] border border-white/5 rounded-lg hover:border-cyan-500/20 transition-all">
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-cyan-400 font-bold font-mono text-xs w-5">{idx + 1}.</span>
                          <span className="text-white/80 truncate font-medium">"{item.question}"</span>
                        </div>
                        <span className="bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded-full text-xs font-bold shrink-0">{item.count} asks</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Trending Topics */}
              <div className="bg-[#1a1a2e] border border-cyan-500/20 rounded-xl p-5 shadow-xl">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <i className="ri-fire-line text-orange-400"></i> Trending Keywords / Topics
                </h3>
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                  {stats.trendingTopics.length === 0 ? (
                    <p className="text-white/40 text-sm">No topics analysed yet.</p>
                  ) : (
                    stats.trendingTopics.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm py-2 px-3 bg-[#12122a] border border-white/5 rounded-lg hover:border-orange-500/20 transition-all">
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-orange-400 font-bold font-mono text-xs w-5">{idx + 1}.</span>
                          <span className="text-white/80 truncate font-semibold capitalize">{item.topic}</span>
                        </div>
                        <span className="bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded-full text-xs font-bold shrink-0">{item.count} occurrences</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </AdminLayout>
  );
}
