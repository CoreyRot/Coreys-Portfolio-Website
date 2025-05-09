import { useEffect, useRef } from "react";
import gsap from "gsap";
import Flip from "gsap/Flip";
import { getMousePos, lerp } from "../components/utils/utils";

gsap.registerPlugin(Flip);

export const GridMotion = (gridRef, enterButtonRef, fullviewRef, contentRef, bodyRef, frameRef, config = {
  translateX: true,
  skewX: false,
  contrast: true,
  scale: false,
  brightness: true
}) => {
  const mousepos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const winSize = useRef({ width: window.innerWidth, height: window.innerHeight });
  const renderedStyles = useRef([]);
  const isInitialized = useRef(false);

  // Calculate mapped values based on mouse position
  const calculateMappedX = () => {
    return ((mousepos.current.x / winSize.current.width) * 2 - 1) * 40 * winSize.current.width / 100;
  };

  const calculateMappedSkew = () => {
    return ((mousepos.current.x / winSize.current.width) * 2 - 1) * 3;
  };

  const calculateMappedContrast = () => {
    const centerContrast = 100;
    const edgeContrast = 330;
    const t = Math.abs((mousepos.current.x / winSize.current.width) * 2 - 1);
    const factor = Math.pow(t, 2); // Quadratic factor for non-linear mapping
    return centerContrast - factor * (centerContrast - edgeContrast);
  };

  const calculateMappedScale = () => {
    const centerScale = 1;
    const edgeScale = 0.95;
    return centerScale - Math.abs((mousepos.current.x / winSize.current.width) * 2 - 1) * (centerScale - edgeScale);
  };

  const calculateMappedBrightness = () => {
    const centerBrightness = 100;
    const edgeBrightness = 15;
    const t = Math.abs((mousepos.current.x / winSize.current.width) * 2 - 1);
    const factor = Math.pow(t, 2); // Quadratic factor for non-linear mapping
    return centerBrightness - factor * (centerBrightness - edgeBrightness);
  };

  // Get CSS variable value
  const getCSSVariableValue = (element, variableName) => {
    return getComputedStyle(element).getPropertyValue(variableName).trim();
  };

  useEffect(() => {
    const grid = gridRef.current;
    const enterButton = enterButtonRef.current;
    const fullview = fullviewRef.current;
    const content = contentRef.current;
    const body = bodyRef.current;
    const frame = frameRef.current;

    if (!grid || !enterButton || !fullview || !content || !body || !frame || isInitialized.current) return;
    
    isInitialized.current = true;
    
    // Handle window resize
    const handleResize = () => {
      winSize.current = { width: window.innerWidth, height: window.innerHeight };
    };
    window.addEventListener('resize', handleResize);

    const rows = grid.querySelectorAll(".row");
    const numRows = rows.length;
    const middleRowIndex = Math.floor(numRows / 2);
    const middleRow = rows[middleRowIndex];
    const middleRowItems = middleRow.querySelectorAll('.row__item');
    const numRowItems = middleRowItems.length;
    const middleRowItemIndex = Math.floor(numRowItems / 2);
    const middleRowItemInner = middleRowItems[middleRowItemIndex].querySelector('.row__item-inner');
    const middleRowItemInnerImage = middleRowItemInner.querySelector('.row__item-img');
    
    // Add the large class to the middle image
    middleRowItemInnerImage.classList.add('row__item-img--large');

    // Setup the render styles with proper interpolation amounts
    const baseAmt = 0.1;
    const minAmt = 0.05;
    const maxAmt = 0.1;

    renderedStyles.current = Array.from({ length: numRows }, (_, index) => {
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

    // Mouse position update functions
    const updateMousePos = (ev) => {
      const pos = getMousePos(ev);
      mousepos.current = pos;
    };

    window.addEventListener("mousemove", updateMousePos);
    window.addEventListener("touchmove", (ev) => {
      const touch = ev.touches[0];
      updateMousePos(touch);
    });

    // Define startRendering and render function inside the useEffect
    let requestId;
    
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

    // Render function with advanced mapping
    function render() {
      const mappedValues = {
        translateX: calculateMappedX(),
        skewX: calculateMappedSkew(),
        contrast: calculateMappedContrast(),
        scale: calculateMappedScale(),
        brightness: calculateMappedBrightness()
      };

      rows.forEach((row, i) => {
        const style = renderedStyles.current[i];
        
        for (let prop in config) {
          if (config[prop]) {
            style[prop].current = mappedValues[prop];
            const amt = prop === "scale" ? style.scaleAmt : style.amt;
            style[prop].previous = lerp(style[prop].previous, style[prop].current, amt);
          }
        }

        let gsapSettings = {};
        if (config.translateX) gsapSettings.x = style.translateX.previous;
        if (config.skewX) gsapSettings.skewX = style.skewX.previous;
        if (config.scale) gsapSettings.scale = style.scale.previous;
        if (config.contrast) gsapSettings.filter = `contrast(${style.contrast.previous}%)`;
        if (config.brightness)
          gsapSettings.filter = `${gsapSettings.filter || ""} brightness(${style.brightness.previous}%)`;

        gsap.set(row, gsapSettings);
      });

      requestId = requestAnimationFrame(render);
    }

    // Enter fullview function
    const enterFullview = () => {
      // Create Flip state for animation
      const flipstate = Flip.getState(middleRowItemInner);
      fullview.appendChild(middleRowItemInner);
      
      // Get the CSS variable value for the translation
      const transContent = getCSSVariableValue(content, '--trans-content');

      // Create a GSAP timeline for the transition
      const tl = gsap.timeline();

      tl.add(Flip.from(flipstate, {
        duration: 0.9,
        ease: 'power4',
        absolute: true,
        onComplete: stopRendering
      }))
      // Fade out grid
      .to(grid, {
        duration: 0.9,
        ease: 'power4',
        opacity: 0.01
      }, 0)
      // Scale up the inner image
      .to(middleRowItemInnerImage, {
        scale: 1.2,
        duration: 3,
        ease: 'sine'
      }, '<-=0.45')
      // Move the content up
      .to(content, {
        y: transContent,
        duration: 0.9,
        ease: 'power4'
      })
      // Show the frame
      .add(() => frame.classList.remove('hidden'), '<')
      // Scale and move
      .to(middleRowItemInnerImage, {
        scale: 1.1,
        startAt: {filter: 'brightness(100%)'},
        filter: 'brightness(50%)',
        y: '-5vh',
        duration: 0.9,
        ease: 'power4'
      }, '<');
      
      // Hide the button and allow scrolling
      enterButton.classList.add('hidden');
      body.classList.remove('noscroll');
    };

    // Add event listeners for the "Explore" button
    enterButton.addEventListener('click', enterFullview);
    enterButton.addEventListener('touchstart', enterFullview);

    // Start rendering
    startRendering();

    // Cleanup function
    return () => {
      stopRendering();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', updateMousePos);
      window.removeEventListener('touchmove', updateMousePos);
      enterButton.removeEventListener('click', enterFullview);
      enterButton.removeEventListener('touchstart', enterFullview);
      isInitialized.current = false;
    };
  }, [gridRef, enterButtonRef, fullviewRef, contentRef, bodyRef, frameRef, config]);
};