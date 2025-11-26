import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { contactContentAPI, uploadAPI } from '../../services/api';

type TabType = 'hero' | 'form' | 'innovation' | 'contact';

interface FormField {
  id: string;
  label: string;
  name: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  placeholder: string;
  required: boolean;
  options?: string[]; // For select fields
}

export default function ContactContent() {
  const [activeTab, setActiveTab] = useState<TabType>('hero');
  const [loading, setLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);

  // Hero Section State
  const [heroContent, setHeroContent] = useState({
    badge: 'Get In Touch',
    title_line1: "Let's Build the",
    title_line2: 'Future Together',
    subtitle: 'Ready to transform your ideas into intelligent products? Connect with our team of experts.',
    background_image: ''
  });

  // Form Fields State
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [formTitle, setFormTitle] = useState('Start Your Project');
  const [formDescription, setFormDescription] = useState('Tell us about your project and we\'ll get back to you within 24 hours.');

  // Innovation Hub State
  const [innovationContent, setInnovationContent] = useState({
    title_line1: 'Visit Our',
    title_line2: 'Innovation Hub',
    description: 'Located in the heart of Bangalore\'s Electronic City, our state-of-the-art facility is equipped with cutting-edge technology and innovation labs.',
    google_maps_url: ''
  });

  // Contact Information State
  const [contactInfo, setContactInfo] = useState({
    title_line1: 'Connect with',
    title_line2: 'Our Experts',
    description: 'Our team is ready to discuss your project requirements and provide tailored solutions.'
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await contactContentAPI.getAll();
      const contentItems = response.data?.content || [];

      // Parse content from database
      contentItems.forEach((item: any) => {
        const key = item.content_key;
        const value = item.content_value;

        // Hero Section
        if (key === 'hero_badge') setHeroContent(prev => ({ ...prev, badge: value }));
        if (key === 'hero_title_line1') setHeroContent(prev => ({ ...prev, title_line1: value }));
        if (key === 'hero_title_line2') setHeroContent(prev => ({ ...prev, title_line2: value }));
        if (key === 'hero_subtitle') setHeroContent(prev => ({ ...prev, subtitle: value }));
        if (key === 'hero_background_image') setHeroContent(prev => ({ ...prev, background_image: value }));

        // Form
        if (key === 'form_title') setFormTitle(value);
        if (key === 'form_description') setFormDescription(value);
        if (key === 'form_fields') {
          try {
            setFormFields(JSON.parse(value));
          } catch {
            setFormFields([]);
          }
        }

        // Innovation Hub
        if (key === 'innovation_title_line1') setInnovationContent(prev => ({ ...prev, title_line1: value }));
        if (key === 'innovation_title_line2') setInnovationContent(prev => ({ ...prev, title_line2: value }));
        if (key === 'innovation_description') setInnovationContent(prev => ({ ...prev, description: value }));
        if (key === 'innovation_google_maps_url') setInnovationContent(prev => ({ ...prev, google_maps_url: value }));

        // Contact Info
        if (key === 'contact_info_title_line1') setContactInfo(prev => ({ ...prev, title_line1: value }));
        if (key === 'contact_info_title_line2') setContactInfo(prev => ({ ...prev, title_line2: value }));
        if (key === 'contact_info_description') setContactInfo(prev => ({ ...prev, description: value }));
      });
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveHero = async () => {
    try {
      await contactContentAPI.bulkUpdate([
        { sectionKey: 'hero_badge', contentValue: heroContent.badge },
        { sectionKey: 'hero_title_line1', contentValue: heroContent.title_line1 },
        { sectionKey: 'hero_title_line2', contentValue: heroContent.title_line2 },
        { sectionKey: 'hero_subtitle', contentValue: heroContent.subtitle },
        { sectionKey: 'hero_background_image', contentValue: heroContent.background_image }
      ]);
      alert('Hero section saved successfully!');
      setHasChanges(false);
    } catch (error: any) {
      alert(error.message || 'Error saving hero section');
    }
  };

  const handleSaveForm = async () => {
    try {
      await contactContentAPI.bulkUpdate([
        { sectionKey: 'form_title', contentValue: formTitle },
        { sectionKey: 'form_description', contentValue: formDescription },
        { sectionKey: 'form_fields', contentValue: JSON.stringify(formFields), contentType: 'json' }
      ]);
      alert('Form configuration saved successfully!');
      setHasChanges(false);
    } catch (error: any) {
      alert(error.message || 'Error saving form configuration');
    }
  };

  const handleSaveInnovation = async () => {
    try {
      await contactContentAPI.bulkUpdate([
        { sectionKey: 'innovation_title_line1', contentValue: innovationContent.title_line1 },
        { sectionKey: 'innovation_title_line2', contentValue: innovationContent.title_line2 },
        { sectionKey: 'innovation_description', contentValue: innovationContent.description },
        { sectionKey: 'innovation_google_maps_url', contentValue: innovationContent.google_maps_url }
      ]);
      alert('Innovation Hub section saved successfully!');
      setHasChanges(false);
    } catch (error: any) {
      alert(error.message || 'Error saving Innovation Hub section');
    }
  };

  const handleSaveContact = async () => {
    try {
      await contactContentAPI.bulkUpdate([
        { sectionKey: 'contact_info_title_line1', contentValue: contactInfo.title_line1 },
        { sectionKey: 'contact_info_title_line2', contentValue: contactInfo.title_line2 },
        { sectionKey: 'contact_info_description', contentValue: contactInfo.description }
      ]);
      alert('Contact Information section saved successfully!');
      setHasChanges(false);
    } catch (error: any) {
      alert(error.message || 'Error saving Contact Information section');
    }
  };

  const handleImageUpload = async (file: File, field: 'hero_background') => {
    try {
      const response = await uploadAPI.uploadImage(file, 'contact');
      const imageUrl = response.data.media.url;
      if (field === 'hero_background') {
        setHeroContent(prev => ({ ...prev, background_image: imageUrl }));
      }
      setHasChanges(true);
    } catch (error: any) {
      alert(error.message || 'Error uploading image');
    }
  };

  // Form Field Management
  const addFormField = () => {
    const newField: FormField = {
      id: `field_${Date.now()}`,
      label: 'New Field',
      name: `field_${Date.now()}`,
      type: 'text',
      placeholder: 'Enter value',
      required: false,
      options: []
    };
    setFormFields([...formFields, newField]);
    setHasChanges(true);
  };

  const updateFormField = (id: string, updates: Partial<FormField>) => {
    setFormFields(formFields.map(f => f.id === id ? { ...f, ...updates } : f));
    setHasChanges(true);
  };

  const deleteFormField = (id: string) => {
    setFormFields(formFields.filter(f => f.id !== id));
    setHasChanges(true);
  };

  const tabs = [
    { id: 'hero' as TabType, label: 'Hero Section', icon: 'ri-image-line' },
    { id: 'form' as TabType, label: 'Contact Form', icon: 'ri-file-list-line' },
    { id: 'innovation' as TabType, label: 'Innovation Hub', icon: 'ri-map-pin-line' },
    { id: 'contact' as TabType, label: 'Contact Info', icon: 'ri-contacts-line' }
  ];

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
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-white">Contact Page Content</h2>
          <p className="text-white/60 mt-1">Manage all sections of the Contact page</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 border-b border-cyan-500/20">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium transition-all border-b-2 ${
                activeTab === tab.id
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-white/60 hover:text-white/80'
              }`}
            >
              <i className={`${tab.icon} mr-2`}></i>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {/* Hero Section Tab */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 space-y-4">
                <h3 className="text-xl font-bold text-white">Hero Section</h3>

                <div>
                  <label className="block text-white/80 font-medium mb-2">Badge Text</label>
                  <input
                    type="text"
                    value={heroContent.badge}
                    onChange={(e) => {
                      setHeroContent({ ...heroContent, badge: e.target.value });
                      setHasChanges(true);
                    }}
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white/80 font-medium mb-2">Title Line 1</label>
                  <input
                    type="text"
                    value={heroContent.title_line1}
                    onChange={(e) => {
                      setHeroContent({ ...heroContent, title_line1: e.target.value });
                      setHasChanges(true);
                    }}
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white/80 font-medium mb-2">Title Line 2 (Gradient)</label>
                  <input
                    type="text"
                    value={heroContent.title_line2}
                    onChange={(e) => {
                      setHeroContent({ ...heroContent, title_line2: e.target.value });
                      setHasChanges(true);
                    }}
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white/80 font-medium mb-2">Subtitle</label>
                  <textarea
                    value={heroContent.subtitle}
                    onChange={(e) => {
                      setHeroContent({ ...heroContent, subtitle: e.target.value });
                      setHasChanges(true);
                    }}
                    rows={3}
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-white/80 font-medium mb-2">Background Image</label>
                  {heroContent.background_image && (
                    <div className="mb-3 relative w-full h-48 rounded-lg overflow-hidden border border-cyan-500/20">
                      <img
                        src={heroContent.background_image}
                        alt="Hero Background"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={heroContent.background_image}
                      onChange={(e) => {
                        setHeroContent({ ...heroContent, background_image: e.target.value });
                        setHasChanges(true);
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
                          if (file) handleImageUpload(file, 'hero_background');
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSaveHero}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                <i className="ri-save-line mr-2"></i>Save Hero Section
              </button>
            </div>
          )}

          {/* Contact Form Tab */}
          {activeTab === 'form' && (
            <div className="space-y-6">
              <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 space-y-4">
                <h3 className="text-xl font-bold text-white">Contact Form Header</h3>

                <div>
                  <label className="block text-white/80 font-medium mb-2">Form Title</label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => {
                      setFormTitle(e.target.value);
                      setHasChanges(true);
                    }}
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white/80 font-medium mb-2">Form Description</label>
                  <textarea
                    value={formDescription}
                    onChange={(e) => {
                      setFormDescription(e.target.value);
                      setHasChanges(true);
                    }}
                    rows={2}
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none resize-none"
                  />
                </div>
              </div>

              <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">Form Fields</h3>
                  <button
                    onClick={addFormField}
                    className="px-4 py-2 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg transition-all"
                  >
                    <i className="ri-add-line mr-2"></i>Add Field
                  </button>
                </div>

                {formFields.length === 0 ? (
                  <div className="text-center py-8 text-white/40">
                    <i className="ri-file-list-line text-4xl mb-2"></i>
                    <p>No form fields yet. Click "Add Field" to create one.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {formFields.map((field, index) => (
                      <div key={field.id} className="bg-[#252525]/50 border border-cyan-500/10 rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-white/60 text-sm">Field #{index + 1}</span>
                          <button
                            onClick={() => deleteFormField(field.id)}
                            className="px-3 py-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg text-sm transition-all"
                          >
                            <i className="ri-delete-bin-line mr-1"></i>Delete
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-white/60 text-sm mb-1">Label</label>
                            <input
                              type="text"
                              value={field.label}
                              onChange={(e) => updateFormField(field.id, { label: e.target.value })}
                              className="w-full px-3 py-2 bg-[#1a1a2e] border border-cyan-500/20 rounded-lg text-white text-sm focus:border-cyan-400 focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-white/60 text-sm mb-1">Field Name</label>
                            <input
                              type="text"
                              value={field.name}
                              onChange={(e) => updateFormField(field.id, { name: e.target.value })}
                              className="w-full px-3 py-2 bg-[#1a1a2e] border border-cyan-500/20 rounded-lg text-white text-sm focus:border-cyan-400 focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-white/60 text-sm mb-1">Field Type</label>
                            <select
                              value={field.type}
                              onChange={(e) => updateFormField(field.id, { type: e.target.value as any })}
                              className="w-full px-3 py-2 bg-[#1a1a2e] border border-cyan-500/20 rounded-lg text-white text-sm focus:border-cyan-400 focus:outline-none"
                            >
                              <option value="text">Text</option>
                              <option value="email">Email</option>
                              <option value="tel">Phone</option>
                              <option value="textarea">Textarea</option>
                              <option value="select">Dropdown</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-white/60 text-sm mb-1">Placeholder</label>
                            <input
                              type="text"
                              value={field.placeholder}
                              onChange={(e) => updateFormField(field.id, { placeholder: e.target.value })}
                              className="w-full px-3 py-2 bg-[#1a1a2e] border border-cyan-500/20 rounded-lg text-white text-sm focus:border-cyan-400 focus:outline-none"
                            />
                          </div>
                        </div>

                        {field.type === 'select' && (
                          <div>
                            <label className="block text-white/60 text-sm mb-1">Options (comma-separated)</label>
                            <input
                              type="text"
                              value={field.options?.join(', ') || ''}
                              onChange={(e) => updateFormField(field.id, { options: e.target.value.split(',').map(o => o.trim()) })}
                              placeholder="Option 1, Option 2, Option 3"
                              className="w-full px-3 py-2 bg-[#1a1a2e] border border-cyan-500/20 rounded-lg text-white text-sm focus:border-cyan-400 focus:outline-none"
                            />
                          </div>
                        )}

                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id={`required_${field.id}`}
                            checked={field.required}
                            onChange={(e) => updateFormField(field.id, { required: e.target.checked })}
                            className="w-4 h-4 rounded border-cyan-500/20 bg-[#1a1a2e] text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0"
                          />
                          <label htmlFor={`required_${field.id}`} className="ml-2 text-white/60 text-sm">
                            Required Field
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={handleSaveForm}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                <i className="ri-save-line mr-2"></i>Save Form Configuration
              </button>
            </div>
          )}

          {/* Innovation Hub Tab */}
          {activeTab === 'innovation' && (
            <div className="space-y-6">
              <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 space-y-4">
                <h3 className="text-xl font-bold text-white">Visit Our Innovation Hub</h3>

                <div>
                  <label className="block text-white/80 font-medium mb-2">Title Line 1</label>
                  <input
                    type="text"
                    value={innovationContent.title_line1}
                    onChange={(e) => {
                      setInnovationContent({ ...innovationContent, title_line1: e.target.value });
                      setHasChanges(true);
                    }}
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white/80 font-medium mb-2">Title Line 2 (Gradient)</label>
                  <input
                    type="text"
                    value={innovationContent.title_line2}
                    onChange={(e) => {
                      setInnovationContent({ ...innovationContent, title_line2: e.target.value });
                      setHasChanges(true);
                    }}
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white/80 font-medium mb-2">Description</label>
                  <textarea
                    value={innovationContent.description}
                    onChange={(e) => {
                      setInnovationContent({ ...innovationContent, description: e.target.value });
                      setHasChanges(true);
                    }}
                    rows={3}
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-white/80 font-medium mb-2">Google Maps Embed URL</label>
                  <input
                    type="text"
                    value={innovationContent.google_maps_url}
                    onChange={(e) => {
                      setInnovationContent({ ...innovationContent, google_maps_url: e.target.value });
                      setHasChanges(true);
                    }}
                    placeholder="https://www.google.com/maps/embed?pb=..."
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                  <p className="text-white/40 text-sm mt-2">
                    <i className="ri-information-line mr-1"></i>
                    Get embed URL from Google Maps (Share → Embed a map)
                  </p>
                </div>
              </div>

              <button
                onClick={handleSaveInnovation}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                <i className="ri-save-line mr-2"></i>Save Innovation Hub Section
              </button>
            </div>
          )}

          {/* Contact Information Tab */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 space-y-4">
                <h3 className="text-xl font-bold text-white">Contact Information Section</h3>
                <p className="text-white/60 text-sm">
                  <i className="ri-information-line mr-1"></i>
                  Phone, email, address, and social media are managed in Settings
                </p>

                <div>
                  <label className="block text-white/80 font-medium mb-2">Title Line 1</label>
                  <input
                    type="text"
                    value={contactInfo.title_line1}
                    onChange={(e) => {
                      setContactInfo({ ...contactInfo, title_line1: e.target.value });
                      setHasChanges(true);
                    }}
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white/80 font-medium mb-2">Title Line 2 (Gradient)</label>
                  <input
                    type="text"
                    value={contactInfo.title_line2}
                    onChange={(e) => {
                      setContactInfo({ ...contactInfo, title_line2: e.target.value });
                      setHasChanges(true);
                    }}
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white/80 font-medium mb-2">Description</label>
                  <textarea
                    value={contactInfo.description}
                    onChange={(e) => {
                      setContactInfo({ ...contactInfo, description: e.target.value });
                      setHasChanges(true);
                    }}
                    rows={3}
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none resize-none"
                  />
                </div>
              </div>

              <button
                onClick={handleSaveContact}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                <i className="ri-save-line mr-2"></i>Save Contact Information Section
              </button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
