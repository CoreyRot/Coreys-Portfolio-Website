import { useEffect, useRef } from "react";
import gsap from "gsap";
import { lerp, getMousePos } from "../components/utils/utils";

/**
 * @param {React.RefObject} gridRef - Ref to the grid container.
 */
export const useRowMouseAnimation = (gridRef) => {
  const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const winSize = useRef({ width: window.innerWidth, height: window.innerHeight });
  const requestRef = useRef();
  const renderedStyles = useRef([]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const rows = grid.querySelectorAll(".row");
    const numRows = rows.length;
    const middleRowIndex = Math.floor(numRows / 2);

    // Setup initial styles per row
    renderedStyles.current = Array.from({ length: numRows }, (_, i) => {
      const dist = Math.abs(i - middleRowIndex);
      return {
        amt: Math.max(0.1 - dist * 0.03, 0.05),
        translateX: { previous: 0, current: 0 },
        brightness: { previous: 100, current: 100 },
        contrast: { previous: 100, current: 100 },
        scale: { previous: 1, current: 1 },
      };
    });

    const updateMousePos = (e) => {
      const pos = getMousePos(e);
      mousePos.current = pos;
    };

    window.addEventListener("mousemove", updateMousePos);
    window.addEventListener("touchmove", (e) => updateMousePos(e.touches[0]));

    const render = () => {
      const mappedX = ((mousePos.current.x / winSize.current.width) * 2 - 1) * 40;
      const contrast = 100 + Math.pow(Math.abs((mousePos.current.x / winSize.current.width) * 2 - 1), 2) * 200;
      const brightness = 100 - Math.pow(Math.abs((mousePos.current.x / winSize.current.width) * 2 - 1), 2) * 85;
      const scale = 1 - Math.abs((mousePos.current.x / winSize.current.width) * 2 - 1) * 0.05;

      rows.forEach((row, i) => {
        const style = renderedStyles.current[i];

        style.translateX.current = mappedX;
        style.contrast.current = contrast;
        style.brightness.current = brightness;
        style.scale.current = scale;

        // Interpolate and apply
        for (let key of ["translateX", "contrast", "brightness", "scale"]) {
          style[key].previous = lerp(style[key].previous, style[key].current, style.amt);
        }

        gsap.set(row, {
          x: style.translateX.previous,
          scale: style.scale.previous,
          filter: `contrast(${style.contrast.previous}%) brightness(${style.brightness.previous}%)`
        });
      });

      requestRef.current = requestAnimationFrame(render);
    };

    requestRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener("mousemove", updateMousePos);
      window.removeEventListener("touchmove", updateMousePos);
    };
  }, [gridRef]);
};
