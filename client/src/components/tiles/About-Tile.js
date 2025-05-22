import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";

const roles = [
  "Front-End Developer", 
  "Full-Stack Developer", 
  "MERN Stack Developer", 
  "WordPress Developer", 
  "UI/UX Developer/Designer"
];

// Characters used during the scramble effect
const chars = "!<>-_\\/[]{}—=+*^?#________";

const About = () => {
  const textRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState(roles[0]);
  
  useEffect(() => {
    // Create text scramble timeline
    const scrambleText = () => {
      let currentRole = roles[currentIndex];
      let nextIndex = (currentIndex + 1) % roles.length;
      let nextRole = roles[nextIndex];
      
      let timeline = gsap.timeline();
      
      timeline.to(textRef.current, {
        duration: 0.5,
        onUpdate: function() {
          const progress = this.progress();
          let result = "";
          
          // First half - scramble current text
          if (progress < 0.5) {
            const chars_progress = gsap.utils.mapRange(0, 0.5, 0, 1)(progress);
            const original_length = currentRole.length;
            const scramble_length = Math.floor(original_length * chars_progress);
            const original_text_length = original_length - scramble_length;
            
            for (let i = 0; i < original_text_length; i++) {
              result += currentRole[i];
            }
            
            for (let i = 0; i < scramble_length; i++) {
              result += chars[Math.floor(Math.random() * chars.length)];
            }
          } 
          // Second half - reveal new text
          else {
            const chars_progress = gsap.utils.mapRange(0.5, 1, 0, 1)(progress);
            const original_length = nextRole.length;
            const reveal_length = Math.floor(original_length * chars_progress);
            const scramble_length = original_length - reveal_length;
            
            for (let i = 0; i < reveal_length; i++) {
              result += nextRole[i];
            }
            
            for (let i = 0; i < scramble_length; i++) {
              result += chars[Math.floor(Math.random() * chars.length)];
            }
          }
          
          setDisplayText(result);
        },
        onComplete: () => {
          setCurrentIndex(nextIndex);
          setDisplayText(nextRole);
        }
      });
    };

    const interval = setInterval(scrambleText, 3000);
    
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="about-condensed">
      <h2 className="section-title">Get to Know Me!</h2>
      <div className="section-subheading">
        <p>
          I'm a{" "}
          <strong ref={textRef} className="morph-text">
            {displayText}
          </strong>{" "}
          based in Toronto, Ontario, Canada.
        </p>
        <p>
          I craft fast, accessible, and visually engaging web experiences that balance design and performance.
          My passion lies in building intuitive UIs that connect users to content seamlessly.
        </p>
        <p>
          Outside of coding, you'll find me on a trail, cooking something new, or vibing to jazz, rock, or country.
        </p>
      </div>
    </div>

  );
};

export default About;