import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { useEffect, useState } from 'react';
import { contactContentAPI, siteConfigAPI } from '../../services/api';

interface FormField {
  id: string;
  label: string;
  name: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  placeholder: string;
  required: boolean;
  options?: string[];
}

interface FieldErrors {
  [key: string]: string;
}

export default function Contact() {
  const [content, setContent] = useState<any>({});
  const [siteConfig, setSiteConfig] = useState<any>({});
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});
  const [touchedFields, setTouchedFields] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const [contentResponse, configResponse] = await Promise.all([
        contactContentAPI.get(),
        siteConfigAPI.get()
      ]);
      setContent(contentResponse.data?.content || {});
      setSiteConfig(configResponse.data?.config || {});
      
      // Parse form fields from content
      const fieldsContent = contentResponse.data?.content?.form_fields?.value;
      if (fieldsContent) {
        try {
          const fields = typeof fieldsContent === 'string' ? JSON.parse(fieldsContent) : fieldsContent;
          setFormFields(Array.isArray(fields) ? fields : []);
        } catch (e) {
          console.error('Error parsing form fields:', e);
          setFormFields([]);
        }
      }
    } catch (error) {
      console.error('Error fetching content:', error);
      setContent({});
      setSiteConfig({});
      setFormFields([]);
    } finally {
      setLoading(false);
    }
  };

  // Helper to get content with fallback
  const getContent = (key: string, fallback: string = '') => {
    // Check siteConfig first for contact information
    if (siteConfig[key]) {
      return siteConfig[key];
    }
    // Then check content
    return content[key]?.value || fallback;
  };

  // Client-side validation
  const validateField = (_name: string, value: string, field: FormField): string => {
    if (field.required && !value.trim()) {
      return `${field.label} is required`;
    }

    if (!value.trim()) return ''; // Optional fields can be empty

    switch (field.type) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return 'Please enter a valid email address';
        }
        break;
      case 'tel':
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(value)) {
          return 'Please enter a valid phone number';
        }
        break;
      case 'textarea':
        if (field.name === 'message') {
          if (value.trim().length < 10) {
            return 'Message must be at least 10 characters';
          }
          if (value.trim().length > 500) {
            return 'Message must be less than 500 characters';
          }
        }
        break;
      case 'text':
        if (field.name === 'firstName' || field.name === 'lastName') {
          if (value.trim().length < 2) {
            return `${field.label} must be at least 2 characters`;
          }
          if (value.trim().length > 50) {
            return `${field.label} must be less than 50 characters`;
          }
        }
        break;
    }
    return '';
  };

  const validateForm = (): boolean => {
    const errors: FieldErrors = {};
    let isValid = true;

    formFields.forEach((field) => {
      const value = formValues[field.name] || '';
      const error = validateField(field.name, value, field);
      if (error) {
        errors[field.name] = error;
        isValid = false;
      }
    });

    setFieldErrors(errors);
    return isValid;
  };

  const isFormValid = (): boolean => {
    // Check if all required fields are filled and valid
    for (const field of formFields) {
      if (field.required) {
        const value = formValues[field.name] || '';
        if (!value.trim()) return false;
        const error = validateField(field.name, value, field);
        if (error) return false;
      }
    }
    return true;
  };

  const handleFieldChange = (name: string, value: string) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    // Validate on blur for touched fields
    if (touchedFields[name]) {
      const field = formFields.find(f => f.name === name);
      if (field) {
        const error = validateField(name, value, field);
        if (error) {
          setFieldErrors(prev => ({ ...prev, [name]: error }));
        }
      }
    }
  };

  const handleFieldBlur = (name: string) => {
    setTouchedFields(prev => ({ ...prev, [name]: true }));
    const field = formFields.find(f => f.name === name);
    const value = formValues[name] || '';
    if (field) {
      const error = validateField(name, value, field);
      if (error) {
        setFieldErrors(prev => ({ ...prev, [name]: error }));
      } else {
        setFieldErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage(null);

    // Mark all fields as touched
    const allTouched: { [key: string]: boolean } = {};
    formFields.forEach(field => {
      allTouched[field.name] = true;
    });
    setTouchedFields(allTouched);

    // Validate form
    if (!validateForm()) {
      setSubmitting(false);
      setSubmitMessage({
        type: 'error',
        text: 'Please fix the errors in the form before submitting.'
      });
      return;
    }

    try {
      // Build data object from form values
      const data: any = {};
      formFields.forEach(field => {
        const value = formValues[field.name] || '';
        if (value.trim() || field.required) {
          data[field.name] = value.trim() || undefined;
        }
      });

      // Custom fetch to preserve error details
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        // Throw error with full response data
        const error: any = new Error(responseData.message || 'Request failed');
        error.response = {
          data: responseData,
          status: response.status,
        };
        throw error;
      }
      
      if (responseData.success) {
        setSubmitMessage({
          type: 'success',
          text: responseData.message || 'Thank you for your inquiry. We will get back to you soon!'
        });
        // Reset form
        setFormValues({});
        setFieldErrors({});
        setTouchedFields({});
        (e.target as HTMLFormElement).reset();
        // Clear message after 5 seconds
        setTimeout(() => setSubmitMessage(null), 5000);
      }
    } catch (error: any) {
      console.error('Form submission error:', error);
      
      // Try to extract error details from the error object
      let errorData: any = null;
      
      // Check if error has response property (axios-style)
      if (error.response) {
        errorData = error.response;
      } 
      // Check if error has data property
      else if (error.data) {
        errorData = { data: error.data };
      }
      // Try to parse error message as JSON
      else if (error.message) {
        try {
          const parsed = JSON.parse(error.message);
          if (parsed.errors) {
            errorData = { data: parsed };
          }
        } catch (e) {
          // Not JSON, continue
        }
      }
      
      // Handle validation errors from backend
      if (errorData?.data?.errors && Array.isArray(errorData.data.errors)) {
        const backendErrors: FieldErrors = {};
        let errorMessages: string[] = [];
        
        errorData.data.errors.forEach((err: any) => {
          if (err.path && err.msg) {
            // Convert backend error messages to user-friendly ones
            let userFriendlyMsg = err.msg;
            
            if (err.path === 'message') {
              if (err.msg.includes('between 10 and 500') || err.msg.includes('between 10 and 500 character')) {
                const currentLength = (formValues.message || '').trim().length;
                if (currentLength < 10) {
                  userFriendlyMsg = 'Message must be at least 10 characters';
                } else if (currentLength > 500) {
                  userFriendlyMsg = 'Message must be less than 500 characters';
                } else {
                  userFriendlyMsg = 'Message must be between 10 and 500 characters';
                }
              }
            }
            
            backendErrors[err.path] = userFriendlyMsg;
            errorMessages.push(userFriendlyMsg);
          } else if (err.msg) {
            errorMessages.push(err.msg);
          }
        });
        
        setFieldErrors(backendErrors);
        
        // Show the first error message as toast
        if (errorMessages.length > 0) {
          setSubmitMessage({
            type: 'error',
            text: errorMessages[0]
          });
        } else {
          setSubmitMessage({
            type: 'error',
            text: 'Please check the form and try again.'
          });
        }
      } else {
        // Generic error message
        const errorMsg = errorData?.data?.message || error.message || 'Failed to submit form. Please try again.';
        setSubmitMessage({
          type: 'error',
          text: errorMsg
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const renderFormField = (field: FormField) => {
    const value = formValues[field.name] || '';
    const error = fieldErrors[field.name];
    const touched = touchedFields[field.name];
    const hasError = touched && error;
    const isMessageField = field.name === 'message';

    const baseInputClass = `w-full px-4 py-3 bg-[#252525]/50 border rounded-lg text-white placeholder-white/40 focus:outline-none transition-colors duration-300 ${
      hasError
        ? 'border-red-500 focus:border-red-400'
        : 'border-cyan-500/20 focus:border-cyan-400'
    }`;

    const labelClass = `block text-white font-medium mb-2 ${
      field.required ? 'after:content-["*"] after:text-red-400 after:ml-1' : ''
    }`;

    switch (field.type) {
      case 'textarea':
        return (
          <div key={field.id}>
            <label htmlFor={field.name} className={labelClass}>
              {field.label}
            </label>
            <textarea
              id={field.name}
              name={field.name}
              rows={4}
              maxLength={500}
              value={value}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              onBlur={() => handleFieldBlur(field.name)}
              className={`${baseInputClass} resize-none`}
              placeholder={isMessageField ? `${field.placeholder} (At least 10 characters)` : field.placeholder}
              required={field.required}
            />
            <div className="flex justify-between items-center mt-1">
              <p className="text-white/40 text-xs">
                {isMessageField && value.length > 0 && value.length < 10 && (
                  <span className="text-red-400">At least 10 characters required</span>
                )}
                {isMessageField && value.length >= 10 && (
                  <span className="text-green-400">{value.length}/500 characters</span>
                )}
                {!isMessageField && <span>Maximum 500 characters</span>}
              </p>
              {!isMessageField && value.length > 0 && (
                <span className="text-white/40 text-xs">{value.length}/500</span>
              )}
            </div>
            {hasError && (
              <p className="text-red-400 text-sm mt-1 flex items-center">
                <i className="ri-error-warning-line mr-1"></i>
                {error}
              </p>
            )}
          </div>
        );

      case 'select':
        return (
          <div key={field.id}>
            <label htmlFor={field.name} className={labelClass}>
              {field.label}
            </label>
            <select
              id={field.name}
              name={field.name}
              value={value}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              onBlur={() => handleFieldBlur(field.name)}
              className={`${baseInputClass} pr-8`}
              required={field.required}
            >
              <option value="">{field.placeholder}</option>
              {field.options?.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {hasError && (
              <p className="text-red-400 text-sm mt-1 flex items-center">
                <i className="ri-error-warning-line mr-1"></i>
                {error}
              </p>
            )}
          </div>
        );

      default:
        return (
          <div key={field.id}>
            <label htmlFor={field.name} className={labelClass}>
              {field.label}
            </label>
            <input
              id={field.name}
              type={field.type}
              name={field.name}
              value={value}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              onBlur={() => handleFieldBlur(field.name)}
              className={baseInputClass}
              placeholder={field.placeholder}
              required={field.required}
            />
            {hasError && (
              <p className="text-red-400 text-sm mt-1 flex items-center">
                <i className="ri-error-warning-line mr-1"></i>
                {error}
              </p>
            )}
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#252525] flex items-center justify-center">
        <i className="ri-loader-4-line text-cyan-400 text-4xl animate-spin"></i>
      </div>
    );
  }

  // Group fields for layout - first two fields side by side if available
  const firstTwoFields = formFields.slice(0, 2);
  const remainingFields = formFields.slice(2);

  return (
    <div className="min-h-screen bg-[#252525] font-['Manrope',sans-serif]">
      <Header active="contact" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-gradient-to-br from-[#0a0a0a] via-[#0f1419] to-[#0a0a0a]">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="contact-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="1" className="text-cyan-400"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#contact-grid)" />
            </svg>
          </div>

          {/* Gradient Orbs */}
          <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-48 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-5 py-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-cyan-400 text-sm font-semibold tracking-wide">{getContent('hero_badge', 'Get In Touch')}</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
              {getContent('hero_title_line1', "Let's Build the")}
              <span className="block mt-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                {getContent('hero_title_line2', 'Future Together')}
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-xl lg:text-2xl text-white/70 leading-relaxed max-w-3xl mx-auto font-medium">
              {getContent('hero_subtitle', 'Ready to transform your ideas into intelligent products? Connect with our team of experts and discover how Trinova AI can accelerate your innovation journey.')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                  <i className="ri-phone-line text-cyan-400"></i>
                  <span className="text-cyan-400 text-sm font-semibold">{getContent('contact_info_badge', 'Contact Information')}</span>
                </div>

                <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
                  {getContent('contact_info_title_line1', 'Connect with')}
                  <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-1">
                    {getContent('contact_info_title_line2', 'Our Experts')}
                  </span>
                </h2>

                <p className="text-lg text-white/70 leading-relaxed">
                  {getContent('contact_info_description', 'Our team is ready to discuss your project requirements and provide tailored solutions for your intelligent electronics needs.')}
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-6">
                {/* Phone */}
                <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-cyan-500/10 rounded-lg sm:flex items-center justify-center flex-shrink-0 hidden">
                      <i className="ri-phone-line text-cyan-400 text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-2">Phone</h3>
                      <a href={`tel:${getContent('phone_number', '+918310694003')}`} className="text-white/70 hover:text-cyan-400 transition-colors duration-300 cursor-pointer text-lg">
                        {getContent('phone_number', '+91 83106 94003')}
                      </a>
                      <p className="text-white/50 text-sm mt-1">{getContent('phone_availability', 'Available Monday - Friday, 9 AM - 6 PM IST')}</p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg sm:flex items-center justify-center flex-shrink-0 hidden">
                      <i className="ri-mail-line text-blue-400 text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-2">Email</h3>
                      <a href={`mailto:${getContent('email_address', 'technical@trinovaaitech.com')}`} className="text-white/70 hover:text-cyan-400 transition-colors duration-300 cursor-pointer text-lg">
                        {getContent('email_address', 'technical@trinovaaitech.com')}
                      </a>
                      <p className="text-white/50 text-sm mt-1">{getContent('email_response_time', 'We respond within 24 hours')}</p>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-cyan-500/10 rounded-lg sm:flex items-center justify-center flex-shrink-0 hidden">
                      <i className="ri-map-pin-line text-cyan-400 text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-2">Office Address</h3>
                      <div className="text-white/70 leading-relaxed">
                        {getContent('address_line1', 'No-1461, 2nd floor, 14th cross road,')}<br />
                        {getContent('address_line2', 'Ananth Nagar phase2, Electronic City,')}<br />
                        {getContent('address_line3', 'Bangalore - 560100, India')}
                      </div>
                      <p className="text-white/50 text-sm mt-2">{getContent('address_note', 'Visit us for in-person consultations')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-6">
                <h3 className="text-white font-bold text-lg mb-4">Follow Us</h3>
                <div className="flex items-center space-x-4">
                  <a href={getContent('social_linkedin', '#')} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400/50 rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer group">
                    <i className="ri-linkedin-fill text-cyan-400 group-hover:text-cyan-300 text-xl"></i>
                  </a>
                  <a href={getContent('social_instagram', '#')} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400/50 rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer group">
                    <i className="ri-instagram-line text-cyan-400 group-hover:text-cyan-300 text-xl"></i>
                  </a>
                  <a href={getContent('social_facebook', '#')} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400/50 rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer group">
                    <i className="ri-facebook-fill text-cyan-400 group-hover:text-cyan-300 text-xl"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-white font-bold text-2xl">{getContent('form_title', 'Start Your Project')}</h3>
                  <p className="text-white/60">{getContent('form_description', 'Tell us about your project and we\'ll get back to you within 24 hours.')}</p>
                </div>

                {/* Submit Message */}
                {submitMessage && (
                  <div className={`p-4 rounded-lg ${
                    submitMessage.type === 'success' 
                      ? 'bg-green-500/10 border border-green-500/30 text-green-400' 
                      : 'bg-red-500/10 border border-red-500/30 text-red-400'
                  }`}>
                    <div className="flex items-center space-x-2">
                      <i className={`ri-${submitMessage.type === 'success' ? 'check' : 'error-warning'}-line`}></i>
                      <span>{submitMessage.text}</span>
                    </div>
                  </div>
                )}

                {/* Contact Form */}
                {formFields.length > 0 ? (
                  <form 
                    className="space-y-6" 
                    id="contact-form"
                    onSubmit={handleFormSubmit}
                  >
                    {/* First two fields side by side if available */}
                    {firstTwoFields.length === 2 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {firstTwoFields.map(field => renderFormField(field))}
                      </div>
                    )}

                    {/* Single field if only one in first two */}
                    {firstTwoFields.length === 1 && (
                      <div>
                        {renderFormField(firstTwoFields[0])}
                      </div>
                    )}

                    {/* Remaining fields */}
                    {remainingFields.map(field => renderFormField(field))}

                    <button 
                      type="submit"
                      disabled={submitting || !isFormValid()}
                      className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {submitting ? (
                        <>
                          <i className="ri-loader-4-line animate-spin mr-2"></i>
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-8 text-white/40">
                    <i className="ri-file-list-line text-4xl mb-2"></i>
                    <p>Form fields are being configured. Please check back later.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl lg:text-4xl font-black text-white">
                {getContent('map_title_line1', 'Visit Our')}
                <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-1">
                  {getContent('map_title_line2', 'Innovation Hub')}
                </span>
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                {getContent('map_description', 'Located in the heart of Bangalore\'s Electronic City, our state-of-the-art facility is equipped with cutting-edge technology and innovation labs.')}
              </p>
            </div>

            <div className="relative h-96 rounded-2xl overflow-hidden border border-cyan-500/20">
              <iframe
                src={getContent('map_embed_url', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.2!2d77.6648!3d12.8456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDUwJzQ0LjIiTiA3N8KwMzknNTMuMyJF!5e0!3m2!1sen!2sin!4v1234567890')}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Trinova AI Office Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
