export const NAV_LINKS = [
  { key: "home", label: "Home", href: "/" },
  { key: "services", label: "Our Services", href: "/services" },
  { key: "ems", label: "EMS", href: "/ems" },
  { key: "ai", label: "AI", href: "/ai" },
  { key: "our-edge", label: "Our Edge", href: "/our-edge" },
  { key: "blogs", label: "Blogs", href: "/blogs" },
  { key: "testimonials", label: "Testimonials", href: "/testimonials" },
  { key: "contact", label: "Contact Us", href: "/contact" },
] as const;

export type NavKey = (typeof NAV_LINKS)[number]["key"];

