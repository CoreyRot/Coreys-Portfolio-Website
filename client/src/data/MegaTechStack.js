// Languages & Compilers
import {
    FaHtml5, FaCss3Alt, FaJsSquare, FaPhp, FaPython, FaJava, FaRust,
    FaGitAlt, FaGithub, FaGitlab, FaDatabase, FaGulp, FaGrunt,
    FaYarn, FaNpm, FaLess, FaSass, FaDocker, FaAws, FaFigma
  } from "react-icons/fa";
  
  import {
    SiTypescript, SiC, SiCplusplus, SiCsharp, SiGo, SiRubyonrails, SiDjango, SiLaravel
  } from "react-icons/si";
  
  // Frameworks & Frontend
  import {
    FaReact, FaAngular, FaVuejs
  } from "react-icons/fa";
  
  import {
    SiNextdotjs, SiTailwindcss, SiBootstrap,
    SiStyledcomponents, SiJquery, SiAstro, SiSvelte
  } from "react-icons/si";
  
  // Backend & APIs
  import {
    FaNodeJs
  } from "react-icons/fa";
  
  import {
    SiExpress, SiGraphql, SiFirebase
  } from "react-icons/si";
  
  // Databases
  import {
    SiMongodb, SiMysql, SiPostgresql, SiRedis, SiSqlite
  } from "react-icons/si";
  
  // Cloud & DevOps
  import {
    SiJenkins, SiTravisci, SiNetlify, SiVercel, SiHeroku,
    SiGooglecloud, SiMicrosoftazure, SiBitbucket
  } from "react-icons/si";
  
  // IDEs & Tools
  import {
    SiVisualstudiocode, SiIntellijidea, SiXcode,
    SiNotion, SiPostman, SiInsomnia, SiMarkdown, SiJson,
    SiPrettier, SiEslint, SiWebpack, SiVite
  } from "react-icons/si";
  
  // Platforms & CMS
  import {
    SiWordpress, SiShopify, SiWix
  } from "react-icons/si";
  
  export const megaTechStack = [
    // Languages
    { icon: <FaHtml5 />, label: "HTML5" },
    { icon: <FaCss3Alt />, label: "CSS3" },
    { icon: <FaJsSquare />, label: "JavaScript" },
    { icon: <SiTypescript />, label: "TypeScript" },
    { icon: <FaPhp />, label: "PHP" },
    { icon: <FaPython />, label: "Python" },
    { icon: <FaJava />, label: "Java" },
    { icon: <FaRust />, label: "Rust" },
    { icon: <SiGo />, label: "Go" },
    { icon: <SiC />, label: "C" },
    { icon: <SiCplusplus />, label: "C++" },
    // { icon: <SiCsharp />, label: "C#" },
    { icon: <SiRubyonrails />, label: "Ruby on Rails" },
    { icon: <SiDjango />, label: "Django" },
    { icon: <SiLaravel />, label: "Laravel" },
  
    // Frontend Frameworks
    { icon: <FaReact />, label: "React" },
    { icon: <FaAngular />, label: "Angular" },
    { icon: <FaVuejs />, label: "Vue.js" },
    { icon: <SiSvelte />, label: "Svelte" },
    { icon: <SiNextdotjs />, label: "Next.js" },
    { icon: <SiTailwindcss />, label: "Tailwind CSS" },
    { icon: <SiBootstrap />, label: "Bootstrap" },
    { icon: <SiStyledcomponents />, label: "Styled Components" },
    { icon: <SiJquery />, label: "jQuery" },
    { icon: <SiAstro />, label: "Astro" },
  
    // Backend & APIs
    { icon: <FaNodeJs />, label: "Node.js" },
    { icon: <SiExpress />, label: "Express" },
    { icon: <SiGraphql />, label: "GraphQL" },
    { icon: <SiFirebase />, label: "Firebase" },
  
    // Databases
    { icon: <SiMongodb />, label: "MongoDB" },
    { icon: <SiMysql />, label: "MySQL" },
    { icon: <SiPostgresql />, label: "PostgreSQL" },
    { icon: <SiRedis />, label: "Redis" },
    { icon: <SiSqlite />, label: "SQLite" },
    { icon: <FaDatabase />, label: "General DB" },
  
    // DevOps & Cloud
    { icon: <FaGitAlt />, label: "Git" },
    { icon: <FaGithub />, label: "GitHub" },
    { icon: <FaGitlab />, label: "GitLab" },
    { icon: <SiBitbucket />, label: "Bitbucket" },
    { icon: <FaDocker />, label: "Docker" },
    { icon: <SiJenkins />, label: "Jenkins" },
    { icon: <SiTravisci />, label: "Travis CI" },
    { icon: <FaAws />, label: "AWS" },
    { icon: <SiGooglecloud />, label: "Google Cloud" },
    { icon: <SiNetlify />, label: "Netlify" },
    { icon: <SiVercel />, label: "Vercel" },
    { icon: <SiHeroku />, label: "Heroku" },
  
    // Platforms & CMS
    { icon: <SiWordpress />, label: "WordPress" },
    { icon: <SiShopify />, label: "Shopify" },
    { icon: <SiWix />, label: "Wix" },
  
    // Design & Tools
    { icon: <FaFigma />, label: "Figma" },
    // { icon: <SiVisualstudiocode />, label: "VS Code" },
    { icon: <SiIntellijidea />, label: "IntelliJ" },
    { icon: <SiXcode />, label: "Xcode" },
    { icon: <SiNotion />, label: "Notion" },
    { icon: <SiPostman />, label: "Postman" },
    { icon: <SiInsomnia />, label: "Insomnia" },
    { icon: <SiMarkdown />, label: "Markdown" },
    { icon: <SiJson />, label: "JSON" },
    { icon: <SiPrettier />, label: "Prettier" },
    { icon: <SiEslint />, label: "ESLint" },
    { icon: <SiWebpack />, label: "Webpack" },
    { icon: <SiVite />, label: "Vite" },
    { icon: <FaGulp />, label: "Gulp" },
    { icon: <FaGrunt />, label: "Grunt" },
    { icon: <FaYarn />, label: "Yarn" },
    { icon: <FaNpm />, label: "npm" },
    { icon: <FaLess />, label: "LESS" },
    { icon: <FaSass />, label: "SASS" }
  ];
  