import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../config";
import "../styles/ProjectDetail.css";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch Projects & Find Current Project
  const fetchProjects = useCallback(async () => {
    try {
      if (!id || id.length !== 24) {
        throw new Error("Invalid Project ID.");
      }

      const response = await axios.get(`${API_URL}/api/projects`);
      const projectsData = Array.isArray(response.data) ? response.data : response.data.data;
      
      if (!Array.isArray(projectsData)) {
        throw new Error("Unexpected response format.");
      }
      

      if (projectsData.length === 0) throw new Error("No projects available.");

      setProjects(projectsData);

      // ✅ Find the current project
      const foundProject = projectsData.find((p) => p._id === id);
      if (!foundProject) throw new Error("Project not found.");

      setProject(foundProject);
    } catch (err) {
      console.error("❌ Error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // ✅ Handle Navigation to Next / Previous Project
  const navigateToProject = (direction) => {
    if (!projects.length || !project) return;

    const currentIndex = projects.findIndex((p) => p._id === project._id);
    if (currentIndex === -1) return;

    let newIndex;
    if (direction === "prev" && currentIndex > 0) {
      newIndex = currentIndex - 1;
    } else if (direction === "next" && currentIndex < projects.length - 1) {
      newIndex = currentIndex + 1;
    } else {
      navigate("/projects/more-coming-soon");
      return;
    }

    navigate(`/projects/${projects[newIndex]._id}`);
  };

  // ✅ Handle Back Button (No Page Reload)
  const handleBack = () => {
    navigate("/#projects");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">⚠️ {error}</p>;

  return (
    <section className="project-detail">
      <header className="project-header">
        <div className="project-header-grid">
          <h1>{project.title}</h1>
          <button className="back-button" onClick={handleBack}>Back to Projects</button>
        </div>
      </header>
      <div className="container">
        <div className="project-main">
          <div className="project-image">
            <img src={project.imageUrl || "https://via.placeholder.com/600x400"} alt={project.title} />
          </div>
          <div className="project-info">
            <h3>Project Information</h3>
            <ul>
              <li><strong>Category:</strong> {project.category || "N/A"}</li>
              {project.liveUrl && (
                <li><strong>Project URL:</strong> <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Check Out The Project!</a></li>
              )}
            </ul>
          </div>
        </div>

        {/* ✅ Project Navigation */}
        <div className="project-navigation">
          {projects.findIndex((p) => p._id === project._id) > 0 && (
            <button className="prev-button" onClick={() => navigateToProject("prev")}>
              <span>Previous</span>
            </button>
          )}
          <button className="next-button" onClick={() => navigateToProject("next")}>
            <span>{projects.findIndex((p) => p._id === project._id) < projects.length - 1 ? "Next" : "See More"}</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;