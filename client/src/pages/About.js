import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "../styles/About.css";

const roles = [
  "Web Developer",
  "Front-End Developer",
  "Full-Stack Developer",
  "WordPress Developer",
];

const skills = [
  "HTML5", "CSS3 / SASS / SCSS", "JavaScript", "TypeScript", "TailwindCSS",
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

  useEffect(() => {
    const textElement = textRef.current;

    const animateText = () => {
      gsap.to(textElement, {
        y: -20,
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % roles.length);
          gsap.fromTo(
            textElement,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 }
          );
        },
      });
    };

    const interval = setInterval(animateText, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <div className="about-background">
        <div className="about-grid">
          <div className="about-text">
            <h2 className="section-title">Get to Know Me!</h2>
            <div className="section-subheading">
              <p>
                I'm a{" "}
                <strong ref={textRef} className="morph-text">
                  {roles[currentIndex]}
                </strong>
                {" "}
                based in Toronto, Ontario, Canada.
              </p>

              <p>
                Passionate about crafting high-performance, intuitive web applications, 
                I thrive on blending technical expertise with creativity to build seamless 
                user experiences. My work ensures a perfect balance between aesthetics and functionality, 
                delivering engaging interactions and lightning-fast performance.
              </p>

              <p>
                On the frontend, I bring ideas to life using React, Next.js, TypeScript, TailwindCSS, JavaScript, HTML, and CSS3 / SASS / SCSS.  
                On the backend, I develop scalable, efficient applications with Node.js, Express.js, MongoDB, MySQL, and RESTful APIs.
              </p>

              <p>
                When I'm not coding, you'll find me hiking, camping, and indulging in my passion for cooking.  
                Whether I'm out in the wilderness or in the kitchen, there's always music playing—ranging from the 
                smooth grooves of jazz to the heartfelt strums of country and the high-energy beats of rock.
              </p>
            </div>
            <div className="button-group flex-container">
              <a href="#blogs" className="btn"><span>Check Out My Posts</span></a>
            </div>
          </div>

          {/* ✅ Skills Section */}
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
