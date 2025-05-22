import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Header from "./components/layout/Header";
import CanvasBackground from "./components/background/CanvasBackground";

import ProjectDetails from "./components/tiles/inner-tiles/ProjectDetails";
import BlogDetails from "./components/tiles/inner-tiles/BlogDetails";

import DashboardGrid from "./components/layout/DashboardGrid";
import IntroGrid from "./components/IntroGrid";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./App.css";

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

const AppLayout = () => {
  // Lift the expanded tile state up to share between Header and DashboardGrid
  const [expandedTileId, setExpandedTileId] = useState(null);

  // Handler to open/close tiles - this will be passed to both components
  const handleTileToggle = (tileId) => {
    setExpandedTileId(prevId => prevId === tileId ? null : tileId);
  };

  // Handler specifically for navigation - always opens the tile
  const handleNavigationOpen = (tileId) => {
    setExpandedTileId(tileId);
  };

  return (
    <div className="app-layout">
      <CanvasBackground />
      <Header 
        onNavigationClick={handleNavigationOpen}
        expandedTileId={expandedTileId}
      />
      <main id="content" className="site-content__start">
        <Routes>
          <Route 
            path="/" 
            element={
              <DashboardGrid 
                expandedId={expandedTileId}
                onTileToggle={handleTileToggle}
                onTileClose={() => setExpandedTileId(null)}
              />
            } 
          />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  const [introDone, setIntroDone] = useState(false);

  return (
    <Router>
      <SpeedInsights />
      <ScrollToAnchor />
      {!introDone ? (
        <IntroGrid onFinish={() => setIntroDone(true)} />
      ) : (
        <AppLayout />
      )}
    </Router>
  );
};

export default App;