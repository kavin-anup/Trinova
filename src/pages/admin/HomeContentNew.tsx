import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { homeContentAPI, uploadAPI } from '../../services/api';

interface ContentItem {
  content_key: string;
  content_value: string;
  image_url?: string;
}

type TabType = 'about' | 'expertise' | 'other';

export default function HomeContent() {
  const [content, setContent] = useState<Record<string, ContentItem>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('about');
  const [uploadingImage, setUploadingImage] = useState<string | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await homeContentAPI.getAll();
      const contentItems = response.data?.content || [];
      
      // Convert to object for easy access
      const contentMap: Record<string, ContentItem> = {};
      contentItems.forEach((item: any) => {
        contentMap[item.content_key] = item;
      });
      
      setContent(contentMap);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const getValue = (key: string, fallback: string = '') => {
    return content[key]?.content_value || fallback;
  };

  const getImageUrl = (key: string) => {
    return content[key]?.image_url || '';
  };

  const handleSave = async (key: string, value: string, imageUrl?: string) => {
    setSaving(true);
    try {
      await homeContentAPI.update(key, {
        contentValue: value,
        imageUrl: imageUrl || null
      });
      
      // Update local state
      setContent(prev => ({
        ...prev,
        [key]: {
          ...prev[key],
          content_key: key,
          content_value: value,
          image_url: imageUrl
        }
      }));
      
      alert('Content updated successfully!');
    } catch (error: any) {
      alert(error.message || 'Error updating content');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (key: string, file: File) => {
    setUploadingImage(key);
    try {
      const response = await uploadAPI.uploadImage(file, 'general');
      const imageUrl = response.data?.media?.url;
      
      await handleSave(key, getValue(key), imageUrl);
    } catch (error: any) {
      alert(error.message || 'Error uploading image');
    } finally {
      setUploadingImage(null);
    }
  };

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'about', label: 'About Section', icon: 'ri-information-line' },
    { id: 'expertise', label: 'Expertise Section', icon: 'ri-service-line' },
    { id: 'other', label: 'Other Sections', icon: 'ri-layout-grid-line' }
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
        <div>
          <h2 className="text-2xl font-bold text-white">Home Page Content</h2>
          <p className="text-white/60 mt-1">Manage all content on the homepage</p>
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
                      <p className="text-xs text-white/60 mt-2 break-all">
                        URL: {getImageUrl('about_image')}
                      </p>
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
                      Uploading...
                    </p>
                  )}
                </div>

                {/* About Badge */}
                <div>
                  <label className="block text-white font-medium mb-2">Badge Text</label>
                  <input
                    type="text"
                    defaultValue={getValue('about_badge', 'About Us')}
                    onBlur={(e) => handleSave('about_badge', e.target.value)}
                    className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                    disabled={saving}
                  />
                </div>

                {/* About Title */}
                <div>
                  <label className="block text-white font-medium mb-2">Title Line 1</label>
                  <input
                    type="text"
                    defaultValue={getValue('about_title_line1', 'Discover')}
                    onBlur={(e) => handleSave('about_title_line1', e.target.value)}
                    className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                    disabled={saving}
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Title Line 2 (Gradient)</label>
                  <input
                    type="text"
                    defaultValue={getValue('about_title_line2', 'Trinova AI')}
                    onBlur={(e) => handleSave('about_title_line2', e.target.value)}
                    className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                    disabled={saving}
                  />
                </div>

                {/* About Descriptions */}
                {[1, 2, 3, 4].map((num) => (
                  <div key={num}>
                    <label className="block text-white font-medium mb-2">Description Paragraph {num}</label>
                    <textarea
                      rows={3}
                      defaultValue={getValue(`about_description_${num}`, '')}
                      onBlur={(e) => handleSave(`about_description_${num}`, e.target.value)}
                      className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white resize-none"
                      disabled={saving}
                    />
                  </div>
                ))}

                {/* Floating Card Content */}
                <div className="border-t border-cyan-500/20 pt-6 mt-6">
                  <h4 className="text-lg font-bold text-white mb-4">Floating Info Card</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Card Title</label>
                      <input
                        type="text"
                        defaultValue={getValue('about_card_title', 'Full-Stack Innovation')}
                        onBlur={(e) => handleSave('about_card_title', e.target.value)}
                        className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                        disabled={saving}
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Card Subtitle</label>
                      <input
                        type="text"
                        defaultValue={getValue('about_card_subtitle', 'Concept to Market')}
                        onBlur={(e) => handleSave('about_card_subtitle', e.target.value)}
                        className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                        disabled={saving}
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Stat Value</label>
                      <input
                        type="text"
                        defaultValue={getValue('about_card_stat_value', '100%')}
                        onBlur={(e) => handleSave('about_card_stat_value', e.target.value)}
                        className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                        disabled={saving}
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Stat Label</label>
                      <input
                        type="text"
                        defaultValue={getValue('about_card_stat_label', 'Scalable')}
                        onBlur={(e) => handleSave('about_card_stat_label', e.target.value)}
                        className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                        disabled={saving}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Expertise Section Tab */}
        {activeTab === 'expertise' && (
          <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Expertise Section</h3>
            <p className="text-white/60 mb-6">
              The services cards are managed in the <strong>Services</strong> page.
              Go to Services to add/edit the expertise items shown on homepage.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">Section Badge Text</label>
                <input
                  type="text"
                  defaultValue={getValue('expertise_badge', 'Our Expertise')}
                  onBlur={(e) => handleSave('expertise_badge', e.target.value)}
                  className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Section Title</label>
                <input
                  type="text"
                  defaultValue={getValue('expertise_title', 'Comprehensive Solutions')}
                  onBlur={(e) => handleSave('expertise_title', e.target.value)}
                  className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Section Subtitle</label>
                <textarea
                  rows={2}
                  defaultValue={getValue('expertise_subtitle', 'From concept to market, we deliver comprehensive solutions across the entire technology stack')}
                  onBlur={(e) => handleSave('expertise_subtitle', e.target.value)}
                  className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white resize-none"
                  disabled={saving}
                />
              </div>
            </div>

            <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
              <p className="text-cyan-400 text-sm">
                <i className="ri-information-line mr-2"></i>
                To manage the actual service cards (Research & Development, Hardware Designing, etc.), 
                go to <strong>Services</strong> in the sidebar.
              </p>
            </div>
          </div>
        )}

        {/* Other Sections Tab */}
        {activeTab === 'other' && (
          <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Other Homepage Sections</h3>
            <p className="text-white/60">Additional content sections will be added here.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}





