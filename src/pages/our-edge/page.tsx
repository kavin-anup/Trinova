import { useState } from 'react';

export default function OurEdge() {
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
              <a href="/services" className="text-white/80 hover:text-cyan-400 transition-colors duration-300 font-medium cursor-pointer">Our Services</a>
              <a href="/ems" className="text-white/80 hover:text-cyan-400 transition-colors duration-300 font-medium cursor-pointer">EMS</a>
              <a href="/ai" className="text-white/80 hover:text-cyan-400 transition-colors duration-300 font-medium cursor-pointer">AI</a>
              <a href="/our-edge" className="text-white hover:text-cyan-400 transition-colors duration-300 font-medium cursor-pointer">Our Edge</a>
              <a href="/contact" className="text-white/80 hover:text-cyan-400 transition-colors duration-300 font-medium cursor-pointer">Contact Us</a>
              <a href="/testimonials" className="text-white/80 hover:text-cyan-400 transition-colors duration-300 font-medium cursor-pointer">Testimonials</a>
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
                <a href="/services" className="text-white/80 hover:text-cyan-400 transition-colors duration-300 font-medium cursor-pointer">Our Services</a>
                <a href="/ems" className="text-white/80 hover:text-cyan-400 transition-colors duration-300 font-medium cursor-pointer">EMS</a>
                <a href="/ai" className="text-white/80 hover:text-cyan-400 transition-colors duration-300 font-medium cursor-pointer">AI</a>
                <a href="/our-edge" className="text-white hover:text-cyan-400 transition-colors duration-300 font-medium cursor-pointer">Our Edge</a>
                <a href="/contact" className="text-white/80 hover:text-cyan-400 transition-colors duration-300 font-medium cursor-pointer">Contact Us</a>
                <a href="/testimonials" className="text-white/80 hover:text-cyan-400 transition-colors duration-300 font-medium cursor-pointer">Testimonials</a>
                <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 whitespace-nowrap cursor-pointer w-full">
                  Start a Project
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-gradient-to-br from-[#0a0a0a] via-[#0f1419] to-[#0a0a0a]">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Sharp Edge Pattern */}
          <div className="absolute inset-0 opacity-[0.05]">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="edge-pattern" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path d="M 0 50 L 50 0 L 100 50 L 50 100 Z" fill="none" stroke="currentColor" strokeWidth="1" className="text-cyan-400"/>
                  <circle cx="50" cy="50" r="3" fill="currentColor" className="text-cyan-400">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
                  </circle>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#edge-pattern)" />
            </svg>
          </div>

          {/* Gradient Orbs */}
          <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-48 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Sharp Glowing Lines */}
          <div className="absolute top-1/3 left-1/4 w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60 transform rotate-45 animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-24 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-40 transform -rotate-45 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Hero Background Image */}
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://readdy.ai/api/search-image?query=Abstract%20conceptual%20visualization%20of%20competitive%20advantage%20and%20technological%20edge%2C%20sharp%20glowing%20blue%20line%20cutting%20through%20complex%20digital%20terrain%20with%20geometric%20patterns%2C%20dark%20cyberpunk%20aesthetic%20with%20electric%20cyan%20light%20traces%2C%20futuristic%203D%20render%20showing%20convergence%20of%20multiple%20technical%20disciplines%2C%20dramatic%20lighting%20with%20sharp%20angular%20elements%2C%20photorealistic%20composition%20representing%20innovation%20and%20market%20leadership&width=1920&height=1080&seq=edge-competitive-advantage&orientation=landscape"
            alt="Competitive Edge Visualization"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full">
          <div className="text-center max-w-5xl mx-auto space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-5 py-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-cyan-400 text-sm font-semibold tracking-wide">Competitive Advantage</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
              The Unfair Advantage in
              <span className="block mt-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Intelligent Product
              </span>
              <span className="block mt-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Realization
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-xl lg:text-2xl text-white/70 leading-relaxed max-w-4xl mx-auto font-medium">
              Trinova AI is built on a foundation of full-stack technical mastery, unwavering quality standards, and a customer-first methodology, giving your products a decisive edge in the market.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer group">
                <span className="flex items-center justify-center space-x-2">
                  <span>Discover Our Edge</span>
                  <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
                </span>
              </button>
              <button className="px-8 py-4 bg-white/5 border-2 border-cyan-400/50 text-white font-bold rounded-xl hover:bg-cyan-400/10 hover:border-cyan-400 hover:scale-105 backdrop-blur-sm transition-all duration-300 whitespace-nowrap cursor-pointer group">
                <span className="flex items-center justify-center space-x-2">
                  <span>Start Your Project</span>
                  <i className="ri-rocket-line group-hover:scale-110 transition-transform"></i>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 animate-bounce">
          <span className="text-white/40 text-sm font-medium">Explore Our Advantages</span>
          <i className="ri-arrow-down-line text-cyan-400 text-2xl"></i>
        </div>
      </section>

      {/* Our Unwavering Edge Section */}
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
              <i className="ri-award-line text-cyan-400"></i>
              <span className="text-cyan-400 text-sm font-semibold">Core Strengths</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
              Our Unwavering
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-1">
                Edge
              </span>
            </h2>

            <p className="text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
              Four core differentiators that set us apart in the intelligent electronics industry
            </p>
          </div>

          {/* Core Strengths Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Strength 1 */}
            <div className="group relative bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative space-y-6">
                <div className="w-16 h-16 bg-cyan-500/10 rounded-xl flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors duration-300">
                  <i className="ri-lightbulb-flash-line text-cyan-400 text-3xl"></i>
                </div>
                <div>
                  <h3 className="text-white font-black text-2xl mb-4">Full-Stack Innovation</h3>
                  <p className="text-white/70 text-lg leading-relaxed">
                    Our team thrives on pushing the boundaries of technology, ensuring every solution is innovative, reliable, and future-ready, from silicon to cloud.
                  </p>
                </div>
              </div>
            </div>

            {/* Strength 2 */}
            <div className="group relative bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative space-y-6">
                <div className="w-16 h-16 bg-blue-500/10 rounded-xl flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-300">
                  <i className="ri-user-heart-line text-blue-400 text-3xl"></i>
                </div>
                <div>
                  <h3 className="text-white font-black text-2xl mb-4">Customer-Centric Partnership</h3>
                  <p className="text-white/70 text-lg leading-relaxed">
                    We believe in delivering tailored solutions that align perfectly with our clients' strategic goals, ensuring maximum satisfaction and long-term success.
                  </p>
                </div>
              </div>
            </div>

            {/* Strength 3 */}
            <div className="group relative bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative space-y-6">
                <div className="w-16 h-16 bg-cyan-500/10 rounded-xl flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors duration-300">
                  <i className="ri-stack-line text-cyan-400 text-3xl"></i>
                </div>
                <div>
                  <h3 className="text-white font-black text-2xl mb-4">Comprehensive Expertise (Hardware + AI)</h3>
                  <p className="text-white/70 text-lg leading-relaxed">
                    With capabilities across hardware design, embedded firmware, AI integration, and precision manufacturing, we are the single source for all your technology needs.
                  </p>
                </div>
              </div>
            </div>

            {/* Strength 4 */}
            <div className="group relative bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative space-y-6">
                <div className="w-16 h-16 bg-blue-500/10 rounded-xl flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-300">
                  <i className="ri-global-line text-blue-400 text-3xl"></i>
                </div>
                <div>
                  <h3 className="text-white font-black text-2xl mb-4">Global Quality Standards</h3>
                  <p className="text-white/70 text-lg leading-relaxed">
                    Our rigorous commitment to quality and precision ensures that your products and solutions meet the highest global regulatory and performance benchmarks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Realization Process Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center space-y-6 mb-20">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
              <i className="ri-flow-chart text-cyan-400"></i>
              <span className="text-cyan-400 text-sm font-semibold">Our Process</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
              Accelerating Innovation:
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-1">
                Our 5-Step Process
              </span>
            </h2>

            <p className="text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
              A proven methodology that transforms ideas into market-ready intelligent products
            </p>
          </div>

          {/* Process Flow */}
          <div className="relative">
            {/* Desktop Flow */}
            <div className="hidden lg:flex items-center justify-between space-x-4">
              {/* Step 1 */}
              <div className="flex-1 group">
                <div className="relative bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative text-center space-y-4">
                    <div className="w-16 h-16 bg-cyan-500/10 rounded-xl flex items-center justify-center mx-auto group-hover:bg-cyan-500/20 transition-colors duration-300">
                      <i className="ri-lightbulb-line text-cyan-400 text-2xl"></i>
                    </div>
                    <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <h3 className="text-white font-black text-lg">Ideation</h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Collaborating closely to understand your vision, goals, and technical requirements.
                    </p>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center">
                <div className="w-8 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
                <i className="ri-arrow-right-line text-cyan-400 text-xl ml-2"></i>
              </div>

              {/* Step 2 */}
              <div className="flex-1 group">
                <div className="relative bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative text-center space-y-4">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto group-hover:bg-blue-500/20 transition-colors duration-300">
                      <i className="ri-draft-line text-blue-400 text-2xl"></i>
                    </div>
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <h3 className="text-white font-black text-lg">Design</h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Crafting innovative, robust hardware, firmware, and software architectures to bring your ideas to life.
                    </p>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center">
                <div className="w-8 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
                <i className="ri-arrow-right-line text-cyan-400 text-xl ml-2"></i>
              </div>

              {/* Step 3 */}
              <div className="flex-1 group">
                <div className="relative bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative text-center space-y-4">
                    <div className="w-16 h-16 bg-cyan-500/10 rounded-xl flex items-center justify-center mx-auto group-hover:bg-cyan-500/20 transition-colors duration-300">
                      <i className="ri-code-line text-cyan-400 text-2xl"></i>
                    </div>
                    <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <h3 className="text-white font-black text-lg">Development</h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Building robust and scalable products through meticulous engineering and integration.
                    </p>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center">
                <div className="w-8 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
                <i className="ri-arrow-right-line text-cyan-400 text-xl ml-2"></i>
              </div>

              {/* Step 4 */}
              <div className="flex-1 group">
                <div className="relative bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative text-center space-y-4">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto group-hover:bg-blue-500/20 transition-colors duration-300">
                      <i className="ri-test-tube-line text-blue-400 text-2xl"></i>
                    </div>
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white font-bold text-sm">4</span>
                    </div>
                    <h3 className="text-white font-black text-lg">Testing & Validation</h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Ensuring functionality, reliability, regulatory compliance, and performance through rigorous testing.
                    </p>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center">
                <div className="w-8 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
                <i className="ri-arrow-right-line text-cyan-400 text-xl ml-2"></i>
              </div>

              {/* Step 5 */}
              <div className="flex-1 group">
                <div className="relative bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative text-center space-y-4">
                    <div className="w-16 h-16 bg-cyan-500/10 rounded-xl flex items-center justify-center mx-auto group-hover:bg-cyan-500/20 transition-colors duration-300">
                      <i className="ri-rocket-line text-cyan-400 text-2xl"></i>
                    </div>
                    <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white font-bold text-sm">5</span>
                    </div>
                    <h3 className="text-white font-black text-lg">Deployment & Support</h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Delivering a market-ready product with comprehensive launch and ongoing technical support.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Flow */}
            <div className="lg:hidden space-y-8">
              {/* Step 1 */}
              <div className="relative">
                <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                        <i className="ri-lightbulb-line text-cyan-400 text-xl"></i>
                      </div>
                      <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">1</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-black text-lg mb-2">Ideation</h3>
                      <p className="text-white/60 text-sm leading-relaxed">
                        Collaborating closely to understand your vision, goals, and technical requirements.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                  <i className="ri-arrow-down-line text-cyan-400 text-xl"></i>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                        <i className="ri-draft-line text-blue-400 text-xl"></i>
                      </div>
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">2</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-black text-lg mb-2">Design</h3>
                      <p className="text-white/60 text-sm leading-relaxed">
                        Crafting innovative, robust hardware, firmware, and software architectures to bring your ideas to life.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                  <i className="ri-arrow-down-line text-cyan-400 text-xl"></i>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                        <i className="ri-code-line text-cyan-400 text-xl"></i>
                      </div>
                      <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">3</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-black text-lg mb-2">Development</h3>
                      <p className="text-white/60 text-sm leading-relaxed">
                        Building robust and scalable products through meticulous engineering and integration.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                  <i className="ri-arrow-down-line text-cyan-400 text-xl"></i>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative">
                <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                        <i className="ri-test-tube-line text-blue-400 text-xl"></i>
                      </div>
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">4</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-black text-lg mb-2">Testing & Validation</h3>
                      <p className="text-white/60 text-sm leading-relaxed">
                        Ensuring functionality, reliability, regulatory compliance, and performance through rigorous testing.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                  <i className="ri-arrow-down-line text-cyan-400 text-xl"></i>
                </div>
              </div>

              {/* Step 5 */}
              <div className="relative">
                <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                        <i className="ri-rocket-line text-cyan-400 text-xl"></i>
                      </div>
                      <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">5</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-black text-lg mb-2">Deployment & Support</h3>
                      <p className="text-white/60 text-sm leading-relaxed">
                        Delivering a market-ready product with comprehensive launch and ongoing technical support.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
              Ready to Experience
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-1">
                The Trinova AI Edge?
              </span>
            </h2>

            <p className="text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
              Partner with us to leverage our unfair advantage and transform your innovative ideas into market-leading intelligent products.
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

      {/* Footer */}
      <footer className="relative bg-[#0a0a0a] border-t border-white/5 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
          {/* Main Footer Content */}
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 mb-12">
            {/* Company Info */}
            <div className="space-y-6">
              {/* Logo */}
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

              {/* Social Links */}
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

            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-white font-bold text-xl">Contact Information</h3>
              
              <div className="space-y-4">
                {/* Phone */}
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-phone-line text-cyan-400 text-lg"></i>
                  </div>
                  <div>
                    <div className="text-white font-medium">Phone</div>
                    <a href="tel:+918310694003" className="text-white/70 hover:text-cyan-400 transition-colors duration-300 cursor-pointer">
                      +91 83106 94003
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-mail-line text-blue-400 text-lg"></i>
                  </div>
                  <div>
                    <div className="text-white font-medium">Email</div>
                    <a href="mailto:technical@trinovaaitech.com" className="text-white/70 hover:text-cyan-400 transition-colors duration-300 cursor-pointer">
                      technical@trinovaaitech.com
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
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

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-white font-bold text-xl">Quick Links</h3>
              
              <div className="grid grid-cols-1 gap-3">
                <a href="/" className="text-white/70 hover:text-cyan-400 transition-colors duration-300 cursor-pointer">Home</a>
                <a href="/services" className="text-white/70 hover:text-cyan-400 transition-colors duration-300 cursor-pointer">Our Services</a>
                <a href="/ems" className="text-white/70 hover:text-cyan-400 transition-colors duration-300 cursor-pointer">EMS</a>
                <a href="/ai" className="text-white/70 hover:text-cyan-400 transition-colors duration-300 cursor-pointer">AI</a>
                <a href="/our-edge" className="text-white/70 hover:text-cyan-400 transition-colors duration-300 cursor-pointer">Our Edge</a>
                <a href="/contact" className="text-white/70 hover:text-cyan-400 transition-colors duration-300 cursor-pointer">Contact Us</a>
                <a href="/testimonials" className="text-white/70 hover:text-cyan-400 transition-colors duration-300 cursor-pointer">Testimonials</a>
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
