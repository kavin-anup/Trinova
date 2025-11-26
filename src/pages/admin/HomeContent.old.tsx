import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { homeContentAPI, uploadAPI } from '../../services/api';

interface ContentSection {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'image' | 'json';
  value: any;
  imageUrl?: string;
  description?: string;
}

export default function HomeContent() {
  const [sections, setSections] = useState<ContentSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await homeContentAPI.getAll();
      const contentItems = response.data?.content || [];

      // Define all editable sections
      const sectionDefinitions: ContentSection[] = [
        {
          key: 'about_badge',
          label: 'About Section - Badge Text',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'about_badge')?.content_value || 'About Us',
          description: 'The badge text above the About section title'
        },
        {
          key: 'about_title_line1',
          label: 'About Section - Title Line 1',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'about_title_line1')?.content_value || 'Discover',
          description: 'First line of the About section title'
        },
        {
          key: 'about_title_line2',
          label: 'About Section - Title Line 2',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'about_title_line2')?.content_value || 'Trinova AI',
          description: 'Second line of the About section title (gradient text)'
        },
        {
          key: 'about_description_1',
          label: 'About Section - Description Paragraph 1',
          type: 'textarea',
          value: contentItems.find((c: any) => c.content_key === 'about_description_1')?.content_value || 'Trinova AI Technologies Private Limited specializes in revolutionizing the world of electronics by seamlessly integrating cutting-edge AI with hardware manufacturing, R&D, and end-to-end product realization.',
          description: 'First paragraph of description'
        },
        {
          key: 'about_description_2',
          label: 'About Section - Description Paragraph 2',
          type: 'textarea',
          value: contentItems.find((c: any) => c.content_key === 'about_description_2')?.content_value || 'Our full-stack expertise covers everything from chip-level design to cloud integration, ensuring your next intelligent product is market-ready and scalable.',
          description: 'Second paragraph of description'
        },
        {
          key: 'about_description_3',
          label: 'About Section - Description Paragraph 3',
          type: 'textarea',
          value: contentItems.find((c: any) => c.content_key === 'about_description_3')?.content_value || 'We offer a complete spectrum of services including research & development, custom hardware design, firmware engineering, electronics manufacturing (EMS), AI integration, and mobile application development.',
          description: 'Third paragraph of description'
        },
        {
          key: 'about_description_4',
          label: 'About Section - Description Paragraph 4',
          type: 'textarea',
          value: contentItems.find((c: any) => c.content_key === 'about_description_4')?.content_value || 'Whether you are validating a new concept, optimizing an existing product, or scaling to mass production, Trinova AI provides the technical backbone to move from idea to deployed, intelligent solutions.',
          description: 'Fourth paragraph of description'
        },
        {
          key: 'about_image',
          label: 'About Section - Image',
          type: 'image',
          value: '',
          imageUrl: contentItems.find((c: any) => c.content_key === 'about_image')?.image_url || '',
          description: 'Main image for the About section'
        },
        {
          key: 'about_card_title',
          label: 'About Section - Floating Card Title',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'about_card_title')?.content_value || 'Full-Stack Innovation',
          description: 'Title in the floating info card'
        },
        {
          key: 'about_card_subtitle',
          label: 'About Section - Floating Card Subtitle',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'about_card_subtitle')?.content_value || 'Concept to Market',
          description: 'Subtitle in the floating info card'
        },
        {
          key: 'about_card_stat_value',
          label: 'About Section - Floating Card Stat Value',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'about_card_stat_value')?.content_value || '100%',
          description: 'Statistic value in the floating card'
        },
        {
          key: 'about_card_stat_label',
          label: 'About Section - Floating Card Stat Label',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'about_card_stat_label')?.content_value || 'Scalable',
          description: 'Statistic label in the floating card'
        },
        {
          key: 'services_badge',
          label: 'Services Section - Badge Text',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'services_badge')?.content_value || 'Our Services',
          description: 'Badge text above Services section'
        },
        {
          key: 'services_title_line1',
          label: 'Services Section - Title Line 1',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'services_title_line1')?.content_value || 'Our Core',
          description: 'First line of Services section title'
        },
        {
          key: 'services_title_line2',
          label: 'Services Section - Title Line 2',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'services_title_line2')?.content_value || 'Expertise',
          description: 'Second line of Services section title'
        },
        {
          key: 'services_description',
          label: 'Services Section - Description',
          type: 'textarea',
          value: contentItems.find((c: any) => c.content_key === 'services_description')?.content_value || 'From concept to market, we deliver comprehensive solutions across the entire technology stack',
          description: 'Description text below Services section title'
        }
      ];

      setSections(sectionDefinitions);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updates = sections.map(section => ({
        sectionKey: section.key,
        contentValue: section.value,
        contentType: section.type === 'json' ? 'json' : section.type === 'image' ? 'image' : 'text',
        imageUrl: section.type === 'image' ? section.imageUrl : undefined
      }));

      await homeContentAPI.bulkUpdate(updates);
      alert('Content saved successfully!');
    } catch (error: any) {
      alert(error.message || 'Error saving content');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (sectionKey: string, file: File) => {
    try {
      const response = await uploadAPI.uploadImage(file, 'home');
      const updatedSections = sections.map(s =>
        s.key === sectionKey ? { ...s, imageUrl: response.data.media.url } : s
      );
      setSections(updatedSections);
    } catch (error: any) {
      alert(error.message || 'Error uploading image');
    }
  };

  const updateSection = (key: string, value: any) => {
    setSections(sections.map(s => s.key === key ? { ...s, value } : s));
  };

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
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Home Page Content</h2>
            <p className="text-white/60 mt-1">Edit all content sections of the home page</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
          >
            {saving ? (
              <>
                <i className="ri-loader-4-line animate-spin mr-2"></i>Saving...
              </>
            ) : (
              <>
                <i className="ri-save-line mr-2"></i>Save All Changes
              </>
            )}
          </button>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section) => (
            <div
              key={section.key}
              className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6"
            >
              <div className="mb-4">
                <label className="block text-white font-bold text-lg mb-1">
                  {section.label}
                </label>
                {section.description && (
                  <p className="text-white/50 text-sm">{section.description}</p>
                )}
              </div>

              {section.type === 'text' && (
                <input
                  type="text"
                  value={section.value}
                  onChange={(e) => updateSection(section.key, e.target.value)}
                  className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                />
              )}

              {section.type === 'textarea' && (
                <textarea
                  value={section.value}
                  onChange={(e) => updateSection(section.key, e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none resize-none"
                />
              )}

              {section.type === 'image' && (
                <div className="space-y-4">
                  {section.imageUrl && (
                    <div className="relative w-full h-64 rounded-lg overflow-hidden border border-cyan-500/20">
                      <img
                        src={section.imageUrl}
                        alt={section.label}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={section.imageUrl || ''}
                      onChange={(e) => {
                        const updated = sections.map(s =>
                          s.key === section.key ? { ...s, imageUrl: e.target.value } : s
                        );
                        setSections(updated);
                      }}
                      placeholder="Image URL or upload"
                      className="flex-1 px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                    />
                    <label className="px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg cursor-pointer transition-all">
                      <i className="ri-upload-line mr-2"></i>Upload
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(section.key, file);
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Preview Button */}
        <div className="sticky bottom-6 flex justify-center">
          <a
            href="/"
            target="_blank"
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
          >
            <i className="ri-eye-line mr-2"></i>Preview Home Page
          </a>
        </div>
      </div>
    </AdminLayout>
  );
}

