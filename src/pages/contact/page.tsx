
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function Contact() {

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
              <span className="text-cyan-400 text-sm font-semibold tracking-wide">Get In Touch</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
              Let's Build the
              <span className="block mt-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Future Together
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-xl lg:text-2xl text-white/70 leading-relaxed max-w-3xl mx-auto font-medium">
              Ready to transform your ideas into intelligent products? Connect with our team of experts and discover how Trinova AI can accelerate your innovation journey.
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
                  <span className="text-cyan-400 text-sm font-semibold">Contact Information</span>
                </div>

                <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
                  Connect with
                  <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-1">
                    Our Experts
                  </span>
                </h2>

                <p className="text-lg text-white/70 leading-relaxed">
                  Our team is ready to discuss your project requirements and provide tailored solutions for your intelligent electronics needs.
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
                      <a href="tel:+918310694003" className="text-white/70 hover:text-cyan-400 transition-colors duration-300 cursor-pointer text-lg">
                        +91 83106 94003
                      </a>
                      <p className="text-white/50 text-sm mt-1">Available Monday - Friday, 9 AM - 6 PM IST</p>
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
                      <a href="mailto:technical@trinovaaitech.com" className="text-white/70 hover:text-cyan-400 transition-colors duration-300 cursor-pointer text-lg">
                        technical@trinovaaitech.com
                      </a>
                      <p className="text-white/50 text-sm mt-1">We respond within 24 hours</p>
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
                        No-1461, 2nd floor, 14th cross road,<br />
                        Ananth Nagar phase2, Electronic City,<br />
                        Bangalore - 560100, India
                      </div>
                      <p className="text-white/50 text-sm mt-2">Visit us for in-person consultations</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-6">
                <h3 className="text-white font-bold text-lg mb-4">Follow Us</h3>
                <div className="flex items-center space-x-4">
                  <a href="#" className="w-12 h-12 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400/50 rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer group">
                    <i className="ri-linkedin-fill text-cyan-400 group-hover:text-cyan-300 text-xl"></i>
                  </a>
                  <a href="#" className="w-12 h-12 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400/50 rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer group">
                    <i className="ri-instagram-line text-cyan-400 group-hover:text-cyan-300 text-xl"></i>
                  </a>
                  <a href="#" className="w-12 h-12 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400/50 rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer group">
                    <i className="ri-facebook-fill text-cyan-400 group-hover:text-cyan-300 text-xl"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-white font-bold text-2xl">Start Your Project</h3>
                  <p className="text-white/60">Tell us about your project and we'll get back to you within 24 hours.</p>
                </div>

                <form className="space-y-6" data-readdy-form id="contact-form">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-medium mb-2">First Name</label>
                      <input 
                        type="text" 
                        name="firstName"
                        className="w-full px-4 py-3 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white placeholder-white/40 focus:border-cyan-400 focus:outline-none transition-colors duration-300"
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Last Name</label>
                      <input 
                        type="text" 
                        name="lastName"
                        className="w-full px-4 py-3 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white placeholder-white/40 focus:border-cyan-400 focus:outline-none transition-colors duration-300"
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      className="w-full px-4 py-3 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white placeholder-white/40 focus:border-cyan-400 focus:outline-none transition-colors duration-300"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      className="w-full px-4 py-3 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white placeholder-white/40 focus:border-cyan-400 focus:outline-none transition-colors duration-300"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Company</label>
                    <input 
                      type="text" 
                      name="company"
                      className="w-full px-4 py-3 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white placeholder-white/40 focus:border-cyan-400 focus:outline-none transition-colors duration-300"
                      placeholder="Enter your company name"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Service Interest</label>
                    <select 
                      name="service"
                      className="w-full px-4 py-3 pr-8 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors duration-300"
                      required
                    >
                      <option value="">Select a service</option>
                      <option value="ai-solutions">AI Solutions</option>
                      <option value="ems">Electronics Manufacturing Services</option>
                      <option value="hardware-design">Hardware Design</option>
                      <option value="firmware-development">Firmware Development</option>
                      <option value="mobile-app">Mobile App Development</option>
                      <option value="full-stack">End-to-End Development</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Project Details</label>
                    <textarea 
                      name="message"
                      rows={4}
                      maxLength={500}
                      className="w-full px-4 py-3 bg-[#252525]/50 border border-cyan-500/20 rounded-lg text-white placeholder-white/40 focus:border-cyan-400 focus:outline-none transition-colors duration-300 resize-none"
                      placeholder="Tell us about your project requirements, timeline, and any specific needs..."
                      required
                    ></textarea>
                    <p className="text-white/40 text-xs mt-1">Maximum 500 characters</p>
                  </div>

                  <button 
                    type="submit"
                    className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer"
                  >
                    Send Message
                  </button>
                </form>
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
                Visit Our
                <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-1">
                  Innovation Hub
                </span>
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Located in the heart of Bangalore's Electronic City, our state-of-the-art facility is equipped with cutting-edge technology and innovation labs.
              </p>
            </div>

            <div className="relative h-96 rounded-2xl overflow-hidden border border-cyan-500/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.2!2d77.6648!3d12.8456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDUwJzQ0LjIiTiA3N8KwMzknNTMuMyJF!5e0!3m2!1sen!2sin!4v1234567890"
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
