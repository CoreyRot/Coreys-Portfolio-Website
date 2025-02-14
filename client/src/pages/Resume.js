import React from "react";
import "../styles/Resume.css";

const Resume = () => {
  return (
    <div className="container">
      <div className="resume-background">
        <h2 className="section-title">Resume</h2>
        <div className="resume-grid">
          
          {/* ✅ Summary Section */}
          <div className="resume-left">
            <SectionTitle title="Summary" />
            <div className="resume-item">
              <p>
                Results-driven Web Developer with 6+ years of experience in front-end and full-stack development, specializing in WordPress, Shopify, and the MERN Stack.
                Passionate about creating high-performance, user-friendly websites that drive engagement and business growth.
                Proven ability to lead projects, optimize workflows, and bridge the gap between development and marketing to enhance data-driven decision-making.
                Notable achievements include cutting page load times by 25%, eliminating development backlogs that saved companies thousands, and helping e-commerce clients increase revenue.
              </p>
            </div>

            {/* ✅ Education Section */}
            <SectionTitle title="Education" />
            <EducationItem
              degree="Certificate in Full Stack Development"
              date="01/2025 - Present"
              school="Toronto Metropolitan University"
            />
            <EducationItem
              degree="Advanced Diploma in Web Design & Interactive Media"
              date="09/2017 - 04/2020"
              school="Humber College"
            />
          </div>
          
          {/* ✅ Work Experience Section */}
          <div className="resume-right">
            <SectionTitle title="Work Experience" />
            <ExperienceItem
              company="triOS College Business Technology Healthcare Inc."
              role="Freelance Web Developer & UX Consultant"
              date="12/2024 - 02/2025"
              details={[
                "Redesigned & redeveloped a high-traffic company website, boosting lead conversions and organic traffic by improving UX, performance, and SEO strategies.",
                "Integrated APIs for lead management, automating form submissions to streamline data collection and optimize user inquiries.",
                "Improved website performance, reducing load times and ensuring a fully responsive mobile experience to enhance accessibility and engagement.",
              ]}
            />
            <ExperienceItem
              company="NVISION"
              role="Web Developer • Permanent Full-time"
              date="12/2021 - 07/2024"
              details={[
                "Developed & maintained custom-coded WordPress websites, utilizing Foundation 6, ACF, HTML, CSS/SASS/SCSS, JavaScript, PHP, and Node.js to build scalable, responsive sites.",
                "Reduced page load times by 25%, leveraging Lighthouse metrics to improve SEO, engagement, and overall site performance.",
                "Led all landing page development while bridging the gap between Digital Marketing & Web Development, implementing advanced data tracking to optimize marketing campaigns.",
                "Eliminated 100% of the backlog for Digital Marketing Dev Tasks, preventing significant financial losses by streamlining workflows and accelerating project turnaround.",
              ]}
            />
            <ExperienceItem
              company="Communitech"
              role="Graphic Designer • Contractor"
              date="03/2021 - 07/2021"
              details={[
                "Led end-to-end branding projects, delivering cohesive digital and print assets, including logos, icons, and custom graphics, to strengthen brand identity and achieve client goals.",
              ]}
              sub="FutureProof Program"
            />
            <ExperienceItem
              company="Digital Main Street"
              role="E-Commerce Coordinator & Shopify Developer • Contractor"
              date="09/2020 - 03/2021"
              details={[
                "Developed & customized Shopify stores for 30+ clients, optimizing site structure, UX, and functionality to drive higher online sales.",
                "Trained business owners on Facebook Ads, Google Ads, and Shopify management, helping them maximize conversions and scale their stores.",
                "Provided advanced development support, assisting coordinators with custom Shopify coding, client consultations, and troubleshooting complex issues.",
                "Made a direct impact, helping a struggling business owner increase revenue by 25%, allowing them to recover financially after COVID-related job loss.",
              ]}
              sub="ShopHere Program"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ✅ Reusable Components */
const SectionTitle = ({ title }) => <h3 className="resume-title">{title}</h3>;

const EducationItem = ({ degree, date, school }) => (
  <div className="resume-item">
    <h4>{degree}</h4>
    <h5>{date}</h5>
    <p><em>{school}</em></p>
  </div>
);

const ExperienceItem = ({ company, role, date, details, sub }) => (
  <div className="resume-item">
    <h4>{company}</h4>
    <h5>{role} • {date}</h5>
    {sub && <p><em>{sub}</em></p>}
    <ul>
      {details.map((detail, index) => <li key={index}>{detail}</li>)}
    </ul>
  </div>
);

export default Resume;