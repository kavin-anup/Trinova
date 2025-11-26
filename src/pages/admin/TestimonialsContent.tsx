import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { testimonialsContentAPI, uploadAPI } from '../../services/api';

const INDUSTRY_ICON_OPTIONS = [
  { value: 'ri-home-line', label: 'Home' },
  { value: 'ri-smartphone-line', label: 'Smartphone' },
  { value: 'ri-heart-pulse-line', label: 'Medical' },
  { value: 'ri-robot-line', label: 'Robot' },
  { value: 'ri-global-line', label: 'Global' },
  { value: 'ri-cpu-line', label: 'CPU/Tech' },
  { value: 'ri-lightbulb-line', label: 'Lightbulb' },
  { value: 'ri-shield-check-line', label: 'Shield' },
  { value: 'ri-rocket-line', label: 'Rocket' },
  { value: 'ri-team-line', label: 'Team' },
  { value: 'ri-building-line', label: 'Building' },
  { value: 'ri-trophy-line', label: 'Trophy' }
];

export default function TestimonialsContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Hero Section State
  const [heroContent, setHeroContent] = useState({
    badge: '',
    title_line1: '',
    title_line2: '',
    subtitle: '',
    background_image: '',
    stat_1_value: '',
    stat_1_label: '',
    stat_2_value: '',
    stat_2_label: '',
    stat_3_value: '',
    stat_3_label: ''
  });

  // Featured Reviews State
  const [reviewsSection, setReviewsSection] = useState({
    badge: '',
    title_line1: '',
    title_line2: ''
  });
  const [reviewCards, setReviewCards] = useState<any[]>([]);

  // Industry Recognition State
  const [recognitionSection, setRecognitionSection] = useState({
    badge: '',
    title_line1: '',
    title_line2: '',
    description: ''
  });
  const [industryCards, setIndustryCards] = useState<any[]>([]);

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
      const response = await testimonialsContentAPI.getAll();
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
        badge: getVal('hero_badge', 'Client Success Stories'),
        title_line1: getVal('hero_title_line1', 'Trusted by Industry'),
        title_line2: getVal('hero_title_line2', 'Leaders Worldwide'),
        subtitle: getVal('hero_subtitle', 'Discover how Trinova AI has transformed businesses across industries with cutting-edge intelligent electronics and AI solutions.'),
        background_image: getImg('hero_background_image', ''),
        stat_1_value: getVal('hero_stat_1_value', '150+'),
        stat_1_label: getVal('hero_stat_1_label', 'Happy Clients'),
        stat_2_value: getVal('hero_stat_2_value', '98%'),
        stat_2_label: getVal('hero_stat_2_label', 'Client Satisfaction'),
        stat_3_value: getVal('hero_stat_3_value', '25+'),
        stat_3_label: getVal('hero_stat_3_label', 'Countries Served')
      });

      // Load Featured Reviews Section
      setReviewsSection({
        badge: getVal('featured_badge', 'Featured Reviews'),
        title_line1: getVal('featured_title_line1', 'What Our Clients'),
        title_line2: getVal('featured_title_line2', 'Say About Us')
      });

      // Load Review Cards - properly parse JSON from database
      const reviewCardsRaw = contentItems.find((c: any) => c.content_key === 'review_cards');
      if (reviewCardsRaw) {
        try {
          const parsed = typeof reviewCardsRaw.content_value === 'string' 
            ? JSON.parse(reviewCardsRaw.content_value) 
            : reviewCardsRaw.content_value;
          if (Array.isArray(parsed) && parsed.length > 0) {
            setReviewCards(parsed);
          }
        } catch (e) {
          console.error('Error parsing review cards:', e);
        }
      }

      // Load Industry Recognition Section
      setRecognitionSection({
        badge: getVal('recognition_badge', 'Industry Recognition'),
        title_line1: getVal('recognition_title_line1', 'Trusted Across'),
        title_line2: getVal('recognition_title_line2', 'Multiple Industries'),
        description: getVal('recognition_description', 'From startups to Fortune 500 companies, we\'ve delivered exceptional results across diverse sectors')
      });

      // Load Industry Cards - properly parse JSON from database
      const industryCardsRaw = contentItems.find((c: any) => c.content_key === 'industry_cards');
      if (industryCardsRaw) {
        try {
          const parsed = typeof industryCardsRaw.content_value === 'string' 
            ? JSON.parse(industryCardsRaw.content_value) 
            : industryCardsRaw.content_value;
          if (Array.isArray(parsed) && parsed.length > 0) {
            setIndustryCards(parsed);
          }
        } catch (e) {
          console.error('Error parsing industry cards:', e);
        }
      }

      // Load CTA Content
      setCtaContent({
        badge: getVal('cta_badge', 'Ready to Join Our Success Stories?'),
        title_line1: getVal('cta_title_line1', 'Ready to Join Our'),
        title_line2: getVal('cta_title_line2', 'Success Stories?'),
        description: getVal('cta_description', 'Let\'s discuss how Trinova AI can transform your business with cutting-edge intelligent electronics and AI solutions.')
      });
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File, section: string) => {
    try {
      const response = await uploadAPI.uploadImage(file, 'testimonials');
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
        { sectionKey: 'hero_subtitle', contentValue: heroContent.subtitle, contentType: 'text' },
        { sectionKey: 'hero_background_image', contentValue: '', contentType: 'image', imageUrl: heroContent.background_image },
        { sectionKey: 'hero_stat_1_value', contentValue: heroContent.stat_1_value, contentType: 'text' },
        { sectionKey: 'hero_stat_1_label', contentValue: heroContent.stat_1_label, contentType: 'text' },
        { sectionKey: 'hero_stat_2_value', contentValue: heroContent.stat_2_value, contentType: 'text' },
        { sectionKey: 'hero_stat_2_label', contentValue: heroContent.stat_2_label, contentType: 'text' },
        { sectionKey: 'hero_stat_3_value', contentValue: heroContent.stat_3_value, contentType: 'text' },
        { sectionKey: 'hero_stat_3_label', contentValue: heroContent.stat_3_label, contentType: 'text' }
      ];

      await testimonialsContentAPI.bulkUpdate(updates);
      alert('Hero section saved successfully!');
    } catch (error: any) {
      alert(error.message || 'Error saving hero section');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveReviews = async () => {
    setSaving(true);
    try {
      const updates = [
        { sectionKey: 'featured_badge', contentValue: reviewsSection.badge, contentType: 'text' },
        { sectionKey: 'featured_title_line1', contentValue: reviewsSection.title_line1, contentType: 'text' },
        { sectionKey: 'featured_title_line2', contentValue: reviewsSection.title_line2, contentType: 'text' },
        { sectionKey: 'review_cards', contentValue: JSON.stringify(reviewCards), contentType: 'json' }
      ];

      await testimonialsContentAPI.bulkUpdate(updates);
      alert('Featured Reviews section saved successfully!');
    } catch (error: any) {
      alert(error.message || 'Error saving featured reviews');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveIndustries = async () => {
    setSaving(true);
    try {
      const updates = [
        { sectionKey: 'recognition_badge', contentValue: recognitionSection.badge, contentType: 'text' },
        { sectionKey: 'recognition_title_line1', contentValue: recognitionSection.title_line1, contentType: 'text' },
        { sectionKey: 'recognition_title_line2', contentValue: recognitionSection.title_line2, contentType: 'text' },
        { sectionKey: 'recognition_description', contentValue: recognitionSection.description, contentType: 'text' },
        { sectionKey: 'industry_cards', contentValue: JSON.stringify(industryCards), contentType: 'json' }
      ];

      await testimonialsContentAPI.bulkUpdate(updates);
      alert('Industry Recognition section saved successfully!');
    } catch (error: any) {
      alert(error.message || 'Error saving industry recognition');
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

      await testimonialsContentAPI.bulkUpdate(updates);
      alert('CTA section saved successfully!');
    } catch (error: any) {
      alert(error.message || 'Error saving CTA section');
    } finally {
      setSaving(false);
    }
  };

  const addReviewCard = () => {
    if (reviewCards.length >= 6) {
      alert('Maximum 6 review cards allowed');
      return;
    }
    setReviewCards([
      ...reviewCards,
      {
        id: Date.now(),
        rating: 5,
        testimonial: '',
        name: '',
        designation: '',
        company: ''
      }
    ]);
  };

  const deleteReviewCard = (index: number) => {
    setReviewCards(reviewCards.filter((_, i) => i !== index));
  };

  const updateReviewCard = (index: number, field: string, value: any) => {
    const updated = [...reviewCards];
    updated[index] = { ...updated[index], [field]: value };
    setReviewCards(updated);
  };

  const addIndustryCard = () => {
    if (industryCards.length >= 8) {
      alert('Maximum 8 industry cards allowed');
      return;
    }
    setIndustryCards([
      ...industryCards,
      {
        id: Date.now(),
        icon: 'ri-home-line',
        number: '',
        label: ''
      }
    ]);
  };

  const deleteIndustryCard = (index: number) => {
    setIndustryCards(industryCards.filter((_, i) => i !== index));
  };

  const updateIndustryCard = (index: number, field: string, value: any) => {
    const updated = [...industryCards];
    updated[index] = { ...updated[index], [field]: value };
    setIndustryCards(updated);
  };

  const tabs = ['Hero Section', 'Featured Reviews', 'Industry Recognition', 'CTA Section'];

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
          <h2 className="text-2xl font-bold text-white">Testimonials Page Content</h2>
          <p className="text-white/60 mt-1">Manage all content for the Testimonials page</p>
          <p className="text-white/40 text-sm mt-1">Note: Individual testimonials are managed in the "Testimonials" section</p>
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
                  <label className="block text-white font-semibold mb-2">Subtitle</label>
                  <textarea
                    value={heroContent.subtitle}
                    onChange={(e) => setHeroContent({ ...heroContent, subtitle: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">Stat 1 Value</label>
                    <input
                      type="text"
                      value={heroContent.stat_1_value}
                      onChange={(e) => setHeroContent({ ...heroContent, stat_1_value: e.target.value })}
                      className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">Stat 1 Label</label>
                    <input
                      type="text"
                      value={heroContent.stat_1_label}
                      onChange={(e) => setHeroContent({ ...heroContent, stat_1_label: e.target.value })}
                      className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">Stat 2 Value</label>
                    <input
                      type="text"
                      value={heroContent.stat_2_value}
                      onChange={(e) => setHeroContent({ ...heroContent, stat_2_value: e.target.value })}
                      className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">Stat 2 Label</label>
                    <input
                      type="text"
                      value={heroContent.stat_2_label}
                      onChange={(e) => setHeroContent({ ...heroContent, stat_2_label: e.target.value })}
                      className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">Stat 3 Value</label>
                    <input
                      type="text"
                      value={heroContent.stat_3_value}
                      onChange={(e) => setHeroContent({ ...heroContent, stat_3_value: e.target.value })}
                      className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">Stat 3 Label</label>
                    <input
                      type="text"
                      value={heroContent.stat_3_label}
                      onChange={(e) => setHeroContent({ ...heroContent, stat_3_label: e.target.value })}
                      className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
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

          {/* Featured Reviews Tab */}
          {activeTab === 1 && (
            <div className="space-y-6">
              {/* Section Header */}
              <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 space-y-4">
                <h3 className="text-xl font-bold text-white mb-4">Section Header</h3>

                <div>
                  <label className="block text-white font-semibold mb-2">Badge Text</label>
                  <input
                    type="text"
                    value={reviewsSection.badge}
                    onChange={(e) => setReviewsSection({ ...reviewsSection, badge: e.target.value })}
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Title Line 1</label>
                  <input
                    type="text"
                    value={reviewsSection.title_line1}
                    onChange={(e) => setReviewsSection({ ...reviewsSection, title_line1: e.target.value })}
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Title Line 2 (Gradient)</label>
                  <input
                    type="text"
                    value={reviewsSection.title_line2}
                    onChange={(e) => setReviewsSection({ ...reviewsSection, title_line2: e.target.value })}
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Review Cards */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">Review Cards ({reviewCards.length}/6)</h3>
                  <button
                    onClick={addReviewCard}
                    disabled={reviewCards.length >= 6}
                    className="px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <i className="ri-add-line mr-2"></i>Add Review
                  </button>
                </div>

                {reviewCards.map((card, index) => (
                  <div key={card.id || index} className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-white">Review {index + 1}</h4>
                      <button
                        onClick={() => deleteReviewCard(index)}
                        className="px-3 py-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg transition-all"
                      >
                        <i className="ri-delete-bin-line mr-1"></i>Delete
                      </button>
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2">Rating (1-5 stars)</label>
                      <select
                        value={card.rating}
                        onChange={(e) => updateReviewCard(index, 'rating', parseInt(e.target.value))}
                        className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                      >
                        <option value={5}>5 Stars</option>
                        <option value={4}>4 Stars</option>
                        <option value={3}>3 Stars</option>
                        <option value={2}>2 Stars</option>
                        <option value={1}>1 Star</option>
                      </select>
                      <div className="mt-2 flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className={`ri-star-fill text-lg ${i < card.rating ? 'text-cyan-400' : 'text-gray-600'}`}></i>
                        ))}
                        <span className="text-sm text-white/60 ml-2">Preview</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2">Testimonial</label>
                      <textarea
                        value={card.testimonial}
                        onChange={(e) => updateReviewCard(index, 'testimonial', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none resize-none"
                        placeholder="Enter the testimonial text..."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white font-semibold mb-2">Name</label>
                        <input
                          type="text"
                          value={card.name}
                          onChange={(e) => updateReviewCard(index, 'name', e.target.value)}
                          className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                          placeholder="Client Name"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-semibold mb-2">Designation</label>
                        <input
                          type="text"
                          value={card.designation}
                          onChange={(e) => updateReviewCard(index, 'designation', e.target.value)}
                          className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                          placeholder="e.g., CTO"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2">Company</label>
                      <input
                        type="text"
                        value={card.company}
                        onChange={(e) => updateReviewCard(index, 'company', e.target.value)}
                        className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                        placeholder="Company Name"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveReviews}
                  disabled={saving}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <i className="ri-loader-4-line animate-spin mr-2"></i>Saving...
                    </>
                  ) : (
                    <>
                      <i className="ri-save-line mr-2"></i>Save Featured Reviews
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Industry Recognition Tab */}
          {activeTab === 2 && (
            <div className="space-y-6">
              {/* Section Header */}
              <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 space-y-4">
                <h3 className="text-xl font-bold text-white mb-4">Section Header</h3>

                <div>
                  <label className="block text-white font-semibold mb-2">Badge Text</label>
                  <input
                    type="text"
                    value={recognitionSection.badge}
                    onChange={(e) => setRecognitionSection({ ...recognitionSection, badge: e.target.value })}
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Title Line 1</label>
                  <input
                    type="text"
                    value={recognitionSection.title_line1}
                    onChange={(e) => setRecognitionSection({ ...recognitionSection, title_line1: e.target.value })}
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Title Line 2 (Gradient)</label>
                  <input
                    type="text"
                    value={recognitionSection.title_line2}
                    onChange={(e) => setRecognitionSection({ ...recognitionSection, title_line2: e.target.value })}
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Description</label>
                  <textarea
                    value={recognitionSection.description}
                    onChange={(e) => setRecognitionSection({ ...recognitionSection, description: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none resize-none"
                  />
                </div>
              </div>

              {/* Industry Cards */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">Industry Cards ({industryCards.length}/8)</h3>
                  <button
                    onClick={addIndustryCard}
                    disabled={industryCards.length >= 8}
                    className="px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <i className="ri-add-line mr-2"></i>Add Card
                  </button>
                </div>

                {industryCards.map((card, index) => (
                  <div key={card.id || index} className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-white">Card {index + 1}</h4>
                      <button
                        onClick={() => deleteIndustryCard(index)}
                        className="px-3 py-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg transition-all"
                      >
                        <i className="ri-delete-bin-line mr-1"></i>Delete
                      </button>
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2">Icon</label>
                      <select
                        value={card.icon}
                        onChange={(e) => updateIndustryCard(index, 'icon', e.target.value)}
                        className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                      >
                        {INDUSTRY_ICON_OPTIONS.map((opt) => (
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
                      <label className="block text-white font-semibold mb-2">Number</label>
                      <input
                        type="text"
                        value={card.number}
                        onChange={(e) => updateIndustryCard(index, 'number', e.target.value)}
                        className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                        placeholder="e.g., 45+"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2">Label</label>
                      <input
                        type="text"
                        value={card.label}
                        onChange={(e) => updateIndustryCard(index, 'label', e.target.value)}
                        className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                        placeholder="e.g., Smart Home Projects"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveIndustries}
                  disabled={saving}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <i className="ri-loader-4-line animate-spin mr-2"></i>Saving...
                    </>
                  ) : (
                    <>
                      <i className="ri-save-line mr-2"></i>Save Industry Recognition
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
            href="/testimonials"
            target="_blank"
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
          >
            <i className="ri-eye-line mr-2"></i>Preview Testimonials Page
          </a>
        </div>
      </div>
    </AdminLayout>
  );
}
