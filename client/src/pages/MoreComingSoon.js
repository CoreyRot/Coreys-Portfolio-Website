import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MoreComingSoon.css";

const MoreComingSoon = () => {
  const navigate = useNavigate();

  return (
    <section className="more-coming-soon">
      <div className="container">
        <div className="more-coming-soon-background">
            <div className="grid">
                <div className="cell">
                    <h1>More Coming Soon!</h1>
                    <p>If you want your project to be featured, contact me below.</p>
                    <button className="cta-button" onClick={() => navigate("/#contact")}><span>Get in Touch</span></button>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default MoreComingSoon;
