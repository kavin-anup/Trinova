
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function Testimonials() {

  return (
    <div className="min-h-screen bg-[#252525] font-['Manrope',sans-serif]">
      <Header active="testimonials" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-gradient-to-br from-[#0a0a0a] via-[#0f1419] to-[#0a0a0a]">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="testimonial-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="1" className="text-cyan-400"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#testimonial-grid)" />
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
              <span className="text-cyan-400 text-sm font-semibold tracking-wide">Client Success Stories</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
              Trusted by Industry
              <span className="block mt-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Leaders Worldwide
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-xl lg:text-2xl text-white/70 leading-relaxed max-w-3xl mx-auto font-medium">
              Discover how Trinova AI has transformed businesses across industries with cutting-edge intelligent electronics and AI solutions.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">150+</div>
                <div className="text-white/60 text-sm font-medium mt-2">Happy Clients</div>
              </div>
              <div className="text-center border-x border-white/10">
                <div className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">98%</div>
                <div className="text-white/60 text-sm font-medium mt-2">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">25+</div>
                <div className="text-white/60 text-sm font-medium mt-2">Countries Served</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Testimonials Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center space-y-6 mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
              <i className="ri-star-line text-cyan-400"></i>
              <span className="text-cyan-400 text-sm font-semibold">Featured Reviews</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
              What Our Clients
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-1">
                Say About Us
              </span>
            </h2>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-8 hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300">
              <div className="space-y-6">
                {/* Stars */}
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="ri-star-fill text-cyan-400 text-lg"></i>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-white/80 leading-relaxed text-lg">
                  "Trinova AI transformed our smart home product line with their exceptional AI integration. Their team's expertise in both hardware and software development made our vision a reality."
                </blockquote>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">RS</span>
                  </div>
                  <div>
                    <div className="text-white font-bold">Rajesh Sharma</div>
                    <div className="text-cyan-400 text-sm">CTO, SmartTech Solutions</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-8 hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300">
              <div className="space-y-6">
                {/* Stars */}
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="ri-star-fill text-cyan-400 text-lg"></i>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-white/80 leading-relaxed text-lg">
                  "Outstanding PCB design and manufacturing services. The quality and precision of their work exceeded our expectations. Highly recommend for complex electronics projects."
                </blockquote>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">MP</span>
                  </div>
                  <div>
                    <div className="text-white font-bold">Maria Patel</div>
                    <div className="text-cyan-400 text-sm">Lead Engineer, MedDevice Corp</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-8 hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300">
              <div className="space-y-6">
                {/* Stars */}
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="ri-star-fill text-cyan-400 text-lg"></i>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-white/80 leading-relaxed text-lg">
                  "Their AI-powered robotics solutions revolutionized our manufacturing process. The team's technical expertise and customer support are truly exceptional."
                </blockquote>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">DK</span>
                  </div>
                  <div>
                    <div className="text-white font-bold">David Kim</div>
                    <div className="text-cyan-400 text-sm">Operations Director, AutoTech Industries</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 4 */}
            <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-8 hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300">
              <div className="space-y-6">
                {/* Stars */}
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="ri-star-fill text-cyan-400 text-lg"></i>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-white/80 leading-relaxed text-lg">
                  "Trinova AI delivered our IoT project on time and within budget. Their end-to-end approach from hardware to cloud integration was exactly what we needed."
                </blockquote>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">AS</span>
                  </div>
                  <div>
                    <div className="text-white font-bold">Anita Singh</div>
                    <div className="text-cyan-400 text-sm">Product Manager, ConnectIoT</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 5 */}
            <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-8 hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300">
              <div className="space-y-6">
                {/* Stars */}
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="ri-star-fill text-cyan-400 text-lg"></i>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-white/80 leading-relaxed text-lg">
                  "Exceptional firmware development services. The team's attention to detail and technical proficiency helped us launch our product ahead of schedule."
                </blockquote>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">JL</span>
                  </div>
                  <div>
                    <div className="text-white font-bold">James Liu</div>
                    <div className="text-cyan-400 text-sm">Founder, TechStart Innovations</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 6 */}
            <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-8 hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all duration-300">
              <div className="space-y-6">
                {/* Stars */}
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="ri-star-fill text-cyan-400 text-lg"></i>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-white/80 leading-relaxed text-lg">
                  "Their mobile app development integrated seamlessly with our hardware. The user experience and performance exceeded all our expectations."
                </blockquote>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">SK</span>
                  </div>
                  <div>
                    <div className="text-white font-bold">Sarah Khan</div>
                    <div className="text-cyan-400 text-sm">VP Engineering, HealthTech Pro</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Recognition Section */}
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
              <span className="text-cyan-400 text-sm font-semibold">Industry Recognition</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
              Trusted Across
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-1">
                Multiple Industries
              </span>
            </h2>

            <p className="text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
              From startups to Fortune 500 companies, we've delivered exceptional results across diverse sectors
            </p>
          </div>

          {/* Industry Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-cyan-500/10 rounded-xl flex items-center justify-center mx-auto">
                <i className="ri-home-smile-line text-cyan-400 text-2xl"></i>
              </div>
              <div>
                <div className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">45+</div>
                <div className="text-white/60 text-sm font-medium">Smart Home Projects</div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto">
                <i className="ri-health-book-line text-blue-400 text-2xl"></i>
              </div>
              <div>
                <div className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">30+</div>
                <div className="text-white/60 text-sm font-medium">Medical Devices</div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-cyan-500/10 rounded-xl flex items-center justify-center mx-auto">
                <i className="ri-robot-line text-cyan-400 text-2xl"></i>
              </div>
              <div>
                <div className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">25+</div>
                <div className="text-white/60 text-sm font-medium">Robotics Solutions</div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto">
                <i className="ri-global-line text-blue-400 text-2xl"></i>
              </div>
              <div>
                <div className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">50+</div>
                <div className="text-white/60 text-sm font-medium">IoT Deployments</div>
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
              Ready to Join Our
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-1">
                Success Stories?
              </span>
            </h2>

            <p className="text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
              Let's discuss how Trinova AI can transform your business with cutting-edge intelligent electronics and AI solutions.
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

      <Footer />
    </div>
  );
}
