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
    <p>Front-End WordPress & Full-Stack developer with 3+ years of experience specializing in WordPress and the M.E.R.N. stack. Passionate about building high-performance, user-friendly websites. Proven success in optimizing workflows, bridging development and marketing, and driving business growth through data-driven solutions. Expert in migrating traditional WordPress sites to headless architecture, implementing performance optimizations that reduced load times by 25%, and developing API-driven backends for seamless content management. Demonstrated ability to eliminate development backlogs, enhance e-commerce revenue through strategic UX improvements, and deliver measurable business results across multiple industries.</p>
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
      role: "Wordpress Developer • Permanent Full-time",
      date: "03/2025 - Present",
      details: [
        "Transformed the company's development workflow by migrating from Elementor-based WordPress sites to a full-stack Headless WordPress solution, leveraging ACF and TailwindCSS for a modern, scalable, and high-performance front-end.",
        "Developed and optimized a custom API-driven backend, ensuring seamless data retrieval and dynamic content management.",
        "Independently manage the entire development lifecycle, from planning and architecture to deployment and optimization. Worked directly with designers and stakeholders to ensure seamless project execution, aligning technical solutions with business needs",
      ],
    },
    {
      company: "triOS College Business Technology Healthcare Inc.",
      role: "Web & UI/UX Developer • Freelance",
      date: "12/2024 - 02/2025",
      details: [
        "Improved website performance by reducing load times and ensuring a fully responsive mobile experience, enhancing accessibility and engagement. Boosted lead conversions by 25% within 2 months by optimizing UI/UX and implementing targeted SEO strategies for a high-traffic company website.",
        "Automated lead management by integrating APIs, enhancing data collection efficiency and improving user inquiry response times within 2 months.",
      ],
    },
    {
      company: "NVISION",
      role: "Web Developer • Permanent Full-time",
      date: "12/2021 - 07/2024",
      details: [
        "Spearheaded landing page development, seamlessly bridging the gap between Digital Marketing and Web Development by implementing advanced tracking, data analytics (GA4, GTM), and conversion optimization strategies to enhance campaign performance and maximize ROI.",
        "Optimized website performance, achieving a 25% reduction in page load times using Lighthouse metrics, resulting in higher engagement and improved Core Web Vitals.",
        "Eliminated a 100% backlog of Digital Marketing Dev Tasks, significantly accelerating project turnaround, improving workflow automation, and preventing a significant loss in potential revenue.",
      ],
    },
    {
      company: "Communitech",
      role: "Graphic Designer • Contractor",
      date: "03/2021 - 07/2021",
      details: [
        "Led end-to-end branding projects, delivering cohesive digital and print assets, including logos, icons, and custom graphics, to strengthen brand identity and achieve client goals.",
      ],
      sub: "FutureProof Program",
    },
    {
      company: "Digital Main Street",
      role: "E-Commerce Coordinator & Shopify Developer • Contractor",
      date: "09/2020 - 03/2021",
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