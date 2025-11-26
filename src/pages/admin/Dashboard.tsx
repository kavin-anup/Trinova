import { useEffect, useState } from 'react';
import { heroSlidesAPI, servicesAPI, testimonialsAPI, inquiriesAPI } from '../../services/api';
import AdminLayout from '../../components/admin/AdminLayout';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    heroSlides: 0,
    services: 0,
    testimonials: 0,
    inquiries: 0,
    newInquiries: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [heroRes, servicesRes, testimonialsRes, inquiriesRes] = await Promise.all([
          heroSlidesAPI.getAll(),
          servicesAPI.getAll(),
          testimonialsAPI.getAll(),
          inquiriesAPI.getAll({ limit: 1 }),
        ]);

        const newInquiriesRes = await inquiriesAPI.getAll({ isRead: 'false', limit: 1 });

        setStats({
          heroSlides: heroRes.data?.slides?.length || 0,
          services: servicesRes.data?.services?.length || 0,
          testimonials: testimonialsRes.data?.testimonials?.length || 0,
          inquiries: inquiriesRes.data?.pagination?.total || 0,
          newInquiries: newInquiriesRes.data?.pagination?.total || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Hero Slides',
      value: stats.heroSlides,
      icon: 'ri-slideshow-3-line',
      color: 'from-cyan-500 to-blue-600',
      link: '/admin/hero-slides',
    },
    {
      title: 'Services',
      value: stats.services,
      icon: 'ri-service-line',
      color: 'from-blue-500 to-purple-600',
      link: '/admin/services',
    },
    {
      title: 'Testimonials',
      value: stats.testimonials,
      icon: 'ri-star-line',
      color: 'from-purple-500 to-pink-600',
      link: '/admin/testimonials',
    },
    {
      title: 'Inquiries',
      value: stats.inquiries,
      icon: 'ri-mail-line',
      color: 'from-pink-500 to-red-600',
      link: '/admin/inquiries',
      badge: stats.newInquiries > 0 ? stats.newInquiries : undefined,
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-2">Welcome to CMS</h2>
          <p className="text-white/70">
            Manage your website content, images, and customer inquiries from here.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card) => (
            <Link
              key={card.title}
              to={card.link}
              className="group bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/50 hover:bg-[#1a1a2e]/80 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-lg flex items-center justify-center`}>
                  <i className={`${card.icon} text-white text-xl`}></i>
                </div>
                {card.badge && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {card.badge} new
                  </span>
                )}
              </div>
              <h3 className="text-white/60 text-sm font-medium mb-1">{card.title}</h3>
              <p className="text-3xl font-bold text-white">{loading ? '...' : card.value}</p>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
            <h3 className="text-white font-bold text-lg mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                to="/admin/hero-slides"
                className="flex items-center space-x-3 p-3 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-lg transition-all"
              >
                <i className="ri-add-circle-line text-cyan-400 text-xl"></i>
                <span className="text-white">Add Hero Slide</span>
              </Link>
              <Link
                to="/admin/services"
                className="flex items-center space-x-3 p-3 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-lg transition-all"
              >
                <i className="ri-add-circle-line text-blue-400 text-xl"></i>
                <span className="text-white">Add Service</span>
              </Link>
              <Link
                to="/admin/media"
                className="flex items-center space-x-3 p-3 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-lg transition-all"
              >
                <i className="ri-upload-cloud-line text-purple-400 text-xl"></i>
                <span className="text-white">Upload Images</span>
              </Link>
            </div>
          </div>

          <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6">
            <h3 className="text-white font-bold text-lg mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="text-white/60 text-sm">
                <p>No recent activity</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

