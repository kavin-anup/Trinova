import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { ourEdgeContentAPI, uploadAPI } from '../../services/api';

const ICON_OPTIONS = [
  { value: 'ri-lightbulb-flash-line', label: 'Lightbulb Flash' },
  { value: 'ri-user-heart-line', label: 'User Heart' },
  { value: 'ri-stack-line', label: 'Stack' },
  { value: 'ri-global-line', label: 'Global' },
  { value: 'ri-settings-3-line', label: 'Settings' },
  { value: 'ri-rocket-line', label: 'Rocket' },
  { value: 'ri-shield-check-line', label: 'Shield Check' },
  { value: 'ri-cpu-line', label: 'CPU' },
  { value: 'ri-team-line', label: 'Team' },
  { value: 'ri-award-line', label: 'Award' },
  { value: 'ri-star-line', label: 'Star' },
  { value: 'ri-trophy-line', label: 'Trophy' }
];

const PROCESS_ICON_OPTIONS = [
  { value: 'ri-lightbulb-line', label: 'Lightbulb' },
  { value: 'ri-draft-line', label: 'Draft/Design' },
  { value: 'ri-code-line', label: 'Code' },
  { value: 'ri-test-tube-line', label: 'Test Tube' },
  { value: 'ri-rocket-line', label: 'Rocket' }
];

export default function OurEdgeContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Hero Section State
  const [heroContent, setHeroContent] = useState({
    badge: '',
    title_line1: '',
    title_line2: '',
    title_line3: '',
    subtitle: '',
    background_image: ''
  });

  // Core Strengths State
  const [strengthsSection, setStrengthsSection] = useState({
    badge: '',
    title_line1: '',
    title_line2: '',
    description: ''
  });
  const [strengthCards, setStrengthCards] = useState<any[]>([]);

  // Process State
  const [processSection, setProcessSection] = useState({
    badge: '',
    title_line1: '',
    title_line2: '',
    description: ''
  });
  const [processCards, setProcessCards] = useState<any[]>([]);

  // CTA Section State
  const [ctaContent, setCtaContent] = useState({
    badge: '',
    title_line1: '',
    title_line2: '',
    description: ''
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await ourEdgeContentAPI.getAll();
      const contentItems = response.data?.content || [];

      // Helper function
      const getVal = (key: string, fallback: any = '') => {
        const item = contentItems.find((c: any) => c.content_key === key);
        return item?.content_value || fallback;
      };

      const getImg = (key: string, fallback: string = '') => {
        const item = contentItems.find((c: any) => c.content_key === key);
        return item?.image_url || fallback;
      };

      // Load Hero Content
      setHeroContent({
        badge: getVal('hero_badge', 'Competitive Advantage'),
        title_line1: getVal('hero_title_line1', 'The Unfair Advantage in'),
        title_line2: getVal('hero_title_line2', 'Intelligent Product'),
        title_line3: getVal('hero_title_line3', 'Realization'),
        subtitle: getVal('hero_subtitle', 'Trinova AI is built on a foundation of full-stack technical mastery, unwavering quality standards, and a customer-first methodology, giving your products a decisive edge in the market.'),
        background_image: getImg('hero_background_image', '')
      });

      // Load Strengths Section
      setStrengthsSection({
        badge: getVal('edge_badge', 'Core Strengths'),
        title_line1: getVal('edge_title_line1', 'Our Unwavering'),
        title_line2: getVal('edge_title_line2', 'Edge'),
        description: getVal('edge_description', 'Four core differentiators that set us apart in the intelligent electronics industry')
      });

      // Load Strength Cards
      const strengthCardsData = getVal('strength_cards', '[]');
      try {
        const parsed = typeof strengthCardsData === 'string' ? JSON.parse(strengthCardsData) : strengthCardsData;
        if (Array.isArray(parsed) && parsed.length > 0) {
          setStrengthCards(parsed);
        }
      } catch (e) {
        console.error('Error parsing strength cards:', e);
      }

      // Load Process Section
      setProcessSection({
        badge: getVal('process_badge', 'Our Process'),
        title_line1: getVal('process_title_line1', 'Accelerating Innovation:'),
        title_line2: getVal('process_title_line2', 'Our 5-Step Process'),
        description: getVal('process_description', 'A proven methodology that transforms ideas into market-ready intelligent products')
      });

      // Load Process Cards
      const processCardsData = getVal('process_cards', '[]');
      try {
        const parsed = typeof processCardsData === 'string' ? JSON.parse(processCardsData) : processCardsData;
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProcessCards(parsed);
        }
      } catch (e) {
        console.error('Error parsing process cards:', e);
      }

      // Load CTA Content
      setCtaContent({
        badge: getVal('cta_badge', 'Ready to Experience The Trinova AI Edge?'),
        title_line1: getVal('cta_title_line1', 'Ready to Experience'),
        title_line2: getVal('cta_title_line2', 'The Trinova AI Edge?'),
        description: getVal('cta_description', 'Partner with us to leverage our unfair advantage and transform your innovative ideas into market-leading intelligent products.')
      });
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File, section: string, field?: string) => {
    try {
      const response = await uploadAPI.uploadImage(file, 'our_edge');
      const imageUrl = response.data.media.url;

      if (section === 'hero') {
        setHeroContent({ ...heroContent, background_image: imageUrl });
      }

      alert('Image uploaded successfully!');
    } catch (error: any) {
      alert(error.message || 'Error uploading image');
    }
  };

  const handleSaveHero = async () => {
    setSaving(true);
    try {
      const updates = [
        { sectionKey: 'hero_badge', contentValue: heroContent.badge, contentType: 'text' },
        { sectionKey: 'hero_title_line1', contentValue: heroContent.title_line1, contentType: 'text' },
        { sectionKey: 'hero_title_line2', contentValue: heroContent.title_line2, contentType: 'text' },
        { sectionKey: 'hero_title_line3', contentValue: heroContent.title_line3, contentType: 'text' },
        { sectionKey: 'hero_subtitle', contentValue: heroContent.subtitle, contentType: 'text' },
        { sectionKey: 'hero_background_image', contentValue: '', contentType: 'image', imageUrl: heroContent.background_image }
      ];

      await ourEdgeContentAPI.bulkUpdate(updates);
      alert('Hero section saved successfully!');
    } catch (error: any) {
      alert(error.message || 'Error saving hero section');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveStrengths = async () => {
    setSaving(true);
    try {
      const updates = [
        { sectionKey: 'edge_badge', contentValue: strengthsSection.badge, contentType: 'text' },
        { sectionKey: 'edge_title_line1', contentValue: strengthsSection.title_line1, contentType: 'text' },
        { sectionKey: 'edge_title_line2', contentValue: strengthsSection.title_line2, contentType: 'text' },
        { sectionKey: 'edge_description', contentValue: strengthsSection.description, contentType: 'text' },
        { sectionKey: 'strength_cards', contentValue: JSON.stringify(strengthCards), contentType: 'json' }
      ];

      await ourEdgeContentAPI.bulkUpdate(updates);
      alert('Core Strengths section saved successfully!');
    } catch (error: any) {
      alert(error.message || 'Error saving core strengths');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveProcess = async () => {
    setSaving(true);
    try {
      const updates = [
        { sectionKey: 'process_badge', contentValue: processSection.badge, contentType: 'text' },
        { sectionKey: 'process_title_line1', contentValue: processSection.title_line1, contentType: 'text' },
        { sectionKey: 'process_title_line2', contentValue: processSection.title_line2, contentType: 'text' },
        { sectionKey: 'process_description', contentValue: processSection.description, contentType: 'text' },
        { sectionKey: 'process_cards', contentValue: JSON.stringify(processCards), contentType: 'json' }
      ];

      await ourEdgeContentAPI.bulkUpdate(updates);
      alert('Process section saved successfully!');
    } catch (error: any) {
      alert(error.message || 'Error saving process section');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveCTA = async () => {
    setSaving(true);
    try {
      const updates = [
        { sectionKey: 'cta_badge', contentValue: ctaContent.badge, contentType: 'text' },
        { sectionKey: 'cta_title_line1', contentValue: ctaContent.title_line1, contentType: 'text' },
        { sectionKey: 'cta_title_line2', contentValue: ctaContent.title_line2, contentType: 'text' },
        { sectionKey: 'cta_description', contentValue: ctaContent.description, contentType: 'text' }
      ];

      await ourEdgeContentAPI.bulkUpdate(updates);
      alert('CTA section saved successfully!');
    } catch (error: any) {
      alert(error.message || 'Error saving CTA section');
    } finally {
      setSaving(false);
    }
  };

  const addStrengthCard = () => {
    if (strengthCards.length >= 8) {
      alert('Maximum 8 strength cards allowed');
      return;
    }
    setStrengthCards([
      ...strengthCards,
      {
        id: Date.now(),
        icon: 'ri-star-line',
        title: '',
        description: ''
      }
    ]);
  };

  const deleteStrengthCard = (index: number) => {
    setStrengthCards(strengthCards.filter((_, i) => i !== index));
  };

  const updateStrengthCard = (index: number, field: string, value: any) => {
    const updated = [...strengthCards];
    updated[index] = { ...updated[index], [field]: value };
    setStrengthCards(updated);
  };

  const addProcessCard = () => {
    if (processCards.length >= 5) {
      alert('Maximum 5 process cards allowed');
      return;
    }
    setProcessCards([
      ...processCards,
      {
        id: Date.now(),
        order: processCards.length + 1,
        icon: 'ri-lightbulb-line',
        title: '',
        description: ''
      }
    ]);
  };

  const deleteProcessCard = (index: number) => {
    const updated = processCards.filter((_, i) => i !== index);
    // Reorder remaining cards
    updated.forEach((card, i) => {
      card.order = i + 1;
    });
    setProcessCards(updated);
  };

  const updateProcessCard = (index: number, field: string, value: any) => {
    const updated = [...processCards];
    updated[index] = { ...updated[index], [field]: value };
    setProcessCards(updated);
  };

  const tabs = ['Hero Section', 'Core Strengths', 'Our Process', 'CTA Section'];

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <i className="ri-loader-4-line text-cyan-400 text-4xl animate-spin"></i>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Our Edge Page Content</h2>
          <p className="text-white/60 mt-1">Manage all content for the Our Edge page</p>
          </div>

        {/* Tabs */}
        <div className="flex space-x-2 border-b border-cyan-500/20">
          {tabs.map((tab, index) => (
          <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 font-semibold transition-all ${
                activeTab === index
                  ? 'text-cyan-400 border-b-2 border-cyan-400'
                  : 'text-white/60 hover:text-white/80'
              }`}
            >
              {tab}
          </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {/* Hero Section Tab */}
          {activeTab === 0 && (
        <div className="space-y-6">
              <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 space-y-4">
                <h3 className="text-xl font-bold text-white mb-4">Hero Section Content</h3>

                <div>
                  <label className="block text-white font-semibold mb-2">Badge Text</label>
                  <input
                    type="text"
                    value={heroContent.badge}
                    onChange={(e) => setHeroContent({ ...heroContent, badge: e.target.value })}
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                    placeholder="e.g., Competitive Advantage"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Title Line 1</label>
                  <input
                    type="text"
                    value={heroContent.title_line1}
                    onChange={(e) => setHeroContent({ ...heroContent, title_line1: e.target.value })}
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Title Line 2 (Gradient)</label>
                  <input
                    type="text"
                    value={heroContent.title_line2}
                    onChange={(e) => setHeroContent({ ...heroContent, title_line2: e.target.value })}
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
              </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Title Line 3 (Gradient)</label>
                <input
                  type="text"
                    value={heroContent.title_line3}
                    onChange={(e) => setHeroContent({ ...heroContent, title_line3: e.target.value })}
                  className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Subtitle</label>
                <textarea
                    value={heroContent.subtitle}
                    onChange={(e) => setHeroContent({ ...heroContent, subtitle: e.target.value })}
                    rows={3}
                  className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none resize-none"
                />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Background Image</label>
                  {heroContent.background_image && (
                    <div className="mb-4 rounded-lg overflow-hidden border border-cyan-500/20">
                      <img
                        src={heroContent.background_image}
                        alt="Hero Background"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={heroContent.background_image}
                      onChange={(e) => setHeroContent({ ...heroContent, background_image: e.target.value })}
                      placeholder="Image URL"
                      className="flex-1 px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                    />
                    <label className="px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg cursor-pointer transition-all whitespace-nowrap">
                      <i className="ri-upload-line mr-2"></i>Upload
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file, 'hero');
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveHero}
                  disabled={saving}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <i className="ri-loader-4-line animate-spin mr-2"></i>Saving...
                    </>
                  ) : (
                    <>
                      <i className="ri-save-line mr-2"></i>Save Hero Section
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Core Strengths Tab */}
          {activeTab === 1 && (
            <div className="space-y-6">
              {/* Section Header */}
              <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 space-y-4">
                <h3 className="text-xl font-bold text-white mb-4">Section Header</h3>

                <div>
                  <label className="block text-white font-semibold mb-2">Badge Text</label>
                  <input
                    type="text"
                    value={strengthsSection.badge}
                    onChange={(e) => setStrengthsSection({ ...strengthsSection, badge: e.target.value })}
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Title Line 1</label>
                  <input
                    type="text"
                    value={strengthsSection.title_line1}
                    onChange={(e) => setStrengthsSection({ ...strengthsSection, title_line1: e.target.value })}
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Title Line 2 (Gradient)</label>
                  <input
                    type="text"
                    value={strengthsSection.title_line2}
                    onChange={(e) => setStrengthsSection({ ...strengthsSection, title_line2: e.target.value })}
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Description</label>
                  <textarea
                    value={strengthsSection.description}
                    onChange={(e) => setStrengthsSection({ ...strengthsSection, description: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none resize-none"
                  />
                </div>
              </div>

              {/* Strength Cards */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">Strength Cards ({strengthCards.length}/8)</h3>
                  <button
                    onClick={addStrengthCard}
                    disabled={strengthCards.length >= 8}
                    className="px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <i className="ri-add-line mr-2"></i>Add Card
                  </button>
                </div>

                {strengthCards.map((card, index) => (
                  <div key={card.id || index} className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-white">Card {index + 1}</h4>
                      <button
                        onClick={() => deleteStrengthCard(index)}
                        className="px-3 py-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg transition-all"
                      >
                        <i className="ri-delete-bin-line mr-1"></i>Delete
                      </button>
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2">Icon</label>
                      <select
                        value={card.icon}
                        onChange={(e) => updateStrengthCard(index, 'icon', e.target.value)}
                        className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                      >
                        {ICON_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <div className="mt-2 flex items-center space-x-2 text-cyan-400">
                        <i className={`${card.icon} text-2xl`}></i>
                        <span className="text-sm text-white/60">Preview</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2">Title</label>
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) => updateStrengthCard(index, 'title', e.target.value)}
                        className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2">Description</label>
                      <textarea
                        value={card.description}
                        onChange={(e) => updateStrengthCard(index, 'description', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveStrengths}
                  disabled={saving}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <i className="ri-loader-4-line animate-spin mr-2"></i>Saving...
                    </>
                  ) : (
                    <>
                      <i className="ri-save-line mr-2"></i>Save Core Strengths
                    </>
                  )}
                </button>
                  </div>
                </div>
              )}

          {/* Our Process Tab */}
          {activeTab === 2 && (
            <div className="space-y-6">
              {/* Section Header */}
              <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 space-y-4">
                <h3 className="text-xl font-bold text-white mb-4">Section Header</h3>

                <div>
                  <label className="block text-white font-semibold mb-2">Badge Text</label>
                  <input
                    type="text"
                    value={processSection.badge}
                    onChange={(e) => setProcessSection({ ...processSection, badge: e.target.value })}
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Title Line 1</label>
                  <input
                    type="text"
                    value={processSection.title_line1}
                    onChange={(e) => setProcessSection({ ...processSection, title_line1: e.target.value })}
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Title Line 2 (Gradient)</label>
                  <input
                    type="text"
                    value={processSection.title_line2}
                    onChange={(e) => setProcessSection({ ...processSection, title_line2: e.target.value })}
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Description</label>
                  <textarea
                    value={processSection.description}
                    onChange={(e) => setProcessSection({ ...processSection, description: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none resize-none"
                  />
                </div>
              </div>

              {/* Process Cards */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">Process Steps ({processCards.length}/5)</h3>
                  <button
                    onClick={addProcessCard}
                    disabled={processCards.length >= 5}
                    className="px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <i className="ri-add-line mr-2"></i>Add Step
                  </button>
                </div>

                {processCards.map((card, index) => (
                  <div key={card.id || index} className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-white">Step {card.order}</h4>
                      <button
                        onClick={() => deleteProcessCard(index)}
                        className="px-3 py-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg transition-all"
                      >
                        <i className="ri-delete-bin-line mr-1"></i>Delete
                      </button>
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2">Icon</label>
                      <select
                        value={card.icon}
                        onChange={(e) => updateProcessCard(index, 'icon', e.target.value)}
                        className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                      >
                        {PROCESS_ICON_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <div className="mt-2 flex items-center space-x-2 text-cyan-400">
                        <i className={`${card.icon} text-2xl`}></i>
                        <span className="text-sm text-white/60">Preview</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2">Title</label>
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) => updateProcessCard(index, 'title', e.target.value)}
                        className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2">Description</label>
                      <textarea
                        value={card.description}
                        onChange={(e) => updateProcessCard(index, 'description', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none resize-none"
                      />
                    </div>
            </div>
          ))}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveProcess}
                  disabled={saving}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <i className="ri-loader-4-line animate-spin mr-2"></i>Saving...
                    </>
                  ) : (
                    <>
                      <i className="ri-save-line mr-2"></i>Save Process Section
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* CTA Section Tab */}
          {activeTab === 3 && (
            <div className="space-y-6">
              <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 space-y-4">
                <h3 className="text-xl font-bold text-white mb-4">CTA Section Content</h3>

                <div>
                  <label className="block text-white font-semibold mb-2">Badge Text</label>
                  <input
                    type="text"
                    value={ctaContent.badge}
                    onChange={(e) => setCtaContent({ ...ctaContent, badge: e.target.value })}
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Title Line 1</label>
                  <input
                    type="text"
                    value={ctaContent.title_line1}
                    onChange={(e) => setCtaContent({ ...ctaContent, title_line1: e.target.value })}
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Title Line 2 (Gradient)</label>
                  <input
                    type="text"
                    value={ctaContent.title_line2}
                    onChange={(e) => setCtaContent({ ...ctaContent, title_line2: e.target.value })}
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Description</label>
                  <textarea
                    value={ctaContent.description}
                    onChange={(e) => setCtaContent({ ...ctaContent, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveCTA}
                  disabled={saving}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <i className="ri-loader-4-line animate-spin mr-2"></i>Saving...
                    </>
                  ) : (
                    <>
                      <i className="ri-save-line mr-2"></i>Save CTA Section
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Preview Button */}
        <div className="sticky bottom-6 flex justify-center">
          <a
            href="/our-edge"
            target="_blank"
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
          >
            <i className="ri-eye-line mr-2"></i>Preview Our Edge Page
          </a>
        </div>
      </div>
    </AdminLayout>
  );
}
