import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import CanvasBackground from "./components/CanvasBackground"; // Import the canvas
import Home from "./pages/Home";
import About from "./pages/About";
import Resume from "./pages/Resume";
import Portfolio from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Contact from "./pages/Contact";
import "./App.css";

const ScrollToAnchor = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace("#", ""));
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [hash]);

  return null;
};

const App = () => {
  return (
    <Router>
      <ScrollToAnchor />
      <div className="app-layout">
        <CanvasBackground /> {/* Add this component */}
        <Sidebar />
        <div id="content" className="site-content__start">
          <Routes>
            <Route path="/" element={
              <>
                <section id="home" className="home"><Home /></section>
                <section id="about" className="about"><About /></section>
                <section id="resume" className="resume"><Resume /></section>
                <section id="projects" className="projects"><Portfolio /></section>
                <section id="contact" className="contact"><Contact /></section>
              </>
            } />
            <Route path="/projects/:id" element={<ProjectDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
