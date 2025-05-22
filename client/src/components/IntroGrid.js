import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Flip from "gsap/Flip";
import Lenis from "@studio-freight/lenis";
import { megaTechStack } from "../data/MegaTechStack";
import { AiOutlineFileText } from "react-icons/ai";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import '../styles/IntroGrid.css';

// Register GSAP plugin
gsap.registerPlugin(Flip);

// Create rows of tech icons
const chunkArray = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

const techRows = chunkArray(megaTechStack, 7);

// Number of tiles to use in the transition animation
const TILE_COUNT = 5;

// Preload images function
const preloadIcons = () =>
  new Promise((resolve) => {
    requestAnimationFrame(resolve);
  });

const IntroGrid = ({ onFinish }) => {
  // Core refs
  const gridRef = useRef(null);
  const exploreRef = useRef(null);
  const homeBackgroundRef = useRef(null);
  const introTextRef = useRef(null);
  const contentRef = useRef(null);
  const transitionTilesRef = useRef([]);
  const transitionWrapperRef = useRef(null);
  
  // State
  const [loaded, setLoaded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Initialize smooth scroll
  useEffect(() => {
    const lenis = new Lenis();
    
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);
    document.body.classList.add('noscroll'); // Prevent scrolling initially
    
    // Preload icons
    preloadIcons().then(() => {
      setLoaded(true);
      document.body.classList.remove('loading');
    });
    
    return () => {
      lenis.destroy();
    };
  }, []);
  
  // Set up transition tiles refs
  useEffect(() => {
    transitionTilesRef.current = transitionTilesRef.current.slice(0, TILE_COUNT);
  }, []);
  
  // Grid item animations after load
  useEffect(() => {
    if (!loaded) return;
    
    const gridItems = document.querySelectorAll('.row__item');
    gsap.fromTo(gridItems, 
      { opacity: 0, scale: 0.8 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 1.2, 
        stagger: {
          amount: 0.8,
          grid: [techRows.length, techRows[0].length],
          from: "center"
        },
        ease: "power3.out"
      }
    );
    
    gsap.fromTo(
      introTextRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power2.out" }
    );
  }, [loaded]);
  
  // Mouse animation effects
  useEffect(() => {
    if (!loaded || !gridRef.current) return;
    
    const grid = gridRef.current;
    const rows = grid.querySelectorAll('.row');
    const numRows = rows.length;
    const middleRowIndex = Math.floor(numRows / 2);
    
    // Store ref values to fix the exhaustive-deps warning
    const exploreButton = exploreRef.current;
    const introText = introTextRef.current;
    
    // Config for row animations
    const config = {
      translateX: true,
      skewX: false,
      contrast: true,
      scale: false,
      brightness: true
    };
    
    // Initialize window size and mouse tracking
    let winSize = { width: window.innerWidth, height: window.innerHeight };
    let mousepos = { x: winSize.width / 2, y: winSize.height / 2 };
    let requestId;
    
    // Interpolation rates
    const baseAmt = 0.1;
    const minAmt = 0.05;
    const maxAmt = 0.1;
    
    // Initialize rendered styles for each row
    let renderedStyles = Array.from({ length: numRows }, (_, index) => {
      const distanceFromMiddle = Math.abs(index - middleRowIndex);
      const amt = Math.max(baseAmt - distanceFromMiddle * 0.03, minAmt);
      const scaleAmt = Math.min(baseAmt + distanceFromMiddle * 0.03, maxAmt);
      
      let style = { amt, scaleAmt };
      
      if (config.translateX) style.translateX = { previous: 0, current: 0 };
      if (config.skewX) style.skewX = { previous: 0, current: 0 };
      if (config.contrast) style.contrast = { previous: 100, current: 100 };
      if (config.scale) style.scale = { previous: 1, current: 1 };
      if (config.brightness) style.brightness = { previous: 100, current: 100 };
      
      return style;
    });
    
    // Update mouse position
    const updateMousePosition = (ev) => {
      mousepos.x = ev.clientX;
      mousepos.y = ev.clientY;
    };
    
    // Handle window resize
    const handleResize = () => {
      winSize = { width: window.innerWidth, height: window.innerHeight };
    };
    
    // Calculate mapped values for animations
    const calculateMappedX = () => {
      return ((mousepos.x / winSize.width) * 2 - 1) * 40 * winSize.width / 100;
    };
    
    const calculateMappedSkew = () => {
      return ((mousepos.x / winSize.width) * 2 - 1) * 3;
    };
    
    const calculateMappedContrast = () => {
      const centerContrast = 100;
      const edgeContrast = 330;
      const t = Math.abs((mousepos.x / winSize.width) * 2 - 1);
      const factor = Math.pow(t, 2);
      return centerContrast - factor * (centerContrast - edgeContrast);
    };
    
    const calculateMappedScale = () => {
      const centerScale = 1;
      const edgeScale = 0.95;
      return centerScale - Math.abs((mousepos.x / winSize.width) * 2 - 1) * (centerScale - edgeScale);
    };
    
    const calculateMappedBrightness = () => {
      const centerBrightness = 100;
      const edgeBrightness = 15;
      const t = Math.abs((mousepos.x / winSize.width) * 2 - 1);
      const factor = Math.pow(t, 2);
      return centerBrightness - factor * (centerBrightness - edgeBrightness);
    };
    
    // Linear interpolation
    const lerp = (a, b, n) => (1 - n) * a + n * b;
        
    // Render loop for animations
    const render = () => {
      // Skip rendering if transitioning
      if (isTransitioning) return;
      
      const mappedValues = {
        translateX: calculateMappedX(),
        skewX: calculateMappedSkew(),
        contrast: calculateMappedContrast(),
        scale: calculateMappedScale(),
        brightness: calculateMappedBrightness()
      };
      
      rows.forEach((row, index) => {
        const style = renderedStyles[index];
        
        for (let prop in config) {
          if (config[prop]) {
            style[prop].current = mappedValues[prop];
            const amt = prop === 'scale' ? style.scaleAmt : style.amt;
            style[prop].previous = lerp(style[prop].previous, style[prop].current, amt);
          }
        }
        
        let gsapSettings = {};
        if (config.translateX) gsapSettings.x = style.translateX.previous;
        if (config.skewX) gsapSettings.skewX = style.skewX.previous;
        if (config.scale) gsapSettings.scale = style.scale.previous;
        if (config.contrast) gsapSettings.filter = `contrast(${style.contrast.previous}%)`;
        if (config.brightness) {
          gsapSettings.filter = `${gsapSettings.filter ? gsapSettings.filter + ' ' : ''}brightness(${style.brightness.previous}%)`;
        }
        
        gsap.set(row, gsapSettings);
      });
      
      requestId = requestAnimationFrame(render);
    };
    
    const startRendering = () => {
      if (!requestId) {
        render();
      }
    };
    
    const stopRendering = () => {
      if (requestId) {
        cancelAnimationFrame(requestId);
        requestId = undefined;
      }
    };
    
    // Tile-based transition
    const enterFullview = () => {
      if (isAnimating) return;
      setIsAnimating(true);
      setIsTransitioning(true);
      
      // Make sure the transition wrapper is visible
      if (transitionWrapperRef.current) {
        transitionWrapperRef.current.style.display = 'flex';
        transitionWrapperRef.current.style.zIndex = '1000';
      }
      
      // Fade out the content and explore button
      const tl = gsap.timeline();
      
      tl.to(introText, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
      })
      .to(exploreButton, {
        opacity: 0,
        duration: 0.3
      }, 0)
      // Fade out grid 
      .to(grid, {
        opacity: 0,
        duration: 0.4
      }, 0);
      
      // Then animate the transition tiles
      tl.to(transitionTilesRef.current, {
        duration: 0.2,
        scaleY: 1,
        transformOrigin: "bottom left",
        stagger: 0.1,
        ease: "power2.inOut",
        onComplete: () => {
          // Stop the background animations
          stopRendering();
          
          // After tiles cover the screen, trigger the onFinish callback
          setTimeout(() => {
            if (onFinish) onFinish();
            setIsAnimating(false);
            // Remove scrolling lock when complete
            document.body.classList.remove('noscroll');
          }, 300);
        }
      });
    };
    
    // Set up event listeners
    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('touchmove', (ev) => {
      const touch = ev.touches[0];
      updateMousePosition(touch);
    });
    window.addEventListener('resize', handleResize);
    exploreButton.addEventListener('click', enterFullview);
    exploreButton.addEventListener('touchstart', enterFullview);
    
    // Start animations
    startRendering();
    
    // Cleanup
    return () => {
      stopRendering();
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('touchmove', updateMousePosition);
      window.removeEventListener('resize', handleResize);
      exploreButton?.removeEventListener('click', enterFullview);
      exploreButton?.removeEventListener('touchstart', enterFullview);
    };
  }, [loaded, onFinish, isAnimating, isTransitioning]);
  
  return (
    <div className={`loading ${loaded ? "loaded" : ""}`}>
      <main>
        <section className="intro">
          <div ref={gridRef} className="grid">
            {techRows.map((row, rowIndex) => (
              <div className="row" key={rowIndex}>
                {row.map((tech, itemIndex) => (
                  <div className="row__item" key={itemIndex} style={{ opacity: 0 }}>
                    <div className="row__item-inner">
                      <div className="row__item-img" title={tech.label}>
                        {tech.icon}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="home-background" ref={homeBackgroundRef}>
            <div className="home-content" ref={introTextRef}>
              <h1 className="heading-title">Hi, I'm Corey</h1>
              <div className="section-subheading">
                <p>I'm passionate about crafting intuitive and visually engaging digital experiences. Whether it's building dynamic applications or designing user-friendly websites, I focus on creating high-quality solutions that bring ideas to life.</p>
                <p>Let's build something amazing together!</p>
              </div>
              <div className="button-group flex-container">
                <div className="social-icons-container">
                  <div className="social-icons">
                    <a href="https://firebasestorage.googleapis.com/v0/b/my-portfolio-1fc61.appspot.com/o/Corey_Rotstein_Web_Resume.pdf?alt=media&token=ccf640ad-a650-4cf1-83a3-da73ea57cb7b" target="_blank" rel="noopener noreferrer" aria-label="Download Resume">
                      <AiOutlineFileText />
                    </a>
                    <a href="https://www.linkedin.com/in/corey-rotstein/" target="_blank" rel="noopener noreferrer" aria-label="Visit LinkedIn Profile">
                      <FaLinkedinIn />
                    </a>
                    <a href="https://github.com/CoreyRot" target="_blank" rel="noopener noreferrer" aria-label="Visit GitHub Profile">
                      <FaGithub />
                    </a>
                  </div>
                </div>
                <button ref={exploreRef} className="enter"><span>Explore</span></button>
              </div>
            </div>
          </div>
        </section>
        
        <section ref={contentRef} className="content">
          {/* Content section can be added here if needed */}
        </section>
        
        {/* Transition tiles for the animation */}
        <div className="expanded-overlay" style={{ display: 'none' }} ref={transitionWrapperRef}>
          <ul className="transition-tiles">
            {[...Array(TILE_COUNT)].map((_, index) => (
              <li 
                key={index} 
                ref={el => (transitionTilesRef.current[index] = el)}
              />
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default IntroGrid;