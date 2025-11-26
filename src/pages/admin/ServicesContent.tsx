import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { servicesContentAPI, uploadAPI } from '../../services/api';

interface ContentItem {
  content_key: string;
  content_value: string;
  image_url?: string | null;
}

type TabType = 'hero' | 'tech_stack' | 'ready_to_start' | 'industries';

interface TechCard {
  id: string;
  image_url: string;
  badge: string;
  badge_icon: string;
  title_line1: string;
  title_line2: string;
  description: string;
  features: Array<{ text: string; icon: string }>;
  position: 'left' | 'right';
}

interface IndustryCard {
  id: string;
  image_url: string;
  title: string;
  description: string;
}

// Predefined icon options
const ICON_OPTIONS = [
  { value: 'ri-flask-line', label: '🧪 Flask (R&D)' },
  { value: 'ri-rocket-line', label: '🚀 Rocket (Launch)' },
  { value: 'ri-cpu-line', label: '💻 CPU (Hardware)' },
  { value: 'ri-code-line', label: '💾 Code (Software)' },
  { value: 'ri-lightbulb-line', label: '💡 Lightbulb (Innovation)' },
  { value: 'ri-test-tube-line', label: '🧬 Test Tube (Testing)' },
  { value: 'ri-team-line', label: '👥 Team (Collaboration)' },
  { value: 'ri-refresh-line', label: '🔄 Refresh (Iteration)' },
  { value: 'ri-circuit-line', label: '⚡ Circuit (Electronics)' },
  { value: 'ri-speed-line', label: '⚡ Speed (Performance)' },
  { value: 'ri-bluetooth-line', label: '📶 Bluetooth (Connectivity)' },
  { value: 'ri-battery-charge-line', label: '🔋 Battery (Power)' },
  { value: 'ri-settings-3-line', label: '⚙️ Settings (Configuration)' },
  { value: 'ri-shield-check-line', label: '🛡️ Shield (Security)' },
  { value: 'ri-database-line', label: '🗄️ Database (Storage)' },
  { value: 'ri-wireless-charging-line', label: '📡 Wireless (IoT)' },
  { value: 'ri-radar-line', label: '📡 Radar (Detection)' },
  { value: 'ri-fingerprint-line', label: '👆 Fingerprint (Biometric)' },
  { value: 'ri-microscope-line', label: '🔬 Microscope (Analysis)' },
  { value: 'ri-parent-line', label: '🏥 Medical (Healthcare)' },
];

export default function ServicesContent() {
  const [content, setContent] = useState<Record<string, ContentItem>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('hero');
  const [uploadingImage, setUploadingImage] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  
  // Dynamic cards state
  const [techCards, setTechCards] = useState<TechCard[]>([]);
  const [industryCards, setIndustryCards] = useState<IndustryCard[]>([]);

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
      
      // Parse tech cards
      parseTechCards(contentMap);
      parseIndustryCards(contentMap);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const parseTechCards = (contentMap: Record<string, ContentItem>) => {
    const cards: TechCard[] = [];
    let i = 1;
    while (i <= 9 && contentMap[`service_${i}_badge`]) {
      const features: Array<{ text: string; icon: string }> = [];
      for (let f = 1; f <= 4; f++) {
        if (contentMap[`service_${i}_feature_${f}`]) {
          features.push({
            text: contentMap[`service_${i}_feature_${f}`]?.content_value || '',
            icon: contentMap[`service_${i}_feature_${f}_icon`]?.content_value || 'ri-check-line',
          });
        }
      }
      
      cards.push({
        id: `service_${i}`,
        image_url: contentMap[`service_${i}_image`]?.image_url || '',
        badge: contentMap[`service_${i}_badge`]?.content_value || '',
        badge_icon: contentMap[`service_${i}_badge_icon`]?.content_value || 'ri-flask-line',
        title_line1: contentMap[`service_${i}_title_line1`]?.content_value || '',
        title_line2: contentMap[`service_${i}_title_line2`]?.content_value || '',
        description: contentMap[`service_${i}_description`]?.content_value || '',
        features,
        position: i % 2 === 1 ? 'left' : 'right',
      });
      i++;
    }
    setTechCards(cards);
  };

  const parseIndustryCards = (contentMap: Record<string, ContentItem>) => {
    const cards: IndustryCard[] = [];
    let i = 1;
    while (i <= 9 && contentMap[`industry_${i}_title`]) {
      cards.push({
        id: `industry_${i}`,
        image_url: contentMap[`industry_${i}_image`]?.image_url || '',
        title: contentMap[`industry_${i}_title`]?.content_value || '',
        description: contentMap[`industry_${i}_description`]?.content_value || '',
      });
      i++;
    }
    setIndustryCards(cards);
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

      // Add tech cards
      techCards.forEach((card, idx) => {
        const num = idx + 1;
        sections.push(
          { sectionKey: `service_${num}_badge`, contentValue: card.badge, imageUrl: null },
          { sectionKey: `service_${num}_badge_icon`, contentValue: card.badge_icon, imageUrl: null },
          { sectionKey: `service_${num}_title_line1`, contentValue: card.title_line1, imageUrl: null },
          { sectionKey: `service_${num}_title_line2`, contentValue: card.title_line2, imageUrl: null },
          { sectionKey: `service_${num}_description`, contentValue: card.description, imageUrl: null },
          { sectionKey: `service_${num}_image`, contentValue: '', imageUrl: card.image_url },
        );
        card.features.forEach((feature, fIdx) => {
          sections.push(
            { sectionKey: `service_${num}_feature_${fIdx + 1}`, contentValue: feature.text, imageUrl: null },
            { sectionKey: `service_${num}_feature_${fIdx + 1}_icon`, contentValue: feature.icon, imageUrl: null },
          );
        });
      });

      // Add industry cards
      industryCards.forEach((card, idx) => {
        const num = idx + 1;
        sections.push(
          { sectionKey: `industry_${num}_title`, contentValue: card.title, imageUrl: null },
          { sectionKey: `industry_${num}_description`, contentValue: card.description, imageUrl: null },
          { sectionKey: `industry_${num}_image`, contentValue: '', imageUrl: card.image_url },
        );
      });

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
            techCards={techCards}
            setTechCards={setTechCards}
            setHasChanges={setHasChanges}
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
            industryCards={industryCards}
            setIndustryCards={setIndustryCards}
            setHasChanges={setHasChanges}
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
function TechStackTab({ getValue, getImageUrl, handleInputChange, handleImageUpload, uploadingImage, techCards, setTechCards, setHasChanges, handleSaveAll, saving, hasChanges }: any) {
  const addNewCard = () => {
    if (techCards.length >= 9) {
      alert('Maximum 9 service cards allowed');
      return;
    }
    const newCard: TechCard = {
      id: `service_${techCards.length + 1}`,
      image_url: '',
      badge: 'New Service',
      badge_icon: 'ri-settings-3-line',
      title_line1: 'New',
      title_line2: 'Service',
      description: 'Description here...',
      features: [{ text: 'Feature 1', icon: 'ri-check-line' }],
      position: (techCards.length + 1) % 2 === 1 ? 'left' : 'right',
    };
    setTechCards([...techCards, newCard]);
    setHasChanges(true);
  };

  const deleteCard = (index: number) => {
    if (confirm('Are you sure you want to delete this service card?')) {
      setTechCards(techCards.filter((_: any, i: number) => i !== index));
      setHasChanges(true);
    }
  };

  const updateCard = (index: number, field: string, value: any) => {
    const updated = [...techCards];
    if (field.startsWith('feature_')) {
      const [, featureIdx, featureField] = field.split('_');
      updated[index].features[parseInt(featureIdx)][featureField as 'text' | 'icon'] = value;
    } else {
      (updated[index] as any)[field] = value;
    }
    setTechCards(updated);
    setHasChanges(true);
  };

  const addFeature = (cardIndex: number) => {
    const updated = [...techCards];
    if (updated[cardIndex].features.length >= 4) {
      alert('Maximum 4 features per card');
      return;
    }
    updated[cardIndex].features.push({ text: 'New Feature', icon: 'ri-check-line' });
    setTechCards(updated);
    setHasChanges(true);
  };

  const deleteFeature = (cardIndex: number, featureIndex: number) => {
    const updated = [...techCards];
    updated[cardIndex].features = updated[cardIndex].features.filter((_, i) => i !== featureIndex);
    setTechCards(updated);
    setHasChanges(true);
  };

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
      <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Service Cards ({techCards.length}/9)</h3>
          <button
            onClick={addNewCard}
            disabled={techCards.length >= 9}
            className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i className="ri-add-line mr-2"></i>
            Add New Card
          </button>
        </div>

        <div className="space-y-6">
          {techCards.map((card: TechCard, index: number) => (
            <div key={card.id} className="border border-cyan-500/20 rounded-xl p-6 bg-black/20">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-white">Card {index + 1}</h4>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-white/60 bg-cyan-500/10 px-3 py-1 rounded-full">
                    Image: {card.position === 'left' ? '← Left' : 'Right →'}
                  </span>
                  <button
                    onClick={() => deleteCard(index)}
                    className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
                  >
                    <i className="ri-delete-bin-line mr-1"></i>
                    Delete
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {/* Image Upload */}
                <div>
                  <label className="block text-white font-medium mb-2">Service Image</label>
                  {card.image_url && (
                    <div className="mb-3">
                      <img 
                        src={card.image_url} 
                        alt={`Service ${index + 1}`} 
                        className="w-full h-48 object-cover rounded-lg border border-cyan-500/20"
                      />
                      <div className="mt-2 p-3 bg-black/30 rounded border border-cyan-500/10">
                        <p className="text-xs text-cyan-400 break-all font-mono">{card.image_url}</p>
                      </div>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(`service_${index + 1}_image`, file);
                    }}
                    className="block w-full text-white/60 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/10 file:text-cyan-400 hover:file:bg-cyan-500/20"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Badge Text</label>
                    <input
                      type="text"
                      value={card.badge}
                      onChange={(e) => updateCard(index, 'badge', e.target.value)}
                      className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Badge Icon</label>
                    <select
                      value={card.badge_icon}
                      onChange={(e) => updateCard(index, 'badge_icon', e.target.value)}
                      className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                    >
                      {ICON_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Title Line 1</label>
                    <input
                      type="text"
                      value={card.title_line1}
                      onChange={(e) => updateCard(index, 'title_line1', e.target.value)}
                      className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Title Line 2 (Gradient)</label>
                    <input
                      type="text"
                      value={card.title_line2}
                      onChange={(e) => updateCard(index, 'title_line2', e.target.value)}
                      className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Description</label>
                  <textarea
                    rows={3}
                    value={card.description}
                    onChange={(e) => updateCard(index, 'description', e.target.value)}
                    className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white resize-none"
                  />
                </div>

                {/* Features */}
                <div className="pt-4 border-t border-cyan-500/20">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-white font-medium">Features ({card.features.length}/4)</label>
                    <button
                      onClick={() => addFeature(index)}
                      disabled={card.features.length >= 4}
                      className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-all text-sm disabled:opacity-50"
                    >
                      <i className="ri-add-line mr-1"></i>
                      Add Feature
                    </button>
                  </div>

                  <div className="space-y-3">
                    {card.features.map((feature: any, fIdx: number) => (
                      <div key={fIdx} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={feature.text}
                          onChange={(e) => updateCard(index, `feature_${fIdx}_text`, e.target.value)}
                          placeholder="Feature text"
                          className="flex-1 px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                        />
                        <select
                          value={feature.icon}
                          onChange={(e) => updateCard(index, `feature_${fIdx}_icon`, e.target.value)}
                          className="w-48 px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white text-sm"
                        >
                          {ICON_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => deleteFeature(index, fIdx)}
                          className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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
function IndustriesTab({ getValue, getImageUrl, handleInputChange, handleImageUpload, uploadingImage, industryCards, setIndustryCards, setHasChanges, handleSaveAll, saving, hasChanges }: any) {
  const addNewCard = () => {
    if (industryCards.length >= 9) {
      alert('Maximum 9 industry cards allowed');
      return;
    }
    const newCard: IndustryCard = {
      id: `industry_${industryCards.length + 1}`,
      image_url: '',
      title: 'New Industry',
      description: 'Description here...',
    };
    setIndustryCards([...industryCards, newCard]);
    setHasChanges(true);
  };

  const deleteCard = (index: number) => {
    if (confirm('Are you sure you want to delete this industry card?')) {
      setIndustryCards(industryCards.filter((_: any, i: number) => i !== index));
      setHasChanges(true);
    }
  };

  const updateCard = (index: number, field: string, value: string) => {
    const updated = [...industryCards];
    (updated[index] as any)[field] = value;
    setIndustryCards(updated);
    setHasChanges(true);
  };

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
      <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Industry Cards ({industryCards.length}/9)</h3>
          <button
            onClick={addNewCard}
            disabled={industryCards.length >= 9}
            className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i className="ri-add-line mr-2"></i>
            Add New Card
          </button>
        </div>

        <div className="space-y-6">
          {industryCards.map((card: IndustryCard, index: number) => (
            <div key={card.id} className="border border-cyan-500/20 rounded-xl p-6 bg-black/20">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-white">Card {index + 1}: {card.title}</h4>
                <button
                  onClick={() => deleteCard(index)}
                  className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
                >
                  <i className="ri-delete-bin-line mr-1"></i>
                  Delete
                </button>
              </div>

              <div className="space-y-4">
                {/* Industry Image */}
                <div>
                  <label className="block text-white font-medium mb-2">Industry Image</label>
                  {card.image_url && (
                    <div className="mb-3">
                      <img 
                        src={card.image_url} 
                        alt={card.title} 
                        className="w-full h-48 object-cover rounded-lg border border-cyan-500/20"
                      />
                      <div className="mt-2 p-3 bg-black/30 rounded border border-cyan-500/10">
                        <p className="text-xs text-cyan-400 break-all font-mono">{card.image_url}</p>
                      </div>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(`industry_${index + 1}_image`, file);
                    }}
                    className="block w-full text-white/60 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/10 file:text-cyan-400 hover:file:bg-cyan-500/20"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Industry Title</label>
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) => updateCard(index, 'title', e.target.value)}
                    className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Industry Description</label>
                  <textarea
                    rows={2}
                    value={card.description}
                    onChange={(e) => updateCard(index, 'description', e.target.value)}
                    className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white resize-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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
