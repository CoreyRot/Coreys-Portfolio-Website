import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ProjectDetail.css";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://my-portfolio-w07c.onrender.com//api/projects/${id}`)
      .then((response) => {
        setProject(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching project:", error);
        setLoading(false);
      });
  }, [id]);

  const handleBack = () => {
    navigate("/#projects", { replace: true });
    window.location.reload(); // Ensures proper scrolling to the anchor
  };

  if (loading) return <p>Loading...</p>;
  if (!project) return <p>Project not found.</p>;

  return (
    <section className="project-detail">
      <header className="project-header">
        <h2>{project.title}</h2>
        <button className="back-button" onClick={handleBack}>Back to Project</button>
      </header>
      <div className="container">
        <div className="project-main">
          <div className="project-image">
            <img src={project.imageUrl} alt={project.title} />
          </div>
          <div className="project-info">
            <h3>Project Information</h3>
            <ul>
              <li><strong>Category:</strong> {project.category}</li>
              <li><strong>Project URL:</strong> <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Check Out The Project!</a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;
