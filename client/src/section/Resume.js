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
      role: "Wordpress Developer • Contract",
      date: "2025",
      details: [
        "Architected, developed, and implemented a custom WordPress solution replacing Elementor builds, utilizing ACF, PHP, Tailwind CSS, and Webpack, revolutionizing the agency's development workflow.",
        "Engineered a full-stack SaaS website builder with Next.js, React, Prisma, Supabase, and Headless WordPress, featuring live editing capabilities, client dashboards, and one-click publishing.",
        "Developed reusable component libraries and starter templates that reduced project build times by over 50% and enhanced cross-team collaboration.",
      ],
    },
    {
      company: "triOS College Business Technology Healthcare Inc.",
      role: "Web & UI/UX Developer • Freelance",
      date: "2024 - 2025",
      details: [
        "Optimized website performance and implemented responsive design, reducing load times and improving mobile UX, resulting in a 25% increase in lead conversions within 2 months.",
        "Developed and integrated custom API solutions that automated lead management workflows, significantly improving data collection efficiency and customer response times.",
      ],
    },
    {
      company: "NVISION",
      role: "Web Developer • Permanent Full-time",
      date: "2021 - 2024",
      details: [
        "Spearheaded landing page development that bridged marketing and development teams, implementing advanced tracking and analytics (GA4, GTM) that maximized campaign ROI.",
        "Optimized site performance achieving a 25% reduction in page load times through Core Web Vitals and Lighthouse metrics optimization/",
        "Eliminated 100% of backlogged digital marketing development tasks, preventing revenue loss and accelerating project delivery timelines.",
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