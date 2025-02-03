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
              <p> Results-driven Web Developer with 6+ years of experience in front-end and full-stack development, specializing in WordPress, Shopify, and MERN Stack. Passionate about creating high-performance, user-friendly websites that drive engagement and business growth. Proven ability to lead projects, optimize workflows, and bridge the gap between development and marketing to enhance data-driven decision-making. Known for delivering measurable results, including cutting page load times by 25%, eliminating backlogs that saved companies tens of thousands, and helping e-commerce clients increase revenue.
              </p>

            </div>
            
            <h3 className="resume-title">Education</h3>
            <div className="resume-item">
              <h4>Certificate in Full Stack Development</h4>
              <h5>01/2025 - Present</h5>
              <p><em>Toronto Metropolitan University</em></p>
            </div>
            <div className="resume-item">
              <h4>Advanced Diploma in Web Design & Interactive Media</h4>
              <h5>09/2017 - 04/2020</h5>
              <p><em>Humber College</em></p>
            </div>
          </div>
          
          <div className="resume-right">
            <h3 className="resume-title">Work Experience</h3>
            <div className="resume-item">
              <h4>triOS College Business Technology Healthcare Inc.</h4>
              <h5>Freelance Web Developer & UX Consultant • 12/2024 - 02/2025</h5>
              <ul>
                <li>Redesigned & redeveloped a high-trac company website, boosting lead conversions and organic trac by improving UX, performance, and SEO strategies.</li>
                <li>Integrated APIs for lead management, automating form submissions to streamline data collection and optimize user inquiries.</li>
                <li>Improved website performance, reducing load times and ensuring a fully responsive mobile experience to enhance accessibility and engagement</li>
              </ul>
            </div>
            <div className="resume-item">
              <h4>NVISION</h4>
              <h5>Web Developer • Permanent Full-time • 12/2021 - 07/2024</h5>
              <ul>
                <li>Developed & maintained custom coded WordPress websites, utilizing Foundation 6, ACF, HTML, CSS/SASS/SCSS, JavaScript, PHP, and Node.js to build scalable, responsive sites</li>
                <li>Reduced page load times by 25%, leveraging Lighthouse metrics to improve SEO, engagement, and overall site performance.</li>
                <li>Led all landing page development while bridging the gap between the Digital Marketing & Web Development Departments, implementing advanced data tracking and analytics to optimize marketing campaigns.</li>
                <li>Solely eliminated 100% of the backlog for Digital Marketing Dev Tasks, preventing significant financial losses by streamlining workflows and accelerating project turnaround.</li>
              </ul>
            </div>
            <div className="resume-item">
              <h4>Communitech</h4>
              <h5>Graphic Designer • Contractor • 03/2021 - 07/2021</h5>
              <p><em>FutureProof Program</em></p>
              <ul>
                <li>Led end-to-end branding projects, delivering cohesive digital and print assets, including logos, icons, and custom graphics, to strengthen brand identity and achieve client goals.</li>
              </ul>
            </div>
            <div className="resume-item">
              <h4>Digital Main Street</h4>
              <h5>E-Commerce Coordinator & Shopify Developer • Contractor • 09/2020 - 03/2021</h5>
              <p><em>ShopHere Program</em></p>
              <ul>
                <li>Developed & customized Shopify stores for 30+ clients, optimizing site structure, UX, and functionality to drive higher online sales.</li>
                <li>Trained business owners on Facebook Ads, Google Ads, and Shopify management, helping them maximize conversions and scale their stores.</li>
                <li>Provided advanced development support, assisting coordinators with custom Shopify coding, client consultations, and troubleshooting complex issues.</li>
                <li>Made a direct impact, helping a struggling business owner increase revenue by 25%, allowing them to recover financially after COVID-related job loss.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;