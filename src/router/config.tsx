
import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import Services from "../pages/services/page";
import EMS from "../pages/ems/page";
import AI from "../pages/ai/page";
import Contact from "../pages/contact/page";
import Testimonials from "../pages/testimonials/page";
import OurEdge from "../pages/our-edge/page";
import AdminLogin from "../pages/admin/Login";
import AdminDashboard from "../pages/admin/Dashboard";
import AdminHeroSlides from "../pages/admin/HeroSlides";
import AdminServices from "../pages/admin/Services";
import AdminTestimonials from "../pages/admin/Testimonials";
import AdminInquiries from "../pages/admin/Inquiries";
import AdminMedia from "../pages/admin/Media";
import AdminSettings from "../pages/admin/Settings";
import AdminHomeContent from "../pages/admin/HomeContent";
import AdminServicesContent from "../pages/admin/ServicesContent";
import AdminEMSContent from "../pages/admin/EMSContent";
import AdminAIContent from "../pages/admin/AIContent";
import AdminOurEdgeContent from "../pages/admin/OurEdgeContent";
import AdminTestimonialsContent from "../pages/admin/TestimonialsContent";
import AdminContactContent from "../pages/admin/ContactContent";
import ProtectedRoute from "../components/admin/ProtectedRoute";
import AdminRedirect from "../pages/admin/AdminRedirect";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/services",
    element: <Services />,
  },
  {
    path: "/ems",
    element: <EMS />,
  },
  {
    path: "/ai",
    element: <AI />,
  },
  {
    path: "/our-edge",
    element: <OurEdge />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/testimonials",
    element: <Testimonials />,
  },
  // Admin routes
  {
    path: "/admin",
    element: <AdminRedirect />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/hero-slides",
    element: (
      <ProtectedRoute>
        <AdminHeroSlides />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/home-content",
    element: (
      <ProtectedRoute>
        <AdminHomeContent />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/services-content",
    element: (
      <ProtectedRoute>
        <AdminServicesContent />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/ems-content",
    element: (
      <ProtectedRoute>
        <AdminEMSContent />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/ai-content",
    element: (
      <ProtectedRoute>
        <AdminAIContent />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/our-edge-content",
    element: (
      <ProtectedRoute>
        <AdminOurEdgeContent />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/testimonials-content",
    element: (
      <ProtectedRoute>
        <AdminTestimonialsContent />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/contact-content",
    element: (
      <ProtectedRoute>
        <AdminContactContent />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/services",
    element: (
      <ProtectedRoute>
        <AdminServices />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/testimonials",
    element: (
      <ProtectedRoute>
        <AdminTestimonials />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/inquiries",
    element: (
      <ProtectedRoute>
        <AdminInquiries />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/media",
    element: (
      <ProtectedRoute>
        <AdminMedia />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/settings",
    element: (
      <ProtectedRoute>
        <AdminSettings />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
