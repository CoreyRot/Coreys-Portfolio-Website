import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../config";
import "../styles/ProjectDetail.css";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (!id || id.length !== 24) {
      console.error("❌ Invalid Project ID:", id);
      setLoading(false);
      return;
    }

    axios.get(`${API_URL}/api/projects`)
      .then((response) => {
        setProjects(response.data);

        // ✅ Find current project
        const foundIndex = response.data.findIndex((p) => p._id === id);
        if (foundIndex !== -1) {
          setProject(response.data[foundIndex]);
        } else {
          console.error("❌ Project not found in list:", id);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ Error fetching projects:", error);
        setLoading(false);
      });
  }, [id]);

  const navigateToProject = (direction) => {
    const currentIndex = projects.findIndex((p) => p._id === project._id);
    if (currentIndex === -1) return;

    let newIndex;
    if (direction === "prev" && currentIndex > 0) {
      newIndex = currentIndex - 1;
      navigate(`/projects/${projects[newIndex]._id}`);
    } else if (direction === "next") {
      if (currentIndex < projects.length - 1) {
        newIndex = currentIndex + 1;
        navigate(`/projects/${projects[newIndex]._id}`);
      } else {
        navigate("/projects/more-coming-soon");
      }
    }
  };

  const handleBack = () => {
    navigate("/#projects", { replace: true });
    window.location.reload();
  };

  if (loading) return <p>Loading...</p>;
  if (!project) return <p>Project not found.</p>;

  return (
    <section className="project-detail">
      <header className="project-header">
        <h1>{project.title}</h1>
        <button className="back-button" onClick={handleBack}>Back to Projects</button>
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

        <div className="project-navigation">
          {projects.findIndex((p) => p._id === project._id) > 0 && (
            <button className="prev-button" onClick={() => navigateToProject("prev")}>Previous Project</button>
          )}
          <button className="next-button" onClick={() => navigateToProject("next")}>
            {projects.findIndex((p) => p._id === project._id) < projects.length - 1 ? "Next Project" : "See More Projects"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;
