import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { servicesContentAPI, uploadAPI } from '../../services/api';

interface ContentItem {
  content_key: string;
  content_value: string;
  image_url?: string | null;
}

type TabType = 'hero' | 'tech_stack' | 'ready_to_start' | 'industries';

export default function ServicesContent() {
  const [content, setContent] = useState<Record<string, ContentItem>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('hero');
  const [uploadingImage, setUploadingImage] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await servicesContentAPI.getAll();
      const contentItems = response.data?.content || [];
      
      const contentMap: Record<string, ContentItem> = {};
      const formValues: Record<string, string> = {};
      
      contentItems.forEach((item: any) => {
        contentMap[item.content_key] = {
          content_key: item.content_key,
          content_value: item.content_value || '',
          image_url: item.image_url || null,
        };
        formValues[item.content_key] = item.content_value || '';
      });
      
      setContent(contentMap);
      setFormData(formValues);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const getValue = (key: string, fallback: string = '') => {
    return formData[key] !== undefined ? String(formData[key]) : (content[key]?.content_value || fallback);
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
      const sections = Object.entries(formData)
        .filter(([key, value]) => value !== (content[key]?.content_value || ''))
        .map(([key, value]) => ({
          sectionKey: key,
          contentValue: value,
          contentType: 'text',
          imageUrl: content[key]?.image_url || null
        }));

      if (sections.length) {
        await servicesContentAPI.bulkUpdate(sections);
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
      const response = await uploadAPI.uploadImage(file, 'services');
      const imageUrl = response.data?.media?.url;
      
      await servicesContentAPI.bulkUpdate([{
        sectionKey: key,
        contentValue: getValue(key),
        imageUrl: imageUrl
      }]);
      
      await fetchContent();
      alert('✅ Image uploaded successfully!');
    } catch (error: any) {
      alert(error.message || 'Error uploading image');
    } finally {
      setUploadingImage(null);
    }
  };

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'hero', label: 'Hero Section', icon: 'ri-home-4-line' },
    { id: 'tech_stack', label: 'Technology Stack', icon: 'ri-stack-line' },
    { id: 'ready_to_start', label: 'Ready to Start', icon: 'ri-rocket-launch-line' },
    { id: 'industries', label: 'Industries', icon: 'ri-building-4-line' },
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
            <h2 className="text-2xl font-bold text-white">Services Page Content</h2>
            <p className="text-white/60 mt-1">Edit all content sections of the services page</p>
          </div>
          
          {hasChanges && (
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
        <div className="flex space-x-2 border-b border-cyan-500/20 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium transition-all whitespace-nowrap ${
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

        {/* Hero Section Tab */}
        {activeTab === 'hero' && (
          <HeroTab
            getValue={getValue}
            getImageUrl={getImageUrl}
            handleInputChange={handleInputChange}
            handleImageUpload={handleImageUpload}
            uploadingImage={uploadingImage}
            handleSaveAll={handleSaveAll}
            saving={saving}
            hasChanges={hasChanges}
          />
        )}

        {/* Technology Stack Tab */}
        {activeTab === 'tech_stack' && (
          <TechStackTab
            getValue={getValue}
            getImageUrl={getImageUrl}
            handleInputChange={handleInputChange}
            handleImageUpload={handleImageUpload}
            uploadingImage={uploadingImage}
            handleSaveAll={handleSaveAll}
            saving={saving}
            hasChanges={hasChanges}
          />
        )}

        {/* Ready to Start Tab */}
        {activeTab === 'ready_to_start' && (
          <ReadyToStartTab
            getValue={getValue}
            handleInputChange={handleInputChange}
            handleSaveAll={handleSaveAll}
            saving={saving}
            hasChanges={hasChanges}
          />
        )}

        {/* Industries Tab */}
        {activeTab === 'industries' && (
          <IndustriesTab
            getValue={getValue}
            getImageUrl={getImageUrl}
            handleInputChange={handleInputChange}
            handleImageUpload={handleImageUpload}
            uploadingImage={uploadingImage}
            handleSaveAll={handleSaveAll}
            saving={saving}
            hasChanges={hasChanges}
          />
        )}
      </div>
    </AdminLayout>
  );
}

// Hero Section Tab
function HeroTab({ getValue, getImageUrl, handleInputChange, handleImageUpload, uploadingImage, handleSaveAll, saving, hasChanges }: any) {
  return (
    <div className="space-y-6">
      <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Hero Section Content</h3>
        
        <div className="space-y-6">
          {/* Hero Background Image */}
          <div>
            <label className="block text-white font-medium mb-2">Hero Background Image</label>
            <p className="text-white/40 text-sm mb-3">Full-width background image for hero section</p>
            
            {getImageUrl('hero_background_image') && (
              <div className="mb-3">
                <img 
                  src={getImageUrl('hero_background_image')} 
                  alt="Hero Background" 
                  className="w-full h-64 object-cover rounded-lg border border-cyan-500/20"
                />
                <div className="mt-2 p-3 bg-black/30 rounded border border-cyan-500/10">
                  <p className="text-xs text-white/40 mb-1">📷 Current Image URL:</p>
                  <p className="text-xs text-cyan-400 break-all font-mono">{getImageUrl('hero_background_image')}</p>
                </div>
              </div>
            )}
            
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload('hero_background_image', file);
              }}
              className="block w-full text-white/60 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/10 file:text-cyan-400 hover:file:bg-cyan-500/20"
              disabled={uploadingImage === 'hero_background_image'}
            />
            {uploadingImage === 'hero_background_image' && (
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
                value={getValue('hero_badge', 'Our Services')}
                onChange={(e) => handleInputChange('hero_badge', e.target.value)}
                className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Title Line 1</label>
              <input
                type="text"
                value={getValue('hero_title_line1', 'Comprehensive Solutions for')}
                onChange={(e) => handleInputChange('hero_title_line1', e.target.value)}
                className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Title Line 2 (Gradient)</label>
            <input
              type="text"
              value={getValue('hero_title_line2', 'Intelligent Electronics')}
              onChange={(e) => handleInputChange('hero_title_line2', e.target.value)}
              className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Subtitle</label>
            <textarea
              rows={3}
              value={getValue('hero_subtitle', 'From deep R&D and hardware engineering to high-volume manufacturing and AI integration, Trinova AI is your full-stack product realization partner.')}
              onChange={(e) => handleInputChange('hero_subtitle', e.target.value)}
              className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white resize-none"
            />
          </div>

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
                  {hasChanges ? 'Save Hero Section' : 'No Changes to Save'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Technology Stack Tab
function TechStackTab({ getValue, getImageUrl, handleInputChange, handleImageUpload, uploadingImage, handleSaveAll, saving, hasChanges }: any) {
  const serviceCards = [
    { num: 1, name: 'R&D', icon: 'ri-flask-line', position: 'left' },
    { num: 2, name: 'End-to-End', icon: 'ri-rocket-line', position: 'right' },
    { num: 3, name: 'Hardware', icon: 'ri-cpu-line', position: 'left' },
    { num: 4, name: 'Firmware', icon: 'ri-code-line', position: 'right' },
  ];

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Technology Stack - Section Header</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-medium mb-2">Badge Text</label>
              <input
                type="text"
                value={getValue('tech_stack_badge', 'Technology Stack')}
                onChange={(e) => handleInputChange('tech_stack_badge', e.target.value)}
                className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Title Line 1</label>
              <input
                type="text"
                value={getValue('tech_stack_title_line1', 'Our End-to-End')}
                onChange={(e) => handleInputChange('tech_stack_title_line1', e.target.value)}
                className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Title Line 2 (Gradient)</label>
            <input
              type="text"
              value={getValue('tech_stack_title_line2', 'Technology Stack')}
              onChange={(e) => handleInputChange('tech_stack_title_line2', e.target.value)}
              className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Description</label>
            <textarea
              rows={2}
              value={getValue('tech_stack_description', 'Comprehensive solutions spanning the entire product development lifecycle')}
              onChange={(e) => handleInputChange('tech_stack_description', e.target.value)}
              className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white resize-none"
            />
          </div>

          {/* Header Image */}
          <div className="pt-4 border-t border-cyan-500/20">
            <label className="block text-white font-medium mb-2">Header Image (Below Title)</label>
            <p className="text-white/40 text-sm mb-3">Image displayed below the Technology Stack header</p>
            
            {getImageUrl('tech_stack_header_image') && (
              <div className="mb-3">
                <img 
                  src={getImageUrl('tech_stack_header_image')} 
                  alt="Tech Stack Header" 
                  className="w-full h-48 object-cover rounded-lg border border-cyan-500/20"
                />
                <div className="mt-2 p-3 bg-black/30 rounded border border-cyan-500/10">
                  <p className="text-xs text-white/40 mb-1">📷 Current Image URL:</p>
                  <p className="text-xs text-cyan-400 break-all font-mono">{getImageUrl('tech_stack_header_image')}</p>
                </div>
              </div>
            )}
            
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload('tech_stack_header_image', file);
              }}
              className="block w-full text-white/60 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/10 file:text-cyan-400 hover:file:bg-cyan-500/20"
              disabled={uploadingImage === 'tech_stack_header_image'}
            />
            {uploadingImage === 'tech_stack_header_image' && (
              <p className="text-cyan-400 text-sm mt-2">
                <i className="ri-loader-4-line animate-spin mr-1"></i>
                Uploading...
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Service Cards */}
      {serviceCards.map((card) => (
        <div key={card.num} className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white flex items-center">
              <i className={`${card.icon} mr-2 text-cyan-400`}></i>
              Service Card {card.num}: {card.name}
            </h3>
            <span className="text-xs text-white/60 bg-cyan-500/10 px-3 py-1 rounded-full">
              Image Position: {card.position === 'left' ? '← Left' : 'Right →'}
            </span>
          </div>
          
          <div className="space-y-4">
            {/* Service Main Image */}
            <div>
              <label className="block text-white font-medium mb-2">Service Image</label>
              <p className="text-white/40 text-sm mb-3">Main image for this service card</p>
              
              {getImageUrl(`service_${card.num}_image`) && (
                <div className="mb-3">
                  <img 
                    src={getImageUrl(`service_${card.num}_image`)} 
                    alt={`Service ${card.num}`} 
                    className="w-full h-64 object-cover rounded-lg border border-cyan-500/20"
                  />
                  <div className="mt-2 p-3 bg-black/30 rounded border border-cyan-500/10">
                    <p className="text-xs text-white/40 mb-1">📷 Current Image URL:</p>
                    <p className="text-xs text-cyan-400 break-all font-mono">{getImageUrl(`service_${card.num}_image`)}</p>
                  </div>
                </div>
              )}
              
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(`service_${card.num}_image`, file);
                }}
                className="block w-full text-white/60 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/10 file:text-cyan-400 hover:file:bg-cyan-500/20"
                disabled={uploadingImage === `service_${card.num}_image`}
              />
              {uploadingImage === `service_${card.num}_image` && (
                <p className="text-cyan-400 text-sm mt-2">
                  <i className="ri-loader-4-line animate-spin mr-1"></i>
                  Uploading...
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">Badge Text</label>
                <input
                  type="text"
                  value={getValue(`service_${card.num}_badge`, '')}
                  onChange={(e) => handleInputChange(`service_${card.num}_badge`, e.target.value)}
                  className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                  placeholder="e.g., R&D Excellence"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Badge Icon (Remix Icon)</label>
                <input
                  type="text"
                  value={getValue(`service_${card.num}_badge_icon`, card.icon)}
                  onChange={(e) => handleInputChange(`service_${card.num}_badge_icon`, e.target.value)}
                  className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white font-mono text-sm"
                  placeholder="ri-flask-line"
                />
                <a href="https://remixicon.com" target="_blank" className="text-cyan-400 text-xs mt-1 inline-block hover:underline">
                  Browse icons →
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">Title Line 1</label>
                <input
                  type="text"
                  value={getValue(`service_${card.num}_title_line1`, '')}
                  onChange={(e) => handleInputChange(`service_${card.num}_title_line1`, e.target.value)}
                  className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Title Line 2 (Gradient)</label>
                <input
                  type="text"
                  value={getValue(`service_${card.num}_title_line2`, '')}
                  onChange={(e) => handleInputChange(`service_${card.num}_title_line2`, e.target.value)}
                  className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Description</label>
              <textarea
                rows={3}
                value={getValue(`service_${card.num}_description`, '')}
                onChange={(e) => handleInputChange(`service_${card.num}_description`, e.target.value)}
                className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white resize-none"
              />
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">Feature 1 Text</label>
                <input
                  type="text"
                  value={getValue(`service_${card.num}_feature_1`, '')}
                  onChange={(e) => handleInputChange(`service_${card.num}_feature_1`, e.target.value)}
                  className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Feature 1 Icon</label>
                <input
                  type="text"
                  value={getValue(`service_${card.num}_feature_1_icon`, 'ri-lightbulb-line')}
                  onChange={(e) => handleInputChange(`service_${card.num}_feature_1_icon`, e.target.value)}
                  className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white font-mono text-sm"
                  placeholder="ri-lightbulb-line"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">Feature 2 Text</label>
                <input
                  type="text"
                  value={getValue(`service_${card.num}_feature_2`, '')}
                  onChange={(e) => handleInputChange(`service_${card.num}_feature_2`, e.target.value)}
                  className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Feature 2 Icon</label>
                <input
                  type="text"
                  value={getValue(`service_${card.num}_feature_2_icon`, 'ri-test-tube-line')}
                  onChange={(e) => handleInputChange(`service_${card.num}_feature_2_icon`, e.target.value)}
                  className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white font-mono text-sm"
                  placeholder="ri-test-tube-line"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
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
              {hasChanges ? 'Save Technology Stack' : 'No Changes to Save'}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// Ready to Start Tab
function ReadyToStartTab({ getValue, handleInputChange, handleSaveAll, saving, hasChanges }: any) {
  return (
    <div className="space-y-6">
      <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Ready to Start Project Section</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-white font-medium mb-2">Badge Text</label>
            <input
              type="text"
              value={getValue('ready_badge', 'Ready to Start?')}
              onChange={(e) => handleInputChange('ready_badge', e.target.value)}
              className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Title Line 1</label>
            <input
              type="text"
              value={getValue('ready_title_line1', "Let's Build Your Next")}
              onChange={(e) => handleInputChange('ready_title_line1', e.target.value)}
              className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Title Line 2 (Gradient)</label>
            <input
              type="text"
              value={getValue('ready_title_line2', 'Intelligent Product')}
              onChange={(e) => handleInputChange('ready_title_line2', e.target.value)}
              className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Description</label>
            <textarea
              rows={3}
              value={getValue('ready_description', 'Partner with Trinova AI for comprehensive technology solutions that bring your vision to life')}
              onChange={(e) => handleInputChange('ready_description', e.target.value)}
              className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white resize-none"
            />
          </div>

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
                  {hasChanges ? 'Save Ready to Start Section' : 'No Changes to Save'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Industries Tab
function IndustriesTab({ getValue, getImageUrl, handleInputChange, handleImageUpload, uploadingImage, handleSaveAll, saving, hasChanges }: any) {
  const industries = [
    { num: 1, name: 'Consumer Electronics' },
    { num: 2, name: 'Industrial Automation' },
    { num: 3, name: 'Medical Devices' },
    { num: 4, name: 'IoT Solutions' },
    { num: 5, name: 'Defense & Aerospace' },
    { num: 6, name: 'Energy & Utilities' },
  ];

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Industries Section Header</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-medium mb-2">Badge Text</label>
              <input
                type="text"
                value={getValue('industries_badge', 'Industry Focus')}
                onChange={(e) => handleInputChange('industries_badge', e.target.value)}
                className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Title Line 1</label>
              <input
                type="text"
                value={getValue('industries_title_line1', 'Industries We')}
                onChange={(e) => handleInputChange('industries_title_line1', e.target.value)}
                className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Title Line 2 (Gradient)</label>
            <input
              type="text"
              value={getValue('industries_title_line2', 'Transform')}
              onChange={(e) => handleInputChange('industries_title_line2', e.target.value)}
              className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Description</label>
            <textarea
              rows={2}
              value={getValue('industries_description', 'Delivering cutting-edge solutions across diverse sectors with specialized expertise')}
              onChange={(e) => handleInputChange('industries_description', e.target.value)}
              className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white resize-none"
            />
          </div>
        </div>
      </div>

      {/* Industry Cards */}
      {industries.map((industry) => (
        <div key={industry.num} className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
          <h4 className="text-lg font-bold text-white mb-4">Industry Card {industry.num}: {industry.name}</h4>

          <div className="space-y-4">
            {/* Industry Image */}
            <div>
              <label className="block text-white font-medium mb-2">Industry Image</label>
              
              {getImageUrl(`industry_${industry.num}_image`) && (
                <div className="mb-3">
                  <img 
                    src={getImageUrl(`industry_${industry.num}_image`)} 
                    alt={industry.name} 
                    className="w-full h-56 object-cover rounded-lg border border-cyan-500/20"
                  />
                  <div className="mt-2 p-3 bg-black/30 rounded border border-cyan-500/10">
                    <p className="text-xs text-white/40 mb-1">📷 Current Image URL:</p>
                    <p className="text-xs text-cyan-400 break-all font-mono">{getImageUrl(`industry_${industry.num}_image`)}</p>
                  </div>
                </div>
              )}
              
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(`industry_${industry.num}_image`, file);
                }}
                className="block w-full text-white/60 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/10 file:text-cyan-400 hover:file:bg-cyan-500/20"
                disabled={uploadingImage === `industry_${industry.num}_image`}
              />
              {uploadingImage === `industry_${industry.num}_image` && (
                <p className="text-cyan-400 text-sm mt-2">
                  <i className="ri-loader-4-line animate-spin mr-1"></i>
                  Uploading...
                </p>
              )}
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Industry Title</label>
              <input
                type="text"
                value={getValue(`industry_${industry.num}_title`, industry.name)}
                onChange={(e) => handleInputChange(`industry_${industry.num}_title`, e.target.value)}
                className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Industry Description</label>
              <textarea
                rows={2}
                value={getValue(`industry_${industry.num}_description`, '')}
                onChange={(e) => handleInputChange(`industry_${industry.num}_description`, e.target.value)}
                className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white resize-none"
              />
            </div>
          </div>
        </div>
      ))}

      <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
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
              {hasChanges ? 'Save Industries Section' : 'No Changes to Save'}
            </>
          )}
        </button>
      </div>
    </div>
  );
}


