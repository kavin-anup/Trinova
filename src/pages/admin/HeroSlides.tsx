import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { heroSlidesAPI, uploadAPI } from '../../services/api';

interface HeroSlide {
  id: string;
  title: string;
  highlights: string[];
  description?: string;
  sub_description?: string;
  media_url: string;
  media_type: 'image' | 'video';
  primary_cta_label?: string;
  primary_cta_icon?: string;
  order_index: number;
  is_active: boolean;
}

export default function HeroSlides() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    highlights: [''],
    description: '',
    subDescription: '',
    mediaUrl: '',
    mediaType: 'image' as 'image' | 'video',
    primaryCtaLabel: '',
    primaryCtaIcon: '',
    orderIndex: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await heroSlidesAPI.getAll();
      setSlides(response.data?.slides || []);
    } catch (error) {
      console.error('Error fetching slides:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingSlide) {
        await heroSlidesAPI.update(editingSlide.id, formData);
      } else {
        await heroSlidesAPI.create(formData);
      }
      setShowModal(false);
      resetForm();
      fetchSlides();
    } catch (error: any) {
      alert(error.message || 'Error saving slide');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this slide?')) return;
    try {
      await heroSlidesAPI.delete(id);
      fetchSlides();
    } catch (error: any) {
      alert(error.message || 'Error deleting slide');
    }
  };

  const handleEdit = (slide: HeroSlide) => {
    setEditingSlide(slide);
    setFormData({
      title: slide.title,
      highlights: slide.highlights || [''],
      description: slide.description || '',
      subDescription: slide.sub_description || '',
      mediaUrl: slide.media_url,
      mediaType: slide.media_type || 'image',
      primaryCtaLabel: slide.primary_cta_label || '',
      primaryCtaIcon: slide.primary_cta_icon || '',
      orderIndex: slide.order_index,
      isActive: slide.is_active,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      highlights: [''],
      description: '',
      subDescription: '',
      mediaUrl: '',
      mediaType: 'image',
      primaryCtaLabel: '',
      primaryCtaIcon: '',
      orderIndex: 0,
      isActive: true,
    });
    setEditingSlide(null);
  };

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const response = await uploadAPI.uploadImage(file, 'hero');
      const isVideo = file.type.startsWith('video/');
      setFormData({
        ...formData,
        mediaUrl: response.data.media.url,
        mediaType: isVideo ? 'video' : 'image',
      });
    } catch (error: any) {
      alert(error.message || 'Error uploading file');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Hero Slides</h2>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
          >
            <i className="ri-add-line mr-2"></i>Add Slide
          </button>
        </div>

        {/* Slides List */}
        {loading ? (
          <div className="text-center py-12">
            <i className="ri-loader-4-line text-cyan-400 text-4xl animate-spin"></i>
          </div>
        ) : slides.length === 0 ? (
          <div className="text-center py-12 bg-[#1a1a2e]/50 rounded-xl border border-cyan-500/20">
            <i className="ri-slideshow-3-line text-cyan-400 text-5xl mb-4"></i>
            <p className="text-white/60">No slides yet. Add your first slide!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl overflow-hidden"
              >
                <div className="relative h-48 bg-gradient-to-br from-cyan-500/20 to-blue-600/20">
                  {slide.media_url && (
                    <>
                      {slide.media_type === 'video' ? (
                        <video
                          src={slide.media_url}
                          className="w-full h-full object-cover"
                          muted
                          loop
                        />
                      ) : (
                        <img
                          src={slide.media_url}
                          alt={slide.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </>
                  )}
                  <div className="absolute top-2 left-2 bg-cyan-500/80 text-white text-xs px-2 py-1 rounded">
                    {slide.media_type === 'video' ? 'Video' : 'Image'}
                  </div>
                  {!slide.is_active && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      Inactive
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-white font-bold mb-2">{slide.title}</h3>
                  <p className="text-white/60 text-sm mb-4 line-clamp-2">
                    {slide.description}
                  </p>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(slide)}
                      className="flex-1 px-3 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-lg transition-all text-sm"
                    >
                      <i className="ri-edit-line mr-1"></i>Edit
                    </button>
                    <button
                      onClick={() => handleDelete(slide.id)}
                      className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all text-sm"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#1a1a2e] border border-cyan-500/20 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">
                    {editingSlide ? 'Edit Slide' : 'Add New Slide'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="text-white/60 hover:text-white"
                  >
                    <i className="ri-close-line text-2xl"></i>
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Highlights (one per line)</label>
                    <textarea
                      value={formData.highlights.join('\n')}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          highlights: e.target.value.split('\n').filter((h) => h.trim()),
                        })
                      }
                      rows={3}
                      className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Media Type</label>
                    <select
                      value={formData.mediaType}
                      onChange={(e) => setFormData({ ...formData, mediaType: e.target.value as 'image' | 'video' })}
                      className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none mb-2"
                    >
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      {formData.mediaType === 'video' ? 'Video' : 'Image'} URL
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={formData.mediaUrl}
                        onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })}
                        required
                        className="flex-1 px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                        placeholder={`${formData.mediaType === 'video' ? 'Video' : 'Image'} URL or upload`}
                      />
                      <label className="px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg cursor-pointer transition-all">
                        <i className="ri-upload-line mr-2"></i>Upload
                        <input
                          type="file"
                          accept={formData.mediaType === 'video' ? 'video/*' : 'image/*'}
                          onChange={handleMediaUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2 text-white">
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <span>Active</span>
                    </label>
                  </div>

                  <div className="flex items-center space-x-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
                    >
                      {editingSlide ? 'Update' : 'Create'} Slide
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        resetForm();
                      }}
                      className="px-4 py-2 bg-[#252525] text-white/60 rounded-lg hover:bg-[#2a2a2a] transition-all"
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

