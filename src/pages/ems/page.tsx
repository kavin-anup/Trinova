import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

export default function EMS() {
  return (
    <div className="min-h-screen bg-[#252525] font-['Manrope',sans-serif]">
      <Header active="ems" />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-20 bg-gradient-to-br from-[#0a0a0a] via-[#0f1419] to-[#0a0a0a]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=High-resolution%20complex%20HDI%20PCB%20circuit%20board%20with%20glowing%20electric%20blue%20and%20cyan%20traces%2C%20extreme%20macro%20photography%20showing%20precision%20manufacturing%20details%2C%20dark%20ambient%20background%20with%20sophisticated%20electronic%20components%2C%20photorealistic%20style%20with%20depth%20of%20field%2C%20advanced%20technology%20and%20precision%20engineering%20atmosphere%2C%20clean%20minimalist%20composition%20emphasizing%20quality%20and%20innovation&width=1920&height=900&seq=ems-hero-bg&orientation=landscape"
            alt="High-density interconnect PCB with glowing traces"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/95 via-[#0a0a0a]/80 to-[#0a0a0a]/95"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] animate-pulse"></div>
          <div
            className="absolute bottom-1/4 -right-48 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[140px] animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full">
          <div className="max-w-4xl space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-5 py-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-cyan-400 text-sm font-semibold tracking-wide">
                Electronic Manufacturing Services
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
              Precision Manufacturing for{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                the AI Era
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl lg:text-2xl text-white/70 leading-relaxed max-w-3xl font-medium">
              Trinova AI provides end-to-end Electronic Manufacturing Services,
              ensuring your intelligent products are built to perfection with
              unparalleled quality and precision.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer group">
                <span className="flex items-center justify-center space-x-2">
                  <span>Start Manufacturing</span>
                  <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
                </span>
              </button>
              <button className="px-8 py-4 bg-white/5 border-2 border-cyan-400/50 text-white font-bold rounded-xl hover:bg-cyan-400/10 hover:border-cyan-400 hover:scale-105 backdrop-blur-sm transition-all duration-300 whitespace-nowrap cursor-pointer group">
                <span className="flex items-center justify-center space-x-2">
                  <span>Get Quote</span>
                  <i className="ri-calculator-line group-hover:scale-110 transition-transform"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Integrated PCB Production Pipeline Section */}
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
              <i className="ri-flow-chart text-cyan-400"></i>
              <span className="text-cyan-400 text-sm font-semibold">
                Production Pipeline
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
              Our Integrated
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-1">
                PCB Production Pipeline
              </span>
            </h2>

            <p className="text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
              From concept to completion, our comprehensive manufacturing
              process ensures precision at every step
            </p>
          </div>

          {/* Service Items */}
          <div className="space-y-24">
            {/* Service 1: PCB Design & Layout - Image Left */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="relative lg:h-[500px] h-[350px]">
                <div className="relative h-full rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-purple-600/20 rounded-2xl blur-xl"></div>
                  <div className="relative h-full bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0a] rounded-2xl border border-cyan-500/20 overflow-hidden">
                    <img
                      src="https://readdy.ai/api/search-image?query=Stunning%203D%20render%20of%20complex%20multilayer%20PCB%20layout%20with%20glowing%20electric%20blue%20traces%20and%20pathways%2C%20sophisticated%20circuit%20design%20visualization%20on%20dark%20background%2C%20high-tech%20CAD%20software%20interface%2C%20extreme%20detail%20showing%20precision%20routing%20and%20component%20placement%2C%20photorealistic%20style%20with%20dramatic%20lighting%2C%20advanced%20electronic%20design%20automation%20atmosphere&width=600&height=500&seq=pcb-layout-design&orientation=landscape"
                      alt="3D PCB layout with glowing electric blue traces"
                      className="w-full h-full object-cover object-center opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                  <i className="ri-compasses-2-line text-cyan-400"></i>
                  <span className="text-cyan-400 text-sm font-semibold">
                    Step 1
                  </span>
                </div>

                <h3 className="text-3xl lg:text-4xl font-black text-white leading-tight">
                  PCB Design &
                  <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Layout
                  </span>
                </h3>

                <p className="text-lg text-white/70 leading-relaxed">
                  <strong>Focus:</strong> Optimized, high-performance layouts
                  focusing on manufacturability (DFM) and functionality.
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-semibold mb-2">
                      Key Services:
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                          <i className="ri-settings-line text-cyan-400 text-sm"></i>
                        </div>
                        <span className="text-white/80 text-sm">
                          Custom Layouts tailored to product specifications
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-blue-500/10 rounded-lg flex items-center justify-center">
                          <i className="ri-stack-line text-blue-400 text-sm"></i>
                        </div>
                        <span className="text-white/80 text-sm">
                          Complex Designs: High-density interconnects (HDI) and
                          multi-layer designs
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service 2: PCB Fabrication - Text Left */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-6 lg:order-1">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full">
                  <i className="ri-hammer-line text-blue-400"></i>
                  <span className="text-blue-400 text-sm font-semibold">
                    Step 2
                  </span>
                </div>

                <h3 className="text-3xl lg:text-4xl font-black text-white leading-tight">
                  PCB
                  <span className="block bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                    Fabrication
                  </span>
                </h3>

                <p className="text-lg text-white/70 leading-relaxed">
                  <strong>Focus:</strong> Complete fabrication services from
                  single-sided to complex multi-layer boards, ensuring high
                  durability and precise electrical performance.
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-semibold mb-2">
                      Key Services:
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-blue-500/10 rounded-lg flex items-center justify-center">
                          <i className="ri-circuit-line text-blue-400 text-sm"></i>
                        </div>
                        <span className="text-white/80 text-sm">
                          Single-Sided & Double-Sided PCBs
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                          <i className="ri-stack-line text-cyan-400 text-sm"></i>
                        </div>
                        <span className="text-white/80 text-sm">
                          Multi-Layer PCBs for complex electronics
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-blue-500/10 rounded-lg flex items-center justify-center">
                          <i className="ri-flex-line text-blue-400 text-sm"></i>
                        </div>
                        <span className="text-white/80 text-sm">
                          Rigid & Flexible PCBs for versatile product designs
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative lg:h-[500px] h-[350px] lg:order-2">
                <div className="relative h-full rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-600/20 to-purple-600/20 rounded-2xl blur-xl"></div>
                  <div className="relative h-full bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0a] rounded-2xl border border-blue-500/20 overflow-hidden">
                    <img
                      src="https://readdy.ai/api/search-image?query=Professional%20macro%20photography%20of%20various%20PCB%20types%20including%20rigid%20flex%20and%20multi-layer%20stackup%20visualization%2C%20clean%20organized%20display%20showing%20different%20circuit%20board%20technologies%2C%20dark%20background%20with%20blue%20cyan%20accent%20lighting%2C%20photorealistic%20style%20with%20extreme%20detail%2C%20precision%20manufacturing%20and%20quality%20control%20atmosphere&width=600&height=500&seq=pcb-fabrication&orientation=landscape"
                      alt="Various PCB types and multi-layer stackup"
                      className="w-full h-full object-cover object-center opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service 3: PCB Stencil - Image Left */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="relative lg:h-[500px] h-[350px]">
                <div className="relative h-full rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-600/20 to-purple-600/20 rounded-2xl blur-xl"></div>
                  <div className="relative h-full bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0a] rounded-2xl border border-blue-500/20 overflow-hidden">
                    <img
                      src="https://readdy.ai/api/search-image?query=Extreme%20macro%20photography%20of%20precision%20laser-cut%20solder%20stencil%20pattern%20over%20PCB%20pad%20array%2C%20sophisticated%20stencil%20manufacturing%20process%20with%20fine%20pitch%20details%2C%20dark%20background%20with%20cyan%20blue%20accent%20lighting%2C%20photorealistic%20style%20with%20shallow%20depth%20of%20field%2C%20precision%20manufacturing%20and%20quality%20control%20atmosphere&width=600&height=500&seq=pcb-stencil&orientation=landscape"
                      alt="Precision solder stencil over PCB pad array"
                      className="w-full h-full object-cover object-center opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full">
                  <i className="ri-artboard-line text-blue-400"></i>
                  <span className="text-blue-400 text-sm font-semibold">
                    Step 3
                  </span>
                </div>

                <h3 className="text-3xl lg:text-4xl font-black text-white leading-tight">
                  PCB
                  <span className="block bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                    Stencil
                  </span>
                </h3>

                <p className="text-lg text-white/70 leading-relaxed">
                  <strong>Focus:</strong> Custom, precision-cut PCB stencils for
                  accurate solder paste application during assembly.
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-semibold mb-2">
                      Key Services:
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-blue-500/10 rounded-lg flex items-center justify-center">
                          <i className="ri-focus-3-line text-blue-400 text-sm"></i>
                        </div>
                        <span className="text-white/80 text-sm">
                          Laser-Cut Stencils for precise paste deposition
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                          <i className="ri-recycle-line text-cyan-400 text-sm"></i>
                        </div>
                        <span className="text-white/80 text-sm">
                          Reusable Stencils to reduce costs
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-blue-500/10 rounded-lg flex items-center justify-center">
                          <i className="ri-grid-line text-blue-400 text-sm"></i>
                        </div>
                        <span className="text-white/80 text-sm">
                          Fine Pitch Stencils for high-density boards with small
                          components
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service 4: PCB Assembly - Text Left */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              

              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                  <i className="ri-tools-line text-cyan-400"></i>
                  <span className="text-cyan-400 text-sm font-semibold">
                    Step 4
                  </span>
                </div>

                <h3 className="text-3xl lg:text-4xl font-black text-white leading-tight">
                  PCB
                  <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Assembly
                  </span>
                </h3>

                <p className="text-lg text-white/70 leading-relaxed">
                  <strong>Focus:</strong> Covers low-volume and high-volume
                  production runs. Handling Surface Mount Technology (SMT),
                  Through-Hole Technology (THT), and Mixed Technology Assembly.
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-semibold mb-2">
                      Key Services:
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                          <i className="ri-cpu-line text-cyan-400 text-sm"></i>
                        </div>
                        <span className="text-white/80 text-sm">
                          SMT & THT Assembly for small and large components
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-blue-500/10 rounded-lg flex items-center justify-center">
                          <i className="ri-robot-line text-blue-400 text-sm"></i>
                        </div>
                        <span className="text-white/80 text-sm">
                          Automated and Manual Assembly to ensure precision
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                          <i className="ri-shield-check-line text-cyan-400 text-sm"></i>
                        </div>
                        <span className="text-white/80 text-sm">
                          Testing & Quality Assurance throughout the assembly
                          process
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative lg:h-[500px] h-[350px]">
                <div className="relative h-full rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-purple-600/20 rounded-2xl blur-xl"></div>
                  <div className="relative h-full bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0a] rounded-2xl border border-cyan-500/20 overflow-hidden">
                    <img
                      src="https://readdy.ai/api/search-image?query=Modern%20SMT%20robotic%20arm%20precisely%20placing%20microchip%20component%20on%20PCB%20circuit%20board%2C%20high-tech%20automated%20assembly%20line%20with%20blue%20LED%20lighting%2C%20sophisticated%20manufacturing%20equipment%20in%20clean%20factory%20environment%2C%20photorealistic%20style%20with%20dramatic%20lighting%2C%20precision%20automation%20and%20quality%20manufacturing%20atmosphere&width=600&height=500&seq=pcb-assembly&orientation=landscape"
                      alt="SMT robotic arm placing microchip with precision"
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

      {/* Our Commitment & Foundation Section */}
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
              <i className="ri-heart-line text-cyan-400"></i>
              <span className="text-cyan-400 text-sm font-semibold">
                Foundation
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
              Our Commitment &
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-1">
                Foundation
              </span>
            </h2>
          </div>

          {/* Mission Statement */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="relative bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-8 lg:p-12">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 rounded-2xl"></div>
              <div className="relative text-center space-y-6">
                <h3 className="text-2xl lg:text-3xl font-black text-white">
                  Our Mission
                </h3>
                <p className="text-lg lg:text-xl text-white/80 leading-relaxed">
                  To offer industry-leading PCB design, fabrication, and
                  assembly services, ensuring the highest standards of
                  performance and quality in every intelligent product.
                </p>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl lg:text-3xl font-black text-white mb-4">
                Core Values
              </h3>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                The principles that guide our commitment to excellence in every
                project
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Precision */}
              <div className="group relative bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative text-center space-y-4">
                  <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-cyan-500/20 transition-colors duration-300">
                    <i className="ri-focus-3-line text-cyan-400 text-2xl"></i>
                  </div>
                  <h4 className="text-white font-bold text-lg">Precision</h4>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Focused on delivering flawless designs and manufacturing.
                  </p>
                </div>
              </div>

              {/* Quality */}
              <div className="group relative bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-blue-500/20 transition-colors duration-300">
                    <i className="ri-award-line text-blue-400 text-2xl"></i>
                  </div>
                  <h4 className="text-white font-bold text-lg">Quality</h4>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Committed to top-tier product standards through rigorous
                    testing and inspection.
                  </p>
                </div>
              </div>

              {/* Reliability */}
              <div className="group relative bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative text-center space-y-4">
                  <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-cyan-500/20 transition-colors duration-300">
                    <i className="ri-shield-check-line text-cyan-400 text-2xl"></i>
                  </div>
                  <h4 className="text-white font-bold text-lg">Reliability</h4>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Ensuring timely delivery and consistent product performance.
                  </p>
                </div>
              </div>

              {/* Customer-Centric */}
              <div className="group relative bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-blue-500/20 transition-colors duration-300">
                    <i className="ri-customer-service-line text-blue-400 text-2xl"></i>
                  </div>
                  <h4 className="text-white font-bold text-lg">
                    Customer-Centric
                  </h4>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Offering tailored solutions for every unique project.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rigorous Quality Control Processes Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center space-y-6 mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
              <i className="ri-shield-check-line text-cyan-400"></i>
              <span className="text-cyan-400 text-sm font-semibold">
                Quality Assurance
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
              Rigorous Quality Control
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-1">
                Processes
              </span>
            </h2>

            <p className="text-xl text-white/70 leading-relaxed max-w-4xl mx-auto">
              We are dedicated to ensuring that every PCB we manufacture meets
              the highest standards of quality. From design and fabrication to
              assembly and inspection, we maintain rigorous quality control
              measures to guarantee your products perform flawlessly.
            </p>
          </div>

          {/* Quality Control Processes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Material Inspection */}
            <div className="group relative bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative space-y-4">
                <div className="w-14 h-14 bg-cyan-500/10 rounded-lg flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors duration-300">
                  <i className="ri-search-line text-cyan-400 text-2xl"></i>
                </div>
                <h3 className="text-white font-bold text-lg">
                  Material Inspection
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Ensuring all raw materials meet required standards.
                </p>
              </div>
            </div>

            {/* Functional Testing */}
            <div className="group relative bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative space-y-4">
                <div className="w-14 h-14 bg-blue-500/10 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-300">
                  <i className="ri-test-tube-line text-blue-400 text-2xl"></i>
                </div>
                <h3 className="text-white font-bold text-lg">
                  Functional Testing
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Verifying the functionality of every board during and after
                  assembly.
                </p>
              </div>
            </div>

            {/* Automated Optical Inspection */}
            <div className="group relative bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative space-y-4">
                <div className="w-14 h-14 bg-cyan-500/10 rounded-lg flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors duration-300">
                  <i className="ri-eye-line text-cyan-400 text-2xl"></i>
                </div>
                <h3 className="text-white font-bold text-lg">
                  Automated Optical Inspection (AOI)
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Detecting any defects in PCB assembly to ensure quality.
                </p>
              </div>
            </div>

            {/* Final Inspection */}
            <div className="group relative bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative space-y-4">
                <div className="w-14 h-14 bg-blue-500/10 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-300">
                  <i className="ri-checkbox-circle-line text-blue-400 text-2xl"></i>
                </div>
                <h3 className="text-white font-bold text-lg">
                  Final Inspection
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Detecting any defects in PCB assembly to ensure final quality.
                </p>
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
              <span className="text-cyan-400 text-sm font-semibold tracking-wide">
                Ready to Manufacture?
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
              Let's Build Your
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-1">
                Next Innovation
              </span>
            </h2>

            <p className="text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
              Partner with Trinova AI for precision electronic manufacturing
              that brings your intelligent products to market
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer group">
                <span className="flex items-center justify-center space-x-2">
                  <span>Request Quote</span>
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
