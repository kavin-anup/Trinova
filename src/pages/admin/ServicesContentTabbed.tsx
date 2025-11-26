import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { servicesContentAPI, uploadAPI } from '../../services/api';

interface ContentItem {
  content_key: string;
  content_value: string;
  image_url?: string | null;
}

type TabType = 'hero' | 'core' | 'service1' | 'service2' | 'service3' | 'service4' | 'industries';

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
    const formValue = formData[key];
    const contentValue = content[key]?.content_value;
    return formValue !== undefined ? String(formValue) : (contentValue || fallback);
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
      
      // Update the image for this specific key
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
    { id: 'core', label: 'Core Services', icon: 'ri-stack-line' },
    { id: 'service1', label: 'R&D Service', icon: 'ri-flask-line' },
    { id: 'service2', label: 'End-to-End', icon: 'ri-rocket-line' },
    { id: 'service3', label: 'Hardware', icon: 'ri-cpu-line' },
    { id: 'service4', label: 'Firmware', icon: 'ri-code-line' },
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
              className={`px-4 py-3 font-medium transition-all whitespace-nowrap ${
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
          <div className="space-y-6">
            <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Hero Section Content</h3>
              
              <div className="space-y-4">
                {/* Hero Background Image */}
                <div>
                  <label className="block text-white font-medium mb-2">Hero Background Image</label>
                  <p className="text-white/40 text-sm mb-3">Full-width background image for hero section</p>
                  
                  {getImageUrl('hero_background_image') && (
                    <div className="mb-3">
                      <img 
                        src={getImageUrl('hero_background_image')} 
                        alt="Hero Background" 
                        className="w-full h-48 object-cover rounded-lg border border-cyan-500/20"
                      />
                      <div className="mt-2 p-2 bg-black/30 rounded border border-cyan-500/10">
                        <p className="text-xs text-white/40 mb-1">Image URL:</p>
                        <p className="text-xs text-cyan-400 break-all">{getImageUrl('hero_background_image')}</p>
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
                      Uploading...
                    </p>
                  )}
                </div>

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

                <div className="pt-4 border-t border-cyan-500/20">
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
        )}

        {/* Core Services Section Tab */}
        {activeTab === 'core' && (
          <div className="space-y-6">
            <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Core Services Section Header</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white font-medium mb-2">Badge Text</label>
                  <input
                    type="text"
                    value={getValue('core_badge', 'Technology Stack')}
                    onChange={(e) => handleInputChange('core_badge', e.target.value)}
                    className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Title Line 1</label>
                  <input
                    type="text"
                    value={getValue('core_title_line1', 'Our End-to-End')}
                    onChange={(e) => handleInputChange('core_title_line1', e.target.value)}
                    className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Title Line 2 (Gradient)</label>
                  <input
                    type="text"
                    value={getValue('core_title_line2', 'Technology Stack')}
                    onChange={(e) => handleInputChange('core_title_line2', e.target.value)}
                    className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Description</label>
                  <textarea
                    rows={2}
                    value={getValue('core_description', 'Comprehensive solutions spanning the entire product development lifecycle')}
                    onChange={(e) => handleInputChange('core_description', e.target.value)}
                    className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white resize-none"
                  />
                </div>

                <div className="pt-4 border-t border-cyan-500/20">
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
                        {hasChanges ? 'Save Section Header' : 'No Changes to Save'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Service 1: R&D Tab */}
        {activeTab === 'service1' && (
          <ServiceTab
            serviceNum={1}
            serviceName="Research & Development"
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

        {/* Service 2: End-to-End Tab */}
        {activeTab === 'service2' && (
          <ServiceTab
            serviceNum={2}
            serviceName="End-to-End Product Development"
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

        {/* Service 3: Hardware Tab */}
        {activeTab === 'service3' && (
          <ServiceTab
            serviceNum={3}
            serviceName="Hardware Designing"
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

        {/* Service 4: Firmware Tab */}
        {activeTab === 'service4' && (
          <ServiceTab
            serviceNum={4}
            serviceName="Firmware Development"
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

// Service Tab Component
function ServiceTab({ 
  serviceNum, 
  serviceName, 
  getValue, 
  getImageUrl, 
  handleInputChange, 
  handleImageUpload,
  uploadingImage,
  handleSaveAll,
  saving,
  hasChanges
}: any) {
  return (
    <div className="space-y-6">
      <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">{serviceName}</h3>
        
        <div className="space-y-4">
          {/* Service Image */}
          <div>
            <label className="block text-white font-medium mb-2">Service Image</label>
            <p className="text-white/40 text-sm mb-3">Main image for this service</p>
            
            {getImageUrl(`service_${serviceNum}_image`) && (
              <div className="mb-3">
                <img 
                  src={getImageUrl(`service_${serviceNum}_image`)} 
                  alt={serviceName} 
                  className="w-full h-64 object-cover rounded-lg border border-cyan-500/20"
                />
                <div className="mt-2 p-2 bg-black/30 rounded border border-cyan-500/10">
                  <p className="text-xs text-white/40 mb-1">Image URL:</p>
                  <p className="text-xs text-cyan-400 break-all">{getImageUrl(`service_${serviceNum}_image`)}</p>
                </div>
              </div>
            )}
            
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(`service_${serviceNum}_image`, file);
              }}
              className="block w-full text-white/60 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/10 file:text-cyan-400 hover:file:bg-cyan-500/20"
              disabled={uploadingImage === `service_${serviceNum}_image`}
            />
            {uploadingImage === `service_${serviceNum}_image` && (
              <p className="text-cyan-400 text-sm mt-2">
                <i className="ri-loader-4-line animate-spin mr-1"></i>
                Uploading...
              </p>
            )}
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Badge Text</label>
            <input
              type="text"
              value={getValue(`service_${serviceNum}_badge`, '')}
              onChange={(e) => handleInputChange(`service_${serviceNum}_badge`, e.target.value)}
              className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Title Line 1</label>
            <input
              type="text"
              value={getValue(`service_${serviceNum}_title_line1`, '')}
              onChange={(e) => handleInputChange(`service_${serviceNum}_title_line1`, e.target.value)}
              className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Title Line 2 (Gradient)</label>
            <input
              type="text"
              value={getValue(`service_${serviceNum}_title_line2`, '')}
              onChange={(e) => handleInputChange(`service_${serviceNum}_title_line2`, e.target.value)}
              className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Description</label>
            <textarea
              rows={4}
              value={getValue(`service_${serviceNum}_description`, '')}
              onChange={(e) => handleInputChange(`service_${serviceNum}_description`, e.target.value)}
              className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-medium mb-2">Feature 1</label>
              <input
                type="text"
                value={getValue(`service_${serviceNum}_feature_1`, '')}
                onChange={(e) => handleInputChange(`service_${serviceNum}_feature_1`, e.target.value)}
                className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-white font-medium mb-2">Feature 2</label>
              <input
                type="text"
                value={getValue(`service_${serviceNum}_feature_2`, '')}
                onChange={(e) => handleInputChange(`service_${serviceNum}_feature_2`, e.target.value)}
                className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-cyan-500/20">
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
                  {hasChanges ? `Save ${serviceName}` : 'No Changes to Save'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Industries Tab Component
function IndustriesTab({ getValue, getImageUrl, handleInputChange, handleImageUpload, uploadingImage, handleSaveAll, saving, hasChanges }: any) {
  return (
    <div className="space-y-6">
      <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Industries Section</h3>
        
        <div className="space-y-6">
          {/* Section Header */}
          <div className="space-y-4 pb-6 border-b border-cyan-500/20">
            <h4 className="text-lg font-bold text-white">Section Header</h4>
            
            <div>
              <label className="block text-white font-medium mb-2">Badge Text</label>
              <input
                type="text"
                value={getValue('industries_badge', 'Sectors We Serve')}
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

          {/* Industry Cards */}
          {[1, 2, 3, 4].map(num => (
            <div key={num} className="space-y-4 pb-6 border-b border-cyan-500/20">
              <h4 className="text-lg font-bold text-white">Industry {num}</h4>

              {/* Industry Image */}
              <div>
                <label className="block text-white font-medium mb-2">Industry Image</label>
                
                {getImageUrl(`industry_${num}_image`) && (
                  <div className="mb-3">
                    <img 
                      src={getImageUrl(`industry_${num}_image`)} 
                      alt={`Industry ${num}`} 
                      className="w-full h-48 object-cover rounded-lg border border-cyan-500/20"
                    />
                    <div className="mt-2 p-2 bg-black/30 rounded border border-cyan-500/10">
                      <p className="text-xs text-white/40 mb-1">Image URL:</p>
                      <p className="text-xs text-cyan-400 break-all">{getImageUrl(`industry_${num}_image`)}</p>
                    </div>
                  </div>
                )}
                
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(`industry_${num}_image`, file);
                  }}
                  className="block w-full text-white/60 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/10 file:text-cyan-400 hover:file:bg-cyan-500/20"
                  disabled={uploadingImage === `industry_${num}_image`}
                />
                {uploadingImage === `industry_${num}_image` && (
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
                  value={getValue(`industry_${num}_title`, '')}
                  onChange={(e) => handleInputChange(`industry_${num}_title`, e.target.value)}
                  className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Industry Description</label>
                <textarea
                  rows={2}
                  value={getValue(`industry_${num}_description`, '')}
                  onChange={(e) => handleInputChange(`industry_${num}_description`, e.target.value)}
                  className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white resize-none"
                />
              </div>
            </div>
          ))}

          <div className="pt-4 border-t border-cyan-500/20">
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
      </div>
    </div>
  );
}


