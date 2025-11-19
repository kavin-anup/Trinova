import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function AI() {

  return (
    <div className="min-h-screen bg-[#252525] font-['Manrope',sans-serif]">
      <Header active="ai" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-gradient-to-br from-[#0a0a0a] via-[#0f1419] to-[#0a0a0a]">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Neural Network Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="neural-grid" width="100" height="100" patternUnits="userSpaceOnUse">
                  <circle cx="50" cy="50" r="2" fill="currentColor" className="text-cyan-400">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="20" cy="20" r="1.5" fill="currentColor" className="text-blue-400">
                    <animate attributeName="opacity" values="0.2;0.8;0.2" dur="2s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="80" cy="30" r="1" fill="currentColor" className="text-cyan-300">
                    <animate attributeName="opacity" values="0.1;0.6;0.1" dur="2.5s" repeatCount="indefinite"/>
                  </circle>
                  <line x1="50" y1="50" x2="20" y2="20" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400/30"/>
                  <line x1="50" y1="50" x2="80" y2="30" stroke="currentColor" strokeWidth="0.5" className="text-blue-400/30"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#neural-grid)" />
            </svg>
          </div>

          {/* Gradient Orbs */}
          <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-48 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Floating AI Particles */}
          <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-cyan-400 rounded-full animate-pulse opacity-60">
            <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping"></div>
          </div>
          <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }}>
            <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping"></div>
          </div>
          <div className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 bg-cyan-300 rounded-full animate-pulse opacity-50" style={{ animationDelay: '1.5s' }}>
            <div className="absolute inset-0 bg-cyan-300 rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Hero Background Image */}
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://readdy.ai/api/search-image?query=Futuristic%20digital%20brain%20neural%20network%20merging%20with%20glowing%20electric%20blue%20circuit%20board%20patterns%2C%20dark%20cyberpunk%20aesthetic%20with%20cyan%20light%20traces%2C%20abstract%20CGI%20render%20showing%20artificial%20intelligence%20consciousness%2C%20high-tech%20visualization%20of%20AI%20processing%20power%2C%20dramatic%20lighting%20with%20electric%20blue%20accents%2C%20photorealistic%203D%20composition%20with%20depth%20and%20complexity%2C%20dark%20background%20with%20luminous%20neural%20pathways&width=1920&height=1080&seq=ai-hero-brain-circuit&orientation=landscape"
            alt="AI Neural Network and Circuit Board Fusion"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full">
          <div className="text-center max-w-5xl mx-auto space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-5 py-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-cyan-400 text-sm font-semibold tracking-wide">AI-Powered Innovation</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
              Intelligent Systems:
              <span className="block mt-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                The AI Core of
              </span>
              <span className="block mt-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Future Electronics
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-xl lg:text-2xl text-white/70 leading-relaxed max-w-4xl mx-auto font-medium">
              Trinova AI leverages advanced AI, Machine Learning, and Computer Vision to revolutionize Robotics, Medical Electronics, and Home Automation—enhancing efficiency and user experience across critical industries.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer group">
                <span className="flex items-center justify-center space-x-2">
                  <span>Explore AI Solutions</span>
                  <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
                </span>
              </button>
              <button className="px-8 py-4 bg-white/5 border-2 border-cyan-400/50 text-white font-bold rounded-xl hover:bg-cyan-400/10 hover:border-cyan-400 hover:scale-105 backdrop-blur-sm transition-all duration-300 whitespace-nowrap cursor-pointer group">
                <span className="flex items-center justify-center space-x-2">
                  <span>Start AI Project</span>
                  <i className="ri-brain-line group-hover:scale-110 transition-transform"></i>
                </span>
              </button>
            </div>

            {/* AI Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">50+</div>
                <div className="text-white/60 text-sm font-medium mt-2">AI Models Deployed</div>
              </div>
              <div className="text-center border-x border-white/10">
                <div className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">99.8%</div>
                <div className="text-white/60 text-sm font-medium mt-2">AI Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">3</div>
                <div className="text-white/60 text-sm font-medium mt-2">Key Industries</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 animate-bounce">
          <span className="text-white/40 text-sm font-medium">Discover AI Solutions</span>
          <i className="ri-arrow-down-line text-cyan-400 text-2xl"></i>
        </div>
      </section>

      {/* Application Focus Section */}
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
              <i className="ri-cpu-line text-cyan-400"></i>
              <span className="text-cyan-400 text-sm font-semibold">AI Applications</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
              Revolutionizing Key Industries
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-1">
                with AI
              </span>
            </h2>

            <p className="text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
              Transforming critical sectors through intelligent automation and advanced AI integration
            </p>
          </div>

          {/* AI in Home Automation */}
          <div className="mb-24">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Image */}
              <div className="relative lg:h-[500px] h-[350px]">
                <div className="relative h-full rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-purple-600/20 rounded-2xl blur-xl"></div>
                  
                  <div className="relative h-full bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0a] rounded-2xl border border-cyan-500/20 overflow-hidden">
                    <img 
                      src="https://readdy.ai/api/search-image?query=Futuristic%20smart%20home%20kitchen%20with%20holographic%20interfaces%20and%20AI%20control%20panels%2C%20dark%20modern%20interior%20with%20electric%20blue%20accent%20lighting%2C%20voice%20and%20gesture%20control%20visualization%2C%20intelligent%20home%20automation%20system%20with%20glowing%20touch%20screens%2C%20sleek%20minimalist%20design%20with%20cyan%20light%20accents%2C%20photorealistic%20interior%20showing%20seamless%20living%20technology%20integration&width=600&height=500&seq=ai-smart-home&orientation=landscape"
                      alt="AI-Powered Smart Home with Holographic Interfaces"
                      className="w-full h-full object-cover object-center opacity-90"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 bg-[#1a1a2e]/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-4 shadow-2xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                        <i className="ri-home-smile-line text-white text-lg"></i>
                      </div>
                      <div>
                        <div className="text-white font-bold">Smart Living</div>
                        <div className="text-cyan-400 text-sm font-medium">AI-Powered Automation</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-3xl lg:text-4xl font-black text-white leading-tight">
                    AI in Home Automation:
                    <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-1">
                      Smarter Homes, Seamless Living
                    </span>
                  </h3>
                  
                  <p className="text-lg text-white/70 leading-relaxed">
                    Transform your living space into an intelligent ecosystem that anticipates your needs and responds intuitively to your lifestyle.
                  </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-4 hover:border-cyan-400/50 transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                        <i className="ri-mic-line text-cyan-400 text-sm"></i>
                      </div>
                      <h4 className="text-white font-bold text-sm">Voice & Gesture Control</h4>
                    </div>
                    <p className="text-white/60 text-xs leading-relaxed">Natural interaction with smart devices</p>
                  </div>

                  <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-4 hover:border-cyan-400/50 transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                        <i className="ri-temp-cold-line text-blue-400 text-sm"></i>
                      </div>
                      <h4 className="text-white font-bold text-sm">Smart Climate Control</h4>
                    </div>
                    <p className="text-white/60 text-xs leading-relaxed">Adaptive temperature management</p>
                  </div>

                  <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-4 hover:border-cyan-400/50 transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                        <i className="ri-shield-check-line text-cyan-400 text-sm"></i>
                      </div>
                      <h4 className="text-white font-bold text-sm">Advanced Security</h4>
                    </div>
                    <p className="text-white/60 text-xs leading-relaxed">AI-powered threat detection</p>
                  </div>

                  <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-4 hover:border-cyan-400/50 transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                        <i className="ri-lightbulb-line text-blue-400 text-sm"></i>
                      </div>
                      <h4 className="text-white font-bold text-sm">Intelligent Lighting</h4>
                    </div>
                    <p className="text-white/60 text-xs leading-relaxed">Adaptive lighting optimization</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI in Medical Electronics */}
          <div className="mb-24">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Content */}
              <div className="space-y-6 lg:order-1">
                <div className="space-y-4">
                  <h3 className="text-3xl lg:text-4xl font-black text-white leading-tight">
                    AI in Medical Electronics:
                    <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-1">
                      Enhancing Healthcare with AI-Powered Devices
                    </span>
                  </h3>
                  
                  <p className="text-lg text-white/70 leading-relaxed">
                    Revolutionizing healthcare through intelligent medical devices that provide precise diagnostics and personalized patient care.
                  </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-4 hover:border-cyan-400/50 transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                        <i className="ri-heart-pulse-line text-cyan-400 text-sm"></i>
                      </div>
                      <h4 className="text-white font-bold text-sm">Remote Monitoring</h4>
                    </div>
                    <p className="text-white/60 text-xs leading-relaxed">Continuous patient health tracking</p>
                  </div>

                  <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-4 hover:border-cyan-400/50 transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                        <i className="ri-smartphone-line text-blue-400 text-sm"></i>
                      </div>
                      <h4 className="text-white font-bold text-sm">Wearable Health Devices</h4>
                    </div>
                    <p className="text-white/60 text-xs leading-relaxed">Smart health monitoring wearables</p>
                  </div>

                  <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-4 hover:border-cyan-400/50 transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                        <i className="ri-scan-line text-cyan-400 text-sm"></i>
                      </div>
                      <h4 className="text-white font-bold text-sm">Intelligent Imaging</h4>
                    </div>
                    <p className="text-white/60 text-xs leading-relaxed">AI-enhanced medical imaging</p>
                  </div>

                  <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-4 hover:border-cyan-400/50 transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                        <i className="ri-stethoscope-line text-blue-400 text-sm"></i>
                      </div>
                      <h4 className="text-white font-bold text-sm">AI Diagnostics</h4>
                    </div>
                    <p className="text-white/60 text-xs leading-relaxed">Intelligent diagnostic assistance</p>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative lg:h-[500px] h-[350px] lg:order-2">
                <div className="relative h-full rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-purple-600/20 rounded-2xl blur-xl"></div>
                  
                  <div className="relative h-full bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0a] rounded-2xl border border-cyan-500/20 overflow-hidden">
                    <img 
                      src="https://readdy.ai/api/search-image?query=Advanced%20medical%20monitoring%20device%20with%20AI-powered%20diagnostic%20display%20showing%20patient%20vital%20signs%20and%20health%20data%20visualization%2C%20modern%20healthcare%20technology%20with%20electric%20blue%20interface%20elements%2C%20wearable%20health%20sensors%20and%20smart%20medical%20equipment%2C%20dark%20professional%20medical%20environment%20with%20cyan%20accent%20lighting%2C%20photorealistic%20medical%20electronics%20with%20holographic%20data%20overlays&width=600&height=500&seq=ai-medical-devices&orientation=landscape"
                      alt="AI-Powered Medical Monitoring Devices"
                      className="w-full h-full object-cover object-center opacity-90"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 bg-[#1a1a2e]/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-4 shadow-2xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                        <i className="ri-health-book-line text-white text-lg"></i>
                      </div>
                      <div>
                        <div className="text-white font-bold">Smart Healthcare</div>
                        <div className="text-cyan-400 text-sm font-medium">AI-Enhanced Diagnostics</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI in Robotics & Automation */}
          <div className="mb-24">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Image */}
              <div className="relative lg:h-[500px] h-[350px]">
                <div className="relative h-full rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-purple-600/20 rounded-2xl blur-xl"></div>
                  
                  <div className="relative h-full bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0a] rounded-2xl border border-cyan-500/20 overflow-hidden">
                    <img 
                      src="https://readdy.ai/api/search-image?query=Advanced%20industrial%20robotic%20arm%20with%20AI%20processing%20capabilities%20in%20modern%20automated%20factory%2C%20cinematic%20dark%20lighting%20with%20electric%20blue%20accent%20illumination%2C%20precision%20manufacturing%20robot%20performing%20complex%20assembly%20tasks%2C%20high-tech%20automation%20environment%20with%20glowing%20control%20interfaces%2C%20photorealistic%20industrial%20robotics%20with%20cyan%20light%20effects%20and%20sophisticated%20mechanical%20design&width=600&height=500&seq=ai-robotics-automation&orientation=landscape"
                      alt="AI-Powered Industrial Robotics and Automation"
                      className="w-full h-full object-cover object-center opacity-90"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 bg-[#1a1a2e]/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-4 shadow-2xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                        <i className="ri-robot-line text-white text-lg"></i>
                      </div>
                      <div>
                        <div className="text-white font-bold">Smart Automation</div>
                        <div className="text-cyan-400 text-sm font-medium">AI-Driven Robotics</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-3xl lg:text-4xl font-black text-white leading-tight">
                    AI in Robotics & Automation:
                    <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-1">
                      Optimizing Operations with Intelligent Robotics
                    </span>
                  </h3>
                  
                  <p className="text-lg text-white/70 leading-relaxed">
                    Revolutionizing industrial operations through intelligent robotics that enhance precision, flexibility, and efficiency across automation scenarios.
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-[#1a1a2e]/30 rounded-lg border border-cyan-500/10 hover:border-cyan-400/30 transition-all duration-300">
                    <div className="w-6 h-6 bg-cyan-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-robot-line text-cyan-400 text-sm"></i>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">Collaborative Robots (Cobots)</h4>
                      <p className="text-white/60 text-xs">Safe human-robot collaboration in manufacturing</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-[#1a1a2e]/30 rounded-lg border border-cyan-500/10 hover:border-cyan-400/30 transition-all duration-300">
                    <div className="w-6 h-6 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-settings-3-line text-blue-400 text-sm"></i>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">Industrial Robots</h4>
                      <p className="text-white/60 text-xs">High-precision automated manufacturing systems</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-[#1a1a2e]/30 rounded-lg border border-cyan-500/10 hover:border-cyan-400/30 transition-all duration-300">
                    <div className="w-6 h-6 bg-cyan-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-search-eye-line text-cyan-400 text-sm"></i>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">Quality Control</h4>
                      <p className="text-white/60 text-xs">AI-powered inspection and defect detection</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-[#1a1a2e]/30 rounded-lg border border-cyan-500/10 hover:border-cyan-400/30 transition-all duration-300">
                    <div className="w-6 h-6 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-tools-line text-blue-400 text-sm"></i>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">Predictive Maintenance</h4>
                      <p className="text-white/60 text-xs">AI-driven equipment health monitoring</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-[#1a1a2e]/30 rounded-lg border border-cyan-500/10 hover:border-cyan-400/30 transition-all duration-300">
                    <div className="w-6 h-6 bg-cyan-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-truck-line text-cyan-400 text-sm"></i>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">Autonomous Mobile Robots (AMRs)</h4>
                      <p className="text-white/60 text-xs">Intelligent navigation and material handling</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Trinova AI Advantage Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center space-y-6 mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
              <i className="ri-award-line text-cyan-400"></i>
              <span className="text-cyan-400 text-sm font-semibold">Our Advantage</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
              The Trinova AI
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-1">
                Advantage
              </span>
            </h2>

            <p className="text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
              Why industry leaders choose Trinova AI for their intelligent electronics solutions
            </p>
          </div>

          {/* Advantages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Advantage 1 */}
            <div className="group relative bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300 cursor-pointer text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative space-y-4">
                <div className="w-16 h-16 bg-cyan-500/10 rounded-xl flex items-center justify-center mx-auto group-hover:bg-cyan-500/20 transition-colors duration-300">
                  <i className="ri-lightbulb-flash-line text-cyan-400 text-3xl"></i>
                </div>
                <h3 className="text-white font-bold text-lg">Innovative AI Integration</h3>
                <p className="text-white/60 text-sm leading-relaxed">Focus on cutting-edge solutions for functionality and efficiency</p>
              </div>
            </div>

            {/* Advantage 2 */}
            <div className="group relative bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300 cursor-pointer text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative space-y-4">
                <div className="w-16 h-16 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto group-hover:bg-blue-500/20 transition-colors duration-300">
                  <i className="ri-user-heart-line text-blue-400 text-3xl"></i>
                </div>
                <h3 className="text-white font-bold text-lg">Customer-Centric Approach</h3>
                <p className="text-white/60 text-sm leading-relaxed">Focus on custom-built systems meeting unique industry needs</p>
              </div>
            </div>

            {/* Advantage 3 */}
            <div className="group relative bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300 cursor-pointer text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative space-y-4">
                <div className="w-16 h-16 bg-cyan-500/10 rounded-xl flex items-center justify-center mx-auto group-hover:bg-cyan-500/20 transition-colors duration-300">
                  <i className="ri-line-chart-line text-cyan-400 text-3xl"></i>
                </div>
                <h3 className="text-white font-bold text-lg">Scalable & Reliable</h3>
                <p className="text-white/60 text-sm leading-relaxed">Focus on AI-powered products designed for long-term scalability and reliability</p>
              </div>
            </div>

            {/* Advantage 4 */}
            <div className="group relative bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300 cursor-pointer text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative space-y-4">
                <div className="w-16 h-16 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto group-hover:bg-blue-500/20 transition-colors duration-300">
                  <i className="ri-customer-service-2-line text-blue-400 text-3xl"></i>
                </div>
                <h3 className="text-white font-bold text-lg">End-to-End Support</h3>
                <p className="text-white/60 text-sm leading-relaxed">Focus on comprehensive services from AI development through manufacturing, integration, and post-launch support</p>
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
              Ready to Transform Your
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-1">
                Industry with AI?
              </span>
            </h2>

            <p className="text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
              Partner with Trinova AI to develop intelligent electronics that revolutionize your business and enhance user experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer group">
                <span className="flex items-center justify-center space-x-2">
                  <span>Start Your AI Project</span>
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

      <Footer />
    </div>
  );
}