import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { homeContentAPI, uploadAPI, servicesAPI } from '../../services/api';

interface ContentItem {
  content_key: string;
  content_value: string;
  image_url?: string | null;
}

interface ExpertiseCard {
  id?: string;
  title: string;
  description: string;
  icon: string;
  category?: string;
  is_active?: boolean;
  order_index?: number;
}

type TabType = 'about' | 'expertise';

// Suggested icon options for expertise cards - WITH VISUAL PREVIEWS
const ICON_OPTIONS = [
  { value: 'ri-flask-line', label: 'R&D', description: 'Research & Development' },
  { value: 'ri-cpu-line', label: 'Hardware', description: 'Hardware Design' },
  { value: 'ri-code-line', label: 'Firmware', description: 'Firmware Development' },
  { value: 'ri-smartphone-line', label: 'Mobile', description: 'Mobile App' },
  { value: 'ri-settings-3-line', label: 'EMS', description: 'Electronics Manufacturing' },
  { value: 'ri-shopping-cart-line', label: 'Sourcing', description: 'Component Sourcing' },
  { value: 'ri-tools-line', label: 'Mechanical', description: 'Mechanical Design' },
  { value: 'ri-rocket-line', label: 'Full Stack', description: 'End-to-End Development' },
  { value: 'ri-brain-line', label: 'AI', description: 'AI Solutions' },
  { value: 'ri-database-line', label: 'Data', description: 'Data Engineering' },
  { value: 'ri-cloud-line', label: 'Cloud', description: 'Cloud Services' },
  { value: 'ri-function-line', label: 'IoT', description: 'IoT Solutions' },
];

const FLOATING_CARD_ICON_OPTIONS = [
  { value: 'ri-lightbulb-flash-line', label: 'Innovation' },
  { value: 'ri-cpu-line', label: 'Hardware' },
  { value: 'ri-brain-line', label: 'AI' },
  { value: 'ri-shield-star-line', label: 'Reliability' },
];

const normalizeContentValue = (rawValue: any) => {
  if (rawValue && typeof rawValue === 'object') {
    return {
      value: rawValue.contentValue ?? '',
      image: rawValue.imageUrl ?? null,
    };
  }

  if (typeof rawValue === 'string') {
    try {
      const parsed = JSON.parse(rawValue);
      if (parsed && typeof parsed === 'object') {
        return {
          value: parsed.contentValue ?? '',
          image: parsed.imageUrl ?? null,
        };
      }
    } catch {
      // ignore parse errors
    }
    return { value: rawValue, image: null };
  }

  return {
    value: rawValue ?? '',
    image: null,
  };
};

export default function HomeContent() {
  const [content, setContent] = useState<Record<string, ContentItem>>({});
  const [expertiseCards, setExpertiseCards] = useState<ExpertiseCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('about');
  const [uploadingImage, setUploadingImage] = useState<string | null>(null);
  const [editingCard, setEditingCard] = useState<ExpertiseCard | null>(null);
  const [showAddCard, setShowAddCard] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const saveContentEntry = async (key: string, value: string, imageUrl?: string | null) => {
    await homeContentAPI.update(key, value, undefined, imageUrl ?? null);
  };

  useEffect(() => {
    fetchContent();
    fetchExpertiseCards();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await homeContentAPI.getAll();
      const contentItems = response.data?.content || [];
      
      const contentMap: Record<string, ContentItem> = {};
      const formValues: Record<string, string> = {};
      
      contentItems.forEach((item: any) => {
        const { value, image } = normalizeContentValue(item.content_value);
        const mergedImage = item.image_url || image || null;

        contentMap[item.content_key] = {
          content_key: item.content_key,
          content_value: value || '',
          image_url: mergedImage,
        };
        formValues[item.content_key] = value || '';
      });

      if (!formValues['about_card_icon']) {
        formValues['about_card_icon'] = 'ri-lightbulb-flash-line';
      }
      
      setContent(contentMap);
      setFormData(formValues);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchExpertiseCards = async () => {
    try {
      const response = await servicesAPI.getAll();
      setExpertiseCards(response.data?.services || []);
    } catch (error) {
      console.error('Error fetching expertise cards:', error);
    }
  };

  const getValue = (key: string, fallback: string = '') => {
    const formValue = formData[key];
    const contentValue = content[key]?.content_value;
    
    // Return form value if it exists and is not empty
    if (formValue !== undefined && formValue !== null && formValue !== '') {
      // If it's a string that looks like JSON, parse it
      if (typeof formValue === 'string' && formValue.startsWith('{')) {
        try {
          const parsed = JSON.parse(formValue);
          return parsed.contentValue || parsed.value || formValue;
        } catch {
          return formValue;
        }
      }
      return String(formValue);
    }
    
    // Otherwise use content value
    if (contentValue !== undefined && contentValue !== null && contentValue !== '') {
      // If it's a string that looks like JSON, parse it
      if (typeof contentValue === 'string' && contentValue.startsWith('{')) {
        try {
          const parsed = JSON.parse(contentValue);
          return parsed.contentValue || parsed.value || contentValue;
        } catch {
          return contentValue;
        }
      }
      return String(contentValue);
    }
    
    return fallback;
  };

  const getImageUrl = (key: string) => {
    return content[key]?.image_url || '';
  };

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      const updates: Promise<any>[] = [];

      Object.entries(formData).forEach(([key, value]) => {
        if (value !== (content[key]?.content_value || '')) {
          updates.push(saveContentEntry(key, value, content[key]?.image_url || null));
        }
      });

      if (updates.length) {
        await Promise.all(updates);
      }

      await fetchContent();
      setHasChanges(false);
      alert('✅ All changes saved successfully!');
    } catch (error: any) {
      alert(error.message || 'Error saving content');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (key: string, file: File) => {
    setUploadingImage(key);
    try {
      const response = await uploadAPI.uploadImage(file, 'general');
      const imageUrl = response.data?.media?.url;
      
      await saveContentEntry(key, getValue(key), imageUrl);
      
      await fetchContent();
      alert('✅ Image uploaded successfully!');
    } catch (error: any) {
      alert(error.message || 'Error uploading image');
    } finally {
      setUploadingImage(null);
    }
  };

  const handleSaveCard = async (card: ExpertiseCard) => {
    try {
      if (card.id) {
        await servicesAPI.update(card.id, card);
      } else {
        await servicesAPI.create({
          ...card,
          category: 'expertise',
          is_active: true,
          order_index: expertiseCards.length
        });
      }
      await fetchExpertiseCards();
      setEditingCard(null);
      setShowAddCard(false);
      alert('✅ Expertise card saved!');
    } catch (error: any) {
      alert(error.message || 'Error saving card');
    }
  };

  const handleDeleteCard = async (id: string) => {
    if (!confirm('Delete this expertise card?')) return;
    try {
      await servicesAPI.delete(id);
      await fetchExpertiseCards();
      alert('✅ Card deleted!');
    } catch (error: any) {
      alert(error.message || 'Error deleting card');
    }
  };

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'about', label: 'About Section', icon: 'ri-information-line' },
    { id: 'expertise', label: 'Expertise Cards', icon: 'ri-service-line' },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <i className="ri-loader-4-line text-cyan-400 text-4xl animate-spin"></i>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Home Page Content</h2>
            <p className="text-white/60 mt-1">Manage all content on the homepage</p>
          </div>
          
          {hasChanges && activeTab === 'about' && (
            <button
              onClick={handleSaveAll}
              disabled={saving}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50"
            >
              {saving ? (
                <>
                  <i className="ri-loader-4-line animate-spin mr-2"></i>
                  Saving...
                </>
              ) : (
                <>
                  <i className="ri-save-line mr-2"></i>
                  Save All Changes
                </>
              )}
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 border-b border-cyan-500/20">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium transition-all ${
                activeTab === tab.id
                  ? 'text-cyan-400 border-b-2 border-cyan-400'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <i className={`${tab.icon} mr-2`}></i>
              {tab.label}
            </button>
          ))}
        </div>

        {/* About Section Tab */}
        {activeTab === 'about' && (
          <div className="space-y-6">
            <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">About Section Content</h3>
              
              <div className="space-y-6">
                {/* About Image */}
                <div>
                  <label className="block text-white font-medium mb-2">About Section - Main Image</label>
                  <p className="text-white/40 text-sm mb-3">Image displayed in the About section</p>
                  
                  {getImageUrl('about_image') && (
                    <div className="mb-3">
                      <img 
                        src={getImageUrl('about_image')} 
                        alt="About" 
                        className="w-48 h-48 object-cover rounded-lg border border-cyan-500/20"
                      />
                      <div className="mt-2 p-2 bg-black/30 rounded border border-cyan-500/10">
                        <p className="text-xs text-white/40 mb-1">Supabase URL:</p>
                        <p className="text-xs text-cyan-400 break-all font-mono">
                          {getImageUrl('about_image')}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload('about_image', file);
                    }}
                    className="block w-full text-white/60 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/10 file:text-cyan-400 hover:file:bg-cyan-500/20"
                    disabled={uploadingImage === 'about_image'}
                  />
                  {uploadingImage === 'about_image' && (
                    <p className="text-cyan-400 text-sm mt-2">
                      <i className="ri-loader-4-line animate-spin mr-1"></i>
                      Uploading to Supabase...
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Badge Text</label>
                    <input
                      type="text"
                      value={getValue('about_badge', 'About Us')}
                      onChange={(e) => handleInputChange('about_badge', e.target.value)}
                      className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Title Line 1</label>
                    <input
                      type="text"
                      value={getValue('about_title_line1', 'Discover')}
                      onChange={(e) => handleInputChange('about_title_line1', e.target.value)}
                      className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Title Line 2 (Gradient)</label>
                  <input
                    type="text"
                    value={getValue('about_title_line2', 'Trinova AI')}
                    onChange={(e) => handleInputChange('about_title_line2', e.target.value)}
                    className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                  />
                </div>

                {[1, 2, 3, 4].map((num) => (
                  <div key={num}>
                    <label className="block text-white font-medium mb-2">Description Paragraph {num}</label>
                    <textarea
                      rows={3}
                      value={getValue(`about_description_${num}`, '')}
                      onChange={(e) => handleInputChange(`about_description_${num}`, e.target.value)}
                      className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white resize-none"
                    />
                  </div>
                ))}

                {/* Floating Card */}
                <div className="border-t border-cyan-500/20 pt-6">
                  <h4 className="text-lg font-bold text-white mb-4">Floating Info Card</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Card Title</label>
                      <input
                        type="text"
                        value={getValue('about_card_title', 'Full-Stack Innovation')}
                        onChange={(e) => handleInputChange('about_card_title', e.target.value)}
                        className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Card Subtitle</label>
                      <input
                        type="text"
                        value={getValue('about_card_subtitle', 'Concept to Market')}
                        onChange={(e) => handleInputChange('about_card_subtitle', e.target.value)}
                        className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Stat Value</label>
                      <input
                        type="text"
                        value={getValue('about_card_stat_value', '100%')}
                        onChange={(e) => handleInputChange('about_card_stat_value', e.target.value)}
                        className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Stat Label</label>
                      <input
                        type="text"
                        value={getValue('about_card_stat_label', 'Scalable')}
                        onChange={(e) => handleInputChange('about_card_stat_label', e.target.value)}
                        className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                      />
                    </div>
                  </div>

                <div>
                  <label className="block text-white font-medium mb-3">Floating Card Icon</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {FLOATING_CARD_ICON_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleInputChange('about_card_icon', option.value)}
                        className={`flex items-center space-x-3 p-3 rounded-lg border transition-all hover:scale-[1.02] ${
                          getValue('about_card_icon', 'ri-lightbulb-flash-line') === option.value
                            ? 'bg-gradient-to-br from-cyan-500/30 to-blue-600/30 border-cyan-400 text-cyan-100 shadow-lg shadow-cyan-500/20'
                            : 'bg-[#252525] border-cyan-500/20 text-white/70 hover:border-cyan-400/60'
                        }`}
                      >
                        <div
                          className={`w-11 h-11 rounded-lg flex items-center justify-center ${
                            getValue('about_card_icon', 'ri-lightbulb-flash-line') === option.value
                              ? 'bg-cyan-500/30'
                              : 'bg-cyan-500/10'
                          }`}
                        >
                          <i className={`${option.value} text-2xl text-cyan-300`}></i>
                        </div>
                        <span className="font-medium">{option.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center space-x-3 p-3 bg-black/30 border border-cyan-500/10 rounded-lg">
                    <div className="w-12 h-12 bg-cyan-500/15 rounded-lg flex items-center justify-center">
                      <i className={`${getValue('about_card_icon', 'ri-lightbulb-flash-line')} text-2xl text-cyan-300`}></i>
                    </div>
                    <div>
                      <p className="text-white/70 text-sm">Currently selected icon class:</p>
                      <p className="text-cyan-300 font-mono text-sm">{getValue('about_card_icon', 'ri-lightbulb-flash-line')}</p>
                    </div>
                  </div>
                </div>
                </div>

                {/* Save Button at Bottom */}
                <div className="pt-6 border-t border-cyan-500/20">
                  <button
                    onClick={handleSaveAll}
                    disabled={saving || !hasChanges}
                    className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <>
                        <i className="ri-loader-4-line animate-spin mr-2"></i>
                        Saving...
                      </>
                    ) : (
                      <>
                        <i className="ri-save-line mr-2"></i>
                        {hasChanges ? 'Save About Section Changes' : 'No Changes to Save'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Expertise Cards Tab */}
        {activeTab === 'expertise' && (
          <div className="space-y-6">
            {/* Section Content Editor */}
            <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Expertise Section Header Content</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Section Badge Text</label>
                    <input
                      type="text"
                      value={getValue('expertise_badge', 'Our Services')}
                      onChange={(e) => handleInputChange('expertise_badge', e.target.value)}
                      className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Section Title Line 1</label>
                    <input
                      type="text"
                      value={getValue('expertise_title_line1', 'Our Core')}
                      onChange={(e) => handleInputChange('expertise_title_line1', e.target.value)}
                      className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Section Title Line 2 (Gradient)</label>
                  <input
                    type="text"
                    value={getValue('expertise_title_line2', 'Expertise')}
                    onChange={(e) => handleInputChange('expertise_title_line2', e.target.value)}
                    className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Section Description</label>
                  <textarea
                    rows={2}
                    value={getValue('expertise_description', 'From concept to market, we deliver comprehensive solutions across the entire technology stack')}
                    onChange={(e) => handleInputChange('expertise_description', e.target.value)}
                    className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white resize-none"
                  />
                </div>

                <button
                  onClick={handleSaveAll}
                  disabled={saving || !hasChanges}
                  className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <>
                      <i className="ri-loader-4-line animate-spin mr-2"></i>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="ri-save-line mr-2"></i>
                      Save Section Content
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Cards Management */}
            <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Expertise Cards</h3>
                <button
                  onClick={() => {
                    setEditingCard({ title: '', description: '', icon: 'ri-service-line' });
                    setShowAddCard(true);
                  }}
                  className="px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg"
                >
                  <i className="ri-add-line mr-2"></i>
                  Add New Card
                </button>
              </div>

              {/* Existing Cards */}
              {expertiseCards.length === 0 ? (
                <div className="text-center py-12 text-white/40">
                  <i className="ri-inbox-line text-4xl mb-2"></i>
                  <p>No expertise cards yet. Click "Add New Card" to create one.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {expertiseCards.map((card) => (
                    <div key={card.id} className="bg-[#1a1a2e]/50 border border-cyan-500/20 rounded-xl p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                          <i className={`${card.icon} text-cyan-400 text-2xl`}></i>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setEditingCard(card);
                              setShowAddCard(true);
                            }}
                            className="text-cyan-400 hover:text-cyan-300"
                          >
                            <i className="ri-edit-line"></i>
                          </button>
                          <button
                            onClick={() => handleDeleteCard(card.id!)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </div>
                      </div>
                      <h4 className="text-white font-bold mb-2">{card.title}</h4>
                      <p className="text-white/60 text-sm">{card.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add/Edit Card Modal */}
            {showAddCard && editingCard && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-[#1a1a2e] border border-cyan-500/20 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">
                      {editingCard.id ? 'Edit' : 'Add'} Expertise Card
                    </h3>
                    <button
                      onClick={() => {
                        setShowAddCard(false);
                        setEditingCard(null);
                      }}
                      className="text-white/60 hover:text-white"
                    >
                      <i className="ri-close-line text-2xl"></i>
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Card Title</label>
                      <input
                        type="text"
                        value={editingCard.title}
                        onChange={(e) => setEditingCard({ ...editingCard, title: e.target.value })}
                        placeholder="e.g., Research & Development"
                        className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Description</label>
                      <textarea
                        rows={3}
                        value={editingCard.description}
                        onChange={(e) => setEditingCard({ ...editingCard, description: e.target.value })}
                        placeholder="Brief description of this service..."
                        className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">
                        Select Icon/Logo
                        <span className="text-white/40 text-sm ml-2">(Pick from suggestions or enter custom)</span>
                      </label>
                      
                      {/* Icon Picker Grid - Visual Selection */}
                      <div className="grid grid-cols-4 gap-3 mb-3">
                        {ICON_OPTIONS.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => setEditingCard({ ...editingCard, icon: option.value })}
                            className={`group p-4 rounded-lg border transition-all hover:scale-105 ${
                              editingCard.icon === option.value
                                ? 'bg-gradient-to-br from-cyan-500/30 to-blue-600/30 border-cyan-400 shadow-lg shadow-cyan-500/20'
                                : 'bg-[#252525] border-cyan-500/20 hover:border-cyan-400/50 hover:bg-cyan-500/5'
                            }`}
                            title={option.description}
                          >
                            <div className="flex flex-col items-center space-y-2">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                                editingCard.icon === option.value 
                                  ? 'bg-cyan-500/20' 
                                  : 'bg-cyan-500/10 group-hover:bg-cyan-500/15'
                              }`}>
                                <i className={`${option.value} text-2xl text-cyan-400`}></i>
                              </div>
                              <span className={`text-xs font-medium transition-colors ${
                                editingCard.icon === option.value 
                                  ? 'text-cyan-300' 
                                  : 'text-white/60 group-hover:text-white/80'
                              }`}>
                                {option.label}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>

                      {/* Custom Icon Input */}
                      {/* <div className="mt-3">
                        <label className="block text-white/60 text-sm mb-1">Or enter custom Remix Icon class:</label>
                        <input
                          type="text"
                          value={editingCard.icon}
                          onChange={(e) => setEditingCard({ ...editingCard, icon: e.target.value })}
                          placeholder="e.g., ri-cpu-line"
                          className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white font-mono text-sm"
                        />
                        <a 
                          href="https://remixicon.com" 
                          target="_blank" 
                          className="text-cyan-400 text-xs mt-1 inline-block hover:underline"
                        >
                          Browse all Remix Icons →
                        </a>
                      </div> */}

                      {/* Icon Preview */}
                      <div className="mt-3 p-4 bg-black/30 rounded-lg border border-cyan-500/10">
                        <p className="text-white/60 text-sm mb-2">Preview:</p>
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                            <i className={`${editingCard.icon} text-cyan-400 text-2xl`}></i>
                          </div>
                          <span className="text-white font-mono text-sm">{editingCard.icon}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <button
                        onClick={() => handleSaveCard(editingCard)}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg"
                      >
                        <i className="ri-save-line mr-2"></i>
                        Save Card
                      </button>
                      <button
                        onClick={() => {
                          setShowAddCard(false);
                          setEditingCard(null);
                        }}
                        className="px-4 py-2 bg-white/5 text-white/60 rounded-lg hover:bg-white/10"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Other Sections Tab - COMMENTED OUT
        {activeTab === 'other' && (
          <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Other Homepage Sections</h3>
            <p className="text-white/60">Additional content sections will be added here.</p>
          </div>
        )}
        */}
      </div>
    </AdminLayout>
  );
}

