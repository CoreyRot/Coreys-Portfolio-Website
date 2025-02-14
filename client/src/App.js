import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import CanvasBackground from "./components/CanvasBackground";
import Home from "./pages/Home";
import About from "./pages/About";
import Resume from "./pages/Resume";
import Portfolio from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import MoreComingSoon from "./pages/MoreComingSoon";
import Contact from "./pages/Contact";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./App.css";

const ScrollToAnchor = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace("#", ""));
        if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [hash]);

  return null;
};

const AppLayout = () => {
  return (
    <div className="app-layout">
      <CanvasBackground />
      <Sidebar />
      <div id="content" className="site-content__start">
        <Routes>
          {/* ✅ Main Sections */}
          <Route path="/" element={<MainSections />} />

          {/* ✅ Dynamic Pages */}
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/projects/more-coming-soon" element={<MoreComingSoon />} />
        </Routes>
      </div>
    </div>
  );
};

const MainSections = () => (
  <>
    <section id="home" className="home"><Home /></section>
    <section id="about" className="about"><About /></section>
    <section id="resume" className="resume"><Resume /></section>
    <section id="projects" className="projects"><Portfolio /></section>
    <section id="blogs" className="blogs"><Blog /></section>
    <section id="contact" className="contact"><Contact /></section>
  </>
);

const App = () => {
  return (
    <>
      <SpeedInsights />
      <Router>
        <ScrollToAnchor />
        <AppLayout />
      </Router>
    </>
  );
};

export default App;
