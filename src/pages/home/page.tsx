import Header from "../../components/layout/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { heroSlidesAPI, homeContentAPI, servicesAPI } from "../../services/api";

export default function Home() {
  const [heroSlides, setHeroSlides] = useState<any[]>([]);
  const [homeContent, setHomeContent] = useState<any>({});
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [heroResponse, contentResponse, servicesResponse] = await Promise.all([
        heroSlidesAPI.getPublic(),
        homeContentAPI.get(),
        servicesAPI.getPublic() // Changed from getAll() to getPublic()
      ]);

      setHeroSlides(heroResponse.data?.slides || []);
      setHomeContent(contentResponse.data?.content || {});
      setServices(servicesResponse.data?.services || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Fallback to default content if API fails
      setHeroSlides([]);
      setHomeContent({});
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  // Helper to get content with fallback
  const getContent = (key: string, fallback: string = '') => {
    return homeContent[key]?.value || fallback;
  };

  const getImageUrl = (key: string, fallback: string = '') => {
    return homeContent[key]?.imageUrl || fallback;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#252525] flex items-center justify-center">
        <i className="ri-loader-4-line text-cyan-400 text-4xl animate-spin"></i>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#252525] font-['Manrope',sans-serif]">
      <Header active="home" />

      {/* Hero Section - Swiper Slider */}
      <section id="home" className="relative">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={heroSlides.length > 1} // Only enable loop if we have more than 1 slide
          slidesPerView={1}
          className="hero-swiper"
        >
          {heroSlides.length > 0 ? (
            heroSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-[#0a0a0a]">
                  {/* Background Media */}
                  <div className="absolute inset-0">
                    {slide.media_type === 'video' ? (
                      <video
                        src={slide.media_url}
                        className="w-full h-full object-cover object-center"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    ) : (
                      <img
                        src={slide.media_url}
                        alt={slide.title}
                        className="w-full h-full object-cover object-center"
                      />
                    )}
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
                        {slide.highlights && slide.highlights.map((line: string, idx: number) => (
                          <span
                            key={idx}
                            className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent"
                          >
                            {line}
                          </span>
                        ))}
                      </h2>

                      {/* CTAs */}
                      {slide.primary_cta_label && (
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                          <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer group">
                            <span className="flex items-center justify-center space-x-2">
                              <span>{slide.primary_cta_label}</span>
                              {slide.primary_cta_icon && (
                                <i className={`${slide.primary_cta_icon} group-hover:translate-x-1 transition-transform`}></i>
                              )}
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className="relative min-h-screen flex items-center justify-center bg-[#0a0a0a]">
                <p className="text-white/60">No hero slides available</p>
              </div>
            </SwiperSlide>
          )}
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
          <div className="space-y-12">
            {/* Content Section */}
            <div className="space-y-6 max-w-4xl">
              {/* Section Badge */}
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                <i className="ri-information-line text-cyan-400"></i>
                <span className="text-cyan-400 text-sm font-semibold">
                  {getContent('about_badge', 'About Us')}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
                {getContent('about_title_line1', 'Discover')}
                <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-1">
                  {getContent('about_title_line2', 'Trinova AI')}
                </span>
              </h2>

              {/* Description */}
              <p className="text-lg text-white/70 leading-relaxed">
                {getContent('about_description_1', 'Trinova AI Technologies Private Limited specializes in revolutionizing the world of electronics by seamlessly integrating cutting-edge AI with hardware manufacturing, R&D, and end-to-end product realization.')}
              </p>

              <p className="text-lg text-white/70 leading-relaxed">
                {getContent('about_description_2', 'Our full-stack expertise covers everything from chip-level design to cloud integration, ensuring your next intelligent product is market-ready and scalable.')}
              </p>

              {/* Services Overview */}
              <div className="space-y-4">
                <p className="text-lg text-white/70 leading-relaxed">
                  {getContent('about_description_3', 'We offer a complete spectrum of services including research & development, custom hardware design, firmware engineering, electronics manufacturing (EMS), AI integration, and mobile application development.')}
                </p>
                <p className="text-lg text-white/70 leading-relaxed">
                  {getContent('about_description_4', 'Whether you are validating a new concept, optimizing an existing product, or scaling to mass production, Trinova AI provides the technical backbone to move from idea to deployed, intelligent solutions.')}
                </p>
              </div>
            </div>

            {/* Image Section Below */}
            <div className="relative lg:h-[500px] h-[400px]">
              {/* Main Image Container */}
              <div className="relative h-full rounded-2xl overflow-hidden">
                {/* Glowing Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-purple-600/20 rounded-2xl blur-xl"></div>

                {/* Image */}
                <div className="relative h-full bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0a] rounded-2xl border border-cyan-500/20 overflow-hidden">
                  <img
                    src={getImageUrl('about_image', 'https://readdy.ai/api/search-image?query=Professional%20engineer%20in%20modern%20high-tech%20laboratory%20examining%20sophisticated%20microchip%20with%20precision%20tools%2C%20extreme%20macro%20photography%20of%20advanced%20semiconductor%20technology%20with%20glowing%20blue%20circuits%2C%20dark%20ambient%20lighting%20with%20cyan%20accent%20lights%2C%20photorealistic%20style%20with%20shallow%20depth%20of%20field%2C%20cinematic%20composition%20showing%20innovation%20and%20precision%20engineering%2C%20clean%20minimalist%20background&width=600&height=600&seq=trinova-about-engineer&orientation=squarish')}
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
                          <i className={`${getContent('about_card_icon', 'ri-lightbulb-flash-line')} text-white text-xl`}></i>
                      </div>
                      <div>
                        <div className="text-white font-bold text-lg">
                          {getContent('about_card_title', 'Full-Stack Innovation')}
                        </div>
                        <div className="text-cyan-400 text-sm font-medium">
                          {getContent('about_card_subtitle', 'Concept to Market')}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        {getContent('about_card_stat_value', '100%')}
                      </div>
                      <div className="text-white/60 text-xs font-medium">
                        {getContent('about_card_stat_label', 'Scalable')}
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
                {getContent('expertise_badge', 'Our Services')}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
              {getContent('expertise_title_line1', 'Our Core')}
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-1">
                {getContent('expertise_title_line2', 'Expertise')}
              </span>
            </h2>

            <p className="text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
              {getContent('expertise_description', 'From concept to market, we deliver comprehensive solutions across the entire technology stack')}
            </p>
          </div>

          {/* Services Grid - Dynamic from Database */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.length > 0 ? (
              services.filter(service => service.is_active).map((service) => (
                <div 
                  key={service.id} 
                  className="group relative bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300 cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative space-y-4">
                    <div className="w-14 h-14 bg-cyan-500/10 rounded-lg flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors duration-300">
                      <i className={`${service.icon || 'ri-service-line'} text-cyan-400 text-2xl`}></i>
                    </div>
                    <h3 className="text-white font-bold text-lg">
                      {service.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-white/40">
                <i className="ri-inbox-line text-4xl mb-2"></i>
                <p>No services available yet.</p>
              </div>
            )}
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
                Pioneering the future of intelligent electronics and AI solutions through innovative hardware design, advanced R&D, and end-to-end product development.
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
              Copyright © 2025 Trinova AI Technologies Private Limited. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
