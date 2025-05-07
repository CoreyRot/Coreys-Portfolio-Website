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
            <ResumeSummary />

            {/* ✅ Education Section */}
            <SectionTitle title="Education" />
            <EducationItem degree="Certificate in Full Stack Development" date="01/2025 - Present" school="Toronto Metropolitan University" />
            <EducationItem degree="Advanced Diploma in Web Design & Interactive Media" date="09/2017 - 04/2020" school="Humber College" />
          </div>
          
          {/* ✅ Work Experience Section */}
          <div className="resume-right">
            <SectionTitle title="Work Experience" />
            <WorkExperience />
          </div>
        </div>
      </div>
    </div>
  );
};

const SectionTitle = ({ title }) => <h3 className="resume-title">{title}</h3>;

const ResumeSummary = () => (
  <div className="resume-item">
    <p>Frontend & WordPress Developer with 6+ years of agency and freelance experience specializing in custom WordPress solutions and modern JavaScript frameworks. Demonstrated expertise in optimizing site performance (25% faster load times), creating headless CMS architectures, and developing responsive, user-centric interfaces. Proven track record of eliminating development backlogs, streamlining workflows, and increasing conversion rates through strategic UX improvements. Adept at bridging technical and marketing teams to deliver scalable, data-driven web solutions that drive business results.</p>
  </div>
);

const EducationItem = ({ degree, date, school }) => (
  <div className="resume-item">
    <h4>{degree}</h4>
    <h5>{date}</h5>
    <p><em>{school}</em></p>
  </div>
);

const WorkExperience = () => {
  const jobs = [
    {
      company: "Merged Media",
      role: "Full Stack Web Developer • Contract",
      date: "2025",
      details: [
        "Rebuilt the agency’s development workflow by replacing Elementor with a custom headless WordPress setup using ACF, TailwindCSS, PHP, and Webpack.",
        "Developed a full-stack, SaaS-style site builder (Next.js, React, PostgreSQL, Headless WordPress, and Tailwind CSS) with live editing, client dashboards, authentication, and one-click publishing.",
        "Created reusable components and starter templates / themes that cut project build time by over 50% and improved team collaboration.",
      ],
    },
    {
      company: "triOS College Business Technology Healthcare Inc.",
      role: "Web & UI/UX Developer • Freelance",
      date: "2024 - 2025",
      details: [
        "Optimized website performance and UX by reducing load times, improving responsive design, and integrating custom API-based lead capture; boosting mobile conversions by 25% and automating lead workflows.",
      ],
    },
    {
      company: "NVISION",
      role: "Web Developer • Permanent Full-time",
      date: "2021 - 2024",
      details: [
        "Developed and maintained responsive WordPress sites using Foundation 6, ACF, HTML, SCSS, JavaScript, PHP, and Node.js; achieving a 25% reduction in page load times and improved cross-browser performance.",
        "Cleared 100% of a backlog by streamlining handoffs with other departments, improving workflow e ciency and contributing to increased revenue.",
        "Implemented GA4 and GTM to track user behavior and key events, significantly enhancing analytics accuracy and campaign performance reporting.",
      ],
    },
    {
      company: "Digital Main Street",
      role: "E-Commerce Coordinator & Shopify Developer • Contractor",
      date: "2020 - 2021",
      details: [
        "Successfully developed 30+ Shopify stores, optimizing site structure, UX, and functionality to drive significant sales growth. Played a key role in boosting a struggling business’s revenue by 50%, aiding recovery from COVID-related setbacks. Trained business owners on Facebook Ads, Google Ads, and Shopify management to maximize conversions and scale their stores.",
        "Delivered advanced development support, enhancing client satisfaction through custom Shopify coding and effective troubleshooting within 3 months.",
      ],
      sub: "ShopHere Program",
    },
  ];

  return jobs.map((job, index) => (
    <ExperienceItem key={index} {...job} />
  ));
};

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
