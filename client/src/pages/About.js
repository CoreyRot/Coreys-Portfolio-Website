import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import "../styles/About.css";

const roles = [
  "Fullstack Developer",
  "Frontend Developer",
  "UI/UX Developer",
  "Web Designer"
];

const skills = [
  "HTML5", "CSS3 / SASS / SCSS", "JavaScript", "TailwindCSS",
  "PHP", "Node.js", "Express.js", "Python", "Flask",
  "ReactJS", "jQuery", "Next.js",
  "WordPress", "Shopify",
  "MySQL", "PostgreSQL", "MongoDB",
  "RESTful APIs", "GraphQL",
  "Page Load Optimization", "SEO", "GA4 / GTM",
  "Git / GitHub", "Bitbucket"
];

const About = () => {
  const textRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timelineRef = useRef(null);

  const morphText = useCallback(() => {
    const textElement = textRef.current;
    if (!textElement) return;

    if (timelineRef.current) timelineRef.current.kill(); // Kill existing timeline to avoid stacking animations

    timelineRef.current = gsap.timeline()
      .to(textElement, { opacity: 0, scale: 0.95, duration: 0.5, onComplete: () => {
        setCurrentIndex((prev) => (prev + 1) % roles.length);
      }})
      .fromTo(textElement, { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 0.5 });
  }, []);

  useEffect(() => {
    const interval = setInterval(morphText, 2500);
    return () => clearInterval(interval);
  }, [morphText]);

  return (
    <div className="container">
      <div className="about-background">
        <div className="grid">
          <div className="about-text">
            <h2 className="section-title">Get to know me!</h2>
            <div className="section-subheading">
              <span>
                I'm a <strong ref={textRef} className="morph-text">{roles[currentIndex]}</strong>&nbsp;based in Toronto, Ontario, Canada.
              </span>
              <p>Passionate about crafting high-performance, intuitive web applications.</p>
              <p>
                On the frontend, I bring ideas to life using <strong>React</strong>, <strong>Next.js</strong>, 
                <strong>TypeScript</strong>, <strong>TailwindCSS</strong>, <strong>JavaScript</strong>, 
                <strong>HTML</strong>, and <strong>CSS3 / SASS / SCSS</strong>. 
                On the backend, I build robust and scalable applications with <strong>Node.js</strong>, 
                <strong>Express.js</strong>, <strong>MongoDB</strong>, <strong>MySQL</strong>, and <strong>RESTful APIs</strong>.
              </p>
              <p>
                With a blend of technical expertise and creativity, I bridge the gap between aesthetics and 
                functionality to deliver engaging user experiences.
              </p>
            </div>
            <div className="button-group flex-container">
              <a href="#blogs" className="btn"><span>Check Out My Posts</span></a>
            </div>
          </div>
          <div className="about-skills">
            <h3 className="skills-title">My Skills</h3>
            <div className="skills-grid">
              {skills.map((skill, index) => (
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
