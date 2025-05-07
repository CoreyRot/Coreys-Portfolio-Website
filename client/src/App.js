import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Sidebar from "./components/layout/Sidebar";
import CanvasBackground from "./components/background/CanvasBackground";
import ScrollToTop from "./components/utils/ScrollToTop";

import Home from "./pages/Home";
import About from "./pages/About";
import Resume from "./pages/Resume";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import MoreComingSoon from "./pages/MoreComingSoon";
import Contact from "./pages/Contact";

import { SpeedInsights } from "@vercel/speed-insights/react";
import "./App.css";

/** 
 * Scroll to anchor on hash change 
 */
const ScrollToAnchor = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace("#", "");
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [hash]);

  return null;
};

/** 
 * Full-page layout wrapper 
 */
const AppLayout = () => (
  <div className="app-layout">
    <CanvasBackground />
    <Sidebar />
    <main id="content" className="site-content__start">
      <Routes>
        {/* Multi-section homepage */}
        <Route path="/" element={<MainSections />} />

        {/* Dynamic routes */}
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/projects/more-coming-soon" element={<MoreComingSoon />} />
      </Routes>
    </main>
    <ScrollToTop />
  </div>
);

/** 
 * Main homepage sections (anchor targets) 
 */
const MainSections = () => (
  <>
    <section id="home" className="home"><Home /></section>
    <section id="about" className="about"><About /></section>
    <section id="projects" className="projects"><Projects /></section>
    <section id="resume" className="resume"><Resume /></section>
    <section id="blogs" className="blogs"><Blog /></section>
    <section id="contact" className="contact"><Contact /></section>
  </>
);

/** 
 * App wrapper with Speed Insights and Router 
 */
const App = () => (
  <Router>
    <SpeedInsights />
    <ScrollToAnchor />
    <AppLayout />
  </Router>
);

export default App;
