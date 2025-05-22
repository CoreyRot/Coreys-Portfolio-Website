import React, { useState } from "react";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";
import { IoLogoReact, IoColorPalette } from "react-icons/io5";
import { AiOutlineCode, AiOutlineTool } from "react-icons/ai";
import "../../../styles/components/tiles/inner-tiles/About.css";

// Work experience data
const workExperience = [
  {
    company: "Merged Media",
    role: "Full Stack Web Developer",
    type: "Contract",
    date: "2025",
    details: [
      "Rebuilt the agency's development workflow by replacing Elementor with a custom headless WordPress setup using ACF, TailwindCSS, PHP, and Webpack.",
      "Developed a full-stack, SaaS-style site builder (Next.js, React, PostgreSQL, Headless WordPress, and Tailwind CSS) with live editing, client dashboards, authentication, and one-click publishing.",
      "Created reusable components and starter templates / themes that cut project build time by over 50% and improved team collaboration."
    ],
    skills: {
      frameworks: [
        { name: "Next.js", logo: "N", color: "nextjs" },
        { name: "React", logo: "R", color: "react" },
        { name: "Tailwind CSS", logo: "T", color: "tailwind" },
        { name: "ShadCN UI", logo: "S", color: "nextjs" }
      ],
      languages: [
        { name: "JavaScript" },
        { name: "TypeScript" },
        { name: "PHP" }
      ],
      tools: [
        { name: "WordPress" },
        { name: "Advanced Custom Fields (ACF)" },
        { name: "Webpack" },
        { name: "Git" },
        { name: "PostgreSQL" }
      ]
    }
  },
  {
    company: "triOS College Business Technology Healthcare Inc.",
    role: "Web & UI/UX Developer",
    type: "Freelance",
    date: "2024 - 2025",
    details: [
      "Optimized website performance and UX by reducing load times, improving responsive design, and integrating custom API-based lead capture; boosting mobile conversions by 25% and automating lead workflows."
    ],
    skills: {
      frameworks: [],
      languages: [
        { name: "HTML" },
        { name: "SCSS / CSS / SASS" },
        { name: "JavaScript" },
      ],
      tools: [
        { name: "WordPress" },
        { name: "Elementor" },
        { name: "REST API" }
      ]
    }
  },
  {
    company: "NVISION",
    role: "Web Developer",
    type: "Permanent Full-time",
    date: "2021 - 2024",
    details: [
      "Developed and maintained responsive WordPress sites using Foundation 6, ACF, HTML, SCSS, JavaScript, PHP, and Node.js; achieving a 25% reduction in page load times and improved cross-browser performance.",
      "Cleared 100% of a backlog by streamlining handoffs with other departments, improving workflow efficiency and contributing to increased revenue.",
      "Implemented GA4 and GTM to track user behavior and key events, significantly enhancing analytics accuracy and campaign performance reporting."
    ],
    skills: {
      frameworks: [
        { name: "Foundation 6", logo: "F", color: "foundation" }
      ],
      languages: [
        { name: "HTML" },
        { name: "SCSS / CSS / SASS" },
        { name: "JavaScript" },
        { name: "PHP" }
      ],
      tools: [
        { name: "WordPress" },
        { name: "Advanced Custom Fields (ACF)" },
        { name: "Node.js" },
        { name: "Google Analytics (GA4)" },
        { name: "Google Tag Manager (GTM)" }
      ]
    }
  },
  {
    company: "Digital Main Street",
    role: "E-Commerce Coordinator & Shopify Developer",
    type: "Contractor",
    date: "2020 - 2021",
    subProgram: "ShopHere Program",
    details: [
      "Successfully developed 30+ Shopify stores, optimizing site structure, UX, and functionality to drive significant sales growth. Played a key role in boosting a struggling business's revenue by 50%, aiding recovery from COVID-related setbacks. Trained business owners on Facebook Ads, Google Ads, and Shopify management to maximize conversions and scale their stores.",
      "Delivered advanced development support, enhancing client satisfaction through custom Shopify coding and effective troubleshooting within 3 months."
    ],
    skills: {
      frameworks: [
        { name: "Liquid", logo: "L", color: "liquid" }
      ],
      languages: [],
      tools: [
        { name: "Shopify" },
        { name: "Facebook Ads" },
        { name: "Google Ads" }
      ]
    }
  }
];


// Education data
const educationData = [
  {
    degree: "Advanced Diploma in Web Design & Interactive Media",
    school: "Humber College",
    date: "09/2017 - 04/2020"
  }
];

const AboutExpanded = () => {
  const [activeTab, setActiveTab] = useState("experience");
  

  return (
    <div className="about-container container">
      <div className="about-grid">
        <div className="about-right">
          <div className="tabs-container">
        <button 
          className={`tab-button ${activeTab === "experience" ? "active" : ""}`}
          onClick={() => setActiveTab("experience")}
        >
          <FaBriefcase className="tab-icon" /> Experience
        </button>
        <button 
          className={`tab-button ${activeTab === "education" ? "active" : ""}`}
          onClick={() => setActiveTab("education")}
        >
          <FaGraduationCap className="tab-icon" /> Education
        </button>
      </div>
          {activeTab === "experience" && (
            <>
              <div className="section-header">
                <h2 className="section-title">Professional Experience</h2>
              </div>

              <div className="experience-content">
                <div className="experience-overview">
                  <p className="experience-summary">
                    With over 6 years of agency and freelance experience in web development, I have worked
                    on diverse projects, specializing in WordPress solutions, modern JavaScript frameworks,
                    performance optimization, and user-centric interfaces.
                  </p>

                  <div className="work-timeline">
                    {workExperience.map((job, index) => (
                      <div className="timeline-item" key={index}>
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <div className="job-header">
                              <h3>{job.company}</h3>
                              <div className="job-role">{job.role} • {job.type}</div>
                              <div className="job-duration">{job.date}</div>
                            </div>
                            {job.subProgram && (
                              <div className="job-subprogram">{job.subProgram}</div>
                            )}
                            <div className="flex-container">

                                <ul className="job-responsibilities">
                                  {job.details.map((detail, detailIndex) => (
                                    <li key={detailIndex}>{detail}</li>
                                  ))}
                                </ul>
                          
                                {job.skills && (
                                  <div className="job-skills">
                                    {job.skills.frameworks && job.skills.frameworks.length > 0 && (
                                      <div className="job-skill-section">
                                        <div className="job-skill-header">
                                          <div className="skill-icon ui-icon"><IoLogoReact /></div>
                                          <h4>Frameworks & Libraries</h4>
                                        </div>
                                        <div className="job-skill-cards">
                                          {job.skills.frameworks.map((skill, skillIndex) => (
                                            <div className="job-skill-card" key={skillIndex}>
                                              <div className="skill-name">{skill.name}</div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                    
                                    {job.skills.languages && job.skills.languages.length > 0 && (
                                      <div className="job-skill-section">
                                        <div className="job-skill-header">
                                          <div className="skill-icon language-icon"><AiOutlineCode /></div>
                                          <h4>Languages</h4>
                                        </div>
                                        <div className="job-skill-tags">
                                          {job.skills.languages.map((skill, skillIndex) => (
                                            <div className="skill-tag" key={skillIndex}>
                                              {skill.name}
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                    
                                    {job.skills.tools && job.skills.tools.length > 0 && (
                                      <div className="job-skill-section">
                                        <div className="job-skill-header">
                                          <div className="skill-icon tools-icon"><AiOutlineTool /></div>
                                          <h4>Tools</h4>
                                        </div>
                                        <div className="job-skill-tags">
                                          {job.skills.tools.map((skill, skillIndex) => (
                                            <div className="skill-tag" key={skillIndex}>
                                              {skill.name}
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                    
                                    {job.skills.design && job.skills.design.length > 0 && (
                                      <div className="job-skill-section">
                                        <div className="job-skill-header">
                                          <div className="skill-icon design-icon"><IoColorPalette /></div>
                                          <h4>Design</h4>
                                        </div>
                                        <div className="job-skill-tags">
                                          {job.skills.design.map((skill, skillIndex) => (
                                            <div className="skill-tag" key={skillIndex}>
                                              {skill.name}
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "education" && (
            <>
              <div className="education-container">
                <div className="education-section">
                  <h2 className="section-title">Formal Education</h2>
                  <div className="education-timeline">
                    {educationData.map((edu, index) => (
                      <div className="education-item" key={index}>
                        <div className="education-icon"><FaGraduationCap /></div>
                        <div className="education-content">
                          <h3 className="degree">{edu.degree}</h3>
                          <div className="school">{edu.school}</div>
                          <div className="duration">{edu.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="certifications-section">
                  <h2 className="section-title">Professional Certifications</h2>
                  <div className="certification-cards">
                    <div className="certification-card blue">
                      <div className="certification-icon"><IoLogoReact /></div>
                      <div className="certification-content">
                        <h3>Full Stack Developer Certificate</h3>
                        <div className="issuer">Toronto Metropolitan University</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutExpanded;