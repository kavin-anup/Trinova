import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { testimonialsAPI, uploadAPI } from '../../services/api';

interface Testimonial {
  id: string;
  client_name: string;
  company?: string;
  designation?: string;
  message: string;
  rating?: number;
  image_url?: string;
  is_published: boolean;
  order_index: number;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    clientName: '',
    company: '',
    designation: '',
    message: '',
    rating: 5,
    imageUrl: '',
    isPublished: false,
    orderIndex: 0,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await testimonialsAPI.getAll();
      setTestimonials(response.data?.testimonials || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTestimonial) {
        await testimonialsAPI.update(editingTestimonial.id, formData);
      } else {
        await testimonialsAPI.create(formData);
      }
      setShowModal(false);
      resetForm();
      fetchTestimonials();
    } catch (error: any) {
      alert(error.message || 'Error saving testimonial');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await testimonialsAPI.delete(id);
      fetchTestimonials();
    } catch (error: any) {
      alert(error.message || 'Error deleting testimonial');
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      clientName: testimonial.client_name,
      company: testimonial.company || '',
      designation: testimonial.designation || '',
      message: testimonial.message,
      rating: testimonial.rating || 5,
      imageUrl: testimonial.image_url || '',
      isPublished: testimonial.is_published,
      orderIndex: testimonial.order_index,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      clientName: '',
      company: '',
      designation: '',
      message: '',
      rating: 5,
      imageUrl: '',
      isPublished: false,
      orderIndex: 0,
    });
    setEditingTestimonial(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Testimonials</h2>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
          >
            <i className="ri-add-line mr-2"></i>Add Testimonial
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <i className="ri-loader-4-line text-cyan-400 text-4xl animate-spin"></i>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6"
              >
                <div className="flex items-start space-x-4 mb-4">
                  {testimonial.image_url && (
                    <img
                      src={testimonial.image_url}
                      alt={testimonial.client_name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-white font-bold">{testimonial.client_name}</h3>
                    {testimonial.company && (
                      <p className="text-cyan-400 text-sm">{testimonial.company}</p>
                    )}
                    {testimonial.rating && (
                      <div className="flex text-yellow-400 text-sm mt-1">
                        {'★'.repeat(testimonial.rating)}
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-white/70 text-sm mb-4 line-clamp-3">{testimonial.message}</p>
                <div className="flex items-center justify-between">
                  {!testimonial.is_published && (
                    <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">
                      Draft
                    </span>
                  )}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(testimonial)}
                      className="px-3 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-lg text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#1a1a2e] border border-cyan-500/20 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">
                    {editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}
                  </h3>
                  <button onClick={() => { setShowModal(false); resetForm(); }} className="text-white/60">
                    <i className="ri-close-line text-2xl"></i>
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Client Name</label>
                      <input
                        type="text"
                        value={formData.clientName}
                        onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                        required
                        className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Company</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={4}
                      className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2 text-white">
                      <input
                        type="checkbox"
                        checked={formData.isPublished}
                        onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <span>Published</span>
                    </label>
                  </div>
                  <div className="flex space-x-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg"
                    >
                      {editingTestimonial ? 'Update' : 'Create'}
                    </button>
                    <button
                      type="button"
                      onClick={() => { setShowModal(false); resetForm(); }}
                      className="px-4 py-2 bg-[#252525] text-white/60 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

