import Header from "../../components/layout/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const heroSlides = [
  {
    id: "ai-innovation",
    title: "Your Vision, ",
    highlights: ["Engineered Into Reality."],
    description:
      "We are the full-stack partner, accelerating innovation from concept to market in hardware, firmware, and advanced AI systems.",
    subDescription:
      "Unlock reliable, scalable products with our deep expertise in embedded intelligence, secure connectivity, and cloud orchestration.",

    image: "/images/slider-1.webp",
    primaryCta: { label: "Explore Our Services", icon: "ri-arrow-right-line" },
  },
  {
    id: "full-stack",
    title: "Your Vision, ",
    highlights: ["Engineered Into Reality."],
    description:
      "A single partner for research, hardware, firmware, and manufacturing means faster cycles and fewer handoffs.",
    subDescription:
      "Our collaborative pods blend R&D rigor with production discipline so every iteration moves you closer to market launch.",

    image: "/images/slider-2.webp",
    primaryCta: { label: "See Our Process", icon: "ri-play-circle-line" },
  },
  {
    id: "intelligent-ops",
    title: "Your Vision, ",
    highlights: ["Engineered Into Reality."],
    description:
      "We fuse predictive analytics, secure OTA, and data orchestration so your products learn, adapt, and scale.",
    subDescription:
      "From mobile companion apps to cloud-native control rooms, we help you deliver seamless user experiences and proactive support.",

    image: "/images/slider-3.webp",
    primaryCta: { label: "View Case Studies", icon: "ri-slideshow-3-line" },
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#252525] font-['Manrope',sans-serif]">
      <Header active="home" />

      {/* Hero Section - Swiper Slider */}
      <section id="home" className="relative">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          slidesPerView={1}
          className="hero-swiper"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-[#0a0a0a]">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/60 via-[#0a0a0a]/75 to-[#0a0a0a]/60"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                </div>

                {/* Ambient Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/20 rounded-full blur-[140px] animate-pulse"></div>
                  <div
                    className="absolute bottom-1/4 -right-48 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[160px] animate-pulse"
                    style={{ animationDelay: "2s" }}
                  ></div>
                  <div className="absolute inset-0 opacity-[0.03]">
                    <svg
                      className="w-full h-full"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <pattern
                          id={`grid-${slide.id}`}
                          width="50"
                          height="50"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M 50 0 L 0 0 0 50"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            className="text-cyan-400"
                          />
                        </pattern>
                      </defs>
                      <rect
                        width="100%"
                        height="100%"
                        fill={`url(#grid-${slide.id})`}
                      />
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 w-full z-10">
                  <div className="text-center max-w-5xl mx-auto space-y-8">
                    {/* Heading */}
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight space-y-2">
                      <span>{slide.title}</span>
                      {slide.highlights.map((line) => (
                        <span
                          key={line}
                          className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent"
                        >
                          {line}
                        </span>
                      ))}
                    </h2>

                    {/* Descriptions */}
                    {/* <p className="text-xl lg:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto font-medium">
                      {slide.description}
                    </p>
                    <p className="text-lg text-white/70 leading-relaxed max-w-3xl mx-auto">
                      {slide.subDescription}
                    </p> */}

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                      <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer group">
                        <span className="flex items-center justify-center space-x-2">
                          <span>{slide.primaryCta.label}</span>
                          <i
                            className={`${slide.primaryCta.icon} group-hover:translate-x-1 transition-transform`}
                          ></i>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* About Us Section */}
      <section id="about" className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              {/* Section Badge */}
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                <i className="ri-information-line text-cyan-400"></i>
                <span className="text-cyan-400 text-sm font-semibold">
                  About Us
                </span>
              </div>

              {/* Title */}
              <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
                Discover
                <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-1">
                  Trinova AI
                </span>
              </h2>

              {/* Description */}
              <p className="text-lg text-white/70 leading-relaxed">
                Trinova AI Technologies Private Limited specializes in
                revolutionizing the world of electronics by seamlessly
                integrating cutting-edge AI with hardware manufacturing, R&D,
                and end-to-end product realization.
              </p>

              <p className="text-lg text-white/70 leading-relaxed">
                Our full-stack expertise covers everything from chip-level
                design to cloud integration, ensuring your next intelligent
                product is market-ready and scalable.
              </p>

              {/* Services Overview */}
              <div className="mt-6 space-y-4">
                <p className="text-lg text-white/70 leading-relaxed">
                  We offer a complete spectrum of services including research
                  &amp; development, custom hardware design, firmware
                  engineering, electronics manufacturing (EMS), AI integration,
                  and mobile application development.
                </p>
                <p className="text-lg text-white/70 leading-relaxed">
                  Whether you are validating a new concept, optimizing an
                  existing product, or scaling to mass production, Trinova AI
                  provides the technical backbone to move from idea to deployed,
                  intelligent solutions.
                </p>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative lg:h-[600px] h-[400px]">
              {/* Main Image Container */}
              <div className="relative h-full rounded-2xl overflow-hidden">
                {/* Glowing Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-purple-600/20 rounded-2xl blur-xl"></div>

                {/* Image */}
                <div className="relative h-full bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0a] rounded-2xl border border-cyan-500/20 overflow-hidden">
                  <img
                    src="https://readdy.ai/api/search-image?query=Professional%20engineer%20in%20modern%20high-tech%20laboratory%20examining%20sophisticated%20microchip%20with%20precision%20tools%2C%20extreme%20macro%20photography%20of%20advanced%20semiconductor%20technology%20with%20glowing%20blue%20circuits%2C%20dark%20ambient%20lighting%20with%20cyan%20accent%20lights%2C%20photorealistic%20style%20with%20shallow%20depth%20of%20field%2C%20cinematic%20composition%20showing%20innovation%20and%20precision%20engineering%2C%20clean%20minimalist%20background&width=600&height=600&seq=trinova-about-engineer&orientation=squarish"
                    alt="Engineer working with advanced microchip technology"
                    className="w-full h-full object-cover object-center opacity-90"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                </div>

                {/* Floating Info Card */}
                <div className="absolute bottom-6 left-6 right-6 bg-[#1a1a2e]/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-5 shadow-2xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                        <i className="ri-lightbulb-flash-line text-white text-xl"></i>
                      </div>
                      <div>
                        <div className="text-white font-bold text-lg">
                          Full-Stack Innovation
                        </div>
                        <div className="text-cyan-400 text-sm font-medium">
                          Concept to Market
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        100%
                      </div>
                      <div className="text-white/60 text-xs font-medium">
                        Scalable
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse"></div>
                <div
                  className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] animate-pulse"
                  style={{ animationDelay: "1.5s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="relative py-24 lg:py-32 overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center space-y-6 mb-16">
            {/* Section Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
              <i className="ri-service-line text-cyan-400"></i>
              <span className="text-cyan-400 text-sm font-semibold">
                Our Services
              </span>
            </div>

            {/* Title */}
            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
              Our Core
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-1">
                Expertise
              </span>
            </h2>

            <p className="text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
              From concept to market, we deliver comprehensive solutions across
              the entire technology stack
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service Card 1 */}
            <div className="group relative bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative space-y-4">
                <div className="w-14 h-14 bg-cyan-500/10 rounded-lg flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors duration-300">
                  <i className="ri-flask-line text-cyan-400 text-2xl"></i>
                </div>
                <h3 className="text-white font-bold text-lg">
                  Research & Development
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Cutting-edge R&D solutions driving innovation in AI and
                  electronics
                </p>
              </div>
            </div>

            {/* Service Card 2 */}
            <div className="group relative bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative space-y-4">
                <div className="w-14 h-14 bg-blue-500/10 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-300">
                  <i className="ri-cpu-line text-blue-400 text-2xl"></i>
                </div>
                <h3 className="text-white font-bold text-lg">
                  Hardware Designing
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Advanced hardware design from concept to production-ready
                  solutions
                </p>
              </div>
            </div>

            {/* Service Card 3 */}
            <div className="group relative bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative space-y-4">
                <div className="w-14 h-14 bg-cyan-500/10 rounded-lg flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors duration-300">
                  <i className="ri-code-line text-cyan-400 text-2xl"></i>
                </div>
                <h3 className="text-white font-bold text-lg">
                  Firmware Development
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Robust firmware solutions for embedded systems and IoT devices
                </p>
              </div>
            </div>

            {/* Service Card 4 */}
            <div className="group relative bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative space-y-4">
                <div className="w-14 h-14 bg-blue-500/10 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-300">
                  <i className="ri-smartphone-line text-blue-400 text-2xl"></i>
                </div>
                <h3 className="text-white font-bold text-lg">
                  Mobile App Development
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Native and cross-platform mobile applications with AI
                  integration
                </p>
              </div>
            </div>

            {/* Service Card 5 */}
            <div className="group relative bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative space-y-4">
                <div className="w-14 h-14 bg-cyan-500/10 rounded-lg flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors duration-300">
                  <i className="ri-settings-3-line text-cyan-400 text-2xl"></i>
                </div>
                <h3 className="text-white font-bold text-lg">
                  Electronics Manufacturing
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  End-to-end electronics manufacturing services (EMS) with
                  quality assurance
                </p>
              </div>
            </div>

            {/* Service Card 6 */}
            <div className="group relative bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative space-y-4">
                <div className="w-14 h-14 bg-blue-500/10 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-300">
                  <i className="ri-shopping-cart-line text-blue-400 text-2xl"></i>
                </div>
                <h3 className="text-white font-bold text-lg">
                  Component Sourcing
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Strategic component sourcing and procurement for optimal
                  supply chain
                </p>
              </div>
            </div>

            {/* Service Card 7 */}
            <div className="group relative bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative space-y-4">
                <div className="w-14 h-14 bg-cyan-500/10 rounded-lg flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors duration-300">
                  <i className="ri-tools-line text-cyan-400 text-2xl"></i>
                </div>
                <h3 className="text-white font-bold text-lg">
                  Mechanical Design
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Precision mechanical design and engineering for complex
                  systems
                </p>
              </div>
            </div>

            {/* Service Card 8 */}
            <div className="group relative bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative space-y-4">
                <div className="w-14 h-14 bg-blue-500/10 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-300">
                  <i className="ri-rocket-line text-blue-400 text-2xl"></i>
                </div>
                <h3 className="text-white font-bold text-lg">
                  End-to-End Development
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Complete product development lifecycle from ideation to market
                  launch
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Footer Section */}
      <footer
        id="contact"
        className="relative bg-[#252525] border-t border-white/5 overflow-hidden"
      >
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
                  <h3 className="text-white font-bold text-2xl tracking-tight">
                    Trinova AI
                  </h3>
                  <p className="text-cyan-400 text-sm font-medium">
                    Technologies Private Limited
                  </p>
                </div>
              </div>

              <p className="text-white/70 leading-relaxed">
                Pioneering the future of intelligent electronics and AI
                solutions through innovative hardware design, advanced R&D, and
                end-to-end product development.
              </p>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400/50 rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer group"
                >
                  <i className="ri-linkedin-fill text-cyan-400 group-hover:text-cyan-300 text-lg"></i>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400/50 rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer group"
                >
                  <i className="ri-instagram-line text-cyan-400 group-hover:text-cyan-300 text-lg"></i>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400/50 rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer group"
                >
                  <i className="ri-facebook-fill text-cyan-400 group-hover:text-cyan-300 text-lg"></i>
                </a>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-white font-bold text-xl">
                Contact Information
              </h3>

              <div className="space-y-4">
                {/* Phone */}
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-phone-line text-cyan-400 text-lg"></i>
                  </div>
                  <div>
                    <div className="text-white font-medium">Phone</div>
                    <a
                      href="tel:+918310694003"
                      className="text-white/70 hover:text-cyan-400 transition-colors duration-300 cursor-pointer"
                    >
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
                    <a
                      href="mailto:technical@trinovaaitech.com"
                      className="text-white/70 hover:text-cyan-400 transition-colors duration-300 cursor-pointer"
                    >
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
                      No-1461, 2nd floor, 14th cross road,
                      <br />
                      Ananth Nagar phase2, Electronic City,
                      <br />
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
                <a
                  href="/"
                  className="text-white/70 hover:text-cyan-400 transition-colors duration-300 cursor-pointer"
                >
                  Home
                </a>
                <a
                  href="/services"
                  className="text-white/70 hover:text-cyan-400 transition-colors duration-300 cursor-pointer"
                >
                  Our Services
                </a>
                <a
                  href="/ems"
                  className="text-white/70 hover:text-cyan-400 transition-colors duration-300 cursor-pointer"
                >
                  EMS
                </a>
                <a
                  href="/ai"
                  className="text-white/70 hover:text-cyan-400 transition-colors duration-300 cursor-pointer"
                >
                  AI
                </a>
                <a
                  href="/our-edge"
                  className="text-white/70 hover:text-cyan-400 transition-colors duration-300 cursor-pointer"
                >
                  Our Edge
                </a>
                <a
                  href="/testimonials"
                  className="text-white/70 hover:text-cyan-400 transition-colors duration-300 cursor-pointer"
                >
                  Testimonials
                </a>
                <a
                  href="/contact"
                  className="text-white/70 hover:text-cyan-400 transition-colors duration-300 cursor-pointer"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/5">
            <div className="text-white/60 text-sm text-center lg:text-left">
              Copyright © 2025 Trinova AI Technologies Private Limited. All
              rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
