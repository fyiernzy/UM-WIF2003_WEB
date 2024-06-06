// src/components/Profile/JobHistory.js
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Modal, Button } from "react-bootstrap";
import "../../components-css/Profile/JobHistoryCSS.css";
import { useNavigate } from "react-router-dom";
import { getCompletedProjects } from "../../api/projectApi";
import noJob from "../../assets/profile/no_job.svg";

const JobHistory = ({ userId }) => {
  const [completedProjects, setCompletedProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompletedProjects = async () => {
      try {
        const response = await getCompletedProjects(userId);
        setCompletedProjects(response.completedProjects);
      } catch (error) {
        console.error("Error: " + error.message);
        setError("Failed to fetch completed projects.");
      }
    };
    fetchCompletedProjects();
  }, [userId]);

  useEffect(() => {
    console.log("Current completed projects: ", completedProjects);
  }, [completedProjects]);

  const handleClick = (project) => {
    setSelectedProject(project);
  };

  const handleClose = () => {
    setSelectedProject(null);
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (completedProjects.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img style={{ width: '150px', height: '100px' }} src={noJob} alt="No Job" />
      </div>
    );
  }

  return (
    <>
      {completedProjects.map((jobInfo, index) => (
        <div key={index} className="job-history-card" onClick={() => handleClick(jobInfo)}>
          <Row className="header">
            <Col xs={7} className="info-column">
              <h3 className="fs-5"><strong>{jobInfo.projectTitle}</strong></h3>
              <p>{jobInfo.companyName}</p>
            </Col>
            <Col xs={3} className="status-column fs-6">
              <p>{jobInfo.completed ? "Completed" : "Ongoing"}</p>
            </Col>
          </Row>
          <Row className="JobHistoryContent">
            <Col>
              <p>
                <strong>Deadline for completion:</strong> {new Date(jobInfo.deadline).toLocaleDateString()}
              </p>
            </Col>
          </Row>
        </div>
      ))}

{selectedProject && (
        <Modal show={true} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedProject.projectTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="mt-3"><strong>Description:</strong> {selectedProject.projectDescription}</p>
            <p className="mt-3"><strong>Location:</strong> {selectedProject.location}</p>
            <p className="mt-3"><strong>Category:</strong> {selectedProject.projectCategory}</p>
            <p className="mt-3"><strong>Duration:</strong> {selectedProject.projectDuration}</p>
            <p className="mt-3"><strong>Budget: RM </strong> {selectedProject.projectBudget}</p>
            <p className="mt-3"><strong>Deadline:</strong> {new Date(selectedProject.deadline).toLocaleDateString()}</p>
            <p className="mt-3"><strong>Skills Required:</strong> {selectedProject.requiredSkills.join(", ")}</p>
            <p className="mt-3"><strong>Additional Note:</strong> {selectedProject.additionalNotes}</p>
            {selectedProject.uploadedFiles && selectedProject.uploadedFiles.length > 0 ? (
          <ul style={{ gridColumn: "1 / -1" }}>
            {selectedProject.uploadedFiles.map((file, index) => (
              <li
                key={index}
                className={!file.fileUrl ? "file-not-available" : ""}
              >
                {file.fileName}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ gridColumn: "1 / -1", color: "red" }}>
            No files uploaded
          </p>
        )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      
    </>
  );
};

export default JobHistory;
