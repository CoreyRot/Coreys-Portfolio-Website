import React from "react";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="container">
      <div className="home-background">
        <div className="grid">
          <div className="cell">
            <h1 className="heading-title">Hey There!</h1>
            <div className="section-subheading">
              <p>I'm Corey, and i'm passionate about crafting intuitive and visually engaging digital experiences. Whether it's building dynamic applications or designing user-friendly websites, I focus on creating high-quality solutions that bring ideas to life.</p>

              <p>Let's build something amazing together!</p>
            </div>

            <div className="button-group flex-container">
              <a href="#projects" className="btn"><span>View My Projects</span></a>
              <a href="#contact" className="btn"><span>Hire Me</span></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
