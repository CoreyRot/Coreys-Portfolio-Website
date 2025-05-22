import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../../config";
import "../../../styles/components/tiles/inner-tiles/ProjectDetail.css";
import PillHeader from "../../layout/Header";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    try {
      if (!id || id.length !== 24) throw new Error("Invalid Project ID.");

      const response = await axios.get(`${API_URL}/api/projects`);
      const projectsData = Array.isArray(response.data) ? response.data : response.data.data;

      if (!Array.isArray(projectsData) || projectsData.length === 0) {
        throw new Error("No projects available.");
      }

      const sortedProjects = projectsData.sort((a, b) => a.index - b.index);
      setProjects(sortedProjects);

      const foundProject = projectsData.find((p) => p._id === id);
      if (!foundProject) throw new Error("Project not found.");

      setProject(foundProject);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

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
      navigate("/");
      return;
    }

    navigate(`/projects/${projects[newIndex]._id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">⚠️ {error}</p>;

  return (
    <>
      {/* Use PillHeader with project title */}
      <PillHeader projectTitle={project.title} />
      
      <section className="project-detail">
        <div className="container">
          <div className="project-main">
            <ProjectImage imageUrl={project.imageUrl} title={project.title} />
            <ProjectInfo 
              category={project.category} 
              liveUrl={project.liveUrl} 
              description={project.description} 
              stackUsed={project.stackUsed} 
              agency={project.agency} 
              backlink={project.backlink}
            />
          </div>
        </div>
        <ProjectNavigation
          projects={projects}
          project={project}
          navigateToProject={navigateToProject}
        />
      </section>
    </>
  );
};

/** Project Image Component */
const ProjectImage = ({ imageUrl, title }) => (
  <div className="project-image">
    <img src={imageUrl || "https://via.placeholder.com/600x400"} alt={title} />
  </div>
);

/** Project Info Component */
const ProjectInfo = ({ category, liveUrl, description, stackUsed, agency, backlink }) => (
  <div className="project-info">
    <h2 className="section-title">Project Information</h2>
    <ul>
      <li><strong>Category:</strong> {category || "N/A"}</li>

      {description && description.length > 0 && (
        <li>
          <strong>Project Overview:</strong>
          {Array.isArray(description) ? (
            description.map((item, index) => <p key={index}>{item}</p>)
          ) : (
            <p>{description}</p>
          )}
        </li>
      )}

      {liveUrl && (
        <li>
          <strong>Project URL: </strong> 
          <a href={liveUrl} target="_blank" rel="noopener noreferrer">Check Out The Project!</a>
        </li>
      )}

      {stackUsed && stackUsed.length > 0 && (
        <div className="stack-used-grid">
          <strong>Stack Used:</strong> 
          {stackUsed.map((stack, index) => (
            <div key={index} className="stack-used-label">
              {stack}
            </div>
          ))}
        </div>
      )}

      {agency && agency.length > 0 && (
        <li>
          <strong>Agency: </strong><a href={backlink} target="_blank" rel="noopener noreferrer">{agency}</a>  
        </li>
      )}

    </ul>
  </div>
);

/** Project Navigation Component */
const ProjectNavigation = ({ projects, project, navigateToProject }) => {
  const currentIndex = projects.findIndex((p) => p._id === project._id);

  return (
    <footer className="project-footer">
      <div className="project-navigation">
        {currentIndex > 0 && (
          <button className="prev-button" onClick={() => navigateToProject("prev")}>
            <span>Previous</span>
          </button>
        )}
        <button className="next-button" onClick={() => navigateToProject("next")}>
          <span>{currentIndex < projects.length - 1 ? "Next" : "Back to Dashboard"}</span>
        </button>
      </div>
    </footer>
  );
};

export default ProjectDetails;