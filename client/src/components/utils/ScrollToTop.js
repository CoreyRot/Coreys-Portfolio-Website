import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import "../../styles/ScrollToTop.css";

const GoToTop = () => {
  const [visible, setVisible] = useState(false);

  // ✅ Show button after scrolling down 300px
  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // ✅ Smooth Scroll to Top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button className={`scroll-to-top ${visible ? "show" : ""}`} onClick={scrollToTop} aria-label="Scroll to top">
      <FaArrowUp />
    </button>
  );
};

export default GoToTop;
