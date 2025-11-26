import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { aiContentAPI, uploadAPI } from '../../services/api';

interface ContentItem {
  content_key: string;
  content_value: string;
  image_url?: string | null;
}

type TabType = 'hero' | 'applications' | 'advantages' | 'cta';

interface ApplicationCard {
  id: string;
  image_url: string;
  badge: string;
  title_line1: string;
  title_line2: string;
  description: string;
  features: Array<{ text: string; icon: string }>;
  position: 'left' | 'right';
}

interface AdvantageCard {
  id: string;
  title: string;
  description: string;
  icon: string;
}

// Icon options for application features
const FEATURE_ICONS = [
  { value: 'ri-lightbulb-line', label: '💡 Lightbulb (Innovation)' },
  { value: 'ri-shield-check-line', label: '🛡️ Shield (Security)' },
  { value: 'ri-speed-line', label: '⚡ Speed (Performance)' },
  { value: 'ri-cpu-line', label: '💻 CPU (Processing)' },
  { value: 'ri-brain-line', label: '🧠 Brain (AI/ML)' },
  { value: 'ri-eye-line', label: '👁️ Eye (Vision)' },
  { value: 'ri-voice-recognition-line', label: '🎤 Voice (Recognition)' },
  { value: 'ri-smartphone-line', label: '📱 Smartphone (Mobile)' },
  { value: 'ri-battery-line', label: '🔋 Battery (Power)' },
  { value: 'ri-cloud-line', label: '☁️ Cloud (Cloud)' },
  { value: 'ri-settings-3-line', label: '⚙️ Settings (Config)' },
  { value: 'ri-database-line', label: '🗄️ Database (Data)' },
  { value: 'ri-user-line', label: '👤 User (Person)' },
  { value: 'ri-home-line', label: '🏠 Home (House)' },
  { value: 'ri-heart-pulse-line', label: '❤️ Heart (Medical)' },
];

// Icon options for advantages
const ADVANTAGE_ICONS = [
  { value: 'ri-shield-check-line', label: '🛡️ Shield Check' },
  { value: 'ri-rocket-line', label: '🚀 Rocket' },
  { value: 'ri-award-line', label: '🏆 Award' },
  { value: 'ri-lightbulb-line', label: '💡 Lightbulb' },
  { value: 'ri-team-line', label: '👥 Team' },
  { value: 'ri-global-line', label: '🌐 Global' },
  { value: 'ri-heart-line', label: '❤️ Heart' },
  { value: 'ri-star-line', label: '⭐ Star' },
];

export default function AIContent() {
  const [content, setContent] = useState<Record<string, ContentItem>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('hero');
  const [uploadingImage, setUploadingImage] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  
  // Dynamic cards state
  const [applicationCards, setApplicationCards] = useState<ApplicationCard[]>([]);
  const [advantageCards, setAdvantageCards] = useState<AdvantageCard[]>([]);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await aiContentAPI.getAll();
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
      parseApplicationCards(contentMap);
      parseAdvantageCards(contentMap);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const parseApplicationCards = (contentMap: Record<string, ContentItem>) => {
    const cards: ApplicationCard[] = [];
    let i = 1;
    while (i <= 6 && contentMap[`app_${i}_badge`]) {
      const features: Array<{ text: string; icon: string }> = [];
      for (let f = 1; f <= 5; f++) {
        if (contentMap[`app_${i}_feature_${f}`]) {
          features.push({
            text: contentMap[`app_${i}_feature_${f}`]?.content_value || '',
            icon: contentMap[`app_${i}_feature_${f}_icon`]?.content_value || 'ri-check-line',
          });
        }
      }
      
      cards.push({
        id: `app_${i}`,
        image_url: contentMap[`app_${i}_image`]?.image_url || '',
        badge: contentMap[`app_${i}_badge`]?.content_value || '',
        title_line1: contentMap[`app_${i}_title_line1`]?.content_value || '',
        title_line2: contentMap[`app_${i}_title_line2`]?.content_value || '',
        description: contentMap[`app_${i}_description`]?.content_value || '',
        features,
        position: i % 2 === 1 ? 'left' : 'right',
      });
      i++;
    }
    setApplicationCards(cards);
  };

  const parseAdvantageCards = (contentMap: Record<string, ContentItem>) => {
    const cards: AdvantageCard[] = [];
    let i = 1;
    while (i <= 8 && contentMap[`advantage_${i}_title`]) {
      cards.push({
        id: `advantage_${i}`,
        title: contentMap[`advantage_${i}_title`]?.content_value || '',
        description: contentMap[`advantage_${i}_description`]?.content_value || '',
        icon: contentMap[`advantage_${i}_icon`]?.content_value || 'ri-shield-check-line',
      });
      i++;
    }
    setAdvantageCards(cards);
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

      // Add application cards
      applicationCards.forEach((card, idx) => {
        const num = idx + 1;
        sections.push(
          { sectionKey: `app_${num}_badge`, contentValue: card.badge, imageUrl: null },
          { sectionKey: `app_${num}_title_line1`, contentValue: card.title_line1, imageUrl: null },
          { sectionKey: `app_${num}_title_line2`, contentValue: card.title_line2, imageUrl: null },
          { sectionKey: `app_${num}_description`, contentValue: card.description, imageUrl: null },
          { sectionKey: `app_${num}_image`, contentValue: '', imageUrl: card.image_url },
        );
        card.features.forEach((feature, fIdx) => {
          sections.push(
            { sectionKey: `app_${num}_feature_${fIdx + 1}`, contentValue: feature.text, imageUrl: null },
            { sectionKey: `app_${num}_feature_${fIdx + 1}_icon`, contentValue: feature.icon, imageUrl: null },
          );
        });
      });

      // Add advantage cards
      advantageCards.forEach((card, idx) => {
        const num = idx + 1;
        sections.push(
          { sectionKey: `advantage_${num}_title`, contentValue: card.title, imageUrl: null },
          { sectionKey: `advantage_${num}_description`, contentValue: card.description, imageUrl: null },
          { sectionKey: `advantage_${num}_icon`, contentValue: card.icon, imageUrl: null },
        );
      });

      if (sections.length) {
        await aiContentAPI.bulkUpdate(sections);
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
      const response = await uploadAPI.uploadImage(file, 'ai');
      const imageUrl = response.data?.media?.url;
      
      await aiContentAPI.bulkUpdate([{
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
    { id: 'applications', label: 'AI Applications', icon: 'ri-cpu-line' },
    { id: 'advantages', label: 'Our Advantages', icon: 'ri-award-line' },
    { id: 'cta', label: 'CTA Section', icon: 'ri-rocket-line' },
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
            <h2 className="text-2xl font-bold text-white">AI Page Content</h2>
            <p className="text-white/60 mt-1">Edit all content sections of the AI page</p>
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

        {activeTab === 'applications' && (
          <ApplicationsTab
            getValue={getValue}
            handleInputChange={handleInputChange}
            applicationCards={applicationCards}
            setApplicationCards={setApplicationCards}
            setHasChanges={setHasChanges}
            handleImageUpload={handleImageUpload}
            uploadingImage={uploadingImage}
            handleSaveAll={handleSaveAll}
            saving={saving}
            hasChanges={hasChanges}
          />
        )}

        {activeTab === 'advantages' && (
          <AdvantagesTab
            getValue={getValue}
            handleInputChange={handleInputChange}
            advantageCards={advantageCards}
            setAdvantageCards={setAdvantageCards}
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

          <div>
            <label className="block text-white font-medium mb-2">Badge Text</label>
            <input
              type="text"
              value={getValue('hero_badge', 'AI-Powered Innovation')}
              onChange={(e) => handleInputChange('hero_badge', e.target.value)}
              className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-medium mb-2">Title Line 1</label>
              <input
                type="text"
                value={getValue('hero_title_line1', 'Intelligent Systems:')}
                onChange={(e) => handleInputChange('hero_title_line1', e.target.value)}
                className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Title Line 2 (Gradient)</label>
              <input
                type="text"
                value={getValue('hero_title_line2', 'The AI Core of')}
                onChange={(e) => handleInputChange('hero_title_line2', e.target.value)}
                className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Title Line 3 (Gradient)</label>
            <input
              type="text"
              value={getValue('hero_title_line3', 'Future Electronics')}
              onChange={(e) => handleInputChange('hero_title_line3', e.target.value)}
              className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Subtitle</label>
            <textarea
              rows={3}
              value={getValue('hero_subtitle', 'Trinova AI leverages advanced AI, Machine Learning, and Computer Vision to revolutionize Robotics, Medical Electronics, and Home Automation—enhancing efficiency and user experience across critical industries.')}
              onChange={(e) => handleInputChange('hero_subtitle', e.target.value)}
              className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white resize-none"
            />
          </div>

          {/* AI Stats */}
          <div className="pt-6 border-t border-cyan-500/20">
            <h4 className="text-lg font-bold text-white mb-4">AI Stats</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">Stat 1 Value</label>
                <input
                  type="text"
                  value={getValue('hero_stat_1_value', '50+')}
                  onChange={(e) => handleInputChange('hero_stat_1_value', e.target.value)}
                  className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                />
                <label className="block text-white font-medium mb-2 mt-2">Stat 1 Label</label>
                <input
                  type="text"
                  value={getValue('hero_stat_1_label', 'AI Models Deployed')}
                  onChange={(e) => handleInputChange('hero_stat_1_label', e.target.value)}
                  className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Stat 2 Value</label>
                <input
                  type="text"
                  value={getValue('hero_stat_2_value', '99.8%')}
                  onChange={(e) => handleInputChange('hero_stat_2_value', e.target.value)}
                  className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                />
                <label className="block text-white font-medium mb-2 mt-2">Stat 2 Label</label>
                <input
                  type="text"
                  value={getValue('hero_stat_2_label', 'AI Accuracy Rate')}
                  onChange={(e) => handleInputChange('hero_stat_2_label', e.target.value)}
                  className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Stat 3 Value</label>
                <input
                  type="text"
                  value={getValue('hero_stat_3_value', '3')}
                  onChange={(e) => handleInputChange('hero_stat_3_value', e.target.value)}
                  className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                />
                <label className="block text-white font-medium mb-2 mt-2">Stat 3 Label</label>
                <input
                  type="text"
                  value={getValue('hero_stat_3_label', 'Key Industries')}
                  onChange={(e) => handleInputChange('hero_stat_3_label', e.target.value)}
                  className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                />
              </div>
            </div>
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

// AI Applications Tab
function ApplicationsTab({ getValue, handleInputChange, applicationCards, setApplicationCards, setHasChanges, handleImageUpload, uploadingImage, handleSaveAll, saving, hasChanges }: any) {
  const addNewCard = () => {
    if (applicationCards.length >= 6) {
      alert('Maximum 6 application cards allowed');
      return;
    }
    const newCard: ApplicationCard = {
      id: `app_${applicationCards.length + 1}`,
      image_url: '',
      badge: 'New Application',
      title_line1: 'New AI',
      title_line2: 'Application',
      description: 'Description here...',
      features: [{ text: 'Feature 1', icon: 'ri-lightbulb-line' }],
      position: (applicationCards.length + 1) % 2 === 1 ? 'left' : 'right',
    };
    setApplicationCards([...applicationCards, newCard]);
    setHasChanges(true);
  };

  const deleteCard = (index: number) => {
    if (confirm('Are you sure you want to delete this application card?')) {
      setApplicationCards(applicationCards.filter((_: any, i: number) => i !== index));
      setHasChanges(true);
    }
  };

  const updateCard = (index: number, field: string, value: any) => {
    const updated = [...applicationCards];
    if (field.startsWith('feature_')) {
      const [, featureIdx, featureField] = field.split('_');
      updated[index].features[parseInt(featureIdx)][featureField as 'text' | 'icon'] = value;
    } else {
      (updated[index] as any)[field] = value;
    }
    setApplicationCards(updated);
    setHasChanges(true);
  };

  const addFeature = (cardIndex: number) => {
    const updated = [...applicationCards];
    if (updated[cardIndex].features.length >= 5) {
      alert('Maximum 5 features per application');
      return;
    }
    updated[cardIndex].features.push({ text: 'New Feature', icon: 'ri-check-line' });
    setApplicationCards(updated);
    setHasChanges(true);
  };

  const deleteFeature = (cardIndex: number, featureIndex: number) => {
    const updated = [...applicationCards];
    updated[cardIndex].features = updated[cardIndex].features.filter((_, i) => i !== featureIndex);
    setApplicationCards(updated);
    setHasChanges(true);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">AI Applications - Section Header</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-medium mb-2">Badge Text</label>
              <input
                type="text"
                value={getValue('applications_badge', 'AI Applications')}
                onChange={(e) => handleInputChange('applications_badge', e.target.value)}
                className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Title Line 1</label>
              <input
                type="text"
                value={getValue('applications_title_line1', 'Revolutionizing Key Industries')}
                onChange={(e) => handleInputChange('applications_title_line1', e.target.value)}
                className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Title Line 2 (Gradient)</label>
            <input
              type="text"
              value={getValue('applications_title_line2', 'with AI')}
              onChange={(e) => handleInputChange('applications_title_line2', e.target.value)}
              className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Description</label>
            <textarea
              rows={2}
              value={getValue('applications_description', 'Transforming critical sectors through intelligent automation and advanced AI integration')}
              onChange={(e) => handleInputChange('applications_description', e.target.value)}
              className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white resize-none"
            />
          </div>
        </div>
      </div>

      {/* Application Cards */}
      <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Application Cards ({applicationCards.length}/6)</h3>
          <button
            onClick={addNewCard}
            disabled={applicationCards.length >= 6}
            className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i className="ri-add-line mr-2"></i>
            Add New Application
          </button>
        </div>

        <div className="space-y-6">
          {applicationCards.map((card: ApplicationCard, index: number) => (
            <div key={card.id} className="border border-cyan-500/20 rounded-xl p-6 bg-black/20">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-white">Application {index + 1}</h4>
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
                  <label className="block text-white font-medium mb-2">Application Image</label>
                  {card.image_url && (
                    <div className="mb-3">
                      <img 
                        src={card.image_url} 
                        alt={`Application ${index + 1}`} 
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
                      if (file) handleImageUpload(`app_${index + 1}_image`, file);
                    }}
                    className="block w-full text-white/60 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/10 file:text-cyan-400 hover:file:bg-cyan-500/20"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Badge Text</label>
                  <input
                    type="text"
                    value={card.badge}
                    onChange={(e) => updateCard(index, 'badge', e.target.value)}
                    className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                  />
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
                    <label className="block text-white font-medium">Features ({card.features.length}/5)</label>
                    <button
                      onClick={() => addFeature(index)}
                      disabled={card.features.length >= 5}
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
                          placeholder="Feature description"
                          className="flex-1 px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
                        />
                        <select
                          value={feature.icon}
                          onChange={(e) => updateCard(index, `feature_${fIdx}_icon`, e.target.value)}
                          className="w-48 px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white text-sm"
                        >
                          {FEATURE_ICONS.map(opt => (
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
              {hasChanges ? 'Save AI Applications' : 'No Changes to Save'}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// Our Advantages Tab
function AdvantagesTab({ getValue, handleInputChange, advantageCards, setAdvantageCards, setHasChanges, handleSaveAll, saving, hasChanges }: any) {
  const addNewCard = () => {
    if (advantageCards.length >= 8) {
      alert('Maximum 8 advantage cards allowed');
      return;
    }
    const newCard: AdvantageCard = {
      id: `advantage_${advantageCards.length + 1}`,
      title: 'New Advantage',
      description: 'Description here...',
      icon: 'ri-shield-check-line',
    };
    setAdvantageCards([...advantageCards, newCard]);
    setHasChanges(true);
  };

  const deleteCard = (index: number) => {
    if (confirm('Are you sure you want to delete this advantage card?')) {
      setAdvantageCards(advantageCards.filter((_: any, i: number) => i !== index));
      setHasChanges(true);
    }
  };

  const updateCard = (index: number, field: string, value: string) => {
    const updated = [...advantageCards];
    (updated[index] as any)[field] = value;
    setAdvantageCards(updated);
    setHasChanges(true);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Our Advantages - Section Header</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-medium mb-2">Badge Text</label>
              <input
                type="text"
                value={getValue('advantage_badge', 'Our Advantage')}
                onChange={(e) => handleInputChange('advantage_badge', e.target.value)}
                className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Title Line 1</label>
              <input
                type="text"
                value={getValue('advantage_title_line1', 'The Trinova AI')}
                onChange={(e) => handleInputChange('advantage_title_line1', e.target.value)}
                className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Title Line 2 (Gradient)</label>
            <input
              type="text"
              value={getValue('advantage_title_line2', 'Advantage')}
              onChange={(e) => handleInputChange('advantage_title_line2', e.target.value)}
              className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Description</label>
            <textarea
              rows={2}
              value={getValue('advantage_description', 'Why industry leaders choose Trinova AI for their intelligent electronics solutions')}
              onChange={(e) => handleInputChange('advantage_description', e.target.value)}
              className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white resize-none"
            />
          </div>
        </div>
      </div>

      {/* Advantage Cards */}
      <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Advantage Cards ({advantageCards.length}/8)</h3>
          <button
            onClick={addNewCard}
            disabled={advantageCards.length >= 8}
            className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i className="ri-add-line mr-2"></i>
            Add New Card
          </button>
        </div>

        <div className="space-y-6">
          {advantageCards.map((card: AdvantageCard, index: number) => (
            <div key={card.id} className="border border-cyan-500/20 rounded-xl p-6 bg-black/20">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-white">Advantage {index + 1}: {card.title}</h4>
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
                      {ADVANTAGE_ICONS.map(opt => (
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
              {hasChanges ? 'Save Our Advantages' : 'No Changes to Save'}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// CTA Section Tab
function CTATab({ getValue, handleInputChange, handleSaveAll, saving, hasChanges }: any) {
  return (
    <div className="space-y-6">
      <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">CTA Section Content</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-white font-medium mb-2">Badge Text</label>
            <input
              type="text"
              value={getValue('cta_badge', 'Ready to Transform Your Industry with AI?')}
              onChange={(e) => handleInputChange('cta_badge', e.target.value)}
              className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Title Line 1</label>
            <input
              type="text"
              value={getValue('cta_title_line1', 'Ready to Transform Your')}
              onChange={(e) => handleInputChange('cta_title_line1', e.target.value)}
              className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Title Line 2 (Gradient)</label>
            <input
              type="text"
              value={getValue('cta_title_line2', 'Industry with AI?')}
              onChange={(e) => handleInputChange('cta_title_line2', e.target.value)}
              className="w-full px-4 py-2 bg-[#252525] border border-cyan-500/20 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Description</label>
            <textarea
              rows={3}
              value={getValue('cta_description', 'Partner with Trinova AI to develop intelligent electronics that revolutionize your business and enhance user experiences.')}
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
