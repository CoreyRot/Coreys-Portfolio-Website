import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaLinkedinIn } from "react-icons/fa";
import { AiOutlineHome, AiOutlineUser, AiOutlineMail, AiOutlineFileText } from "react-icons/ai";
import { BsImage } from "react-icons/bs";
import { IoClose, IoMenu } from "react-icons/io5";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavigation = (section) => {
    if (location.pathname.startsWith("/projects/")) {
      navigate(`/#${section}`);
      window.location.reload();
    } else {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <button className="mobile-menu-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? <IoClose /> : <IoMenu />}
      </button>
      <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="profile-section">
          <h2 className="profile-name">Corey Rotstein</h2>
          <div className="social-icons">
            <a href="https://firebasestorage.googleapis.com/v0/b/my-portfolio-1fc61.appspot.com/o/Corey's%20Resume.pdf?alt=media&token=7611125a-bf6c-4290-8418-5cecbd798f98" target="_blank" rel="noopener noreferrer" download className="resume-download">
              <AiOutlineFileText />
            </a>
            <a href="https://www.linkedin.com/in/corey-rotstein/" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
        <nav>
          <ul className="nav-links">
            <li><button onClick={() => handleNavigation("home")}><AiOutlineHome /> Home</button></li>
            <li><button onClick={() => handleNavigation("about")}><AiOutlineUser /> About</button></li>
            <li><button onClick={() => handleNavigation("resume")}><AiOutlineFileText /> Resume</button></li>
            <li><button onClick={() => handleNavigation("projects")}><BsImage /> Projects</button></li>
            <li><button onClick={() => handleNavigation("contact")}><AiOutlineMail /> Contact</button></li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
