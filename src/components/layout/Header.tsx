import { useState, useEffect } from "react";
import { NAV_LINKS, type NavKey } from "../../constants/navigation";
import { siteConfigAPI } from "../../services/api";

interface HeaderProps {
  active?: NavKey;
}

const baseLinkClasses =
  "transition-colors duration-300 font-medium cursor-pointer";

const getLinkClasses = (isActive: boolean) =>
  `${baseLinkClasses} ${
    isActive ? "text-white font-bold border-b-2 border-cyan-400" : "text-white/80 hover:text-cyan-400 border-b-2 border-transparent"
  }`;

export default function Header({ active }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState("/logo.png");

  useEffect(() => {
    fetchLogo();
  }, []);

  const fetchLogo = async () => {
    try {
      const response = await siteConfigAPI.get();
      const config = response.data?.config || {};
      if (config.header_logo_url) {
        setLogoUrl(config.header_logo_url);
      }
    } catch (error) {
      console.error('Error fetching logo:', error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#252525]/95 backdrop-blur-md border-b border-white/5">
      <div className="w-full px-6 lg:px-8">
        <div className="flex items-center justify-between h-fit py-2 max-w-7xl mx-auto">
          <a href="/" className="flex items-center space-x-3">
            <img src={logoUrl} alt="Trinova AI" className="w-[5rem]" />
          </a>

          <div className="hidden lg:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className={getLinkClasses(active === link.key)}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:block">
            <a 
              href="/contact"
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 whitespace-nowrap cursor-pointer inline-block"
            >
              Start a Project
            </a>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white w-10 h-10 flex items-center justify-center cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <i
              className={`${
                isMenuOpen ? "ri-close-line" : "ri-menu-line"
              } text-2xl`}
            ></i>
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-white/5">
            <div className="flex flex-col space-y-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={`mobile-${link.key}`}
                  href={link.href}
                  className={getLinkClasses(active === link.key)}
                >
                  {link.label}
                </a>
              ))}
              <a 
                href="/contact"
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 whitespace-nowrap cursor-pointer w-full text-center"
              >
                Start a Project
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
