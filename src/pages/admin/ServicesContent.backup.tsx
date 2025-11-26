import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { servicesContentAPI, uploadAPI } from '../../services/api';

interface ContentSection {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'image' | 'json';
  value: any;
  imageUrl?: string;
  description?: string;
}

export default function ServicesContent() {
  const [sections, setSections] = useState<ContentSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await servicesContentAPI.getAll();
      const contentItems = response.data?.content || [];

      // Define all editable sections for Services page
      const sectionDefinitions: ContentSection[] = [
        // Hero Section
        {
          key: 'hero_badge',
          label: 'Hero Section - Badge Text',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'hero_badge')?.content_value || 'Our Services',
          description: 'Badge text in hero section'
        },
        {
          key: 'hero_title_line1',
          label: 'Hero Section - Title Line 1',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'hero_title_line1')?.content_value || 'Comprehensive Solutions for',
          description: 'First line of hero title'
        },
        {
          key: 'hero_title_line2',
          label: 'Hero Section - Title Line 2',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'hero_title_line2')?.content_value || 'Intelligent Electronics',
          description: 'Second line of hero title (gradient text)'
        },
        {
          key: 'hero_subtitle',
          label: 'Hero Section - Subtitle',
          type: 'textarea',
          value: contentItems.find((c: any) => c.content_key === 'hero_subtitle')?.content_value || 'From deep R&D and hardware engineering to high-volume manufacturing and AI integration, Trinova AI is your full-stack product realization partner.',
          description: 'Subtitle paragraph in hero section'
        },
        {
          key: 'hero_background_image',
          label: 'Hero Section - Background Image',
          type: 'image',
          value: '',
          imageUrl: contentItems.find((c: any) => c.content_key === 'hero_background_image')?.image_url || '',
          description: 'Background image for hero section'
        },
        // Core Services Section Header
        {
          key: 'core_badge',
          label: 'Core Services Section - Badge Text',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'core_badge')?.content_value || 'Technology Stack',
          description: 'Badge text above core services section'
        },
        {
          key: 'core_title_line1',
          label: 'Core Services Section - Title Line 1',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'core_title_line1')?.content_value || 'Our End-to-End',
          description: 'First line of core services title'
        },
        {
          key: 'core_title_line2',
          label: 'Core Services Section - Title Line 2',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'core_title_line2')?.content_value || 'Technology Stack',
          description: 'Second line of core services title'
        },
        {
          key: 'core_description',
          label: 'Core Services Section - Description',
          type: 'textarea',
          value: contentItems.find((c: any) => c.content_key === 'core_description')?.content_value || 'Comprehensive solutions spanning the entire product development lifecycle',
          description: 'Description text below core services title'
        },
        // Service 1: Research & Development
        {
          key: 'service_1_badge',
          label: 'Service 1 (R&D) - Badge Text',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'service_1_badge')?.content_value || 'R&D Excellence',
          description: 'Badge for Research & Development service'
        },
        {
          key: 'service_1_title_line1',
          label: 'Service 1 (R&D) - Title Line 1',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'service_1_title_line1')?.content_value || 'Research &',
          description: 'First line of R&D service title'
        },
        {
          key: 'service_1_title_line2',
          label: 'Service 1 (R&D) - Title Line 2',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'service_1_title_line2')?.content_value || 'Development',
          description: 'Second line of R&D service title'
        },
        {
          key: 'service_1_description',
          label: 'Service 1 (R&D) - Description',
          type: 'textarea',
          value: contentItems.find((c: any) => c.content_key === 'service_1_description')?.content_value || 'Advanced R&D for innovative solutions in hardware and firmware. Expertise in prototyping and testing for market-ready products. Focus on enhancing performance and sustainability.',
          description: 'Description for R&D service'
        },
        {
          key: 'service_1_image',
          label: 'Service 1 (R&D) - Image',
          type: 'image',
          value: '',
          imageUrl: contentItems.find((c: any) => c.content_key === 'service_1_image')?.image_url || '',
          description: 'Image for R&D service'
        },
        {
          key: 'service_1_feature_1',
          label: 'Service 1 (R&D) - Feature 1',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'service_1_feature_1')?.content_value || 'Innovation Focus',
          description: 'First feature for R&D service'
        },
        {
          key: 'service_1_feature_2',
          label: 'Service 1 (R&D) - Feature 2',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'service_1_feature_2')?.content_value || 'Rapid Prototyping',
          description: 'Second feature for R&D service'
        },
        // Service 2: End-to-End Product Development
        {
          key: 'service_2_badge',
          label: 'Service 2 (E2E) - Badge Text',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'service_2_badge')?.content_value || 'Full Lifecycle',
          description: 'Badge for End-to-End service'
        },
        {
          key: 'service_2_title_line1',
          label: 'Service 2 (E2E) - Title Line 1',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'service_2_title_line1')?.content_value || 'End-to-End Product',
          description: 'First line of E2E service title'
        },
        {
          key: 'service_2_title_line2',
          label: 'Service 2 (E2E) - Title Line 2',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'service_2_title_line2')?.content_value || 'Development',
          description: 'Second line of E2E service title'
        },
        {
          key: 'service_2_description',
          label: 'Service 2 (E2E) - Description',
          type: 'textarea',
          value: contentItems.find((c: any) => c.content_key === 'service_2_description')?.content_value || 'Concept-to-market solutions under one roof. Collaboration across design, development, and manufacturing. Rapid prototyping and iterative product improvement.',
          description: 'Description for E2E service'
        },
        {
          key: 'service_2_image',
          label: 'Service 2 (E2E) - Image',
          type: 'image',
          value: '',
          imageUrl: contentItems.find((c: any) => c.content_key === 'service_2_image')?.image_url || '',
          description: 'Image for E2E service'
        },
        {
          key: 'service_2_feature_1',
          label: 'Service 2 (E2E) - Feature 1',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'service_2_feature_1')?.content_value || 'Cross-functional Teams',
          description: 'First feature for E2E service'
        },
        {
          key: 'service_2_feature_2',
          label: 'Service 2 (E2E) - Feature 2',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'service_2_feature_2')?.content_value || 'Iterative Improvement',
          description: 'Second feature for E2E service'
        },
        // Service 3: Hardware Designing
        {
          key: 'service_3_badge',
          label: 'Service 3 (Hardware) - Badge Text',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'service_3_badge')?.content_value || 'Custom Hardware',
          description: 'Badge for Hardware Designing service'
        },
        {
          key: 'service_3_title_line1',
          label: 'Service 3 (Hardware) - Title Line 1',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'service_3_title_line1')?.content_value || 'Hardware',
          description: 'First line of Hardware service title'
        },
        {
          key: 'service_3_title_line2',
          label: 'Service 3 (Hardware) - Title Line 2',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'service_3_title_line2')?.content_value || 'Designing',
          description: 'Second line of Hardware service title'
        },
        {
          key: 'service_3_description',
          label: 'Service 3 (Hardware) - Description',
          type: 'textarea',
          value: contentItems.find((c: any) => c.content_key === 'service_3_description')?.content_value || 'Custom hardware solutions tailored for specific applications. Expertise in PCB design, embedded systems, and circuit optimization. Innovative designs for IoT devices, medical equipment, and industrial systems.',
          description: 'Description for Hardware service'
        },
        {
          key: 'service_3_image',
          label: 'Service 3 (Hardware) - Image',
          type: 'image',
          value: '',
          imageUrl: contentItems.find((c: any) => c.content_key === 'service_3_image')?.image_url || '',
          description: 'Image for Hardware service'
        },
        {
          key: 'service_3_feature_1',
          label: 'Service 3 (Hardware) - Feature 1',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'service_3_feature_1')?.content_value || 'PCB Design',
          description: 'First feature for Hardware service'
        },
        {
          key: 'service_3_feature_2',
          label: 'Service 3 (Hardware) - Feature 2',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'service_3_feature_2')?.content_value || 'Circuit Optimization',
          description: 'Second feature for Hardware service'
        },
        // Service 4: Firmware Development
        {
          key: 'service_4_badge',
          label: 'Service 4 (Firmware) - Badge Text',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'service_4_badge')?.content_value || 'Embedded Systems',
          description: 'Badge for Firmware Development service'
        },
        {
          key: 'service_4_title_line1',
          label: 'Service 4 (Firmware) - Title Line 1',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'service_4_title_line1')?.content_value || 'Firmware',
          description: 'First line of Firmware service title'
        },
        {
          key: 'service_4_title_line2',
          label: 'Service 4 (Firmware) - Title Line 2',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'service_4_title_line2')?.content_value || 'Development',
          description: 'Second line of Firmware service title'
        },
        {
          key: 'service_4_description',
          label: 'Service 4 (Firmware) - Description',
          type: 'textarea',
          value: contentItems.find((c: any) => c.content_key === 'service_4_description')?.content_value || 'Development of robust and optimized firmware for embedded systems. Seamless integration of hardware and software for superior performance. Expertise in BLE, AI integration, and power management solutions.',
          description: 'Description for Firmware service'
        },
        {
          key: 'service_4_image',
          label: 'Service 4 (Firmware) - Image',
          type: 'image',
          value: '',
          imageUrl: contentItems.find((c: any) => c.content_key === 'service_4_image')?.image_url || '',
          description: 'Image for Firmware service'
        },
        {
          key: 'service_4_feature_1',
          label: 'Service 4 (Firmware) - Feature 1',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'service_4_feature_1')?.content_value || 'BLE Integration',
          description: 'First feature for Firmware service'
        },
        {
          key: 'service_4_feature_2',
          label: 'Service 4 (Firmware) - Feature 2',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'service_4_feature_2')?.content_value || 'Power Management',
          description: 'Second feature for Firmware service'
        },
        // Service 5: Electronics Manufacturing
        {
          key: 'service_5_badge',
          label: 'Service 5 (EMS) - Badge Text',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'service_5_badge')?.content_value || 'EMS Solutions',
          description: 'Badge for Electronics Manufacturing service'
        },
        {
          key: 'service_5_title_line1',
          label: 'Service 5 (EMS) - Title Line 1',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'service_5_title_line1')?.content_value || 'Electronics Manufacturing',
          description: 'First line of EMS service title'
        },
        {
          key: 'service_5_title_line2',
          label: 'Service 5 (EMS) - Title Line 2',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'service_5_title_line2')?.content_value || '(EMS)',
          description: 'Second line of EMS service title'
        },
        {
          key: 'service_5_description',
          label: 'Service 5 (EMS) - Description',
          type: 'textarea',
          value: contentItems.find((c: any) => c.content_key === 'service_5_description')?.content_value || 'High-precision manufacturing solutions for diverse applications. Scalable production tailored to client needs. Stringent quality assurance processes to ensure unmatched reliability.',
          description: 'Description for EMS service'
        },
        {
          key: 'service_5_image',
          label: 'Service 5 (EMS) - Image',
          type: 'image',
          value: '',
          imageUrl: contentItems.find((c: any) => c.content_key === 'service_5_image')?.image_url || '',
          description: 'Image for EMS service'
        },
        {
          key: 'service_5_feature_1',
          label: 'Service 5 (EMS) - Feature 1',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'service_5_feature_1')?.content_value || 'Scalable Production',
          description: 'First feature for EMS service'
        },
        {
          key: 'service_5_feature_2',
          label: 'Service 5 (EMS) - Feature 2',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'service_5_feature_2')?.content_value || 'Quality Assurance',
          description: 'Second feature for EMS service'
        },
        // Service 6: Component Sourcing
        {
          key: 'service_6_badge',
          label: 'Service 6 (Sourcing) - Badge Text',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'service_6_badge')?.content_value || 'Global Sourcing',
          description: 'Badge for Component Sourcing service'
        },
        {
          key: 'service_6_title_line1',
          label: 'Service 6 (Sourcing) - Title Line 1',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'service_6_title_line1')?.content_value || 'Component Sourcing &',
          description: 'First line of Sourcing service title'
        },
        {
          key: 'service_6_title_line2',
          label: 'Service 6 (Sourcing) - Title Line 2',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'service_6_title_line2')?.content_value || 'Procurement',
          description: 'Second line of Sourcing service title'
        },
        {
          key: 'service_6_description',
          label: 'Service 6 (Sourcing) - Description',
          type: 'textarea',
          value: contentItems.find((c: any) => c.content_key === 'service_6_description')?.content_value || 'Reliable sourcing of high-quality components from trusted suppliers. Cost-effective procurement strategies to optimize project budgets. Global supply chain management for timely delivery.',
          description: 'Description for Sourcing service'
        },
        {
          key: 'service_6_image',
          label: 'Service 6 (Sourcing) - Image',
          type: 'image',
          value: '',
          imageUrl: contentItems.find((c: any) => c.content_key === 'service_6_image')?.image_url || '',
          description: 'Image for Sourcing service'
        },
        {
          key: 'service_6_feature_1',
          label: 'Service 6 (Sourcing) - Feature 1',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'service_6_feature_1')?.content_value || 'Global Network',
          description: 'First feature for Sourcing service'
        },
        {
          key: 'service_6_feature_2',
          label: 'Service 6 (Sourcing) - Feature 2',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'service_6_feature_2')?.content_value || 'Cost Optimization',
          description: 'Second feature for Sourcing service'
        },
        // Service 7: Mobile Application Development
        {
          key: 'service_7_badge',
          label: 'Service 7 (Mobile) - Badge Text',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'service_7_badge')?.content_value || 'Mobile Solutions',
          description: 'Badge for Mobile App Development service'
        },
        {
          key: 'service_7_title_line1',
          label: 'Service 7 (Mobile) - Title Line 1',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'service_7_title_line1')?.content_value || 'Mobile Application',
          description: 'First line of Mobile service title'
        },
        {
          key: 'service_7_title_line2',
          label: 'Service 7 (Mobile) - Title Line 2',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'service_7_title_line2')?.content_value || 'Development',
          description: 'Second line of Mobile service title'
        },
        {
          key: 'service_7_description',
          label: 'Service 7 (Mobile) - Description',
          type: 'textarea',
          value: contentItems.find((c: any) => c.content_key === 'service_7_description')?.content_value || 'Design and development of mobile apps for enhanced user experience. Integration of IoT devices with mobile platforms for real-time monitoring. Cross-platform compatibility for seamless functionality.',
          description: 'Description for Mobile service'
        },
        {
          key: 'service_7_image',
          label: 'Service 7 (Mobile) - Image',
          type: 'image',
          value: '',
          imageUrl: contentItems.find((c: any) => c.content_key === 'service_7_image')?.image_url || '',
          description: 'Image for Mobile service'
        },
        {
          key: 'service_7_feature_1',
          label: 'Service 7 (Mobile) - Feature 1',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'service_7_feature_1')?.content_value || 'IoT Integration',
          description: 'First feature for Mobile service'
        },
        {
          key: 'service_7_feature_2',
          label: 'Service 7 (Mobile) - Feature 2',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'service_7_feature_2')?.content_value || 'Cross-platform',
          description: 'Second feature for Mobile service'
        },
        // Service 8: AI Integration
        {
          key: 'service_8_badge',
          label: 'Service 8 (AI) - Badge Text',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'service_8_badge')?.content_value || 'AI Solutions',
          description: 'Badge for AI Integration service'
        },
        {
          key: 'service_8_title_line1',
          label: 'Service 8 (AI) - Title Line 1',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'service_8_title_line1')?.content_value || 'AI Integration in',
          description: 'First line of AI service title'
        },
        {
          key: 'service_8_title_line2',
          label: 'Service 8 (AI) - Title Line 2',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'service_8_title_line2')?.content_value || 'Electronics',
          description: 'Second line of AI service title'
        },
        {
          key: 'service_8_description',
          label: 'Service 8 (AI) - Description',
          type: 'textarea',
          value: contentItems.find((c: any) => c.content_key === 'service_8_description')?.content_value || 'Leveraging artificial intelligence for smarter, adaptive electronics. Development of AI-driven solutions for predictive maintenance, automation, and more. AI-enhanced edge devices for IoT and industrial systems.',
          description: 'Description for AI service'
        },
        {
          key: 'service_8_image',
          label: 'Service 8 (AI) - Image',
          type: 'image',
          value: '',
          imageUrl: contentItems.find((c: any) => c.content_key === 'service_8_image')?.image_url || '',
          description: 'Image for AI service'
        },
        {
          key: 'service_8_feature_1',
          label: 'Service 8 (AI) - Feature 1',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'service_8_feature_1')?.content_value || 'Predictive Analytics',
          description: 'First feature for AI service'
        },
        {
          key: 'service_8_feature_2',
          label: 'Service 8 (AI) - Feature 2',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'service_8_feature_2')?.content_value || 'Smart Automation',
          description: 'Second feature for AI service'
        },
        // CTA Section
        {
          key: 'cta_badge',
          label: 'CTA Section - Badge Text',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'cta_badge')?.content_value || 'Ready to Start?',
          description: 'Badge text in CTA section'
        },
        {
          key: 'cta_title_line1',
          label: 'CTA Section - Title Line 1',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'cta_title_line1')?.content_value || "Let's Build Your Next",
          description: 'First line of CTA title'
        },
        {
          key: 'cta_title_line2',
          label: 'CTA Section - Title Line 2',
          type: 'text',
          value: contentItems.find((c: any) => c.content_key === 'cta_title_line2')?.content_value || 'Intelligent Product',
          description: 'Second line of CTA title'
        },
        {
          key: 'cta_description',
          label: 'CTA Section - Description',
          type: 'textarea',
          value: contentItems.find((c: any) => c.content_key === 'cta_description')?.content_value || 'Partner with Trinova AI for comprehensive technology solutions that bring your vision to life',
          description: 'Description in CTA section'
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

      await servicesContentAPI.bulkUpdate(updates);
      alert('Content saved successfully!');
    } catch (error: any) {
      alert(error.message || 'Error saving content');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (sectionKey: string, file: File) => {
    try {
      const response = await uploadAPI.uploadImage(file, 'services');
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
            <h2 className="text-2xl font-bold text-white">Services Page Content</h2>
            <p className="text-white/60 mt-1">Edit all content sections of the services page</p>
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
            href="/services"
            target="_blank"
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
          >
            <i className="ri-eye-line mr-2"></i>Preview Services Page
          </a>
        </div>
      </div>
    </AdminLayout>
  );
}

