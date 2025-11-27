import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { admin, logout } = useAuth();

  const menuItems = [
    { path: '/admin/dashboard', icon: 'ri-dashboard-line', label: 'Dashboard' },
    { path: '/admin/hero-slides', icon: 'ri-slideshow-3-line', label: 'Hero Slides' },
    { path: '/admin/home-content', icon: 'ri-home-line', label: 'Home Content' },
    { path: '/admin/services-content', icon: 'ri-file-edit-line', label: 'Services Content' },
    { path: '/admin/ems-content', icon: 'ri-file-edit-line', label: 'EMS Content' },
    { path: '/admin/ai-content', icon: 'ri-file-edit-line', label: 'AI Content' },
    { path: '/admin/our-edge-content', icon: 'ri-file-edit-line', label: 'Our Edge Content' },
    { path: '/admin/testimonials-content', icon: 'ri-file-edit-line', label: 'Testimonials Content' },
    { path: '/admin/contact-content', icon: 'ri-file-edit-line', label: 'Contact Content' },
    // { path: '/admin/services', icon: 'ri-service-line', label: 'Services' },
    // { path: '/admin/testimonials', icon: 'ri-star-line', label: 'Testimonials' },
    { path: '/admin/inquiries', icon: 'ri-mail-line', label: 'Inquiries' },
    { path: '/admin/media', icon: 'ri-image-line', label: 'Media Library' },
    { path: '/admin/settings', icon: 'ri-settings-3-line', label: 'Settings' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen w-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-[#1a1a2e] border-r border-cyan-500/20 transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-cyan-500/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <i className="ri-shield-user-line text-white text-xl"></i>
            </div>
            {sidebarOpen && (
              <div>
                <h2 className="text-white font-bold text-lg">Trinova CMS</h2>
                <p className="text-cyan-400 text-xs">Admin Panel</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                isActive(item.path)
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'text-white/70 hover:bg-cyan-500/10 hover:text-cyan-400'
              }`}
            >
              <i className={`${item.icon} text-xl`}></i>
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-cyan-500/20">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <i className="ri-user-line text-white"></i>
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm truncate">
                  {admin?.email}
                </p>
                <p className="text-cyan-400 text-xs">{admin?.role}</p>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all"
          >
            <i className="ri-logout-box-line"></i>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-20 w-6 h-6 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 rounded-full flex items-center justify-center text-cyan-400 transition-all"
        >
          <i className={`ri-arrow-${sidebarOpen ? 'left' : 'right'}-line text-sm`}></i>
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-[#1a1a2e] border-b border-cyan-500/20 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-white font-bold text-xl">
              {menuItems.find((item) => isActive(item.path))?.label || 'Dashboard'}
            </h1>
            <div className="flex items-center space-x-4">
              <a
                href="/"
                target="_blank"
                className="px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg transition-all text-sm"
              >
                <i className="ri-external-link-line mr-2"></i>
                View Site
              </a>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

