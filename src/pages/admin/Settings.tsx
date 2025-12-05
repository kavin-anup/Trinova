import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { siteConfigAPI, uploadAPI, authAPI } from '../../services/api';

type TabType = 'contact' | 'social' | 'branding';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<TabType>('contact');
  const [loading, setLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);

  // Contact Information State
  const [contactInfo, setContactInfo] = useState({
    phone_number: '+91 83106 94003',
    phone_availability: 'Available Monday - Friday, 9 AM - 6 PM IST',
    email_address: 'technical@trinovaaitech.com',
    email_response_time: 'We respond within 24 hours',
    office_address_line1: 'No-1461, 2nd floor, 14th cross road,',
    office_address_line2: 'Ananth Nagar phase2, Electronic City,',
    office_address_line3: 'Bangalore - 560100, India',
    office_address_note: 'Visit us for in-person consultations'
  });

  // Social Media State
  const [socialMedia, setSocialMedia] = useState({
    instagram_url: '',
    facebook_url: '',
    twitter_url: '',
    linkedin_url: '',
    youtube_url: '',
    whatsapp_url: ''
  });

  // Branding State
  const [branding, setBranding] = useState({
    header_logo_url: '',
    favicon_url: '',
    footer_logo_url: '',
    footer_description: 'Pioneering the future of intelligent electronics and AI solutions through innovative hardware design, advanced R&D, and end-to-end product development.'
  });

  // Password Change State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await siteConfigAPI.get();
      const config = response.data?.config || {};

      // Parse contact information
      if (config.phone_number) setContactInfo(prev => ({ ...prev, phone_number: config.phone_number }));
      if (config.phone_availability) setContactInfo(prev => ({ ...prev, phone_availability: config.phone_availability }));
      if (config.email_address) setContactInfo(prev => ({ ...prev, email_address: config.email_address }));
      if (config.email_response_time) setContactInfo(prev => ({ ...prev, email_response_time: config.email_response_time }));
      if (config.office_address_line1) setContactInfo(prev => ({ ...prev, office_address_line1: config.office_address_line1 }));
      if (config.office_address_line2) setContactInfo(prev => ({ ...prev, office_address_line2: config.office_address_line2 }));
      if (config.office_address_line3) setContactInfo(prev => ({ ...prev, office_address_line3: config.office_address_line3 }));
      if (config.office_address_note) setContactInfo(prev => ({ ...prev, office_address_note: config.office_address_note }));

      // Parse social media
      if (config.instagram_url) setSocialMedia(prev => ({ ...prev, instagram_url: config.instagram_url }));
      if (config.facebook_url) setSocialMedia(prev => ({ ...prev, facebook_url: config.facebook_url }));
      if (config.twitter_url) setSocialMedia(prev => ({ ...prev, twitter_url: config.twitter_url }));
      if (config.linkedin_url) setSocialMedia(prev => ({ ...prev, linkedin_url: config.linkedin_url }));
      if (config.youtube_url) setSocialMedia(prev => ({ ...prev, youtube_url: config.youtube_url }));
      if (config.whatsapp_url) setSocialMedia(prev => ({ ...prev, whatsapp_url: config.whatsapp_url }));

      // Parse branding
      if (config.header_logo_url) setBranding(prev => ({ ...prev, header_logo_url: config.header_logo_url }));
      if (config.favicon_url) setBranding(prev => ({ ...prev, favicon_url: config.favicon_url }));
      if (config.footer_logo_url) setBranding(prev => ({ ...prev, footer_logo_url: config.footer_logo_url }));
      if (config.footer_description) setBranding(prev => ({ ...prev, footer_description: config.footer_description }));
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveContact = async () => {
    try {
      await siteConfigAPI.update(contactInfo);
      alert('Contact information saved successfully!');
      setHasChanges(false);
    } catch (error: any) {
      alert(error.message || 'Error saving contact information');
    }
  };

  const handleSaveSocial = async () => {
    try {
      await siteConfigAPI.update(socialMedia);
      alert('Social media links saved successfully!');
      setHasChanges(false);
    } catch (error: any) {
      alert(error.message || 'Error saving social media links');
    }
  };

  const handleSaveBranding = async () => {
    try {
      await siteConfigAPI.update(branding);
      alert('Branding settings saved successfully!');
      setHasChanges(false);
    } catch (error: any) {
      alert(error.message || 'Error saving branding settings');
    }
  };

  const handleImageUpload = async (file: File, field: keyof typeof branding) => {
    try {
      const response = await uploadAPI.uploadImage(file, 'branding');
      const imageUrl = response.data.media.url;
      setBranding(prev => ({ ...prev, [field]: imageUrl }));
      setHasChanges(true);
    } catch (error: any) {
      alert(error.message || 'Error uploading image');
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await authAPI.changePassword(passwordForm.currentPassword, passwordForm.newPassword);
      alert('Password changed successfully!');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error: any) {
      alert(error.message || 'Error changing password');
    }
  };

  const tabs = [
    { id: 'contact' as TabType, label: 'Contact Information', icon: 'ri-phone-line' },
    { id: 'social' as TabType, label: 'Social Media', icon: 'ri-share-line' },
    { id: 'branding' as TabType, label: 'Logo & Branding', icon: 'ri-palette-line' }
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
          <h2 className="text-2xl font-bold text-white">Site Settings</h2>
          <p className="text-white/60 mt-1">Manage contact information, social media, and branding</p>
          <p className="text-white/40 text-sm mt-2">
            <i className="ri-information-line mr-1"></i>
            Changes here will update both the footer and contact page
          </p>
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
          {/* Contact Information Tab */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 space-y-4">
                <h3 className="text-xl font-bold text-white">Phone Contact</h3>

                <div>
                  <label className="block text-white/80 font-medium mb-2">Phone Number</label>
                  <input
                    type="text"
                    value={contactInfo.phone_number}
                    onChange={(e) => {
                      setContactInfo({ ...contactInfo, phone_number: e.target.value });
                      setHasChanges(true);
                    }}
                    placeholder="+91 83106 94003"
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white/80 font-medium mb-2">Availability</label>
                  <input
                    type="text"
                    value={contactInfo.phone_availability}
                    onChange={(e) => {
                      setContactInfo({ ...contactInfo, phone_availability: e.target.value });
                      setHasChanges(true);
                    }}
                    placeholder="Available Monday - Friday, 9 AM - 6 PM IST"
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 space-y-4">
                <h3 className="text-xl font-bold text-white">Email Contact</h3>

                <div>
                  <label className="block text-white/80 font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    value={contactInfo.email_address}
                    onChange={(e) => {
                      setContactInfo({ ...contactInfo, email_address: e.target.value });
                      setHasChanges(true);
                    }}
                    placeholder="technical@trinovaaitech.com"
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white/80 font-medium mb-2">Response Time</label>
                  <input
                    type="text"
                    value={contactInfo.email_response_time}
                    onChange={(e) => {
                      setContactInfo({ ...contactInfo, email_response_time: e.target.value });
                      setHasChanges(true);
                    }}
                    placeholder="We respond within 24 hours"
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 space-y-4">
                <h3 className="text-xl font-bold text-white">Office Address</h3>

                <div>
                  <label className="block text-white/80 font-medium mb-2">Address Line 1</label>
                  <input
                    type="text"
                    value={contactInfo.office_address_line1}
                    onChange={(e) => {
                      setContactInfo({ ...contactInfo, office_address_line1: e.target.value });
                      setHasChanges(true);
                    }}
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white/80 font-medium mb-2">Address Line 2</label>
                  <input
                    type="text"
                    value={contactInfo.office_address_line2}
                    onChange={(e) => {
                      setContactInfo({ ...contactInfo, office_address_line2: e.target.value });
                      setHasChanges(true);
                    }}
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white/80 font-medium mb-2">Address Line 3</label>
                  <input
                    type="text"
                    value={contactInfo.office_address_line3}
                    onChange={(e) => {
                      setContactInfo({ ...contactInfo, office_address_line3: e.target.value });
                      setHasChanges(true);
                    }}
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white/80 font-medium mb-2">Additional Note</label>
                  <input
                    type="text"
                    value={contactInfo.office_address_note}
                    onChange={(e) => {
                      setContactInfo({ ...contactInfo, office_address_note: e.target.value });
                      setHasChanges(true);
                    }}
                    placeholder="Visit us for in-person consultations"
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <button
                onClick={handleSaveContact}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                <i className="ri-save-line mr-2"></i>Save Contact Information
              </button>
            </div>
          )}

          {/* Social Media Tab */}
          {activeTab === 'social' && (
            <div className="space-y-6">
              <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 space-y-4">
                <h3 className="text-xl font-bold text-white">Social Media Links</h3>
                <p className="text-white/60 text-sm">
                  Add your social media profile URLs. These will be displayed in the footer and contact page.
                </p>

                <div>
                  <label className="block text-white/80 font-medium mb-2">
                    <i className="ri-instagram-line mr-2 text-pink-500"></i>
                    Instagram URL
                  </label>
                  <input
                    type="url"
                    value={socialMedia.instagram_url}
                    onChange={(e) => {
                      setSocialMedia({ ...socialMedia, instagram_url: e.target.value });
                      setHasChanges(true);
                    }}
                    placeholder="https://instagram.com/yourprofile"
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white/80 font-medium mb-2">
                    <i className="ri-facebook-line mr-2 text-blue-500"></i>
                    Facebook URL
                  </label>
                  <input
                    type="url"
                    value={socialMedia.facebook_url}
                    onChange={(e) => {
                      setSocialMedia({ ...socialMedia, facebook_url: e.target.value });
                      setHasChanges(true);
                    }}
                    placeholder="https://facebook.com/yourpage"
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white/80 font-medium mb-2">
                    <i className="ri-twitter-x-line mr-2 text-white"></i>
                    X (Twitter) URL
                  </label>
                  <input
                    type="url"
                    value={socialMedia.twitter_url}
                    onChange={(e) => {
                      setSocialMedia({ ...socialMedia, twitter_url: e.target.value });
                      setHasChanges(true);
                    }}
                    placeholder="https://twitter.com/yourprofile"
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white/80 font-medium mb-2">
                    <i className="ri-linkedin-line mr-2 text-blue-600"></i>
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={socialMedia.linkedin_url}
                    onChange={(e) => {
                      setSocialMedia({ ...socialMedia, linkedin_url: e.target.value });
                      setHasChanges(true);
                    }}
                    placeholder="https://linkedin.com/company/yourcompany"
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white/80 font-medium mb-2">
                    <i className="ri-youtube-line mr-2 text-red-500"></i>
                    YouTube URL
                  </label>
                  <input
                    type="url"
                    value={socialMedia.youtube_url}
                    onChange={(e) => {
                      setSocialMedia({ ...socialMedia, youtube_url: e.target.value });
                      setHasChanges(true);
                    }}
                    placeholder="https://youtube.com/@yourchannel"
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white/80 font-medium mb-2">
                    <i className="ri-whatsapp-line mr-2 text-green-500"></i>
                    WhatsApp Chat Link
                  </label>
                  <input
                    type="url"
                    value={socialMedia.whatsapp_url}
                    onChange={(e) => {
                      setSocialMedia({ ...socialMedia, whatsapp_url: e.target.value });
                      setHasChanges(true);
                    }}
                    placeholder="https://wa.me/1234567890 or https://chat.whatsapp.com/invitecode"
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                  <p className="text-white/50 text-xs mt-1">
                    Enter WhatsApp chat link (e.g., https://wa.me/1234567890 or WhatsApp group invite link)
                  </p>
                </div>
              </div>

              <button
                onClick={handleSaveSocial}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                <i className="ri-save-line mr-2"></i>Save Social Media Links
              </button>
            </div>
          )}

          {/* Logo & Branding Tab */}
          {activeTab === 'branding' && (
            <div className="space-y-6">
              <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 space-y-4">
                <h3 className="text-xl font-bold text-white">Header Logo</h3>

                {branding.header_logo_url && (
                  <div className="relative w-48 h-16 rounded-lg overflow-hidden border border-cyan-500/20 bg-white/5">
                    <img
                      src={branding.header_logo_url}
                      alt="Header Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}

                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={branding.header_logo_url}
                    onChange={(e) => {
                      setBranding({ ...branding, header_logo_url: e.target.value });
                      setHasChanges(true);
                    }}
                    placeholder="Logo URL or upload"
                    className="flex-1 px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                  <label className="px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg cursor-pointer transition-all">
                    <i className="ri-upload-line mr-2"></i>Upload
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file, 'header_logo_url');
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 space-y-4">
                <h3 className="text-xl font-bold text-white">Favicon</h3>
                <p className="text-white/60 text-sm">Browser tab icon (recommended: 32x32 or 64x64 px)</p>

                {branding.favicon_url && (
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-cyan-500/20 bg-white/5">
                    <img
                      src={branding.favicon_url}
                      alt="Favicon"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}

                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={branding.favicon_url}
                    onChange={(e) => {
                      setBranding({ ...branding, favicon_url: e.target.value });
                      setHasChanges(true);
                    }}
                    placeholder="Favicon URL or upload"
                    className="flex-1 px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                  <label className="px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg cursor-pointer transition-all">
                    <i className="ri-upload-line mr-2"></i>Upload
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file, 'favicon_url');
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 space-y-4">
                <h3 className="text-xl font-bold text-white">Footer Logo & Description</h3>

                {branding.footer_logo_url && (
                  <div className="relative w-48 h-16 rounded-lg overflow-hidden border border-cyan-500/20 bg-white/5">
                    <img
                      src={branding.footer_logo_url}
                      alt="Footer Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-white/80 font-medium mb-2">Footer Logo URL</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={branding.footer_logo_url}
                      onChange={(e) => {
                        setBranding({ ...branding, footer_logo_url: e.target.value });
                        setHasChanges(true);
                      }}
                      placeholder="Logo URL or upload"
                      className="flex-1 px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                    />
                    <label className="px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg cursor-pointer transition-all">
                      <i className="ri-upload-line mr-2"></i>Upload
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file, 'footer_logo_url');
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-white/80 font-medium mb-2">Footer Description</label>
                  <textarea
                    value={branding.footer_description}
                    onChange={(e) => {
                      setBranding({ ...branding, footer_description: e.target.value });
                      setHasChanges(true);
                    }}
                    rows={4}
                    placeholder="Company description displayed in the footer"
                    className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none resize-none"
                  />
                </div>
              </div>

              <button
                onClick={handleSaveBranding}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                <i className="ri-save-line mr-2"></i>Save Branding Settings
              </button>
            </div>
          )}
        </div>

        {/* Password Change Section */}
        <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 mt-8">
          <h3 className="text-xl font-bold text-white mb-4">Change Admin Password</h3>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-white/80 font-medium mb-2">Current Password</label>
              <input
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                required
                className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-white/80 font-medium mb-2">New Password</label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                required
                className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-white/80 font-medium mb-2">Confirm New Password</label>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                required
                className="w-full px-4 py-2 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
            >
              <i className="ri-lock-password-line mr-2"></i>Change Password
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
