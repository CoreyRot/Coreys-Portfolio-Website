import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../config"; // ✅ Use centralized API URL
import "../styles/Projects.css";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/projects`); // ✅ Fix API URL
        setProjects(response.data);
        setFilteredProjects(response.data);
      } catch (error) {
        console.error("❌ Error fetching projects:", error);
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

        {/* ✅ Project Category Filters */}
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

        {/* ✅ Projects Grid */}
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
            <p className="no-projects">No projects available.</p> // ✅ Handle empty state
          )}

          {/* ✅ Contact Section */}
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
