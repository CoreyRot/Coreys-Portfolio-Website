import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "../styles/About.css";
const roles = [
  "Fullstack Developer",
  "Frontend Developer",
  "UI/UX Developer",
  "Web Designer"
];

const About = () => {
  const textRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const morphText = () => {
      const textElement = textRef.current;
      if (!textElement) return;

      gsap.to(textElement, {
        opacity: 0,
        scale: 0.95,
        duration: 0.5,
        onComplete: () => {
          setCurrentIndex((prev) => (prev + 1) % roles.length);
          gsap.fromTo(textElement, 
            { opacity: 0, scale: 1.05 }, 
            { opacity: 1, scale: 1, duration: 0.5 }
          );
        },
      });
    };

    const interval = setInterval(morphText, 2500); // Morph every 2.5 seconds
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="container">
      <div className="about-background">
        <div className="grid">
          <div className="about-text">
            <h2 className="section-title">Get to know me!</h2>
            <div className="section-subheading">
              <span>I'm a <strong ref={textRef} className="morph-text">{roles[currentIndex]}</strong> &nbsp;based in Toronto, Ontario, Canada.</span>
                
              <p>Passionate about crafting high-performance, intuitive web applications.</p>

              <p>On the frontend, I bring ideas to life using React, Next.js, TypeScript, TailwindCSS, JavaScript, HTML, and CSS3 / SASS / SCSS. On the backend, I build robust and scalable applications with Node.js, Express.js, MongoDB, MySQL, and RESTful APIs.</p>

              <p>With a blend of technical expertise and creativity, I bridge the gap between aesthetics and functionality to deliver engaging user experiences.</p>
            </div>
            <a href="#contact" className="btn">Contact</a>
          </div>

          {/* Right Side - Skills List */}
          <div className="about-skills">
            <h3 className="skills-title">My Skills</h3>
            <div className="skills-grid">
              {[
                "HTML5", "CSS3 / SASS / SCSS", "JavaScript", "TailwindCSS",
                "PHP", "Node.js", "Express.js", "Python",
                "ReactJS", "jQuery", "Next.js",
                "WordPress", "Shopify",
                "MySQL", "MongoDB",
                "RESTful APIs", "GraphQL",
                "Page Load Optimization", "SEO", "GA4 / GTM",
                "Git / GitHub", "Bitbucket"
              ].map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
