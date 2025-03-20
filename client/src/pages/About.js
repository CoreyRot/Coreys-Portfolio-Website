import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import OrbitingCircles from "../components/OrbitingCircles";

import {
  SiMongodb, SiExpress, SiLinux, SiMysql, SiPhp,
  SiNextdotjs, SiTypescript, SiTailwindcss, SiBitbucket,
  SiWordpress, SiPostgresql, SiShopify, SiBootstrap
} from "react-icons/si";

import {
  FaNodeJs, FaReact, FaPython, FaHtml5, FaCss3Alt,
  FaJsSquare, FaGitAlt, FaGithub
} from "react-icons/fa";

import "../styles/About.css";

const roles = [
  "Full Stack Developer", "M.E.R.N Stack Developer", "React Developer",  "Front-End Developer", "WordPress Developer",
];

const outerIcons = [
  { icon: <FaReact />, label: "React" },
  { icon: <SiNextdotjs />, label: "Next.js" },
  { icon: <SiTypescript />, label: "TypeScript" },
  { icon: <FaJsSquare />, label: "JavaScript" },
  { icon: <FaNodeJs />, label: "Node.js" },
  { icon: <SiExpress />, label: "Express.js" },
  { icon: <SiMongodb />, label: "MongoDB" },
  { icon: <SiMysql />, label: "MySQL" },
  { icon: <FaHtml5 />, label: "HTML5" },
  { icon: <FaCss3Alt />, label: "CSS3" },
  { icon: <SiTailwindcss />, label: "TailwindCSS" },
  { icon: <SiPhp />, label: "PHP" },
  { icon: <SiWordpress />, label: "WordPress" }
];


const innerIcons = [
  { icon: <FaGitAlt />, label: "Git" },
  { icon: <FaGithub />, label: "GitHub" },
  { icon: <SiBitbucket />, label: "Bitbucket" },
  { icon: <FaPython />, label: "Python" },
  { icon: <SiPostgresql />, label: "PostgreSQL" },
  { icon: <SiShopify />, label: "Shopify" },
  { icon: <SiBootstrap />, label: "Bootstrap" }
];

const About = () => {
  const textRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);

  // ✅ Optimized resize handler
  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 800);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    const animateText = () => {
      gsap.to(textRef.current, {
        y: -20, opacity: 0, duration: 0.5,
        onComplete: () => {
          setCurrentIndex(prev => (prev + 1) % roles.length);
          gsap.fromTo(textRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 });
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
          
          {/* ✅ Main Text Section */}
          <div className="about-text">
            <h2 className="section-title">Get to Know Me!</h2>
            <div className="section-subheading">
              <p>
                I'm a{" "}
                <strong ref={textRef} className="morph-text">
                  {roles[currentIndex]}
                </strong>
                {" "}based in Toronto, Ontario, Canada.
              </p>
              <p>
                Passionate about crafting high-performance, intuitive web applications, 
                I thrive on blending technical expertise with creativity to build seamless 
                user experiences. My work ensures a perfect balance between aesthetics and functionality, 
                delivering engaging interactions and lightning-fast performance.
              </p>
              <p>
                On the frontend, I bring ideas to life using <strong>React, Next.js, TypeScript, TailwindCSS, JavaScript, HTML,</strong> and <strong>CSS3 / SASS / SCSS.</strong> On the backend, I develop scalable, efficient applications with <strong>Node.js, Express.js, MongoDB, MySQL,</strong> and <strong>RESTful APIs.</strong>
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

          {/* ✅ Tech Stack Section */}
          <div className="about-skills">
            <h3>My Best Friends</h3>

            {isMobile ? (
              <div className="skills-grid">
                {[...outerIcons, ...innerIcons].map((tech, index) => (
                  <div key={index} className="skill-icon" aria-label={tech.label}>
                    {tech.icon}
                  </div>
                ))}
              </div>
            ) : (
              <div className="about-skills-orbiting-circles">
                <OrbitingCircles radius={200} iconSize={40}>
                  {outerIcons.map((tech, index) => (
                    <div key={index} aria-label={tech.label}>
                      {tech.icon}
                    </div>
                  ))}
                </OrbitingCircles>
                <OrbitingCircles radius={100} iconSize={30} reverse speed={2}>
                  {innerIcons.map((tech, index) => (
                    <div key={index} aria-label={tech.label}>
                      {tech.icon}
                    </div>
                  ))}
                </OrbitingCircles>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
