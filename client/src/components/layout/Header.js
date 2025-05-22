import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineFileText } from "react-icons/ai";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { IoClose, IoMenu } from "react-icons/io5";
import he from "he";

import "../../styles/components/layout/Header.css";

// Constants
const RESUME_URL = "https://firebasestorage.googleapis.com/v0/b/my-portfolio-1fc61.appspot.com/o/Corey_Rotstein_Web_Resume.pdf?alt=media&token=ccf640ad-a650-4cf1-83a3-da73ea57cb7b";
const LOGO_URL = "https://firebasestorage.googleapis.com/v0/b/my-portfolio-1fc61.appspot.com/o/logo.png?alt=media&token=028e1ea1-6b08-4f86-baa4-7ef926223a9f";
const LINKEDIN_URL = "https://www.linkedin.com/in/corey-rotstein/";
const GITHUB_URL = "https://github.com/CoreyRot";

const navItems = [
  { label: "About Moi", section: "about" },
  { label: "My Work", section: "projects" },
  { label: "Projects", section: "projects" },
  { label: "Articles", section: "articles" },
  { label: "Let's Chit Chat", section: "contact" },
];

// Map navigation sections to tile IDs (adjust these to match your actual tile IDs)
const sectionToTileMap = {
  "about": "about",
  "projects": "projects", 
  "articles": "articles",
  "contact": "contact"
};

const Header = ({ blogTitle, projectTitle, onNavigationClick, expandedTileId }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Page type detection
  const isProjectDetail = location.pathname.startsWith("/projects/");
  const isBlogDetail = location.pathname.startsWith("/blogs/");
  const isDetailPage = isProjectDetail || isBlogDetail;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation handlers
  const handleNavigation = (section) => {
    const scrollTo = () => {
      const target = document.getElementById(section);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    };

    if (isDetailPage) {
      navigate(`/#${section}`);
      setTimeout(scrollTo, 100);
    } else {
      // On the main page - open the expanded tile view
      const tileId = sectionToTileMap[section];
      if (tileId && onNavigationClick) {
        onNavigationClick(tileId);
      }
      // Also scroll to the section
      scrollTo();
    }

    setIsMenuOpen(false);
  };

  const handleBack = () => {
    // Navigate back to homepage with state parameter
    navigate("/", { 
      state: { fromDetailPage: true },
      replace: true 
    });
    
    // Ensure body scrollability is restored
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.body.style.overflow = "auto";
      document.body.style.position = "static";
    }, 50);
  };

  // Title display logic
  const getDisplayTitle = () => {
    if (isProjectDetail && projectTitle) {
      return projectTitle;
    } else if (isBlogDetail && blogTitle) {
      return he.decode(blogTitle);
    }
    return "";
  };

  // Component rendering
  return (
    <header className={`pill-header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        {/* Logo and Title */}
        <div className="logo-container">
          <a href="/" className="logo-link">
            <img src={LOGO_URL} alt="logo" className="logo" />
            {isDetailPage && getDisplayTitle() && (
              <span className="logo-text"> - {getDisplayTitle()}</span>
            )}
          </a>
        </div>

        {/* Desktop Actions */}
        <div className="cta-container desktop-only">
          <a 
            href={RESUME_URL} 
            target="_blank" 
            className="btn cta-button" 
            rel="noreferrer"
          >
            Download CV
          </a>

          {isDetailPage && (
            <button className="back-button" onClick={handleBack}>
              <span>Back to Dashboard</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <IoClose /> : <IoMenu />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div className={`mobile-nav ${isMenuOpen ? "open" : ""}`}>
        {/* Mobile Action Buttons */}
        <div className="mobile-action-buttons">
          <a 
            href={RESUME_URL} 
            target="_blank" 
            className="btn cta-button" 
            rel="noreferrer"
          >
            Download CV
          </a>

          {isDetailPage && (
            <button className="back-button" onClick={handleBack}>
              <span>Back to Dashboard</span>
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <ul className="mobile-nav-links">
          {navItems.map((item) => (
            <li key={item.section}>
              <button
                onClick={() => handleNavigation(item.section)}
                aria-label={`Navigate to ${item.label}`}
                className={expandedTileId === sectionToTileMap[item.section] ? 'active' : ''}
              >
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>

        {/* Social Icons */}
        <div className="social-icons-container">
          <div className="social-icons">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Resume"
            >
              <AiOutlineFileText />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit LinkedIn Profile"
            >
              <FaLinkedinIn />
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit GitHub Profile"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;