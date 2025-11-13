import { useState } from 'react';

export default function Services() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-['Manrope',sans-serif]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5">
        <div className="w-full px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 max-w-7xl mx-auto">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                <i className="ri-brain-line text-white text-xl"></i>
              </div>
              <div>
                <h1 className="text-white font-bold text-xl tracking-tight">Trinova AI</h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <a href="/" className="text-white/80 hover:text-cyan-400 transition-colors duration-300 font-medium cursor-pointer">Home</a>
              <a href="/services" className="text-white hover:text-cyan-400 transition-colors duration-300 font-medium cursor-pointer">Our Services</a>
              <a href="/ems" className="text-white/80 hover:text-cyan-400 transition-colors duration-300 font-medium cursor-pointer">EMS</a>
              <a href="/ai" className="text-white/80 hover:text-cyan-400 transition-colors duration-300 font-medium cursor-pointer">AI</a>
              <a href="/our-edge" className="text-white/80 hover:text-cyan-400 transition-colors duration-300 font-medium cursor-pointer">Our Edge</a>
              <a href="/testimonials" className="text-white/80 hover:text-cyan-400 transition-colors duration-300 font-medium cursor-pointer">Testimonials</a>
              <a href="/contact" className="text-white/80 hover:text-cyan-400 transition-colors duration-300 font-medium cursor-pointer">Contact Us</a>
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 whitespace-nowrap cursor-pointer">
                Start a Project
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white w-10 h-10 flex items-center justify-center cursor-pointer"
            >
              <i className={`${isMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-2xl`}></i>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden py-6 border-t border-white/5">
              <div className="flex flex-col space-y-4">
                <a href="/" className="text-white/80 hover:text-cyan-400 transition-colors duration-300 font-medium cursor-pointer">Home</a>
                <a href="/services" className="text-white hover:text-cyan-400 transition-colors duration-300 font-medium cursor-pointer">Our Services</a>
                <a href="/ems" className="text-white/80 hover:text-cyan-400 transition-colors duration-300 font-medium cursor-pointer">EMS</a>
                <a href="/ai" className="text-white/80 hover:text-cyan-400 transition-colors duration-300 font-medium cursor-pointer">AI</a>
                <a href="/our-edge" className="text-white/80 hover:text-cyan-400 transition-colors duration-300 font-medium cursor-pointer">Our Edge</a>
                <a href="/testimonials" className="text-white/80 hover:text-cyan-400 transition-colors duration-300 font-medium cursor-pointer">Testimonials</a>
                <a href="/contact" className="text-white/80 hover:text-cyan-400 transition-colors duration-300 font-medium cursor-pointer">Contact Us</a>
                <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 whitespace-nowrap cursor-pointer w-full">
                  Start a Project
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-20 bg-gradient-to-br from-[#0a0a0a] via-[#0f1419] to-[#0a0a0a]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://readdy.ai/api/search-image?query=Advanced%20circuit%20board%20with%20glowing%20blue%20cyan%20traces%20and%20electronic%20components%20in%20extreme%20macro%20detail%2C%20dark%20ambient%20lighting%20with%20electric%20blue%20highlights%2C%20futuristic%20robotic%20assembly%20line%20in%20background%2C%20high-tech%20manufacturing%20environment%20with%20precision%20machinery%2C%20photorealistic%20style%20with%20depth%20of%20field%2C%20cinematic%20composition%20showing%20innovation%20and%20technology%2C%20clean%20minimalist%20aesthetic&width=1920&height=800&seq=services-hero-bg&orientation=landscape"
            alt="Advanced circuit board and robotic assembly"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/90 via-[#0a0a0a]/70 to-[#0a0a0a]/90"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-48 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full">
          <div className="max-w-4xl space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-5 py-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-cyan-400 text-sm font-semibold tracking-wide">Our Services</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
              Comprehensive Solutions for
              <span className="block mt-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Intelligent Electronics
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl lg:text-2xl text-white/70 leading-relaxed max-w-3xl font-medium">
              From deep R&D and hardware engineering to high-volume manufacturing and AI integration, Trinova AI is your full-stack product realization partner.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer group">
                <span className="flex items-center justify-center space-x-2">
                  <span>Get Started</span>
                  <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
                </span>
              </button>
              <button className="px-8 py-4 bg-white/5 border-2 border-cyan-400/50 text-white font-bold rounded-xl hover:bg-cyan-400/10 hover:border-cyan-400 hover:scale-105 backdrop-blur-sm transition-all duration-300 whitespace-nowrap cursor-pointer group">
                <span className="flex items-center justify-center space-x-2">
                  <span>Contact Us</span>
                  <i className="ri-phone-line group-hover:scale-110 transition-transform"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Service Offerings Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center space-y-6 mb-20">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
              <i className="ri-stack-line text-cyan-400"></i>
              <span className="text-cyan-400 text-sm font-semibold">Technology Stack</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
              Our End-to-End
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-1">
                Technology Stack
              </span>
            </h2>

            <p className="text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
              Comprehensive solutions spanning the entire product development lifecycle
            </p>
          </div>

          {/* Service Items */}
          <div className="space-y-24">
            {/* Service 1: Research & Development - Image Left */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="relative lg:h-[500px] h-[350px]">
                <div className="relative h-full rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-purple-600/20 rounded-2xl blur-xl"></div>
                  <div className="relative h-full bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0a] rounded-2xl border border-cyan-500/20 overflow-hidden">
                    <img 
                      src="https://readdy.ai/api/search-image?query=Scientists and engineers in modern laboratory reviewing complex digital blueprints and simulations on large high-resolution displays, advanced R&D environment with holographic projections, dark ambient lighting with blue cyan accents, photorealistic style with professional composition, innovation and research atmosphere, clean minimalist background&width=600&height=500&seq=rd-service-image&orientation=landscape"
                      alt="Scientists reviewing digital blueprints and simulations"
                      className="w-full h-full object-cover object-center opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                  <i className="ri-lightbulb-line text-cyan-400"></i>
                  <span className="text-cyan-400 text-sm font-semibold">R&D Excellence</span>
                </div>

                <h3 className="text-3xl lg:text-4xl font-black text-white leading-tight">
                  Research &
                  <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Development
                  </span>
                </h3>

                <p className="text-lg text-white/70 leading-relaxed">
                  Advanced R&D for innovative solutions in hardware and firmware. Expertise in prototyping and testing for market-ready products. Focus on enhancing performance and sustainability.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                      <i className="ri-lightbulb-line text-cyan-400 text-sm"></i>
                    </div>
                    <span className="text-white/80 text-sm font-medium">Innovation Focus</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <i className="ri-test-tube-line text-blue-400 text-sm"></i>
                    </div>
                    <span className="text-white/80 text-sm font-medium">Rapid Prototyping</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Service 2: End-to-End Product Development - Text Left */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-6 lg:order-1">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full">
                  <i className="ri-rocket-line text-blue-400"></i>
                  <span className="text-blue-400 text-sm font-semibold">Full Lifecycle</span>
                </div>

                <h3 className="text-3xl lg:text-4xl font-black text-white leading-tight">
                  End-to-End Product
                  <span className="block bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                    Development
                  </span>
                </h3>

                <p className="text-lg text-white/70 leading-relaxed">
                  Concept-to-market solutions under one roof. Collaboration across design, development, and manufacturing. Rapid prototyping and iterative product improvement.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <i className="ri-team-line text-blue-400 text-sm"></i>
                    </div>
                    <span className="text-white/80 text-sm font-medium">Cross-functional Teams</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                      <i className="ri-refresh-line text-cyan-400 text-sm"></i>
                    </div>
                    <span className="text-white/80 text-sm font-medium">Iterative Improvement</span>
                  </div>
                </div>
              </div>

              <div className="relative lg:h-[500px] h-[350px] lg:order-2">
                <div className="relative h-full rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-600/20 to-purple-600/20 rounded-2xl blur-xl"></div>
                  <div className="relative h-full bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0a] rounded-2xl border border-blue-500/20 overflow-hidden">
                    <img 
                      src="https://readdy.ai/api/search-image?query=Sleek%20finished%20technology%20product%20being%20assembled%20and%20tested%20in%20clean%20modern%20laboratory%20environment%2C%20sophisticated%20electronic%20device%20with%20glowing%20components%2C%20professional%20engineers%20in%20white%20lab%20coats%2C%20high-tech%20testing%20equipment%2C%20dark%20ambient%20lighting%20with%20blue%20accents%2C%20photorealistic%20style%20with%20shallow%20depth%20of%20field%2C%20innovation%20and%20precision%20engineering&width=600&height=500&seq=product-dev-image&orientation=landscape"
                      alt="Sleek tech product being assembled in clean lab"
                      className="w-full h-full object-cover object-center opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service 3: Hardware Designing - Image Left */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="relative lg:h-[500px] h-[350px]">
                <div className="relative h-full rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-purple-600/20 rounded-2xl blur-xl"></div>
                  <div className="relative h-full bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0a] rounded-2xl border border-cyan-500/20 overflow-hidden">
                    <img 
                      src="https://readdy.ai/api/search-image?query=Complex%20futuristic%20PCB%20design%20visualization%20on%20high-resolution%20display%20screen%20with%20glowing%20circuit%20traces%2C%20robotic%20arm%20precisely%20placing%20electronic%20components%20on%20circuit%20board%2C%20advanced%20CAD%20software%20interface%2C%20dark%20ambient%20lighting%20with%20cyan%20blue%20highlights%2C%20photorealistic%20style%20with%20extreme%20detail%2C%20innovation%20and%20precision%20engineering%20atmosphere&width=600&height=500&seq=hardware-design-image&orientation=landscape"
                      alt="Futuristic PCB design and robotic component placement"
                      className="w-full h-full object-cover object-center opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                  <i className="ri-cpu-line text-cyan-400"></i>
                  <span className="text-cyan-400 text-sm font-semibold">Custom Hardware</span>
                </div>

                <h3 className="text-3xl lg:text-4xl font-black text-white leading-tight">
                  Hardware
                  <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Designing
                  </span>
                </h3>

                <p className="text-lg text-white/70 leading-relaxed">
                  Custom hardware solutions tailored for specific applications. Expertise in PCB design, embedded systems, and circuit optimization. Innovative designs for IoT devices, medical equipment, and industrial systems.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                      <i className="ri-circuit-line text-cyan-400 text-sm"></i>
                    </div>
                    <span className="text-white/80 text-sm font-medium">PCB Design</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <i className="ri-settings-4-line text-blue-400 text-sm"></i>
                    </div>
                    <span className="text-white/80 text-sm font-medium">Circuit Optimization</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Service 4: Firmware Development - Text Left */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-6 lg:order-1">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full">
                  <i className="ri-code-line text-blue-400"></i>
                  <span className="text-blue-400 text-sm font-semibold">Embedded Systems</span>
                </div>

                <h3 className="text-3xl lg:text-4xl font-black text-white leading-tight">
                  Firmware
                  <span className="block bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                    Development
                  </span>
                </h3>

                <p className="text-lg text-white/70 leading-relaxed">
                  Development of robust and optimized firmware for embedded systems. Seamless integration of hardware and software for superior performance. Expertise in BLE, AI integration, and power management solutions.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <i className="ri-bluetooth-line text-blue-400 text-sm"></i>
                    </div>
                    <span className="text-white/80 text-sm font-medium">BLE Integration</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                      <i className="ri-battery-charge-line text-cyan-400 text-sm"></i>
                    </div>
                    <span className="text-white/80 text-sm font-medium">Power Management</span>
                  </div>
                </div>
              </div>

              <div className="relative lg:h-[500px] h-[350px] lg:order-2">
                <div className="relative h-full rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-600/20 to-purple-600/20 rounded-2xl blur-xl"></div>
                  <div className="relative h-full bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0a] rounded-2xl border border-blue-500/20 overflow-hidden">
                    <img 
                      src="https://readdy.ai/api/search-image?query=Lines%20of%20glowing%20electric%20blue%20code%20on%20dark%20computer%20screen%20overlayed%20onto%20embedded%20electronic%20device%2C%20artistic%20visualization%20of%20firmware%20programming%2C%20sophisticated%20microcontroller%20with%20visible%20circuits%2C%20dark%20ambient%20lighting%20with%20cyan%20highlights%2C%20photorealistic%20style%20with%20depth%20of%20field%2C%20technology%20and%20software%20development%20atmosphere&width=600&height=500&seq=firmware-dev-image&orientation=landscape"
                      alt="Glowing code on screen with embedded device"
                      className="w-full h-full object-cover object-center opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service 5: Electronics Manufacturing - Image Left */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="relative lg:h-[500px] h-[350px]">
                <div className="relative h-full rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-purple-600/20 rounded-2xl blur-xl"></div>
                  <div className="relative h-full bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0a] rounded-2xl border border-cyan-500/20 overflow-hidden">
                    <img 
                      src="https://readdy.ai/api/search-image?query=Modern%20clean%20factory%20floor%20with%20high-tech%20SMT%20surface%20mount%20technology%20production%20line%2C%20precision%20robotic%20machinery%20placing%20electronic%20components%2C%20advanced%20manufacturing%20equipment%20with%20blue%20LED%20lighting%2C%20professional%20industrial%20environment%2C%20photorealistic%20style%20with%20wide%20angle%20view%2C%20innovation%20and%20precision%20manufacturing%20atmosphere&width=600&height=500&seq=manufacturing-image&orientation=landscape"
                      alt="Modern SMT production line with robotic machinery"
                      className="w-full h-full object-cover object-center opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                  <i className="ri-settings-3-line text-cyan-400"></i>
                  <span className="text-cyan-400 text-sm font-semibold">EMS Solutions</span>
                </div>

                <h3 className="text-3xl lg:text-4xl font-black text-white leading-tight">
                  Electronics Manufacturing
                  <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    (EMS)
                  </span>
                </h3>

                <p className="text-lg text-white/70 leading-relaxed">
                  High-precision manufacturing solutions for diverse applications. Scalable production tailored to client needs. Stringent quality assurance processes to ensure unmatched reliability.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                      <i className="ri-scales-line text-cyan-400 text-sm"></i>
                    </div>
                    <span className="text-white/80 text-sm font-medium">Scalable Production</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <i className="ri-shield-check-line text-blue-400 text-sm"></i>
                    </div>
                    <span className="text-white/80 text-sm font-medium">Quality Assurance</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Service 6: Component Sourcing - Text Left */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-6 lg:order-1">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full">
                  <i className="ri-shopping-cart-line text-blue-400"></i>
                  <span className="text-blue-400 text-sm font-semibold">Global Sourcing</span>
                </div>

                <h3 className="text-3xl lg:text-4xl font-black text-white leading-tight">
                  Component Sourcing &
                  <span className="block bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                    Procurement
                  </span>
                </h3>

                <p className="text-lg text-white/70 leading-relaxed">
                  Reliable sourcing of high-quality components from trusted suppliers. Cost-effective procurement strategies to optimize project budgets. Global supply chain management for timely delivery.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <i className="ri-global-line text-blue-400 text-sm"></i>
                    </div>
                    <span className="text-white/80 text-sm font-medium">Global Network</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                      <i className="ri-money-dollar-circle-line text-cyan-400 text-sm"></i>
                    </div>
                    <span className="text-white/80 text-sm font-medium">Cost Optimization</span>
                  </div>
                </div>
              </div>

              <div className="relative lg:h-[500px] h-[350px] lg:order-2">
                <div className="relative h-full rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-600/20 to-purple-600/20 rounded-2xl blur-xl"></div>
                  <div className="relative h-full bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0a] rounded-2xl border border-blue-500/20 overflow-hidden">
                    <img 
                      src="https://readdy.ai/api/search-image?query=Stylized%20high-quality%20organized%20electronic%20components%20including%20microprocessors%20LEDs%20resistors%20capacitors%20arranged%20in%20precise%20grid%20pattern%2C%20quality%20control%20inspection%20with%20magnifying%20glass%2C%20professional%20component%20testing%20environment%2C%20dark%20background%20with%20blue%20cyan%20lighting%2C%20photorealistic%20style%20with%20macro%20detail%2C%20precision%20and%20quality%20emphasis&width=600&height=500&seq=components-image&orientation=landscape"
                      alt="Organized electronic components with quality control"
                      className="w-full h-full object-cover object-center opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service 7: Mobile Application Development - Image Left */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="relative lg:h-[500px] h-[350px]">
                <div className="relative h-full rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-purple-600/20 rounded-2xl blur-xl"></div>
                  <div className="relative h-full bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0a] rounded-2xl border border-cyan-500/20 overflow-hidden">
                    <img 
                      src="https://readdy.ai/api/search-image?query=Modern%20smartphone%20displaying%20sophisticated%20data-rich%20mobile%20application%20interface%20with%20glowing%20electronic%20circuit%20board%20background%2C%20advanced%20IoT%20monitoring%20app%20with%20real-time%20analytics%2C%20dark%20ambient%20lighting%20with%20electric%20blue%20cyan%20highlights%2C%20photorealistic%20style%20with%20depth%20of%20field%2C%20technology%20and%20mobile%20development%20atmosphere&width=600&height=500&seq=mobile-app-image&orientation=landscape"
                      alt="Smartphone with sophisticated app and electronic background"
                      className="w-full h-full object-cover object-center opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                  <i className="ri-smartphone-line text-cyan-400"></i>
                  <span className="text-cyan-400 text-sm font-semibold">Mobile Solutions</span>
                </div>

                <h3 className="text-3xl lg:text-4xl font-black text-white leading-tight">
                  Mobile Application
                  <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Development
                  </span>
                </h3>

                <p className="text-lg text-white/70 leading-relaxed">
                  Design and development of mobile apps for enhanced user experience. Integration of IoT devices with mobile platforms for real-time monitoring. Cross-platform compatibility for seamless functionality.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                      <i className="ri-wifi-line text-cyan-400 text-sm"></i>
                    </div>
                    <span className="text-white/80 text-sm font-medium">IoT Integration</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <i className="ri-device-line text-blue-400 text-sm"></i>
                    </div>
                    <span className="text-white/80 text-sm font-medium">Cross-platform</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Service 8: AI Integration - Text Left */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-6 lg:order-1">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full">
                  <i className="ri-brain-line text-blue-400"></i>
                  <span className="text-blue-400 text-sm font-semibold">AI Solutions</span>
                </div>

                <h3 className="text-3xl lg:text-4xl font-black text-white leading-tight">
                  AI Integration in
                  <span className="block bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                    Electronics
                  </span>
                </h3>

                <p className="text-lg text-white/70 leading-relaxed">
                  Leveraging artificial intelligence for smarter, adaptive electronics. Development of AI-driven solutions for predictive maintenance, automation, and more. AI-enhanced edge devices for IoT and industrial systems.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <i className="ri-eye-line text-blue-400 text-sm"></i>
                    </div>
                    <span className="text-white/80 text-sm font-medium">Predictive Analytics</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                      <i className="ri-robot-line text-cyan-400 text-sm"></i>
                    </div>
                    <span className="text-white/80 text-sm font-medium">Smart Automation</span>
                  </div>
                </div>
              </div>

              <div className="relative lg:h-[500px] h-[350px] lg:order-2">
                <div className="relative h-full rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-600/20 to-purple-600/20 rounded-2xl blur-xl"></div>
                  <div className="relative h-full bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0a] rounded-2xl border border-blue-500/20 overflow-hidden">
                    <img 
                      src="https://readdy.ai/api/search-image?query=Human%20hand%20interacting%20with%20holographic%20glowing%20blue%20cyan%20neural%20network%20visualization%2C%20abstract%20artistic%20representation%20of%20AI%20technology%2C%20floating%20geometric%20nodes%20and%20connections%2C%20dark%20ambient%20background%20with%20electric%20blue%20highlights%2C%20photorealistic%20style%20with%20depth%20of%20field%2C%20futuristic%20artificial%20intelligence%20atmosphere&width=600&height=500&seq=ai-integration-image&orientation=landscape"
                      alt="Hand interacting with holographic neural network"
                      className="w-full h-full object-cover object-center opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-600/10 to-purple-600/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center space-x-2 px-5 py-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-cyan-400 text-sm font-semibold tracking-wide">Ready to Start?</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
              Let's Build Your Next
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-1">
                Intelligent Product
              </span>
            </h2>

            <p className="text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
              Partner with Trinova AI for comprehensive technology solutions that bring your vision to life
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer group">
                <span className="flex items-center justify-center space-x-2">
                  <span>Start Your Project</span>
                  <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
                </span>
              </button>
              <button className="px-8 py-4 bg-white/5 border-2 border-cyan-400/50 text-white font-bold rounded-xl hover:bg-cyan-400/10 hover:border-cyan-400 hover:scale-105 backdrop-blur-sm transition-all duration-300 whitespace-nowrap cursor-pointer group">
                <span className="flex items-center justify-center space-x-2">
                  <span>Schedule Consultation</span>
                  <i className="ri-calendar-line group-hover:scale-110 transition-transform"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Transform Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center space-y-6 mb-20">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
              <i className="ri-building-line text-cyan-400"></i>
              <span className="text-cyan-400 text-sm font-semibold">Industry Focus</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
              Industries We
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-1">
                Transform
              </span>
            </h2>

            <p className="text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
              Delivering cutting-edge solutions across diverse sectors with specialized expertise
            </p>
          </div>

          {/* Industries Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Consumer Electronics */}
            <div className="group relative bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-2xl overflow-hidden hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://readdy.ai/api/search-image?query=Modern%20smart%20home%20devices%20including%20smartwatch%20fitness%20tracker%20wireless%20earbuds%20and%20intelligent%20home%20automation%20gadgets%20arranged%20elegantly%20on%20clean%20white%20surface%2C%20sleek%20consumer%20electronics%20with%20glowing%20LED%20indicators%2C%20dark%20ambient%20lighting%20with%20cyan%20blue%20highlights%2C%20photorealistic%20style%20with%20shallow%20depth%20of%20field%2C%20innovation%20and%20lifestyle%20technology%20atmosphere&width=400&height=300&seq=consumer-electronics&orientation=landscape"
                  alt="Smart home devices and wearables"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent"></div>
              </div>

              <div className="relative p-6 space-y-3">
                <h3 className="text-white font-bold text-xl">Consumer Electronics</h3>
                <p className="text-white/70 text-sm leading-relaxed">Smart home devices, wearables, and personal gadgets.</p>
              </div>
            </div>

            {/* Industrial Automation */}
            <div className="group relative bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-2xl overflow-hidden hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://readdy.ai/api/search-image?query=Advanced%20industrial%20automation%20factory%20floor%20with%20robotic%20arms%20and%20intelligent%20control%20systems%2C%20sophisticated%20manufacturing%20equipment%20with%20digital%20displays%20and%20sensors%2C%20dark%20industrial%20environment%20with%20blue%20cyan%20LED%20lighting%2C%20photorealistic%20style%20with%20wide%20angle%20view%2C%20precision%20engineering%20and%20automation%20technology%20atmosphere&width=400&height=300&seq=industrial-automation&orientation=landscape"
                  alt="Industrial automation and control systems"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent"></div>
              </div>

              <div className="relative p-6 space-y-3">
                <h3 className="text-white font-bold text-xl">Industrial Automation</h3>
                <p className="text-white/70 text-sm leading-relaxed">Intelligent control systems and predictive maintenance solutions.</p>
              </div>
            </div>

            {/* Medical Devices */}
            <div className="group relative bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-2xl overflow-hidden hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://readdy.ai/api/search-image?query=Advanced%20medical%20monitoring%20devices%20and%20diagnostic%20equipment%20in%20modern%20hospital%20setting%2C%20sophisticated%20healthcare%20technology%20with%20digital%20displays%20showing%20vital%20signs%2C%20clean%20sterile%20environment%20with%20blue%20cyan%20accent%20lighting%2C%20photorealistic%20style%20with%20professional%20composition%2C%20medical%20innovation%20and%20precision%20healthcare%20atmosphere&width=400&height=300&seq=medical-devices&orientation=landscape"
                  alt="Advanced medical monitoring and diagnostic devices"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent"></div>
              </div>

              <div className="relative p-6 space-y-3">
                <h3 className="text-white font-bold text-xl">Medical Devices</h3>
                <p className="text-white/70 text-sm leading-relaxed">Advanced monitoring systems and diagnostic tools.</p>
              </div>
            </div>

            {/* IoT Solutions */}
            <div className="group relative bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-2xl overflow-hidden hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://readdy.ai/api/search-image?query=Connected%20IoT%20ecosystem%20with%20various%20smart%20sensors%20and%20devices%20communicating%20wirelessly%2C%20network%20visualization%20with%20glowing%20connection%20lines%20between%20devices%2C%20modern%20smart%20city%20environment%20with%20interconnected%20systems%2C%20dark%20ambient%20lighting%20with%20electric%20blue%20cyan%20highlights%2C%20photorealistic%20style%20with%20depth%20of%20field%2C%20connectivity%20and%20IoT%20technology%20atmosphere&width=400&height=300&seq=iot-solutions&orientation=landscape"
                  alt="Connected IoT ecosystem and smart devices"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent"></div>
              </div>

              <div className="relative p-6 space-y-3">
                <h3 className="text-white font-bold text-xl">IoT Solutions</h3>
                <p className="text-white/70 text-sm leading-relaxed">End-to-end IoT ecosystems for connected environments.</p>
              </div>
            </div>

            {/* Defense & Aerospace */}
            <div className="group relative bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-2xl overflow-hidden hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://readdy.ai/api/search-image?query=High-tech%20aerospace%20control%20systems%20and%20defense%20electronics%20in%20secure%20facility%2C%20sophisticated%20radar%20and%20communication%20equipment%20with%20multiple%20displays%2C%20military%20grade%20technology%20with%20rugged%20design%2C%20dark%20professional%20environment%20with%20blue%20cyan%20status%20lights%2C%20photorealistic%20style%20with%20dramatic%20lighting%2C%20defense%20and%20aerospace%20technology%20atmosphere&width=400&height=300&seq=defense-aerospace&orientation=landscape"
                  alt="Defense and aerospace control systems"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent"></div>
              </div>

              <div className="relative p-6 space-y-3">
                <h3 className="text-white font-bold text-xl">Defense & Aerospace</h3>
                <p className="text-white/70 text-sm leading-relaxed">High-reliability systems for critical operations.</p>
              </div>
            </div>

            {/* Energy & Utilities */}
            <div className="group relative bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-2xl overflow-hidden hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://readdy.ai/api/search-image?query=Smart%20energy%20grid%20infrastructure%20with%20intelligent%20metering%20systems%20and%20renewable%20energy%20monitoring%20equipment%2C%20modern%20utility%20control%20room%20with%20digital%20displays%20showing%20power%20distribution%2C%20clean%20energy%20technology%20with%20solar%20panels%20and%20wind%20turbines%2C%20dark%20ambient%20lighting%20with%20green%20and%20cyan%20accents%2C%20photorealistic%20style%20with%20wide%20perspective%2C%20sustainable%20energy%20and%20smart%20grid%20atmosphere&width=400&height=300&seq=energy-utilities&orientation=landscape"
                  alt="Smart energy grid and utility systems"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent"></div>
              </div>

              <div className="relative p-6 space-y-3">
                <h3 className="text-white font-bold text-xl">Energy & Utilities</h3>
                <p className="text-white/70 text-sm leading-relaxed">Smart metering and energy-efficient technologies.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-[#0a0a0a] border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 mb-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                  <i className="ri-brain-line text-white text-2xl"></i>
                </div>
                <div>
                  <h3 className="text-white font-bold text-2xl tracking-tight">Trinova AI</h3>
                  <p className="text-cyan-400 text-sm font-medium">Technologies Private Limited</p>
                </div>
              </div>

              <p className="text-white/70 leading-relaxed">
                Pioneering the future of intelligent electronics and AI solutions through innovative hardware design, advanced R&D, and end-to-end product development.
              </p>

              <div className="flex items-center space-x-4">
                <a href="#" className="w-10 h-10 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400/50 rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer group">
                  <i className="ri-linkedin-fill text-cyan-400 group-hover:text-cyan-300 text-lg"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400/50 rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer group">
                  <i className="ri-instagram-line text-cyan-400 group-hover:text-cyan-300 text-lg"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400/50 rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer group">
                  <i className="ri-facebook-fill text-cyan-400 group-hover:text-cyan-300 text-lg"></i>
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-white font-bold text-xl">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                    <i className="ri-phone-line text-cyan-400 text-lg"></i>
                  </div>
                  <div>
                    <div className="text-white font-medium">Phone</div>
                    <a href="tel:+918310694003" className="text-white/70 hover:text-cyan-400 transition-colors duration-300 cursor-pointer">
                      +91 83106 94003
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <i className="ri-mail-line text-blue-400 text-lg"></i>
                  </div>
                  <div>
                    <div className="text-white font-medium">Email</div>
                    <a href="mailto:technical@trinovaaitech.com" className="text-white/70 hover:text-cyan-400 transition-colors duration-300 cursor-pointer">
                      technical@trinovaaitech.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                    <i className="ri-map-pin-line text-cyan-400 text-lg"></i>
                  </div>
                  <div>
                    <div className="text-white font-medium">Address</div>
                    <div className="text-white/70 leading-relaxed">
                      No-1461, 2nd floor, 14th cross road,<br />
                      Ananth Nagar phase2, Electronic City,<br />
                      Bangalore - 560100
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-white font-bold text-xl">Quick Links</h3>
              
              <div className="grid grid-cols-1 gap-3">
                <a href="/" className="text-white/70 hover:text-cyan-400 transition-colors duration-300 cursor-pointer">Home</a>
                <a href="/services" className="text-white/70 hover:text-cyan-400 transition-colors duration-300 cursor-pointer">Our Services</a>
                <a href="/ems" className="text-white/70 hover:text-cyan-400 transition-colors duration-300 cursor-pointer">EMS</a>
                <a href="/ai" className="text-white/70 hover:text-cyan-400 transition-colors duration-300 cursor-pointer">AI</a>
                <a href="/our-edge" className="text-white/70 hover:text-cyan-400 transition-colors duration-300 cursor-pointer">Our Edge</a>
                <a href="/testimonials" className="text-white/70 hover:text-cyan-400 transition-colors duration-300 cursor-pointer">Testimonials</a>
                <a href="/contact" className="text-white/70 hover:text-cyan-400 transition-colors duration-300 cursor-pointer">Contact Us</a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/5">
            <div className="text-white/60 text-sm text-center lg:text-left">
              Copyright © 2025 Trinova AI Technologies Private Limited. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}