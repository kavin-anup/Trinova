
import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import Services from "../pages/services/page";
import EMS from "../pages/ems/page";
import AI from "../pages/ai/page";
import Contact from "../pages/contact/page";
import Testimonials from "../pages/testimonials/page";
import OurEdge from "../pages/our-edge/page";

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
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
