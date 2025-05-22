import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";

// Import condensed views
import About from "../tiles/About-Tile";
import Project from "../tiles/Project-Tile";
import Skills from "../tiles/Skill-Tile";
import Article from "../tiles/Article-Tile";
import Contact from "../tiles/Contact-Tile";
import Services from "../tiles/Services-Tile";

// Import expanded views
import AboutExpanded from "../tiles/inner-tiles/About-Inner-Tile";
import ProjectExpanded from "../tiles/inner-tiles/Projects-Inner-Tile";
import ArticleExpanded from "../tiles/inner-tiles/Article-Inner-Tile";
import ContactExpanded from "../tiles/inner-tiles/Contact-Inner-Tile";

import "../../styles/components/layout/Dashboard.css";

const sections = [
  { 
    id: "about", 
    condensedComponent: <About />,
    expandedComponent: <AboutExpanded />,
    animation: "slideFromLeft",
    gridStyle: {
      gridColumn: "span 6 / span 6",
      "@media (min-width: 768px)": { gridColumn: "span 6 / span 6" },
      "@media (min-width: 1024px)": { gridColumn: "span 4 / span 4" }
    }
  },
  { 
    id: "projects", 
    condensedComponent: <Project />,
    expandedComponent: <ProjectExpanded />,
    animation: "slideFromTop",
    gridStyle: {
      gridColumn: "span 6 / span 6",
      "@media (min-width: 768px)": { gridColumn: "span 3 / span 3", gridRow: "span 2 / span 2" },
      "@media (min-width: 1024px)": { gridColumn: "span 2 / span 2" }
    }
  },
  { 
    id: "skills", 
    condensedComponent: <Skills />,
    animation: "slideFromLeft",
    gridStyle: {
      gridColumn: "span 6 / span 6",
      "@media (min-width: 768px)": { gridColumn: "span 3 / span 3" },
      "@media (min-width: 1024px)": { gridColumn: "span 2 / span 2" }
    }
  },
  { 
    id: "contact", 
    condensedComponent: <Contact />,
    expandedComponent: <ContactExpanded />,
    animation: "flip",
    gridStyle: {
      gridColumn: "span 6 / span 6",
      "@media (min-width: 768px)": { gridColumn: "span 3 / span 3" },
      "@media (min-width: 1024px)": { gridColumn: "span 2 / span 2" }
    }
  },
  { 
    id: "services", 
    condensedComponent: <Services />,
    animation: "slideFromBottom",
    gridStyle: {
      gridColumn: "span 6 / span 6",
      "@media (min-width: 768px)": { gridColumn: "span 3 / span 3" }
    }
  },
  { 
    id: "articles", 
    condensedComponent: <Article />,
    expandedComponent: <ArticleExpanded />,
    animation: "slideFromBottom",
    gridStyle: {
      gridColumn: "span 6 / span 6",
      "@media (min-width: 768px)": { gridColumn: "span 3 / span 3" }
    }
  },
];

const TILE_COUNT = 5;

// Animation configurations
const animationConfigs = {
  slideFromLeft: {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
  },
  slideFromRight: {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
  },
  slideFromTop: {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1, duration: 0.8, ease: "bounce.out" }
  },
  slideFromBottom: {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
  },
  flip: {
    initial: { rotationY: -90, opacity: 0, transformOrigin: "center center" },
    animate: { rotationY: 0, opacity: 1, duration: 1.2, ease: "power2.out" }
  },
  scaleRotate: {
    initial: { scale: 0, rotation: -180, opacity: 0 },
    animate: { scale: 1, rotation: 0, opacity: 1, duration: 1, ease: "back.out(1.7)" }
  }
};

// Responsive grid styles
const getResponsiveGridStyle = (windowWidth) => {
  if (windowWidth >= 1024) {
    return {
      about: { gridColumn: "span 4" },
      projects: { gridColumn: "span 2", gridRow: "span 2" },
      skills: { gridColumn: "span 2" },
      contact: { gridColumn: "span 2" },
      services: { gridColumn: "span 3" },
      articles: { gridColumn: "span 3" }
    };
  } else if (windowWidth >= 768) {
    return {
      about: { gridColumn: "span 6" },
      projects: { gridColumn: "span 3", gridRow: "span 2" },
      skills: { gridColumn: "span 3" },
      contact: { gridColumn: "span 3" },
      services: { gridColumn: "span 3" },
      articles: { gridColumn: "span 3" }
    };
  } else {
    return {
      about: { gridColumn: "span 6" },
      projects: { gridColumn: "span 6" },
      skills: { gridColumn: "span 6" },
      contact: { gridColumn: "span 6" },
      services: { gridColumn: "span 6" },
      articles: { gridColumn: "span 6" }
    };
  }
};

const DashboardGrid = ({ expandedId, onTileToggle, onTileClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasIntroPlayed, setHasIntroPlayed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  
  const tilesRef = useRef([]);
  const contentRef = useRef(null);
  const containerRef = useRef(null);
  const tileElementsRef = useRef([]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Set up tiles refs
  useEffect(() => {
    tilesRef.current = tilesRef.current.slice(0, TILE_COUNT);
    tileElementsRef.current = tileElementsRef.current.slice(0, sections.length);
  }, []);

  // Intro animation on component mount
  useEffect(() => {
    if (!hasIntroPlayed && tileElementsRef.current.length > 0) {
      playIntroAnimations();
      setHasIntroPlayed(true);
    }
  }, [hasIntroPlayed]);
  
  // Play intro animations for all tiles
  const playIntroAnimations = () => {
    const tl = gsap.timeline();
    
    // Set initial states for all tiles
    tileElementsRef.current.forEach((tile, index) => {
      if (tile) {
        const section = sections[index];
        const config = animationConfigs[section.animation];
        gsap.set(tile, config.initial);
      }
    });

    // Animate tiles with stagger
    tileElementsRef.current.forEach((tile, index) => {
      if (tile) {
        const section = sections[index];
        const config = animationConfigs[section.animation];
        
        tl.to(tile, {
          ...config.animate,
          delay: index * 0.15
        }, index === 0 ? 0.3 : "-=0.6");
      }
    });

    // Add hover effects
    tl.call(() => {
      tileElementsRef.current.forEach((tile) => {
        if (tile) {
          tile.addEventListener('mouseenter', () => {
            gsap.to(tile, { 
              scale: 1.05, 
              duration: 0.3, 
              ease: "power2.out",
              transformOrigin: "center center"
            });
          });
          
          tile.addEventListener('mouseleave', () => {
            gsap.to(tile, { 
              scale: 1, 
              duration: 0.3, 
              ease: "power2.out" 
            });
          });
        }
      });
    });
  };
  
  // Watch for expandedId changes and trigger animations
  useEffect(() => {
    if (expandedId && !isAnimating) {
      if (contentRef.current) {
        gsap.set(contentRef.current, { opacity: 0, y: 50 });
      }
      if (containerRef.current) {
        containerRef.current.classList.remove('visible');
      }
      setTimeout(animateOpen, 100);
    }
  }, [expandedId]);
  
  const animateOpen = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    document.body.classList.add('expanded-view-open');
    
    if (contentRef.current) {
      gsap.set(contentRef.current, { opacity: 0, y: 50 });
    }
    
    const tl = gsap.timeline();
    
    tl.to(tilesRef.current, {
      duration: 0.2,
      scaleY: 1,
      transformOrigin: "bottom left",
      stagger: 0.1,
      ease: "power2.inOut",
      onComplete: () => {
        if (containerRef.current) {
          containerRef.current.classList.add('visible');
        }
      }
    });
    
    tl.to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      delay: 0.1,
      onComplete: () => setIsAnimating(false)
    });
  };
  
  const animateClose = () => {
    setIsAnimating(true);
    const tl = gsap.timeline();
    
    tl.to(contentRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.3,
      ease: "power2.in"
    });
    
    tl.add(() => {
      if (containerRef.current) {
        containerRef.current.classList.remove('visible');
      }
    });
    
    tl.to(tilesRef.current, {
      duration: 0.2,
      scaleY: 0,
      transformOrigin: "top right",
      stagger: 0.1,
      ease: "power2.inOut",
      onComplete: () => {
        onTileClose();
        setIsAnimating(false);
        document.body.classList.remove('expanded-view-open');
      }
    });
  };
  
  const handleTileClick = (id) => {
    if (isAnimating) return;
    
    const clickedSection = sections.find(s => s.id === id);
    if (!clickedSection.expandedComponent) return;
    
    if (expandedId === id) {
      animateClose();
    } else {
      onTileToggle(id);
    }
  };
  
  const handleCloseClick = (e) => {
    e.stopPropagation();
    if (!isAnimating) {
      animateClose();
    }
  };
  
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape" && expandedId && !isAnimating) {
        animateClose();
      }
    };
    
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [expandedId, isAnimating]);

  const gridStyles = getResponsiveGridStyle(windowWidth);

  // Inline styles for the grid container to ensure it works
  const dashboardGridStyle = {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'grid',
    width: '100%',
    gridAutoRows: windowWidth <= 768 ? '19rem' : '21rem',
    gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
    gap: '1rem',
    margin: '5rem 0',
    position: 'relative'
  };

  return (
    <div className="container">
      <div className="dashboard-grid" style={dashboardGridStyle}>
        {sections.map(({ id, condensedComponent }, index) => (
          <section
            key={id}
            id={id}
            ref={el => (tileElementsRef.current[index] = el)}
            className={`tile tile-${id} ${expandedId === id ? 'active-tile' : ''}`}
            onClick={() => handleTileClick(id)}
            style={{ 
              opacity: 0,
              cursor: 
                id === 'skills' || id === 'services' ? 'auto' : 'pointer',
              ...gridStyles[id],
              // Ensure grid positioning works
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '1rem',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              boxShadow: 'inset 0 -20px 80px -20px #ffffff1f',
              border: '1px solid #ffffff1a',
              backdropFilter: 'blur(10px)',
              transform: 'translateZ(0)',
              transition: 'all 0.5s ease',
              padding: '0.9375rem',
              zIndex: 1
            }}
          >
            {condensedComponent}
          </section>
        ))}
        
        {expandedId && (
          <div className="expanded-overlay">
            <ul className="transition-tiles">
              {[...Array(TILE_COUNT)].map((_, index) => (
                <li 
                  key={index} 
                  ref={el => (tilesRef.current[index] = el)}
                />
              ))}
            </ul>
            
            <div 
              className="expanded-container" 
              ref={containerRef}
            >
              <button 
                className="close-button" 
                onClick={handleCloseClick}
                aria-label="Close expanded view"
              >
                ×
              </button>
              <div 
                className="expanded-content" 
                ref={contentRef}
                style={{ opacity: 0, transform: 'translateY(50px)' }}
              >
                {sections.find(s => s.id === expandedId)?.expandedComponent}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardGrid;