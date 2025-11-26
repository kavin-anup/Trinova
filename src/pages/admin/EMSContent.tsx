import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { emsContentAPI, uploadAPI } from '../../services/api';

interface ContentItem {
  content_key: string;
  content_value: string;
  image_url?: string | null;
}

type TabType = 'hero' | 'pipeline' | 'foundation' | 'quality' | 'cta';

interface PipelineCard {
  id: string;
  badge: string;
  badge_icon: string;
  title_line1: string;
  title_line2: string;
  focus: string;
  services: Array<{ text: string; icon: string }>;
  image_url: string;
  position: 'left' | 'right';
}

interface CoreValueCard {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface QualityCard {
  id: string;
  title: string;
  description: string;
  icon: string;
}

// Icon options for pipeline services
const PIPELINE_SERVICE_ICONS = [
  { value: 'ri-settings-line', label: '⚙️ Settings' },
  { value: 'ri-stack-line', label: '📚 Stack' },
  { value: 'ri-circuit-line', label: '⚡ Circuit' },
  { value: 'ri-flex-line', label: '🔲 Flexible' },
  { value: 'ri-focus-3-line', label: '🎯 Focus' },
  { value: 'ri-recycle-line', label: '♻️ Recycle' },
  { value: 'ri-grid-line', label: '▦ Grid' },
  { value: 'ri-cpu-line', label: '💻 CPU' },
  { value: 'ri-robot-line', label: '🤖 Robot' },
  { value: 'ri-shield-check-line', label: '🛡️ Shield' },
  { value: 'ri-flashlight-line', label: '🔦 Flashlight' },
  { value: 'ri-radar-line', label: '📡 Radar' },
  { value: 'ri-settings-3-line', label: '⚙️ Settings 3' },
  { value: 'ri-file-list-3-line', label: '📋 File List' },
];

// Icon options for pipeline badges
const PIPELINE_BADGE_ICONS = [
  { value: 'ri-compasses-2-line', label: '🧭 Compass' },
  { value: 'ri-hammer-line', label: '🔨 Hammer' },
  { value: 'ri-artboard-line', label: '🎨 Artboard' },
  { value: 'ri-tools-line', label: '🛠️ Tools' },
  { value: 'ri-test-tube-line', label: '🧪 Test Tube' },
  { value: 'ri-flask-line', label: '🧪 Flask' },
  { value: 'ri-cpu-line', label: '💻 CPU' },
  { value: 'ri-code-line', label: '💾 Code' },
];

// Icon options for core values
const CORE_VALUE_ICONS = [
  { value: 'ri-focus-3-line', label: '🎯 Focus' },
  { value: 'ri-award-line', label: '🏆 Award' },
  { value: 'ri-shield-check-line', label: '🛡️ Shield Check' },
  { value: 'ri-customer-service-line', label: '👤 Customer Service' },
  { value: 'ri-heart-line', label: '❤️ Heart' },
  { value: 'ri-star-line', label: '⭐ Star' },
  { value: 'ri-lightbulb-line', label: '💡 Lightbulb' },
  { value: 'ri-team-line', label: '👥 Team' },
  { value: 'ri-medal-line', label: '🥇 Medal' },
  { value: 'ri-trophy-line', label: '🏆 Trophy' },
  { value: 'ri-rocket-line', label: '🚀 Rocket' },
  { value: 'ri-global-line', label: '🌐 Global' },
];

// Icon options for quality cards
const QUALITY_ICONS = [
  { value: 'ri-search-line', label: '🔍 Search' },
  { value: 'ri-test-tube-line', label: '🧪 Test Tube' },
  { value: 'ri-eye-line', label: '👁️ Eye' },
  { value: 'ri-checkbox-circle-line', label: '✓ Check Circle' },
  { value: 'ri-shield-check-line', label: '🛡️ Shield Check' },
  { value: 'ri-microscope-line', label: '🔬 Microscope' },
  { value: 'ri-focus-3-line', label: '🎯 Focus' },
  { value: 'ri-radar-line', label: '📡 Radar' },
  { value: 'ri-settings-3-line', label: '⚙️ Settings' },
  { value: 'ri-scan-line', label: '📷 Scan' },
  { value: 'ri-file-list-3-line', label: '📋 File List' },
  { value: 'ri-check-double-line', label: '✓✓ Double Check' },
];

export default function EMSContent() {
  const [content, setContent] = useState<Record<string, ContentItem>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('hero');
  const [uploadingImage, setUploadingImage] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  
  // Dynamic cards state
  const [pipelineCards, setPipelineCards] = useState<PipelineCard[]>([]);
  const [coreValueCards, setCoreValueCards] = useState<CoreValueCard[]>([]);
  const [qualityCards, setQualityCards] = useState<QualityCard[]>([]);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await emsContentAPI.getAll();
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
      
      // Parse dynamic cards
      parsePipelineCards(contentMap);
      parseCoreValueCards(contentMap);
      parseQualityCards(contentMap);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const parsePipelineCards = (contentMap: Record<string, ContentItem>) => {
    const cards: PipelineCard[] = [];
    let i = 1;
    while (i <= 8 && contentMap[`step_${i}_badge`]) {
      const services: Array<{ text: string; icon: string }> = [];
      for (let s = 1; s <= 4; s++) {
        if (contentMap[`step_${i}_service_${s}`]) {
          services.push({
            text: contentMap[`step_${i}_service_${s}`]?.content_value || '',
            icon: contentMap[`step_${i}_service_${s}_icon`]?.content_value || 'ri-check-line',
          });
        }
      }
      
      cards.push({
        id: `step_${i}`,
        badge: contentMap[`step_${i}_badge`]?.content_value || '',
        badge_icon: contentMap[`step_${i}_badge_icon`]?.content_value || 'ri-compasses-2-line',
        title_line1: contentMap[`step_${i}_title_line1`]?.content_value || '',
        title_line2: contentMap[`step_${i}_title_line2`]?.content_value || '',
        focus: contentMap[`step_${i}_focus`]?.content_value || '',
        services,
        image_url: contentMap[`step_${i}_image`]?.image_url || '',
        position: i % 2 === 1 ? 'left' : 'right',
      });
      i++;
    }
    setPipelineCards(cards);
  };

  const parseCoreValueCards = (contentMap: Record<string, ContentItem>) => {
    const cards: CoreValueCard[] = [];
    let i = 1;
    while (i <= 8 && contentMap[`value_${i}_title`]) {
      cards.push({
        id: `value_${i}`,
        title: contentMap[`value_${i}_title`]?.content_value || '',
        description: contentMap[`value_${i}_text`]?.content_value || '',
        icon: contentMap[`value_${i}_icon`]?.content_value || 'ri-focus-3-line',
      });
      i++;
    }
    setCoreValueCards(cards);
  };

  const parseQualityCards = (contentMap: Record<string, ContentItem>) => {
    const cards: QualityCard[] = [];
    let i = 1;
    while (i <= 8 && contentMap[`quality_process_${i}_title`]) {
      cards.push({
        id: `quality_process_${i}`,
        title: contentMap[`quality_process_${i}_title`]?.content_value || '',
        description: contentMap[`quality_process_${i}_text`]?.content_value || '',
        icon: contentMap[`quality_process_${i}_icon`]?.content_value || 'ri-search-line',
      });
      i++;
    }
    setQualityCards(cards);
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

      // Add pipeline cards
      pipelineCards.forEach((card, idx) => {
        const num = idx + 1;
        sections.push(
          { sectionKey: `step_${num}_badge`, contentValue: card.badge, imageUrl: null },
          { sectionKey: `step_${num}_badge_icon`, contentValue: card.badge_icon, imageUrl: null },
          { sectionKey: `step_${num}_title_line1`, contentValue: card.title_line1, imageUrl: null },
          { sectionKey: `step_${num}_title_line2`, contentValue: card.title_line2, imageUrl: null },
          { sectionKey: `step_${num}_focus`, contentValue: card.focus, imageUrl: null },
          { sectionKey: `step_${num}_image`, contentValue: '', imageUrl: card.image_url },
        );
        card.services.forEach((service, sIdx) => {
          sections.push(
            { sectionKey: `step_${num}_service_${sIdx + 1}`, contentValue: service.text, imageUrl: null },
            { sectionKey: `step_${num}_service_${sIdx + 1}_icon`, contentValue: service.icon, imageUrl: null },
          );
        });
      });

      // Add core value cards
      coreValueCards.forEach((card, idx) => {
        const num = idx + 1;
        sections.push(
          { sectionKey: `value_${num}_title`, contentValue: card.title, imageUrl: null },
          { sectionKey: `value_${num}_text`, contentValue: card.description, imageUrl: null },
          { sectionKey: `value_${num}_icon`, contentValue: card.icon, imageUrl: null },
        );
      });

      // Add quality cards
      qualityCards.forEach((card, idx) => {
        const num = idx + 1;
        sections.push(
          { sectionKey: `quality_process_${num}_title`, contentValue: card.title, imageUrl: null },
          { sectionKey: `quality_process_${num}_text`, contentValue: card.description, imageUrl: null },
          { sectionKey: `quality_process_${num}_icon`, contentValue: card.icon, imageUrl: null },
        );
      });

      if (sections.length) {
        await emsContentAPI.bulkUpdate(sections);
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
      const response = await uploadAPI.uploadImage(file, 'ems');
      const imageUrl = response.data?.media?.url;
      
      await emsContentAPI.bulkUpdate([{
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
    { id: 'pipeline', label: 'Production Pipeline', icon: 'ri-flow-chart' },
    { id: 'foundation', label: 'Foundation', icon: 'ri-heart-line' },
    { id: 'quality', label: 'Quality Assurance', icon: 'ri-shield-check-line' },
    { id: 'cta', label: 'Ready to Manufacture', icon: 'ri-rocket-launch-line' },
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
            <h2 className="text-2xl font-bold text-white">EMS Page Content</h2>
            <p className="text-white/60 mt-1">Edit all content sections of the EMS page</p>
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

        {activeTab === 'pipeline' && (
          <PipelineTab
            getValue={getValue}
            handleInputChange={handleInputChange}
            pipelineCards={pipelineCards}
            setPipelineCards={setPipelineCards}
            setHasChanges={setHasChanges}
            handleImageUpload={handleImageUpload}
            uploadingImage={uploadingImage}
            handleSaveAll={handleSaveAll}
            saving={saving}
            hasChanges={hasChanges}
          />
        )}

        {activeTab === 'foundation' && (
          <FoundationTab
            getValue={getValue}
            handleInputChange={handleInputChange}
            coreValueCards={coreValueCards}
            setCoreValueCards={setCoreValueCards}
            setHasChanges={setHasChanges}
            handleSaveAll={handleSaveAll}
            saving={saving}
            hasChanges={hasChanges}
          />
        )}

        {activeTab === 'quality' && (
          <QualityTab
            getValue={getValue}
            handleInputChange={handleInputChange}
            qualityCards={qualityCards}
            setQualityCards={setQualityCards}
            setHasChanges={setHasChanges}
            handleSaveAll={handleSaveAll}
            saving={saving}
            hasChanges={hasChanges}
          />
        )}

        {activeTab === 'cta' && (
          <CTATab
            getValue={getValue}
            handleInputChange={handleInputChange}
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
                value={getValue('hero_badge', 'Electronic Manufacturing Services')}
                onChange={(e) => handleInputChange('hero_badge', e.target.value)}
                className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Title Line 1</label>
              <input
                type="text"
                value={getValue('hero_title_line1', 'Precision Manufacturing for')}
                onChange={(e) => handleInputChange('hero_title_line1', e.target.value)}
                className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Title Line 2 (Gradient)</label>
            <input
              type="text"
              value={getValue('hero_title_line2', 'the AI Era')}
              onChange={(e) => handleInputChange('hero_title_line2', e.target.value)}
              className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Subtitle</label>
            <textarea
              rows={3}
              value={getValue('hero_subtitle', 'Trinova AI provides end-to-end Electronic Manufacturing Services, ensuring your intelligent products are built to perfection with unparalleled quality and precision.')}
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

// Production Pipeline Tab
function PipelineTab({ getValue, handleInputChange, pipelineCards, setPipelineCards, setHasChanges, handleImageUpload, uploadingImage, handleSaveAll, saving, hasChanges }: any) {
  const addNewCard = () => {
    if (pipelineCards.length >= 8) {
      alert('Maximum 8 pipeline steps allowed');
      return;
    }
    const newCard: PipelineCard = {
      id: `step_${pipelineCards.length + 1}`,
      badge: `Step ${pipelineCards.length + 1}`,
      badge_icon: 'ri-compasses-2-line',
      title_line1: 'New Step',
      title_line2: 'Title',
      focus: 'Description here...',
      services: [{ text: 'Service 1', icon: 'ri-settings-line' }],
      image_url: '',
      position: (pipelineCards.length + 1) % 2 === 1 ? 'left' : 'right',
    };
    setPipelineCards([...pipelineCards, newCard]);
    setHasChanges(true);
  };

  const deleteCard = (index: number) => {
    if (confirm('Are you sure you want to delete this pipeline step?')) {
      setPipelineCards(pipelineCards.filter((_: any, i: number) => i !== index));
      setHasChanges(true);
    }
  };

  const updateCard = (index: number, field: string, value: any) => {
    const updated = [...pipelineCards];
    if (field.startsWith('service_')) {
      const [, serviceIdx, serviceField] = field.split('_');
      updated[index].services[parseInt(serviceIdx)][serviceField as 'text' | 'icon'] = value;
    } else {
      (updated[index] as any)[field] = value;
    }
    setPipelineCards(updated);
    setHasChanges(true);
  };

  const addService = (cardIndex: number) => {
    const updated = [...pipelineCards];
    if (updated[cardIndex].services.length >= 4) {
      alert('Maximum 4 key services per step');
      return;
    }
    updated[cardIndex].services.push({ text: 'New Service', icon: 'ri-check-line' });
    setPipelineCards(updated);
    setHasChanges(true);
  };

  const deleteService = (cardIndex: number, serviceIndex: number) => {
    const updated = [...pipelineCards];
    updated[cardIndex].services = updated[cardIndex].services.filter((_, i) => i !== serviceIndex);
    setPipelineCards(updated);
    setHasChanges(true);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Production Pipeline - Section Header</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-medium mb-2">Badge Text</label>
              <input
                type="text"
                value={getValue('pipeline_badge', 'Production Pipeline')}
                onChange={(e) => handleInputChange('pipeline_badge', e.target.value)}
                className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Title Line 1</label>
              <input
                type="text"
                value={getValue('pipeline_title_line1', 'Our Integrated')}
                onChange={(e) => handleInputChange('pipeline_title_line1', e.target.value)}
                className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Title Line 2 (Gradient)</label>
            <input
              type="text"
              value={getValue('pipeline_title_line2', 'PCB Production Pipeline')}
              onChange={(e) => handleInputChange('pipeline_title_line2', e.target.value)}
              className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Description</label>
            <textarea
              rows={2}
              value={getValue('pipeline_description', 'From concept to completion, our comprehensive manufacturing process ensures precision at every step')}
              onChange={(e) => handleInputChange('pipeline_description', e.target.value)}
              className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white resize-none"
            />
          </div>
        </div>
      </div>

      {/* Pipeline Step Cards */}
      <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Pipeline Steps ({pipelineCards.length}/8)</h3>
          <button
            onClick={addNewCard}
            disabled={pipelineCards.length >= 8}
            className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i className="ri-add-line mr-2"></i>
            Add New Step
          </button>
        </div>

        <div className="space-y-6">
          {pipelineCards.map((card: PipelineCard, index: number) => (
            <div key={card.id} className="border border-cyan-500/20 rounded-xl p-6 bg-black/20">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-white">Step {index + 1}</h4>
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
                  <label className="block text-white font-medium mb-2">Step Image</label>
                  {card.image_url && (
                    <div className="mb-3">
                      <img 
                        src={card.image_url} 
                        alt={`Step ${index + 1}`} 
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
                      if (file) handleImageUpload(`step_${index + 1}_image`, file);
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
                      {PIPELINE_BADGE_ICONS.map(opt => (
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
                  <label className="block text-white font-medium mb-2">Focus / Description</label>
                  <textarea
                    rows={3}
                    value={card.focus}
                    onChange={(e) => updateCard(index, 'focus', e.target.value)}
                    className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white resize-none"
                  />
                </div>

                {/* Key Services */}
                <div className="pt-4 border-t border-cyan-500/20">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-white font-medium">Key Services ({card.services.length}/4)</label>
                    <button
                      onClick={() => addService(index)}
                      disabled={card.services.length >= 4}
                      className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-all text-sm disabled:opacity-50"
                    >
                      <i className="ri-add-line mr-1"></i>
                      Add Service
                    </button>
                  </div>

                  <div className="space-y-3">
                    {card.services.map((service: any, sIdx: number) => (
                      <div key={sIdx} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={service.text}
                          onChange={(e) => updateCard(index, `service_${sIdx}_text`, e.target.value)}
                          placeholder="Service description"
                          className="flex-1 px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                        />
                        <select
                          value={service.icon}
                          onChange={(e) => updateCard(index, `service_${sIdx}_icon`, e.target.value)}
                          className="w-48 px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white text-sm"
                        >
                          {PIPELINE_SERVICE_ICONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => deleteService(index, sIdx)}
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
              {hasChanges ? 'Save Production Pipeline' : 'No Changes to Save'}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// Foundation Tab
function FoundationTab({ getValue, handleInputChange, coreValueCards, setCoreValueCards, setHasChanges, handleSaveAll, saving, hasChanges }: any) {
  const addNewCard = () => {
    if (coreValueCards.length >= 8) {
      alert('Maximum 8 core value cards allowed');
      return;
    }
    const newCard: CoreValueCard = {
      id: `value_${coreValueCards.length + 1}`,
      title: 'New Value',
      description: 'Description here...',
      icon: 'ri-focus-3-line',
    };
    setCoreValueCards([...coreValueCards, newCard]);
    setHasChanges(true);
  };

  const deleteCard = (index: number) => {
    if (confirm('Are you sure you want to delete this core value card?')) {
      setCoreValueCards(coreValueCards.filter((_: any, i: number) => i !== index));
      setHasChanges(true);
    }
  };

  const updateCard = (index: number, field: string, value: string) => {
    const updated = [...coreValueCards];
    (updated[index] as any)[field] = value;
    setCoreValueCards(updated);
    setHasChanges(true);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Foundation - Section Header</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-medium mb-2">Badge Text</label>
              <input
                type="text"
                value={getValue('commitment_badge', 'Foundation')}
                onChange={(e) => handleInputChange('commitment_badge', e.target.value)}
                className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Title Line 1</label>
              <input
                type="text"
                value={getValue('commitment_title_line1', 'Our Commitment &')}
                onChange={(e) => handleInputChange('commitment_title_line1', e.target.value)}
                className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Title Line 2 (Gradient)</label>
            <input
              type="text"
              value={getValue('commitment_title_line2', 'Foundation')}
              onChange={(e) => handleInputChange('commitment_title_line2', e.target.value)}
              className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
            />
          </div>
        </div>
      </div>

      {/* Our Mission */}
      <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Our Mission</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-white font-medium mb-2">Mission Title</label>
            <input
              type="text"
              value={getValue('commitment_mission_title', 'Our Mission')}
              onChange={(e) => handleInputChange('commitment_mission_title', e.target.value)}
              className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Mission Description</label>
            <textarea
              rows={3}
              value={getValue('commitment_mission_text', 'To offer industry-leading PCB design, fabrication, and assembly services, ensuring the highest standards of performance and quality in every intelligent product.')}
              onChange={(e) => handleInputChange('commitment_mission_text', e.target.value)}
              className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white resize-none"
            />
          </div>
        </div>
      </div>

      {/* Core Values Header */}
      <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Core Values - Section</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-white font-medium mb-2">Core Values Title</label>
            <input
              type="text"
              value={getValue('commitment_values_title', 'Core Values')}
              onChange={(e) => handleInputChange('commitment_values_title', e.target.value)}
              className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Core Values Description</label>
            <textarea
              rows={2}
              value={getValue('commitment_values_description', 'The principles that guide our commitment to excellence in every project')}
              onChange={(e) => handleInputChange('commitment_values_description', e.target.value)}
              className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white resize-none"
            />
          </div>
        </div>
      </div>

      {/* Core Value Cards */}
      <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Core Value Cards ({coreValueCards.length}/8)</h3>
          <button
            onClick={addNewCard}
            disabled={coreValueCards.length >= 8}
            className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i className="ri-add-line mr-2"></i>
            Add New Card
          </button>
        </div>

        <div className="space-y-6">
          {coreValueCards.map((card: CoreValueCard, index: number) => (
            <div key={card.id} className="border border-cyan-500/20 rounded-xl p-6 bg-black/20">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-white">Value {index + 1}: {card.title}</h4>
                <button
                  onClick={() => deleteCard(index)}
                  className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
                >
                  <i className="ri-delete-bin-line mr-1"></i>
                  Delete
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={card.title}
                      onChange={(e) => updateCard(index, 'title', e.target.value)}
                      className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Icon</label>
                    <select
                      value={card.icon}
                      onChange={(e) => updateCard(index, 'icon', e.target.value)}
                      className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                    >
                      {CORE_VALUE_ICONS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Description</label>
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
              {hasChanges ? 'Save Foundation Section' : 'No Changes to Save'}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// Quality Tab
function QualityTab({ getValue, handleInputChange, qualityCards, setQualityCards, setHasChanges, handleSaveAll, saving, hasChanges }: any) {
  const addNewCard = () => {
    if (qualityCards.length >= 8) {
      alert('Maximum 8 quality assurance cards allowed');
      return;
    }
    const newCard: QualityCard = {
      id: `quality_process_${qualityCards.length + 1}`,
      title: 'New Process',
      description: 'Description here...',
      icon: 'ri-search-line',
    };
    setQualityCards([...qualityCards, newCard]);
    setHasChanges(true);
  };

  const deleteCard = (index: number) => {
    if (confirm('Are you sure you want to delete this quality process card?')) {
      setQualityCards(qualityCards.filter((_: any, i: number) => i !== index));
      setHasChanges(true);
    }
  };

  const updateCard = (index: number, field: string, value: string) => {
    const updated = [...qualityCards];
    (updated[index] as any)[field] = value;
    setQualityCards(updated);
    setHasChanges(true);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Quality Assurance - Section Header</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-medium mb-2">Badge Text</label>
              <input
                type="text"
                value={getValue('quality_badge', 'Quality Assurance')}
                onChange={(e) => handleInputChange('quality_badge', e.target.value)}
                className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Title Line 1</label>
              <input
                type="text"
                value={getValue('quality_title_line1', 'Rigorous Quality Control')}
                onChange={(e) => handleInputChange('quality_title_line1', e.target.value)}
                className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Title Line 2 (Gradient)</label>
            <input
              type="text"
              value={getValue('quality_title_line2', 'Processes')}
              onChange={(e) => handleInputChange('quality_title_line2', e.target.value)}
              className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Description</label>
            <textarea
              rows={3}
              value={getValue('quality_description', 'We are dedicated to ensuring that every PCB we manufacture meets the highest standards of quality. From design and fabrication to assembly and inspection, we maintain rigorous quality control measures to guarantee your products perform flawlessly.')}
              onChange={(e) => handleInputChange('quality_description', e.target.value)}
              className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white resize-none"
            />
          </div>
        </div>
      </div>

      {/* Quality Process Cards */}
      <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Quality Process Cards ({qualityCards.length}/8)</h3>
          <button
            onClick={addNewCard}
            disabled={qualityCards.length >= 8}
            className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i className="ri-add-line mr-2"></i>
            Add New Card
          </button>
        </div>

        <div className="space-y-6">
          {qualityCards.map((card: QualityCard, index: number) => (
            <div key={card.id} className="border border-cyan-500/20 rounded-xl p-6 bg-black/20">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-white">Process {index + 1}: {card.title}</h4>
                <button
                  onClick={() => deleteCard(index)}
                  className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
                >
                  <i className="ri-delete-bin-line mr-1"></i>
                  Delete
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={card.title}
                      onChange={(e) => updateCard(index, 'title', e.target.value)}
                      className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Icon</label>
                    <select
                      value={card.icon}
                      onChange={(e) => updateCard(index, 'icon', e.target.value)}
                      className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                    >
                      {QUALITY_ICONS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Description</label>
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
              {hasChanges ? 'Save Quality Assurance' : 'No Changes to Save'}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// CTA Tab
function CTATab({ getValue, handleInputChange, handleSaveAll, saving, hasChanges }: any) {
  return (
    <div className="space-y-6">
      <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Ready to Manufacture?</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-white font-medium mb-2">Badge Text</label>
            <input
              type="text"
              value={getValue('cta_badge', 'Ready to Manufacture?')}
              onChange={(e) => handleInputChange('cta_badge', e.target.value)}
              className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Title Line 1</label>
            <input
              type="text"
              value={getValue('cta_title_line1', "Let's Build Your")}
              onChange={(e) => handleInputChange('cta_title_line1', e.target.value)}
              className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Title Line 2 (Gradient)</label>
            <input
              type="text"
              value={getValue('cta_title_line2', 'Next Innovation')}
              onChange={(e) => handleInputChange('cta_title_line2', e.target.value)}
              className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Description</label>
            <textarea
              rows={3}
              value={getValue('cta_description', 'Partner with Trinova AI for precision electronic manufacturing that brings your intelligent products to market')}
              onChange={(e) => handleInputChange('cta_description', e.target.value)}
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
                  {hasChanges ? 'Save CTA Section' : 'No Changes to Save'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
