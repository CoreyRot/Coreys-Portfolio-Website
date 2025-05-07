import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineFileText,
  AiOutlineMail,
} from "react-icons/ai";
import { BsImage, BsPencilSquare } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { IoClose, IoMenu } from "react-icons/io5";

import "../../styles/Sidebar.css"; // Consider migrating to Tailwind or CSS Modules

const navItems = [
  { icon: <AiOutlineHome />, label: "Home", section: "home" },
  { icon: <AiOutlineUser />, label: "About", section: "about" },
  { icon: <BsImage />, label: "Projects", section: "projects" },
  { icon: <AiOutlineFileText />, label: "Resume", section: "resume" },
  { icon: <BsPencilSquare />, label: "Posts", section: "blogs" },
  { icon: <AiOutlineMail />, label: "Contact", section: "contact" },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    typeof window !== "undefined" && window.innerWidth > 1024
  );
  const navigate = useNavigate();
  const location = useLocation();

  // 🔄 Handle responsive open/close
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setIsSidebarOpen(window.innerWidth > 1024);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavigation = (section) => {
    const scrollTo = () => {
      const target = document.getElementById(section);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    };

    // Navigate if deep-linked
    if (location.pathname.startsWith("/projects/") || location.pathname.startsWith("/blogs/")) {
      navigate(`/#${section}`);
      setTimeout(scrollTo, 100);
    } else {
      scrollTo();
    }

    // Auto-close sidebar on small screens
    if (window.innerWidth <= 1024) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
      {/* 📱 Mobile Toggle */}
      <button
        className="mobile-menu-btn"
        onClick={() => setIsSidebarOpen((prev) => !prev)}
        aria-label="Toggle Sidebar"
      >
        {isSidebarOpen ? <IoClose /> : <IoMenu />}
      </button>

      {/* 🧭 Sidebar Navigation */}
      <aside
        className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}
        aria-label="Main Navigation"
      >
        {/* 🔗 Logo Section */}
        <div className="profile-section">
          <a href="/" className="profile-img">
            <img className="logo" src="https://firebasestorage.googleapis.com/v0/b/my-portfolio-1fc61.appspot.com/o/logo.png?alt=media&token=028e1ea1-6b08-4f86-baa4-7ef926223a9f" alt="logo" />
          </a>
        </div>

        {/* 🔢 Nav Items */}
        <nav>
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.section}>
                <button
                  onClick={() => handleNavigation(item.section)}
                  aria-label={`Navigate to ${item.label}`}
                >
                  {item.icon} {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* 🔗 Social Links */}
        <div className="social-icons">
          <a
            href="https://firebasestorage.googleapis.com/v0/b/my-portfolio-1fc61.appspot.com/o/Corey_Rotstein_Web_Resume.pdf?alt=media&token=ccf640ad-a650-4cf1-83a3-da73ea57cb7b"
            target="_blank"
            rel="noopener noreferrer"
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
          <a
            href="https://github.com/CoreyRot"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit GitHub Profile"
          >
            <FaGithub />
          </a>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
