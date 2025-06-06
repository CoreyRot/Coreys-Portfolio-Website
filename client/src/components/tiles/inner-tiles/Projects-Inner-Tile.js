import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../../../config";
import "../../../styles/components/tiles/inner-tiles/Projects.css";

const categories = ["All", "Web Development", "Design"];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/api/projects`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.data.success && Array.isArray(response.data.data)) {
        setProjects(response.data.data);
      } else {
        throw new Error("Unexpected response format.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load projects.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const filteredProjects = useMemo(() => {
  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return filtered.sort((a, b) => a.index - b.index);
}, [activeFilter, projects]);


  if (loading) return <div className="container"><p style={{ color: "white" }}>Loading my work...</p></div>;
  if (error) return <p className="error-message">⚠️ {error}</p>;

  return (
    <div className="container">
      <div className="projects-background">
        <h2 className="section-title">My Work</h2>
        <p className="section-subheading">My works, ranging from web applications to branding designs.</p>

        {/* ✅ Category Filters */}
        <div className="filters flex-container">
          {categories.map((category) => (
            <button
              key={category}
              className={activeFilter === category ? "active" : ""}
              onClick={() => setActiveFilter(category)}
            >
              <span>{category}</span>
            </button>
          ))}
        </div>

        {/* ✅ Project Grid */}
        <div className="projects-grid">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <Link key={project._id} to={`/projects/${project._id}`} className="projects-item">
                <img src={project.imageUrl || "https://via.placeholder.com/600x400"} alt={project.title} />
                <div className="overlay">
                  <span className="category">{project.category || "Uncategorized"}</span>
                  <h3>{project.title}</h3>
                </div>
              </Link>
            ))
          ) : (
            <p className="no-projects">Nothing available.</p>
          )}

          {/* ✅ Contact Card */}
          <div className="projects-item contact-item">
            <div className="plus-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="white">
                <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="overlay">
              <h3>Want to work together?</h3>
              <p>Message Me</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;