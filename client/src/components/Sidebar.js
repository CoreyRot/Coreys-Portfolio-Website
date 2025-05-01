import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaLinkedinIn } from "react-icons/fa";
import { AiOutlineHome, AiOutlineUser, AiOutlineMail, AiOutlineFileText } from "react-icons/ai";
import { BsImage, BsPencilSquare } from "react-icons/bs";
import { IoClose, IoMenu } from "react-icons/io5";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Handle Sidebar Toggle for Responsive Behavior
  useEffect(() => {
    const handleResize = () => setIsSidebarOpen(window.innerWidth > 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Handle Smooth Scrolling & Navigation Logic
  const handleNavigation = (section) => {
    if (location.pathname.startsWith("/projects/") || location.pathname.startsWith("/blogs/")) {
      navigate(`/#${section}`);
      setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    }

    // ✅ Close Sidebar on Mobile/Tablets
    if (window.innerWidth <= 1024) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
      {/* ✅ Mobile Menu Button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle Sidebar"
      >
        {isSidebarOpen ? <IoClose /> : <IoMenu />}
      </button>

      {/* ✅ Sidebar Navigation */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`} aria-label="Main Navigation">
        <div className="profile-section">
          
          <div className="profile-img">
            <a href="/">
              <img className="logo" src="https://firebasestorage.googleapis.com/v0/b/my-portfolio-1fc61.appspot.com/o/logo.png?alt=media&token=028e1ea1-6b08-4f86-baa4-7ef926223a9f" alt="logo" />
            </a>
          </div>
        </div>

        {/* ✅ Navigation Links */}
        <nav>
          <ul className="nav-links">
            <NavItem icon={<AiOutlineHome />} label="Home" section="home" handleNavigation={handleNavigation} />
            <NavItem icon={<AiOutlineUser />} label="About" section="about" handleNavigation={handleNavigation} />
            <NavItem icon={<AiOutlineFileText />} label="Resume" section="resume" handleNavigation={handleNavigation} />
            <NavItem icon={<BsImage />} label="Projects" section="projects" handleNavigation={handleNavigation} />
            <NavItem icon={<BsPencilSquare />} label="Posts" section="blogs" handleNavigation={handleNavigation} />
            <NavItem icon={<AiOutlineMail />} label="Contact" section="contact" handleNavigation={handleNavigation} />
          </ul>
        </nav>
        <div className="social-icons">
            <a
              href="https://firebasestorage.googleapis.com/v0/b/my-portfolio-1fc61.appspot.com/o/Corey%20-%20Resume%20-%202025.pdf?alt=media&token=872b0d9d-8522-4a09-bb61-2e6500c945a0"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-download"
              aria-label="Download Resume"
            >
              <AiOutlineFileText />
            </a>
            <a 
              href="https://www.linkedin.com/in/corey-rotstein/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Visit LinkedIn Profile"
            >
              <FaLinkedinIn />
            </a>
          </div>
      </aside>
    </>
  );
};

// ✅ Reusable Navigation Item Component
const NavItem = ({ icon, label, section, handleNavigation }) => (
  <li>
    <button onClick={() => handleNavigation(section)} aria-label={`Navigate to ${label}`}>
      {icon} {label}
    </button>
  </li>
);

export default Sidebar;
