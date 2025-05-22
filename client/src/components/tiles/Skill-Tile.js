import OrbitingCircles from "../OrbitingCircles";

import {
  SiMongodb, SiExpress, SiMysql, SiPhp,
  SiNextdotjs, SiTypescript, SiTailwindcss, SiBitbucket,
  SiWordpress, SiPostgresql, SiShopify, SiBootstrap, SiFigma, SiFirebase, SiVercel
} from "react-icons/si";

import {
  FaNodeJs, FaReact, FaPython, FaHtml5, FaCss3Alt,
  FaJsSquare, FaGitAlt, FaGithub, FaVuejs, FaLess, FaSass
} from "react-icons/fa";

import "../../styles/components/tiles/inner-tiles/Skills-Inner-Tile.css";

const outerIcons = [
  { icon: <FaReact />, label: "React" },
  { icon: <SiNextdotjs />, label: "Next.js" },
  { icon: <SiTypescript />, label: "TypeScript" },
  { icon: <FaJsSquare />, label: "JavaScript" },
  { icon: <FaHtml5 />, label: "HTML5" },
  { icon: <FaCss3Alt />, label: "CSS3" },
  { icon: <FaSass />, label: "SASS" },
  { icon: <FaNodeJs />, label: "Node.js" },
  { icon: <SiExpress />, label: "Express.js" },
  { icon: <SiPhp />, label: "PHP" },
  { icon: <SiMongodb />, label: "MongoDB" },
  { icon: <SiPostgresql />, label: "PostgreSQL" },
  { icon: <SiMysql />, label: "MySQL" },
  { icon: <SiVercel />, label: "Vercel" },
  { icon: <FaGithub />, label: "GitHub" },
  { icon: <SiWordpress />, label: "WordPress" }
];

const innerIcons = [
  { icon: <SiTailwindcss />, label: "TailwindCSS" },
  { icon: <FaLess />, label: "LESS" },
  { icon: <FaVuejs />, label: "Vue.js" },
  { icon: <FaGitAlt />, label: "Git" },
  { icon: <SiBitbucket />, label: "Bitbucket" },
  { icon: <FaPython />, label: "Python" },
  { icon: <SiFirebase />, label: "Firebase" },
  { icon: <SiShopify />, label: "Shopify" },
  { icon: <SiBootstrap />, label: "Bootstrap" },
  { icon: <SiFigma />, label: "Figma" },
];

const Skills = () => {

  return (
    <div className="content">
      <div className="skills">
        <h2 className="section-title">Technical Skills</h2>
        
        <div className="skills-container">
            <div className="skills-orbiting-circles">
              <OrbitingCircles radius={200} iconSize={50}>
                {outerIcons.map((tech, index) => (
                  <div key={index} aria-label={tech.label} className="tech-icon-wrapper">
                    {tech.icon}
                  </div>
                ))}
              </OrbitingCircles>
              <OrbitingCircles radius={100} iconSize={50} reverse>
                {innerIcons.map((tech, index) => (
                  <div key={index} aria-label={tech.label} className="tech-icon-wrapper">
                    {tech.icon}
                  </div>
                ))}
              </OrbitingCircles>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;