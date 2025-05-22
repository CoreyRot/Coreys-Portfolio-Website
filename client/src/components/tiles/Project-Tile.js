import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../../config";
import "../../styles/components/tiles/Projects.css";

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
    <div className="content">
        <div className="projects-container">
            <div className="section-header">
                <h2 className="section-title">Latest Projects</h2>
            </div>
            <div className="projects-grid">
            {filteredProjects.length > 0 ? (
            filteredProjects
                .slice(0, 2)
                .map((project) => (
                    <div key={project._id} className="projects-item">
                      <img src={project.imageUrl || "https://via.placeholder.com/600x400"} alt={project.title} />
                    </div>
                ))
            ) : (
                <p className="no-projects">Nothing available.</p>
            )}
            </div>
        </div> 
    </div>
  );
};

export default Projects;
