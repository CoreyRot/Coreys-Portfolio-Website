import React from "react";
import "../styles/Resume.css"; // Ensure this file contains grid-based styling

const Resume = () => {
  return (
    <div className="container">
      <div className="resume-background">
        <h2 className="section-title">Resume</h2>
        <div className="resume-grid">
          
          {/* Left Column - Summary & Education */}
          <div className="resume-left">
            <h2 className="resume-title">Summary</h2>
            <div className="resume-item">
              <p>
                Versatile Web Developer with 6 years of front-end & full-stack experience across freelance and industry roles. Proficient in HTML, CSS3, SASS/SCSS, JavaScript, PHP, and modern styling frameworks like TailwindCSS, along with CSS Flexbox and Grid. Skilled in building responsive, high-performance websites and applications using React.js, Next.js, Node.js, WordPress, and Shopify. Experienced in collaborating with cross-functional teams to deliver impactful digital experiences and scalable web solutions.
              </p>

            </div>
            
            <h3 className="resume-title">Education</h3>
            <div className="resume-item">
              <h4>Certificate in Full Stack Development</h4>
              <h5>01/2025 - Present</h5>
              <p><em>Toronto Metropolitan University, Toronto, ON</em></p>
            </div>
            <div className="resume-item">
              <h4>Advanced Diploma in Web Design & Interactive Media</h4>
              <h5>09/2017 - 04/2020</h5>
              <p><em>Humber College, Toronto, ON</em></p>
            </div>
          </div>
          
          {/* Right Column - Professional Experience */}
          <div className="resume-right">
            <h3 className="resume-title">Professional Experience</h3>
            <div className="resume-item">
              <h4>Web Developer</h4>
              <h5>Freelance · 01/2025 - 01/2025</h5>
              <p><em>triOS College Business Technology Healthcare · Freelance</em></p>
              <ul>
                <li>Developed and implemented responsive websites and pages using HTML5, CSS3, Bootstrap, JavaScript, and other frameworks,while maintaining API integrations and handling custom development for external services, particularly CRMs.</li>
              </ul>
            </div>
            <div className="resume-item">
              <h4>Web Developer</h4>
              <h5>Permanent · 12/2021 - 12/2024</h5>
              <p><em>NVISION</em></p>
              <ul>
                <li>Developed and maintained WordPress websites using Foundation 6 and ACF.</li>
                <li>Collaborated with digital marketing teams to optimize site performance.</li>
                <li>Integrated HTML, SASS, JavaScript, PHP, and Node.js for full-stack development.</li>
                <li>Implemented Google Analytics 4 and GTM for performance tracking.</li>
              </ul>
            </div>
            <div className="resume-item">
              <h4>Graphic Designer</h4>
              <h5>Contract · 03/2021 - 07/2021</h5>
              <p><em>Communitech - FutureProof Program</em></p>
              <ul>
                <li>Designed branding assets, icons, and custom graphics for various clients.</li>
                <li>Worked on UX/UI elements to improve digital marketing campaigns.</li>
              </ul>
            </div>
            <div className="resume-item">
              <h4>E-Commerce Coordinator & CMS Developer</h4>
              <h5>Contract · 09/2020 - 03/2021</h5>
              <p><em>Digital Main Street - ShopHere Program</em></p>
              <ul>
                <li>Developed Shopify e-commerce sites, enhancing functionality and UX.</li>
                <li>Provided debugging and troubleshooting support for Shopify store owners.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;