import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../config";
import "../styles/Projects.css";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log("🔄 Fetching projects from:", `${API_URL}/api/projects`);
        const response = await axios.get(`${API_URL}/api/projects`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Origin: window.location.origin,
          },
        });

        console.log("✅ API Response:", response.data);
        if (Array.isArray(response.data)) {
          setProjects(response.data);
          setFilteredProjects(response.data);
        } else {
          console.error("❌ Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("❌ Error fetching projects:", error);
        if (error.response) {
          console.error("🔹 Server Response:", error.response.data);
        }
      }
    };

    fetchProjects();
  }, []);

  const filterProjects = (category) => {
    setActiveFilter(category);
    setFilteredProjects(
      category === "All" ? projects : projects.filter((project) => project.category === category)
    );
  };

  return (
    <div className="container">
      <div className="projects-background">
        <h2 className="section-title">Projects</h2>
        <p className="section-subheading">
          My projects, ranging from web applications to branding designs.
        </p>

        <div className="filters">
          {["All", "Web Development", "Design"].map((category) => (
            <button
              key={category}
              className={activeFilter === category ? "active" : ""}
              onClick={() => filterProjects(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <Link key={project._id} to={`/projects/${project._id}`} className="projects-item">
                <img src={project.imageUrl} alt={project.title} />
                <div className="overlay">
                  <span className="category">{project.category}</span>
                  <h3>{project.title}</h3>
                </div>
              </Link>
            ))
          ) : (
            <p className="no-projects">No projects available.</p>
          )}

          <div className="projects-item contact-item" onClick={() => window.location.href = "#contact"}>
            <div className="plus-icon">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="64" 
                height="64" 
                viewBox="0 0 24 24" 
                fill="white"
              >
                <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="overlay">
              <h3>Want to work together?</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;