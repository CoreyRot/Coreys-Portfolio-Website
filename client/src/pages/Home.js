import React from "react";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="container">
      <div className="home-background">
        <div className="grid">
          <div className="cell">
            <h1 className="heading-title">Welcome.</h1>
            <div className="section-subheading">
              <p>
                My name is Corey, and I'm a web developer with a passion for creating engaging and user-friendly interfaces. I specialize in the MERN Stack. My goal is to help clients build high-quality websites and applications that meet their needs.
              </p>
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
