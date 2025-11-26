import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { inquiriesAPI } from '../../services/api';

interface Inquiry {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  company?: string;
  service_interest?: string;
  message: string;
  status: string;
  is_read: boolean;
  submitted_at: string;
}

export default function Inquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [filter, setFilter] = useState({ status: '', isRead: '' });

  useEffect(() => {
    fetchInquiries();
  }, [filter]);

  const fetchInquiries = async () => {
    try {
      const response = await inquiriesAPI.getAll(filter);
      setInquiries(response.data?.inquiries || []);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await inquiriesAPI.update(id, { status });
      fetchInquiries();
      if (selectedInquiry?.id === id) {
        setSelectedInquiry({ ...selectedInquiry, status });
      }
    } catch (error: any) {
      alert(error.message || 'Error updating status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await inquiriesAPI.delete(id);
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
      fetchInquiries();
    } catch (error: any) {
      alert(error.message || 'Error deleting inquiry');
    }
  };

  const handleExport = async () => {
    try {
      await inquiriesAPI.exportCSV();
    } catch (error: any) {
      alert(error.message || 'Error exporting');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Customer Inquiries</h2>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg"
          >
            <i className="ri-download-line mr-2"></i>Export CSV
          </button>
        </div>

        {/* Filters */}
        <div className="flex space-x-4">
          <select
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            className="px-4 py-2 bg-[#1a1a2e] border border-cyan-500/20 rounded-lg text-white"
          >
            <option value="">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="closed">Closed</option>
          </select>
          <select
            value={filter.isRead}
            onChange={(e) => setFilter({ ...filter, isRead: e.target.value })}
            className="px-4 py-2 bg-[#1a1a2e] border border-cyan-500/20 rounded-lg text-white"
          >
            <option value="">All</option>
            <option value="false">Unread</option>
            <option value="true">Read</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <i className="ri-loader-4-line text-cyan-400 text-4xl animate-spin"></i>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Inquiries List */}
            <div className="lg:col-span-2 space-y-4">
              {inquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  onClick={() => setSelectedInquiry(inquiry)}
                  className={`bg-[#1a1a2e]/50 backdrop-blur-md border rounded-xl p-4 cursor-pointer transition-all ${
                    selectedInquiry?.id === inquiry.id
                      ? 'border-cyan-400 bg-cyan-500/10'
                      : 'border-cyan-500/20 hover:border-cyan-400/50'
                  } ${!inquiry.is_read ? 'border-l-4 border-l-cyan-400' : ''}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-white font-bold">
                        {inquiry.first_name} {inquiry.last_name}
                      </h3>
                      <p className="text-white/60 text-sm">{inquiry.email}</p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        inquiry.status === 'new'
                          ? 'bg-blue-500/20 text-blue-400'
                          : inquiry.status === 'contacted'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-green-500/20 text-green-400'
                      }`}
                    >
                      {inquiry.status}
                    </span>
                  </div>
                  <p className="text-white/70 text-sm line-clamp-2">{inquiry.message}</p>
                  <p className="text-white/40 text-xs mt-2">
                    {new Date(inquiry.submitted_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Inquiry Details */}
            {selectedInquiry && (
              <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-bold text-lg">Details</h3>
                  <button
                    onClick={() => setSelectedInquiry(null)}
                    className="text-white/60 hover:text-white"
                  >
                    <i className="ri-close-line text-xl"></i>
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-white/60 text-sm">Name</label>
                    <p className="text-white">
                      {selectedInquiry.first_name} {selectedInquiry.last_name}
                    </p>
                  </div>
                  <div>
                    <label className="text-white/60 text-sm">Email</label>
                    <p className="text-white">{selectedInquiry.email}</p>
                  </div>
                  {selectedInquiry.phone && (
                    <div>
                      <label className="text-white/60 text-sm">Phone</label>
                      <p className="text-white">{selectedInquiry.phone}</p>
                    </div>
                  )}
                  {selectedInquiry.company && (
                    <div>
                      <label className="text-white/60 text-sm">Company</label>
                      <p className="text-white">{selectedInquiry.company}</p>
                    </div>
                  )}
                  {selectedInquiry.service_interest && (
                    <div>
                      <label className="text-white/60 text-sm">Service Interest</label>
                      <p className="text-white">{selectedInquiry.service_interest}</p>
                    </div>
                  )}
                  <div>
                    <label className="text-white/60 text-sm">Message</label>
                    <p className="text-white">{selectedInquiry.message}</p>
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Status</label>
                    <select
                      value={selectedInquiry.status}
                      onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value)}
                      className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                  <button
                    onClick={() => handleDelete(selectedInquiry.id)}
                    className="w-full px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg"
                  >
                    Delete Inquiry
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

