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
    animation: "slideFromLeft"
  },
  { 
    id: "projects", 
    condensedComponent: <Project />,
    expandedComponent: <ProjectExpanded />,
    animation: "slideFromTop"
  },
  { 
    id: "skills", 
    condensedComponent: <Skills />,
    animation: "slideFromLeft"
  },
  { 
    id: "contact", 
    condensedComponent: <Contact />,
    expandedComponent: <ContactExpanded />,
    animation: "flip"
  },
  { 
    id: "services", 
    condensedComponent: <Services />,
    animation: "slideFromBottom"
  },
  { 
    id: "articles", 
    condensedComponent: <Article />,
    expandedComponent: <ArticleExpanded />,
    animation: "slideFromBottom"
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
  },
  fadeInScale: {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" }
  },
  slideInRotate: {
    initial: { x: -50, y: -50, rotation: -45, opacity: 0 },
    animate: { x: 0, y: 0, rotation: 0, opacity: 1, duration: 1, ease: "power3.out" }
  }
};

const DashboardGrid = ({ expandedId, onTileToggle, onTileClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasIntroPlayed, setHasIntroPlayed] = useState(false);
  
  const tilesRef = useRef([]);
  const contentRef = useRef(null);
  const containerRef = useRef(null);
  const tileElementsRef = useRef([]);
  
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
          delay: index * 0.15 // Stagger delay
        }, index === 0 ? 0.3 : "-=0.6"); // Start first tile after 0.3s, others overlap
      }
    });

    // Add a subtle hover effect after intro
    tl.call(() => {
      tileElementsRef.current.forEach((tile) => {
        if (tile) {
          // Add hover animation
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
      // Reset content styling before animation
      if (contentRef.current) {
        gsap.set(contentRef.current, { opacity: 0, y: 50 });
      }
      // Ensure container is hidden initially
      if (containerRef.current) {
        containerRef.current.classList.remove('visible');
      }
      setTimeout(animateOpen, 100);
    }
  }, [expandedId]);
  
  // Animate tiles and content when showing expanded view
  const animateOpen = () => {
    if (isAnimating) return; // Prevent multiple animations
    
    setIsAnimating(true);
    
    // Prevent scrolling
    document.body.classList.add('expanded-view-open');
    
    // Ensure content starts in the right position
    if (contentRef.current) {
      gsap.set(contentRef.current, { opacity: 0, y: 50 });
    }
    
    // First animate the tiles
    const tl = gsap.timeline();
    
    // Animate the tiles in sequence
    tl.to(tilesRef.current, {
      duration: 0.2,
      scaleY: 1,
      transformOrigin: "bottom left",
      stagger: 0.1,
      ease: "power2.inOut",
      onComplete: () => {
        // When tiles are fully visible, make the container visible
        if (containerRef.current) {
          containerRef.current.classList.add('visible');
        }
      }
    });
    
    // Then fade in the content with a nice entrance
    tl.to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      delay: 0.1,
      onComplete: () => setIsAnimating(false)
    });
  };
  
  // Animate tiles and content when hiding expanded view
  const animateClose = () => {
    setIsAnimating(true);
    
    const tl = gsap.timeline();
    
    // First fade out the content
    tl.to(contentRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.3,
      ease: "power2.in"
    });
    
    // Hide the container
    tl.add(() => {
      if (containerRef.current) {
        containerRef.current.classList.remove('visible');
      }
    });
    
    // Then animate the tiles out in reverse order
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
  
  // Update the handleTileClick function to check if the section has an expandedComponent
  const handleTileClick = (id) => {
    if (isAnimating) return;
    
    // Get the section that was clicked
    const clickedSection = sections.find(s => s.id === id);
    
    // Only proceed if this section has an expandedComponent
    if (!clickedSection.expandedComponent) return;
    
    if (expandedId === id) {
      animateClose();
    } else {
      onTileToggle(id);
    }
  };
  
  // Handle close button click
  const handleCloseClick = (e) => {
    e.stopPropagation();
    if (!isAnimating) {
      animateClose();
    }
  };
  
  // Handle escape key
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape" && expandedId && !isAnimating) {
        animateClose();
      }
    };
    
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [expandedId, isAnimating]);

  return (
    <div className="container">
      <div className="dashboard-grid">
        {sections.map(({ id, condensedComponent }, index) => (
          <section
            key={id}
            id={id}
            ref={el => (tileElementsRef.current[index] = el)}
            className={`tile tile-${id} ${expandedId === id ? 'active-tile' : ''}`}
            onClick={() => handleTileClick(id)}
            style={{ 
              opacity: 0, // Start invisible for intro animation
            }}
          >
            {condensedComponent}
          </section>
        ))}
        
        {expandedId && (
          <div className="expanded-overlay">
            {/* Transition tiles for the animation */}
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