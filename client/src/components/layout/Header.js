import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { AiOutlineFileText } from "react-icons/ai";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { IoClose, IoMenu } from "react-icons/io5";
import he from "he";

import "../../styles/Header.css";

const navItems = [
  { label: "About Moi", section: "about" },
  { label: "My Work", section: "projects" },
  { label: "Experience", section: "resume" },
  { label: "Articles", section: "articles" },
  { label: "Let's Chit Chat", section: "contact" },
];

const Header = ({ blogTitle, projectTitle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  // Determine what type of detail page we're on
  const isProjectDetail = location.pathname.startsWith("/projects/");
  const isBlogDetail = location.pathname.startsWith("/blogs/");
  const isDetailPage = isProjectDetail || isBlogDetail;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (section) => {
    const scrollTo = () => {
      const target = document.getElementById(section);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    };

    // Navigate if deep-linked
    if (isDetailPage) {
      navigate(`/#${section}`);
      setTimeout(scrollTo, 100);
    } else {
      scrollTo();
    }

    // Close mobile menu after navigation
    setIsMenuOpen(false);
  };

  const handleBack = () => {
    if (isProjectDetail) {
      navigate("/#projects");
    } else if (isBlogDetail) {
      navigate("/#articles");
    }
  };

  // Determine the title to display in the header
  const getDisplayTitle = () => {
    if (isProjectDetail && projectTitle) {
      return projectTitle;
    } else if (isBlogDetail && blogTitle) {
      return he.decode(blogTitle);
    }
    return ""; // No title on main page
  };

  return (
    <header className={`pill-header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        {/* Logo and Title */}
        <div className="logo-container">
          <a href="/" className="logo-link">
            <img 
              src="https://firebasestorage.googleapis.com/v0/b/my-portfolio-1fc61.appspot.com/o/logo.png?alt=media&token=028e1ea1-6b08-4f86-baa4-7ef926223a9f" 
              alt="logo" 
              className="logo"
            />
            {isDetailPage && getDisplayTitle() && (
              <span className="logo-text"> - {getDisplayTitle()}</span>
            )}
          </a>
        </div>

        {/* CTA Button - Visible on desktop only */}
        <div className="cta-container desktop-only">
          <a 
            href="https://firebasestorage.googleapis.com/v0/b/my-portfolio-1fc61.appspot.com/o/Corey_Rotstein_Web_Resume.pdf?alt=media&token=ccf640ad-a650-4cf1-83a3-da73ea57cb7b" 
            target="_blank" 
            className="btn cta-button" 
            rel="noreferrer"
          >
            Download CV
          </a>

          {/* Back button for detail pages */}
          {isDetailPage && (
            <button className="back-button" onClick={handleBack}>
              <span>{isProjectDetail ? "Back to my Work" : "Back to Articles"}</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Button - Always Visible */}
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
        {/* Action Buttons in Mobile Menu */}
        <div className="mobile-action-buttons">
          <a 
            href="https://firebasestorage.googleapis.com/v0/b/my-portfolio-1fc61.appspot.com/o/Corey_Rotstein_Web_Resume.pdf?alt=media&token=ccf640ad-a650-4cf1-83a3-da73ea57cb7b" 
            target="_blank" 
            className="btn cta-button" 
            rel="noreferrer"
          >
            Download CV
          </a>

          {/* Back button for detail pages in mobile menu */}
          {isDetailPage && (
            <button className="back-button" onClick={handleBack}>
              <span>{isProjectDetail ? "Back to my Work" : "Back to Articles"}</span>
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
        </div>
      </div>
    </header>
  );
};

export default Header;