import { NAV_LINKS } from "../../constants/navigation";

const socialLinks = [
  { icon: "ri-linkedin-fill", href: "#" },
  { icon: "ri-instagram-line", href: "#" },
  { icon: "ri-facebook-fill", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#252525] border-t border-white/5 overflow-hidden">
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
                <h3 className="text-white font-bold text-2xl tracking-tight">
                  Trinova AI
                </h3>
                <p className="text-cyan-400 text-sm font-medium">
                  Technologies Private Limited
                </p>
              </div>
            </div>

            <p className="text-white/70 leading-relaxed">
              Pioneering the future of intelligent electronics and AI solutions
              through innovative hardware design, advanced R&D, and end-to-end
              product development.
            </p>

            <div className="flex items-center space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.icon}
                  href={link.href}
                  className="w-10 h-10 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400/50 rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer group"
                >
                  <i
                    className={`${link.icon} text-cyan-400 group-hover:text-cyan-300 text-lg`}
                  ></i>
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-white font-bold text-xl">Contact Information</h3>

            <div className="space-y-4">
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

          <div className="space-y-6">
            <h3 className="text-white font-bold text-xl">Quick Links</h3>

            <div className="grid grid-cols-1 gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={`footer-${link.key}`}
                  href={link.href}
                  className="text-white/70 hover:text-cyan-400 transition-colors duration-300 cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5">
          <div className="text-white/60 text-sm text-center lg:text-left">
            Copyright © 2025 Trinova AI Technologies Private Limited. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

